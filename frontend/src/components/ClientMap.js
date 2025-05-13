"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import trashLocations from "../../public/data/trashLocations.json";
import { createSampah } from "../services/sampahServices";

const userLocationIcon = L.divIcon({
  html: renderToStaticMarkup(<FaMapMarkerAlt size={30} color="blue" />),
  className: "",
  iconSize: [30, 30],
});

const trashIcon = L.divIcon({
  html: renderToStaticMarkup(<FaTrash size={30} color="green" />),
  className: "",
  iconSize: [30, 30],
});

function haversineDistance(coords1, coords2) {
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;
  const R = 6371e3;
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function LocationMarker({ onLocationObtained }) {
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const coords = [latitude, longitude];
          onLocationObtained(coords);
          map.setView(coords, 16);
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    }
  }, [map, onLocationObtained]);

  return null;
}

const ClientMap = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [organicAmount, setOrganicAmount] = useState("");
  const [anorganicAmount, setAnorganicAmount] = useState("");
  const [b3Amount, setB3Amount] = useState("");
  const [filteredTPS, setFilteredTPS] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nearestTPS, setNearestTPS] = useState(null);
  const [chosenTPS, setChosenTPS] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (value, setter) => {
    if (value === "") return setter("");
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setter(String(parsedValue));
    }
  };

  useEffect(() => {
    const results = trashLocations.filter((trash) => {
      if (organicAmount > 0 && !trash.types.includes("organic")) return false;
      if (anorganicAmount > 0 && !trash.types.includes("anorganic"))
        return false;
      if (b3Amount > 0 && !trash.types.includes("b3")) return false;
      return true;
    });
    setFilteredTPS(results);
  }, [organicAmount, anorganicAmount, b3Amount]);

  useEffect(() => {
    if (userPosition && filteredTPS.length > 0) {
      let localNearestTPS = null;
      let minDistance = Infinity;
      filteredTPS.forEach((trash) => {
        const distance = haversineDistance(userPosition, trash.coords);
        if (distance < minDistance) {
          minDistance = distance;
          localNearestTPS = { ...trash, distance };
        }
      });
      setNearestTPS(localNearestTPS);
    }
  }, [userPosition, filteredTPS]);

  const handleOpenModal = (tps) => {
    setChosenTPS(tps);
    setShowModal(true);
  };

  const handleConfirmDiscard = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const promises = [];
      if (organicAmount && parseInt(organicAmount) > 0) {
        promises.push(
          createSampah({
            Mass_of_Weight: parseInt(organicAmount),
            Type_of_waste: "organic",
            location: chosenTPS.name,
          })
        );
      }
      if (anorganicAmount && parseInt(anorganicAmount) > 0) {
        promises.push(
          createSampah({
            Mass_of_Weight: parseInt(anorganicAmount),
            Type_of_waste: "inorganic",
            location: chosenTPS.name,
          })
        );
      }
      if (b3Amount && parseInt(b3Amount) > 0) {
        promises.push(
          createSampah({
            Mass_of_Weight: parseInt(b3Amount),
            Type_of_waste: "B3",
            location: chosenTPS.name,
          })
        );
      }
      await Promise.all(promises);
      toast.success(`Sampah berhasil dibuang ke ${chosenTPS.name}`);
    } catch (error) {
      console.error("Gagal membuang sampah:", error);
      toast.error("Gagal membuang sampah. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
    }
  };

  const formatDiscardMessage = () => {
    const org = parseInt(organicAmount, 10) || 0;
    const an = parseInt(anorganicAmount, 10) || 0;
    const b3 = parseInt(b3Amount, 10) || 0;

    const messageParts = [];
    if (org > 0) messageParts.push(`${org} kg organic`);
    if (an > 0) messageParts.push(`${an} kg anorganic`);
    if (b3 > 0) messageParts.push(`${b3} kg B3`);
    return messageParts.length > 0 ? messageParts.join(", ") : "0 kg sampah";
  };

  return (
    <div className="relative w-full h-full">
      {/* Toast Container */}
      <ToastContainer />

      {/* Form Input */}
      <div className="absolute top-5 left-5 z-1000 bg-white p-4 rounded shadow-md w-72 space-y-2">
        <h4 className="font-semibold text-lg text-black">
          Masukkan Jumlah Sampah
        </h4>
        {["Organic", "Anorganic", "B3"].map((type) => (
          <div key={type}>
            <label className="block mb-1 text-black font-medium">{type}</label>
            <input
              type="text"
              value={
                type === "Organic"
                  ? organicAmount
                  : type === "Anorganic"
                  ? anorganicAmount
                  : b3Amount
              }
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  type === "Organic"
                    ? setOrganicAmount
                    : type === "Anorganic"
                    ? setAnorganicAmount
                    : setB3Amount
                )
              }
              className="w-full border border-gray-300 rounded px-2 py-1 text-black"
              placeholder="Contoh: 0"
            />
          </div>
        ))}
        {(organicAmount || anorganicAmount || b3Amount) &&
          filteredTPS.length > 0 && (
            <div className="text-black">
              <h5 className="font-semibold mb-2">TPS yang mendukung:</h5>
              <ul className="list-disc list-inside max-h-35 overflow-y-auto">
                {filteredTPS.map((tps) => (
                  <li key={tps.id}>{tps.name}</li>
                ))}
              </ul>
            </div>
          )}
      </div>

      {/* Map */}
      <MapContainer
        center={[-7.807, 110.402]}
        zoom={16}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker onLocationObtained={setUserPosition} />
        {trashLocations.map((trash) => (
          <Marker key={trash.id} position={trash.coords} icon={trashIcon}>
            <Popup>
              <b>{trash.name}</b>
              <br />
              Jenis: {trash.types.join(", ")}
            </Popup>
          </Marker>
        ))}
        {userPosition && (
          <Marker position={userPosition} icon={userLocationIcon}>
            <Popup>Ini lokasi Anda saat ini.</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Rekomendasi TPS */}
      {userPosition && nearestTPS && (
        <div className="absolute bottom-5 left-5 bg-white p-3 rounded shadow-md max-w-xs text-sm z-1000">
          <h4 className="font-semibold mb-1 text-black">Rekomendasi TPS</h4>
          <p className="text-black">
            {nearestTPS.name} <br />
            {Math.round(nearestTPS.distance)} m dari lokasi Anda.
          </p>
          <button
            className="bg-blue-500 text-white mt-2 px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
            onClick={() => handleOpenModal(nearestTPS)}
          >
            Buang sampah di sini
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && chosenTPS && (
        <div className="fixed inset-0 flex items-center justify-center z-1050 bg-opacity-30">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h3 className="text-lg font-semibold mb-4 text-black">
              Konfirmasi Pembuangan Sampah
            </h3>
            <p className="text-black mb-4">
              Apakah Anda yakin akan membuang <b>{formatDiscardMessage()}</b> di{" "}
              <b>{chosenTPS.name}</b>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-black px-3 py-1 rounded cursor-pointer hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
              <button
                className={`bg-blue-500 text-white cursor-pointer px-3 py-1 rounded hover:bg-blue-600 focus:outline-none ${isSubmitting ? "opacity-50 cursor-not-allowed hover:bg-blue-500" : ""}`}
                onClick={handleConfirmDiscard}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Memproses..." : "Ya, Buang"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientMap;

'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaMapMarkerAlt, FaTrash } from 'react-icons/fa';

const userLocationIcon = L.divIcon({
  html: renderToStaticMarkup(<FaMapMarkerAlt size={30} color="blue" />),
  className: '',
  iconSize: [30, 30],
});

const trashIcon = L.divIcon({
  html: renderToStaticMarkup(<FaTrash size={30} color="green" />),
  className: '',
  iconSize: [30, 30],
});

const trashLocations = [
  { id: 1, name: 'TPS Ngemplak A', coords: [-7.696, 110.430] },
  { id: 2, name: 'TPS Ngemplak B', coords: [-7.718, 110.435] },
];

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
    Math.cos(phi1) * Math.cos(phi2) *
    Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
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
          console.log('Lokasi pengguna:', coords);
          onLocationObtained(coords);
          map.setView(coords, 16);
        },
        (error) => {
          console.error('Error mendapatkan lokasi:', error);
        }
      );
    } else {
      console.error('Browser tidak mendukung geolocation.');
    }
  }, [map, onLocationObtained]);

  return null;
}

const ClientMap = () => {
  const [userPosition, setUserPosition] = useState(null);
  let nearestTPS = null;
  let minDistance = Infinity;

  if (userPosition) {
    trashLocations.forEach((trash) => {
      const distance = haversineDistance(userPosition, trash.coords);
      if (distance < minDistance) {
        minDistance = distance;
        nearestTPS = { ...trash, distance };
      }
    });
    console.log('TPS terdekat:', nearestTPS);
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer center={[-7.807, 110.402]} zoom={16} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker onLocationObtained={setUserPosition} />
        {trashLocations.map((trash) => (
          <Marker key={trash.id} position={trash.coords} icon={trashIcon}>
            <Popup>{trash.name}</Popup>
          </Marker>
        ))}
        {userPosition && (
          <Marker position={userPosition} icon={userLocationIcon}>
            <Popup>Ini lokasi Anda saat ini.</Popup>
          </Marker>
        )}
      </MapContainer>
      {userPosition && nearestTPS && (
        <div className="absolute bottom-5 left-5 bg-white bg-opacity-90 p-2.5 rounded-lg shadow-md max-w-xs text-sm z-1000">
          <h4 className="m-0 mb-1 text-black font-semibold">Rekomendasi TPS</h4>
          <p className="m-0 text-black">
            {nearestTPS.name} <br />
            {Math.round(nearestTPS.distance)} m dari lokasi Anda.
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientMap;

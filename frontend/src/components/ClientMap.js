'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaMapMarkerAlt, FaTrash, FaSearch } from 'react-icons/fa';

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
  { id: 1, name: 'TPS Ngemplak A', coords: [-7.696, 110.430], types: ['organic', 'anorganic', 'b3'] },
  { id: 2, name: 'TPS Ngemplak B', coords: [-7.718, 110.435], types: ['organic', 'anorganic'] },
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
          console.log('User location:', coords);
          onLocationObtained(coords);
          map.setView(coords, 16);
        },
        (error) => {
          console.error('Error obtaining location:', error);
        }
      );
    } else {
      console.error('Geolocation not supported by this browser.');
    }
  }, [map, onLocationObtained]);

  return null;
}

const ClientMap = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [wasteType, setWasteType] = useState('');
  const [filteredTPS, setFilteredTPS] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const typeQuery = wasteType.toLowerCase().trim();
    const results = trashLocations.filter(trash => 
      trash.types.some(t => t.toLowerCase() === typeQuery)
    );
    setFilteredTPS(results);
    setSearched(true);
  };

  let nearestTPS = null;
  let minDistance = Infinity;
  if (userPosition && filteredTPS.length > 0) {
    filteredTPS.forEach((trash) => {
      const distance = haversineDistance(userPosition, trash.coords);
      if (distance < minDistance) {
        minDistance = distance;
        nearestTPS = { ...trash, distance };
      }
    });
    console.log('Nearest TPS based on waste type:', nearestTPS);
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-5 left-5 z-1000 bg-white p-3 rounded shadow-md">
        <h4 className="font-semibold mb-2 text-black">Cari Jenis Sampah</h4>
        <div className="flex">
          <input 
            type="text" 
            placeholder="Masukkan jenis sampah" 
            value={wasteType} 
            onChange={(e) => setWasteType(e.target.value)} 
            className="border p-1 rounded-l text-black"
          />
          <button 
            onClick={handleSearch} 
            className="bg-blue-500 text-white px-3 rounded-r hover:bg-blue-600 cursor-pointer"
          >
            <FaSearch />
          </button>
        </div>
        {searched && (
          <div className="mt-3">
            <h5 className="font-semibold text-black">TPS yang tersedia:</h5>
            {filteredTPS.length > 0 ? (
              <ul className="list-disc list-inside text-black">
                {filteredTPS.map(tps => (
                  <li key={tps.id}>{tps.name}</li>
                ))}
              </ul>
            ) : (
              <p className='text-black'>Tidak ada TPS yang mendukung jenis sampah ini.</p>
            )}
          </div>
        )}
      </div>
      <MapContainer center={[-7.807, 110.402]} zoom={16} className="w-full h-full" zoomControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker onLocationObtained={setUserPosition} />
        {trashLocations.map((trash) => (
          <Marker key={trash.id} position={trash.coords} icon={trashIcon}>
            <Popup>
              <span className='font-bold'>{trash.name}</span> <br /> Jenis: {trash.types.join(', ')}
            </Popup>
          </Marker>
        ))}
        {userPosition && (
          <Marker position={userPosition} icon={userLocationIcon}>
            <Popup>Ini lokasi Anda saat ini.</Popup>
          </Marker>
        )}
      </MapContainer>
      {userPosition && nearestTPS && (
        <div className="absolute bottom-5 left-5 bg-white bg-opacity-90 p-3 rounded shadow-md max-w-xs text-sm z-1000">
          <h4 className="font-semibold mb-1 text-black">Rekomendasi TPS</h4>
          <p className='text-black'>
            {nearestTPS.name} <br />
            {Math.round(nearestTPS.distance)} m dari lokasi Anda.
          </p>
          <button
            className="bg-blue-500 text-white mt-2 px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
            onClick={() => alert('Sampah berhasil dibuang! Silakan Cek Histori')}
          >
            Buang sampah di sini
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientMap;

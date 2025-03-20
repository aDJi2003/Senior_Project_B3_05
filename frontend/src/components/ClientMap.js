'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaMapMarkerAlt, FaTrash } from 'react-icons/fa';

// Membuat custom icon untuk lokasi pengguna menggunakan react icon
const userLocationIcon = L.divIcon({
  html: renderToStaticMarkup(<FaMapMarkerAlt size={30} color="blue" />),
  className: '',
  iconSize: [30, 30],
});

// Membuat custom icon untuk tempat pembuangan sampah (TPS)
const trashIcon = L.divIcon({
  html: renderToStaticMarkup(<FaTrash size={30} color="green" />),
  className: '',
  iconSize: [30, 30],
});

// Data lokasi TPS di Ngemplak, Sleman, Yogyakarta (koordinat perkiraan)
const trashLocations = [
  { id: 1, name: 'TPS Ngemplak A', coords: [-7.696, 110.430] },
  { id: 2, name: 'TPS Ngemplak B', coords: [-7.718, 110.435] },
];

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const coords = [latitude, longitude];
          setPosition(coords);
          map.setView(coords, 16);
        },
        (error) => {
          console.error('Error mendapatkan lokasi:', error);
        }
      );
    } else {
      console.error('Browser tidak mendukung geolocation.');
    }
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={userLocationIcon}>
      <Popup>Ini lokasi Anda saat ini.</Popup>
    </Marker>
  );
}

const ClientMap = () => (
  <MapContainer center={[-7.807, 110.402]} zoom={16} className="w-full h-full">
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    {/* Marker untuk lokasi pengguna */}
    <LocationMarker />
    {/* Marker untuk TPS */}
    {trashLocations.map((trash) => (
      <Marker key={trash.id} position={trash.coords} icon={trashIcon}>
        <Popup>{trash.name}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default ClientMap;

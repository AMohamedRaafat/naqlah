'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  center: [number, number];
  onLocationSelect: (lat: number, lng: number, address: string, city: string) => void;
  searchQuery?: string;
}

function MapEvents({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number, address: string, city: string) => void;
}) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;

      // Reverse geocoding using Nominatim (free OpenStreetMap service)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`,
          {
            headers: {
              'User-Agent': 'Naqlah-Moving-App/1.0',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        const city = data.address?.city || data.address?.town || data.address?.state || 'الرياض';

        onLocationSelect(lat, lng, address, city);
      } catch (error) {
        console.error('Geocoding error:', error);
        // Fallback: use coordinates as address
        const fallbackAddress = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        onLocationSelect(lat, lng, fallbackAddress, 'الرياض');
      }
    },
  });
  return null;
}

function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function MapComponent({ center, onLocationSelect, searchQuery }: MapComponentProps) {
  const [position, setPosition] = useState<[number, number]>(center);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setPosition(center);
  }, [center]);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 2) {
      // Nominatim geocoding search
      const searchLocation = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              searchQuery
            )},Saudi Arabia&countrycodes=sa&limit=1&accept-language=ar`,
            {
              headers: {
                'User-Agent': 'Naqlah-Moving-App/1.0',
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data && data.length > 0) {
            const { lat, lon, display_name } = data[0];
            const newLat = parseFloat(lat);
            const newLng = parseFloat(lon);
            const city =
              data[0].address?.city || data[0].address?.town || data[0].address?.state || 'الرياض';

            setPosition([newLat, newLng]);
            onLocationSelect(newLat, newLng, display_name, city);
          }
        } catch (error) {
          console.error('Search error:', error);
        }
      };

      const debounce = setTimeout(searchLocation, 800);
      return () => clearTimeout(debounce);
    }
  }, [searchQuery, onLocationSelect]);

  if (!isMounted) {
    return <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>;
  }

  return (
    <MapContainer center={position} zoom={13} className="w-full h-96" style={{ zIndex: 0 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
      <MapEvents onLocationSelect={onLocationSelect} />
      <ChangeMapView center={position} />
    </MapContainer>
  );
}

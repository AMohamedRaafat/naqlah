'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Custom marker icons
const pickupIcon = new L.Icon({
  iconUrl: '/assets/steps/map-marker.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const destinationIcon = new L.Icon({
  iconUrl: '/assets/steps/map-marker.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface RouteMapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pickupLocation: { lat: number; lng: number; address: string };
  destinationLocation: { lat: number; lng: number; address: string };
}

function MapBounds({ 
  pickupLocation, 
  destinationLocation 
}: { 
  pickupLocation: [number, number]; 
  destinationLocation: [number, number]; 
}) {
  const map = useMap();
  
  useEffect(() => {
    const bounds = L.latLngBounds([pickupLocation, destinationLocation]);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, pickupLocation, destinationLocation]);
  
  return null;
}

export default function RouteMapModal({
  open,
  onOpenChange,
  pickupLocation,
  destinationLocation,
}: RouteMapModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const pickupPos: [number, number] = [pickupLocation.lat, pickupLocation.lng];
  const destinationPos: [number, number] = [destinationLocation.lat, destinationLocation.lng];
  
  // Calculate center point
  const center: [number, number] = [
    (pickupLocation.lat + destinationLocation.lat) / 2,
    (pickupLocation.lng + destinationLocation.lng) / 2,
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] sm:max-w-4xl max-h-[90vh] rounded-xl p-0 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute left-4 top-4 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Map Only */}
        <div className="w-full h-[500px] sm:h-[600px]">
          {isMounted ? (
            <MapContainer
              center={center}
              zoom={13}
              className="w-full h-full rounded-xl"
              style={{ zIndex: 0 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Pickup Marker */}
              <Marker position={pickupPos} icon={pickupIcon} />
              
              {/* Destination Marker */}
              <Marker position={destinationPos} icon={destinationIcon} />
              
              {/* Route Line */}
              <Polyline
                positions={[pickupPos, destinationPos]}
                color="#00B8A9"
                weight={4}
                opacity={0.7}
                dashArray="10, 10"
              />
              
              {/* Auto-fit bounds */}
              <MapBounds 
                pickupLocation={pickupPos} 
                destinationLocation={destinationPos} 
              />
            </MapContainer>
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-xl">
              <p className="text-gray-500">Loading map...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


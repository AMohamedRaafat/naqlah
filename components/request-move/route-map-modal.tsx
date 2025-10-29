'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Create custom marker using the SVG icon
const markerIcon = new L.Icon({
  iconUrl: '/assets/steps/map-marker.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

interface RouteMapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pickupLocation: { lat: number; lng: number; address: string };
  destinationLocation: { lat: number; lng: number; address: string };
}

function MapBounds({
  pickupLocation,
  destinationLocation,
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
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);

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

  // Fetch route from OSRM API
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${pickupLocation.lng},${pickupLocation.lat};${destinationLocation.lng},${destinationLocation.lat}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        
        if (data.routes && data.routes.length > 0) {
          const coordinates = data.routes[0].geometry.coordinates.map(
            (coord: [number, number]) => [coord[1], coord[0]] as [number, number]
          );
          setRouteCoordinates(coordinates);
        }
      } catch (error) {
        console.error('Error fetching route:', error);
        // Fallback to straight line if routing fails
        setRouteCoordinates([pickupPos, destinationPos]);
      }
    };

    if (open && isMounted) {
      fetchRoute();
    }
  }, [open, isMounted, pickupLocation, destinationLocation, pickupPos, destinationPos]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] sm:max-w-4xl max-h-[90vh] rounded-xl p-0 overflow-hidden">
        <style>{`
          .custom-tooltip {
            background-color: white !important;
            border: none !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
            border-radius: 8px !important;
            padding: 6px 12px !important;
          }
          .custom-tooltip:before {
            display: none !important;
          }
        `}</style>
        
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
              <Marker position={pickupPos} icon={markerIcon}>
                <Tooltip permanent direction="top" offset={[0, -45]} className="custom-tooltip">
                  <div className="text-center">
                    <p className="font-bold text-[#00B8A9] text-sm">الموقع 1</p>
                  </div>
                </Tooltip>
              </Marker>

              {/* Destination Marker */}
              <Marker position={destinationPos} icon={markerIcon}>
                <Tooltip permanent direction="top" offset={[0, -45]} className="custom-tooltip">
                  <div className="text-center">
                    <p className="font-bold text-[#00B8A9] text-sm">الموقع 2</p>
                  </div>
                </Tooltip>
              </Marker>

              {/* Route Line - Real Road Route */}
              {routeCoordinates.length > 0 && (
                <Polyline
                  positions={routeCoordinates}
                  color="#808080"
                  weight={5}
                  opacity={0.8}
                />
              )}

              {/* Auto-fit bounds */}
              <MapBounds pickupLocation={pickupPos} destinationLocation={destinationPos} />
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

import L from "leaflet";
import { useMap } from "react-leaflet";
import { WebMarkerSingleIconComponent } from "./map_view/WebMarkerSingleIconComponent";
import { useEffect } from "react";

interface BouncingMarkerProps {
  position: [number, number];
  isSelected: boolean;
}

export const BouncingMarker = ({
  position,
  isSelected,
}: BouncingMarkerProps) => {
  const map = useMap();

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    let marker: L.Marker | null = null;

    const bounce = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const bounceHeight = Math.abs(Math.sin(progress / 200) * 0.001);

      if (marker) {
        marker.setLatLng(L.latLng(position[0] + bounceHeight, position[1]));
      }

      if (progress < 1000) {
        animationFrameId = requestAnimationFrame(bounce);
      } else {
        if (marker) {
          marker.setLatLng(L.latLng(position));
        }
      }
    };

    if (isSelected) {
      marker = L.marker(position, {
        icon: WebMarkerSingleIconComponent(),
      }).addTo(map);
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(bounce);
      }, 2000);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (marker && map.hasLayer(marker)) {
        map.removeLayer(marker);
        marker = null;
        L.marker(position, { icon: WebMarkerSingleIconComponent() }).addTo(map);
      }
    };
  }, [position, isSelected, map]);

  return null;
};

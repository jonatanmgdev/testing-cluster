"use client";
import React from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { WebMarkerSingleIconComponent } from "../components";

interface MapWrapperProps {
  latitude: number;
  longitude: number;
}

const WebAssociatedDetailsMapWrapper = ({
  latitude,
  longitude,
}: MapWrapperProps) => {
  const HandleMapClick = () => {
    useMapEvents({
      click() {
        handleDirectionsClick();
      },
    });
    return null;
  };

  const handleDirectionsClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      zoomControl={false}
      attributionControl={false}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}?language=es&region=ES"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      <Marker
        position={[latitude, longitude]}
        icon={WebMarkerSingleIconComponent()}
      />
      <HandleMapClick />
    </MapContainer>
  );
};

export default WebAssociatedDetailsMapWrapper;
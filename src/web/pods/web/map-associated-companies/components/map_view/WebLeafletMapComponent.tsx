"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { WebMapBranchesComponent } from "./WebMapBranchesComponent";
import { WebMarkerUserPositionComponent } from "./WebMarkerUserIconComponent";
import WebLeafletHorizontalListComponent from "../map_list/WebLeafletHorizontalListComponent";
import { WebUserFloatingActionCircleComponent } from "./WebUserFloatingActionCircleComponent";
import { useContext } from "react";
import { UserContext } from "@/web/core/context/user/UserContext";


const WebLeafletMapComponent: React.FC<{}> = () => {
  const { selectedMarket } = useContext(UserContext);
  return (
    <div className="w-full h-full">
      <div style={{ position: "relative" }}>
        <div className="absolute bottom-10 right-10 z-[999]">
          <WebUserFloatingActionCircleComponent />
        </div>
        <MapContainer
          center={[selectedMarket.latitude, selectedMarket.longitude]}
          zoom={selectedMarket.zoom_level}
          minZoom={3}
          maxZoom={18}
          attributionControl={false}
          style={{ width: "100%", height: "550px" }}
        >
          <TileLayer
            url="https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}?language=es&region=ES"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          <WebMarkerUserPositionComponent />
          <WebMapBranchesComponent />
        </MapContainer>
      </div>
      <div className="bg-neutral-soft p-4">
      <WebLeafletHorizontalListComponent />
      </div>
    </div>
  );
};

export default WebLeafletMapComponent;

"use client";
import { MapDataContext } from "@/web/core/context/maps/MapContext";
import { useContext, useEffect, useState } from "react";
import { WebMarkerSingleIconComponent } from "./WebMarkerSingleIconComponent";
import { WebMarkerGroupIconComponent } from "./WebMarkerGroupIconComponent";
import { Marker, useMapEvents } from "react-leaflet";
import { UserContext } from "@/web/core/context/user/UserContext";
import { LatLng } from "leaflet";
import { TypeEasFilterEnum } from "@/web/core/context/maps/enum/TypeEasFilterEnum";

export const WebMapBranchesComponent: React.FC<{}> = () => {
  const mapContext = useContext(MapDataContext);
  const { selectedMarket } = useContext(UserContext);
  const [avoidMapMove, setAvoidMapMove] = useState(false);

  if (!mapContext) throw new Error("Map context is not available");

  const {
    search,
    branches,
    category,
    clusters,
    easTypeFilterSelected,
    updateLeafletMap,
    updateClusters,
    initialClusters,
    updateHorizontalList,
    updateVerticalList,
  } = mapContext;

  const map = useMapEvents({
    moveend: () => {
      // Se actualiza los clusters cuando la animación de la cámara ha finalizado.
      updateClusters( branches, search, easTypeFilterSelected, category );
      if( easTypeFilterSelected === TypeEasFilterEnum.highestDiscount && !avoidMapMove ){
        updateHorizontalList( branches, search, easTypeFilterSelected, category );
        updateVerticalList( branches, search, easTypeFilterSelected, category );
      } else {
        setAvoidMapMove(false);
      }
    }
  });

  useEffect(() => { 
    updateClusters( branches, search, easTypeFilterSelected, category );
    updateVerticalList( branches, search, easTypeFilterSelected, category );
    updateHorizontalList( branches, search, easTypeFilterSelected, category );
  }, [easTypeFilterSelected, search, category]);

  // Use Effect initial only
  useEffect(() => {
    updateLeafletMap(map);
    initialClusters(
      selectedMarket.zoom_level,
      new LatLng(selectedMarket.latitude, selectedMarket.longitude )
    );
  }, []);

  return (
    <>
      {clusters.map((cluster, index) => {
        const totalLength = cluster.branches.length;
        const isSingleMarker = totalLength === 1;
        return (
          <Marker
            position={cluster.center}
            key={index}
            ref={(ref) => {
              ref?.addEventListener("click", () => {
                
                if( easTypeFilterSelected === TypeEasFilterEnum.highestDiscount ){
                  updateVerticalList(cluster.branches, search, easTypeFilterSelected, category);
                  updateHorizontalList( cluster.branches, search, easTypeFilterSelected, category );
                  setAvoidMapMove(true);
                } else {
                  updateHorizontalList( cluster.branches, search, easTypeFilterSelected, category );
                }
                if (map.getZoom() + 3 > 18) {
                  map.flyTo(cluster.center, 18, { duration: 0.5 });
                  return;
                }
                map.flyTo(cluster.center, map.getZoom() + 3, {
                  duration: 0.2,
                });
              });
            }}
            icon={
              isSingleMarker
                ? WebMarkerSingleIconComponent(cluster.branches[0].is_novelty)
                : WebMarkerGroupIconComponent(totalLength)
            }
          ></Marker>
        );
      })}
    </>
  );
};
"use client";
import { MapDataContext } from "@/web/core/context/maps/MapContext";
import { useContext, useEffect, useState } from "react";
import { WebMarkerSingleIconComponent } from "./WebMarkerSingleIconComponent";
import { WebMarkerGroupIconComponent } from "./WebMarkerGroupIconComponent";
import { Marker, useMapEvents } from "react-leaflet";
import { UserContext } from "@/web/core/context/user/UserContext";
import { LatLng } from "leaflet";
import { TypeEasFilterEnum } from "@/web/core/context/maps/enum/TypeEasFilterEnum";
import { WebMapBranchModel } from "../../models";

export const WebMapBranchesComponent: React.FC<{}> = () => {
  const mapContext = useContext(MapDataContext);
  const { selectedMarket, userLatLng } = useContext(UserContext);
  const [avoidMapMove, setAvoidMapMove] = useState(false);


  if (!mapContext) throw new Error("Map context is not available");

  const {
    search,
    branches,
    noveltyBranches,
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
      let branchesFiltered: WebMapBranchModel[] = [];
      branchesFiltered = easTypeFilterSelected === TypeEasFilterEnum.novelty ? noveltyBranches : branches;
      updateClusters( branchesFiltered, search, easTypeFilterSelected, userLatLng, category );
      if( easTypeFilterSelected === TypeEasFilterEnum.highestDiscount && !avoidMapMove ){
        updateHorizontalList( branchesFiltered, search, easTypeFilterSelected, userLatLng, category );
        updateVerticalList( branchesFiltered, search, easTypeFilterSelected, userLatLng, category );
      } else {
        setAvoidMapMove(false);
      }
    }
  });

  useEffect(() => { 
    let branchesFiltered: WebMapBranchModel[] = [];
    branchesFiltered = easTypeFilterSelected === TypeEasFilterEnum.novelty ? noveltyBranches : branches;
    updateClusters( branchesFiltered, search, easTypeFilterSelected, userLatLng, category );
    updateVerticalList( branchesFiltered, search, easTypeFilterSelected, userLatLng, category );
    updateHorizontalList( branchesFiltered, search, easTypeFilterSelected, userLatLng, category );

    // Animación de la cámara cuando se introduce un código postal
    if( search.length === 5 && Number.isInteger(parseInt(search)) ) {
      let branchFound = branchesFiltered.find( branch => branch.postal_code === search );
      if( !branchFound ) return;
      map.flyTo( new LatLng(branchFound.latitude, branchFound.longitude ), 13, {duration: 1.5} );
    }
  }, [easTypeFilterSelected, search, category, userLatLng]);

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
                  updateVerticalList(cluster.branches, search, easTypeFilterSelected, userLatLng, category);
                  updateHorizontalList( cluster.branches, search, easTypeFilterSelected, userLatLng, category );
                  setAvoidMapMove(true);
                } else {
                  updateHorizontalList( cluster.branches, search, easTypeFilterSelected, userLatLng, category );
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
"use client";
import { MapDataContext } from "@/web/core/context/maps/MapContext";
import { useContext, useEffect, useState } from "react";
import { WebMarkerSingleIconComponent } from "./WebMarkerSingleIconComponent";
import { WebMarkerGroupIconComponent } from "./WebMarkerGroupIconComponent";
import { Marker, useMapEvents } from "react-leaflet";
import { UserContext } from "@/web/core/context/user/UserContext";
import { LatLng } from "leaflet";
import { TypeEasFilterEnum } from "@/web/core/context/maps/enum/TypeEasFilterEnum";
import { WebMapBranchModel, WebMapClusterModel } from "../../models";


export const WebMapBranchesComponent: React.FC<{}> = () => {
  const [filtersFlag, setFiltersFlag] = useState(false);
  // Gets the map context
  const mapContext = useContext(MapDataContext);
  const { selectedMarket } = useContext(UserContext);
  if (!mapContext) throw new Error("Map context is not available");
  // Extract important variables from the map context
  const {
    search,
    branches,
    category,
    clusters,
    mapFilterList,
    updateLeafletMap,
    updateClusters,
    initialClusters,
    updateBranchesList,
    updateVerticalList,
    getNoveltyBranches,
    noveltyBranches,
  } = mapContext;
  let clusterBranches = getAllBranches(clusters);
  const [currentBranches, setCurrentBranches] = useState<WebMapBranchModel[]>(clusterBranches);

  function getAllBranches(clusters: WebMapClusterModel[]): WebMapBranchModel[] {
    return clusters.flatMap((cluster) => cluster.branches);
  }

  // Handle map move event to update marker clusters
  const map = useMapEvents({
    moveend: (event) => {
      switch (mapFilterList) {
        case TypeEasFilterEnum.novelty:
          updateClusters(noveltyBranches, search, category);
          break;
        default:
          updateClusters(branches, search, category);
          break;
      }
    },
  });

  useEffect(() => {
    if (currentBranches.length > 0 || search || category || mapFilterList) {
      console.log("ME LANZO");
      if (mapFilterList === TypeEasFilterEnum.highestDiscount) {
        updateClusters(branches, search, category);
        updateBranchesList(currentBranches, search, category);
        updateVerticalList(currentBranches, search, category);
      }
      if (mapFilterList === TypeEasFilterEnum.novelty) {
        updateClusters(branches, search, category);
        updateBranchesList(currentBranches, search, category);
        updateVerticalList(noveltyBranches, search, category);
      } else {
        updateClusters(branches, search, category);
        updateVerticalList(branches, search, category);
        if(currentBranches.length > 0){
          updateBranchesList(currentBranches, search, category);
        } else {
          updateBranchesList(branches, search, category);
        }
      }
    }
  }, [currentBranches, mapFilterList, category, search]);


  useEffect(() => {
    // Update the Leaflet map
    updateLeafletMap(map);
    // Updates bookmark clusters based on branches and search
    initialClusters(
      selectedMarket.zoom_level,
      new LatLng(selectedMarket.latitude, selectedMarket.longitude)
    );
    // Initialize vertical and horizontal list
    updateVerticalList(branches, search, category);
    updateBranchesList(branches, search, category);
    // Get novelty branches
    getNoveltyBranches();
    setFiltersFlag(true);
  }, []);

  return (
    <>
      {
        // Loop through each cluster in the cluster list
        clusters.map((cluster, index) => {
          const totalLength = cluster.branches.length;
          const isSingleMarker = totalLength === 1;
          return (
            <Marker
              position={cluster.center}
              key={index}
              ref={(ref) => {
                // Bookmark click event
                ref?.addEventListener("click", () => {
                  setCurrentBranches(cluster.branches);

                  // Check if zoom plus 3 is greater than 18
                  if (map.getZoom() + 3 > 18) {
                    // Expand the map to the maximum allowed
                    map.flyTo(cluster.center, 18, { duration: 0.5 });
                    return;
                  }

                  // Zoom the map a little more if possible
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
        })
      }
    </>
  );
};

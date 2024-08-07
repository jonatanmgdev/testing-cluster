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
  const [filterFlag, setFilterFlag] = useState(false);
  const mapContext = useContext(MapDataContext);
  const { selectedMarket } = useContext(UserContext);

  if (!mapContext) throw new Error("Map context is not available");

  const {
    search,
    branches,
    category,
    clusters,
    mapFilterList,
    updateLeafletMap,
    updateClusters,
    initialClusters,
    updateHorizontalList,
    updateVerticalList,
    getNoveltyBranches,
    noveltyBranches,
  } = mapContext;


  function getAllBranches(clusters: WebMapClusterModel[]): WebMapBranchModel[] {
    return clusters.flatMap((cluster) => cluster.branches);
  }

  const map = useMapEvents({
    moveend: () => {
      const branchesToUse = mapFilterList === TypeEasFilterEnum.novelty ? noveltyBranches : branches;
      updateClusters(branchesToUse, search, category);
    },
  });

  useEffect(() => {
    if (mapFilterList !== null && mapFilterList !== undefined && filterFlag || search || category) {
      if (mapFilterList === TypeEasFilterEnum.novelty) {
        updateClusters(noveltyBranches, search, category);
        updateVerticalList(noveltyBranches, search, category);
        updateHorizontalList(noveltyBranches, search, category);
      } else {
        const branchesToUse = mapFilterList === TypeEasFilterEnum.highestDiscount ? getAllBranches(clusters) : branches;
        updateClusters(branchesToUse, search, category);
        updateVerticalList(branchesToUse, search, category);
        updateHorizontalList(branchesToUse, search, category);
      }
    }
  }, [mapFilterList, search, category]);

  useEffect(() => {
    updateLeafletMap(map);
    initialClusters(
      selectedMarket.zoom_level,
      new LatLng(selectedMarket.latitude, selectedMarket.longitude)
    );
    updateVerticalList(branches, search, category);
    updateHorizontalList(branches, search, category);
    getNoveltyBranches();
    setFilterFlag(true);
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
                updateHorizontalList(cluster.branches, search, category);
                if (mapFilterList === TypeEasFilterEnum.highestDiscount) {
                  updateVerticalList(cluster.branches, search, category);
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
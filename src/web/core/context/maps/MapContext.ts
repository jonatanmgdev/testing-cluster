"use client";
import { WebMapBranchModel, WebMapClusterModel } from "@/web/pods/web/map-associated-companies";
import { WebMapCategoryModel } from "@/web/pods/web/map-associated-companies/models/WebMapCategoryModel";
import { WebMapMarketModel } from "@/web/pods/web/map-associated-companies/models/WebMapMarketModel";
import { LatLng, Map } from "leaflet";
import { createContext } from "react";

export interface MapContextProps {
    leafletMap?: Map;
    updateLeafletMap: ( map: Map ) => void;
    mapActiveTab: string;
    updateMapActiveTab: ( tab: string ) => void;
    clusters: WebMapClusterModel[];
    initialClusters: ( initialZoom: number, initialLatLng: LatLng ) => void;
    updateClusters: ( branches: WebMapBranchModel[], search: string, category?: WebMapCategoryModel ) => void;
    branches: WebMapBranchModel[],
    mapFilterList:number,
    updateMapFilterList: (value:number) => void,
    getNoveltyBranches: () => void,
    noveltyBranches : WebMapBranchModel[],
    verticalList: WebMapBranchModel[]
    updateVerticalList: ( branches: WebMapBranchModel[], search: string, category?: WebMapCategoryModel ) => void;
    branchesList: WebMapBranchModel[];
    updateHorizontalList: ( branches: WebMapBranchModel[], search: string, category?: WebMapCategoryModel ) => void;
    categories: WebMapCategoryModel[],
    category: WebMapCategoryModel | undefined,
    updateCategory: ( category: WebMapCategoryModel ) => void;
    search: string;
    updateSearch: ( value: string ) => void;
    markets: WebMapMarketModel[]
}
  
export const MapDataContext = createContext<MapContextProps | undefined>(undefined);
MapDataContext.displayName = "context Map";
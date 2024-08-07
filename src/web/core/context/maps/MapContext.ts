"use client";
import {
  WebMapBranchModel,
  WebMapClusterModel,
} from "@/web/pods/web/map-associated-companies";
import { WebMapCategoryModel } from "@/web/pods/web/map-associated-companies/models/WebMapCategoryModel";
import { WebMapMarketModel } from "@/web/pods/web/map-associated-companies/models/WebMapMarketModel";
import { LatLng, Map } from "leaflet";
import { createContext } from "react";
import { TypeEasFilterEnum } from "./enum/TypeEasFilterEnum";

export interface MapContextProps {
  leafletMap?: Map;
  updateLeafletMap: (map: Map) => void;

  mapActiveTab: string;
  updateMapActiveTab: (tab: string) => void;

  clusters: WebMapClusterModel[];
  initialClusters: (
    initialZoom: number,
    initialLatLng: LatLng,
  ) => void;
  updateClusters: (
    branches: WebMapBranchModel[],
    search: string,
    typeEasFilter: TypeEasFilterEnum,
    category?: WebMapCategoryModel
  ) => void;

  branches: WebMapBranchModel[];

  easTypeFilterSelected: TypeEasFilterEnum;
  updateEasTypeFilter: (value: TypeEasFilterEnum) => void;

  getNoveltyBranches: () => void;
  noveltyBranches: WebMapBranchModel[];
  verticalList: WebMapBranchModel[];

  updateVerticalList: (
    branches: WebMapBranchModel[],
    search: string,
    typeEasFilter: TypeEasFilterEnum,
    category?: WebMapCategoryModel
  ) => void;

  branchesList: WebMapBranchModel[];
  
  updateHorizontalList: (
    branches: WebMapBranchModel[],
    search: string,
    typeEasFilter: TypeEasFilterEnum,
    category?: WebMapCategoryModel
  ) => void;

  categories: WebMapCategoryModel[];
  category: WebMapCategoryModel | undefined;
  updateCategory: (category: WebMapCategoryModel) => void;
  search: string;
  updateSearch: (value: string) => void;
  markets: WebMapMarketModel[];
}

export const MapDataContext = createContext<MapContextProps | undefined>(
  undefined
);
MapDataContext.displayName = "context Map";

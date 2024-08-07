"use client";
import { ReactNode, useEffect, useState } from "react";
import { MapContextProps, MapDataContext } from "./MapContext";
import WebClusterController from "@/web/pods/web/map-associated-companies/clusters/WebClusterController";
import { LatLng, Map } from "leaflet";
import {
  WebMapBranchModel,
  WebMapCategoryModel,
  WebMapClusterModel,
  WebMapMarketModel,
} from "@/web/pods/web/map-associated-companies/models";
import { TypeEasFilterEnum } from "./enum/TypeEasFilterEnum";

/**
    @fileoverview: Provides the MapContextProvider class responsible for clustering points on a map.
    @author Domingo Montesdeoca González
*/

export const MapContextProvider: React.FC<{
  children: ReactNode;
  bra: WebMapBranchModel[];
  cat: WebMapCategoryModel[];
  mar: WebMapMarketModel[];
}> = ({ children, bra, cat, mar }) => {
  // States to store different map and app data
  const [leafletMap, setMap] = useState<Map>();
  const [mapActiveTab, setMapActiveTab] = useState<string>("map");
  const [typeEasFilter, setEasFilter] = useState<TypeEasFilterEnum>(TypeEasFilterEnum.distance);
  const [markets, setMarkets] = useState<WebMapMarketModel[]>(mar);
  const [branches, setBranches] = useState<WebMapBranchModel[]>(bra);
  const [branchesList, setBranchesList] = useState<WebMapBranchModel[]>([]);
  const [verticalList, setVerticalList] = useState<WebMapBranchModel[]>([]);
  const [noveltyBranches, setNoveltyBranches] = useState<WebMapBranchModel[]>([]);
  const [categories, setCategories] = useState<WebMapCategoryModel[]>(cat);
  const [category, setCategory] = useState<WebMapCategoryModel | undefined>();
  const [clusters, setClusters] = useState<WebMapClusterModel[]>([]);
  const [search, setSearch] = useState<string>("");

  // Function to update the Leaflet map
  const updateLeafletMap = (map: Map) => setMap(map);

  // Function to update the map active tab
  const updateMapActiveTab = (tab: string) => setMapActiveTab(tab);

  // Filter cleaning function
  const clearFilters = () => {
    setCategory(undefined);
    setBranches(bra);
    setSearch("");
  };

  const initialClusters = (initialZoom: number, initialLatLng: LatLng) => {
    const clusters = WebClusterController.clusterPoints(bra, initialZoom, initialLatLng);
    setClusters(clusters);
  };

  // Function to update marker clusters on the map
  const updateClusters = (
    branchess: WebMapBranchModel[],
    search: string,
    category?: WebMapCategoryModel
  ) => {
    const latLng = leafletMap?.getCenter() ?? new LatLng(0, 0);
    const leafletZoom = leafletMap?.getZoom() ?? 3.0;
    const founds = branchess.filter((item) => isBranchMatch(item, search, category));
    const clusters = WebClusterController.clusterPoints(founds, leafletZoom, latLng);
    setClusters(clusters);
  };


  // Function to update branches on the horizontal list
  const updateHorizontalList = (
    branches: WebMapBranchModel[],
    search: string,
    category?: WebMapCategoryModel
  ) => {
    let branchesLimit;
    const latLng = leafletMap?.getCenter() ?? new LatLng(0, 0);
    const zoom = leafletMap?.getZoom() ?? 3.0;
    const branchesNear = WebClusterController.sortBranchesFromCenterMapPoints(
      branches,
      zoom,
      latLng
    );
    switch (typeEasFilter) {
      case TypeEasFilterEnum.distance:
        branchesLimit = branchesNear.filter((item) => isBranchMatch(item, search, category));
        branchesLimit.sort((a, b) => a.distanceInMeters - b.distanceInMeters);
        break;
      case TypeEasFilterEnum.highestDiscount:
        branchesLimit = branchesNear.filter((item) => isBranchMatch(item, search, category));
        branchesLimit.sort((a, b) => a.distanceInMeters - b.distanceInMeters);
        branchesLimit.sort((a, b) => {
          const aDiscount =
            a.company.current_discount > a.company.general_discount
              ? a.company.current_discount
              : a.company.general_discount;
          const bDiscount =
            b.company.current_discount > b.company.general_discount
              ? b.company.current_discount
              : b.company.general_discount;

          const higherDiscount = bDiscount - aDiscount;

          return higherDiscount;
        });
        break;
      case TypeEasFilterEnum.AscendingOrder:
        branchesLimit = branchesNear.filter((item) => isBranchMatch(item, search, category));
        branchesLimit.sort((a, b) => {
          if (replaceVowelAccents(a.name) < replaceVowelAccents(b.name)) return -1;
          if (replaceVowelAccents(a.name) > replaceVowelAccents(b.name)) return 1;
          return 0;
        });
        break;
      case TypeEasFilterEnum.DescendingOrder:
        branchesLimit = branchesNear.filter((item) => isBranchMatch(item, search, category));
        branchesLimit.sort((a, b) => {
          if (replaceVowelAccents(a.name) > replaceVowelAccents(b.name)) return -1;
          if (replaceVowelAccents(a.name) < replaceVowelAccents(b.name)) return 1;
          return 0;
        });
        break;
      case TypeEasFilterEnum.novelty:
        branchesLimit = branchesNear.filter((item) => isBranchMatch(item, search, category));
        branchesLimit = branchesLimit.filter((item) => item.is_novelty);
        branchesLimit.sort((a, b) => a.distanceInMeters - b.distanceInMeters);
        break;
    }
    setBranchesList(branchesLimit);
  };


  const updateVerticalList = (
    branches: WebMapBranchModel[],
    search: string,
    category?: WebMapCategoryModel
  ) => {
    let branchesLimit;
    const latLng = leafletMap?.getCenter() ?? new LatLng(0, 0);
    const zoom = leafletMap?.getZoom() ?? 3.0;
    const branchesNear = WebClusterController.sortBranchesFromCenterMapPoints(
      branches,
      zoom,
      latLng
    );
    switch (typeEasFilter) {
      case TypeEasFilterEnum.distance:
        branchesLimit = branchesNear.filter((item) => isBranchMatch(item, search, category));
        branchesLimit.sort((a, b) => a.distanceInMeters - b.distanceInMeters);
        break;
      case TypeEasFilterEnum.highestDiscount:
        branchesLimit = branchesNear.filter((item) => isBranchMatch(item, search, category));
        branchesLimit.sort((a, b) => a.distanceInMeters - b.distanceInMeters);
        branchesLimit.sort((a, b) => {
          const aDiscount =
            a.company.current_discount > a.company.general_discount
              ? a.company.current_discount
              : a.company.general_discount;
          const bDiscount =
            b.company.current_discount > b.company.general_discount
              ? b.company.current_discount
              : b.company.general_discount;

          const higherDiscount = bDiscount - aDiscount;

          return higherDiscount;
        });
        break;
      case TypeEasFilterEnum.AscendingOrder:
        branchesLimit = branchesNear.filter((item) => isBranchMatch(item, search, category));
        branchesLimit.sort((a, b) => {
          if (replaceVowelAccents(a.name) < replaceVowelAccents(b.name)) return -1;
          if (replaceVowelAccents(a.name) > replaceVowelAccents(b.name)) return 1;
          return 0;
        });
        break;
      case TypeEasFilterEnum.DescendingOrder:
        branchesLimit = branchesNear.filter((item) => isBranchMatch(item, search, category));
        branchesLimit.sort((a, b) => {
          if (replaceVowelAccents(a.name) > replaceVowelAccents(b.name)) return -1;
          if (replaceVowelAccents(a.name) < replaceVowelAccents(b.name)) return 1;
          return 0;
        });
        break;
      case TypeEasFilterEnum.novelty:
        branchesLimit = noveltyBranches.filter((item) => isBranchMatch(item, search, category));
        branchesLimit = branchesLimit.filter((item) => item.is_novelty);
        branchesLimit.sort((a, b) => a.distanceInMeters - b.distanceInMeters);
        break;
    }
    setVerticalList(branchesLimit);
  };

  // Function to filter branches on the Map based on isNovelty Filter
  const getNoveltyBranches = () => {
    let noveltyBranches = branches ?? [];
    noveltyBranches = branches.filter((item) => isBranchMatch(item, search, category));
    noveltyBranches = branches.filter((item) => item.is_novelty);
    setNoveltyBranches(noveltyBranches);
  }

  // Function to update the selected category
  // If it is the same category it is undefined so that it eliminates the category filter.
  const updateCategory = (cat: WebMapCategoryModel) => {
    const categorySelected = category?.id === cat.id ? undefined : cat;
    setCategory(categorySelected);
  };

  // Function to replace vowels with accents in a text
  function replaceVowelAccents(str: string): string {
    return str
      .toLowerCase()
      .replace(/á/g, "a")
      .replace(/é/g, "e")
      .replace(/í/g, "i")
      .replace(/ó/g, "o")
      .replace(/ú/g, "u");
  }

  // Function to determine if a branch matches the search and category
  const isBranchMatch = (
    branch: WebMapBranchModel,
    search: string,
    category?: WebMapCategoryModel
  ): boolean => {
    const normalizedSearch = replaceVowelAccents(search);
    let branchContains = false;

    // Selected category and no search exists
    if (category !== undefined && search === "") {
      return branch.company.category_id === category.id;
    }

    // There is a search, we analyze what matches exist.
    if (replaceVowelAccents(branch.company.name).includes(normalizedSearch)) {
      branchContains = true;
    } else if (
      branch.company.about &&
      replaceVowelAccents(branch.company.about).includes(normalizedSearch)
    ) {
      branchContains = true;
    } else if (replaceVowelAccents(branch.company.category_name).includes(normalizedSearch)) {
      branchContains = true;
    } else if (replaceVowelAccents(branch.locality).includes(normalizedSearch)) {
      branchContains = true;
    } else if (replaceVowelAccents(branch.province).includes(normalizedSearch)) {
      branchContains = true;
    } else if (
      normalizedSearch.length == 5 &&
      replaceVowelAccents(branch.postal_code).includes(normalizedSearch)
    ) {
      branchContains = true;
    }

    // If it has found a match with search, it checks if the selected category exists.
    if (branchContains && category != undefined) {
      return branch.company.category_id === category.id;
    }
    return branchContains;
  };

  // Function to update search string
  const updateSearch = (value: string) => {
    const valueStr = value.trim().toLowerCase();
    setSearch(valueStr);
  };

  const updateMapFilterList = (value: number) => {
    setEasFilter(value);
  };

  // Map context value passed to child components
  const contextValue: MapContextProps = {
    leafletMap,
    mapFilterList: typeEasFilter,
    updateMapFilterList,
    updateLeafletMap,
    mapActiveTab,
    updateMapActiveTab,
    branchesList: branchesList,
    updateHorizontalList: updateHorizontalList,
    updateVerticalList: updateVerticalList,
    verticalList: verticalList,
    getNoveltyBranches: getNoveltyBranches,
    noveltyBranches: noveltyBranches,
    branches,
    clusters,
    initialClusters,
    updateClusters,
    categories,
    updateCategory,
    search,
    updateSearch,
    category,
    markets,
  };

  return <MapDataContext.Provider value={contextValue}>{children}</MapDataContext.Provider>;
};

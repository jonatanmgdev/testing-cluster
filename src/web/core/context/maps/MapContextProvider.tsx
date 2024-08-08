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
  const [typeEasFilter, setTypeEasFilter] = useState<TypeEasFilterEnum>(TypeEasFilterEnum.distance);
  const [markets, setMarkets] = useState<WebMapMarketModel[]>(mar);
  const [branches, setBranches] = useState<WebMapBranchModel[]>(bra);
  const [horizontalList, setHorizontalList] = useState<WebMapBranchModel[]>([]);
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

  const initialClusters = (
    initialZoom: number, 
    initialLatLng: LatLng,
  ) => {
    const clusters = WebClusterController.clusterPoints(bra, initialZoom, initialLatLng);
    setClusters(clusters);
    getNoveltyBranches();
  };

  // Function to update marker clusters on the map
  const updateClusters = (
    branchess: WebMapBranchModel[],
    searchBranch: string,
    easFilter: TypeEasFilterEnum,
    userLatLng: LatLng,
    categorySelected?: WebMapCategoryModel,
  ) => {;
    const latLng = leafletMap?.getCenter() ?? new LatLng(0, 0);
    const leafletZoom = leafletMap?.getZoom() ?? 3.0;
    let branchesFiltered = checkEasFilterType( branchess, searchBranch, easFilter, userLatLng, categorySelected );
    const clusters = WebClusterController.clusterPoints(branchesFiltered, leafletZoom, latLng);
    setClusters(clusters);
  };


  function checkEasFilterType(
    branchess: WebMapBranchModel[],
    searchBranch: string,
    easFilter: TypeEasFilterEnum,
    userLatLng: LatLng,
    categorySelected?: WebMapCategoryModel,
  ) : WebMapBranchModel[] {   
    switch( easFilter ) {
      case TypeEasFilterEnum.distance:
        return branchesFilterDistance( branchess, searchBranch, userLatLng, categorySelected );
      case TypeEasFilterEnum.highestDiscount:
        return branchesFilterHighestDiscount( branchess, searchBranch, categorySelected );
      case TypeEasFilterEnum.AscendingOrder:
        return branchesFilterAscendingOrder( branchess, searchBranch, categorySelected );
      case TypeEasFilterEnum.DescendingOrder:
        return branchesFilterDescendingOrder( branchess, searchBranch, categorySelected );
      case TypeEasFilterEnum.novelty:
        return branchesFilterNovelty(branchess, searchBranch, categorySelected);
    }
  }

  // Esta funcion solo se encarga de filtrar el listado que le pase por la distasncia mas cercana
  function branchesFilterDistance( 
    branchess: WebMapBranchModel[],
    searchBranch: string,
    userLatLng: LatLng,
    categorySelected?: WebMapCategoryModel
  ) : WebMapBranchModel[] {
    let branchesFiltered = branchess.filter((item) => isBranchMatch(item, searchBranch, categorySelected));
    branchesFiltered = sortBranchesFromDistance(branchesFiltered, userLatLng);
    return branchesFiltered;
  }

  function sortBranchesFromDistance(
    branchess: WebMapBranchModel[],
    userLatLng: LatLng
  ) : WebMapBranchModel[] {
    for( const branch of branchess ) {
      const branchLatLng = new LatLng(branch.latitude, branch.longitude);
      branch.distanceInMeters = WebClusterController.calculateDistance(userLatLng, branchLatLng);
    }
    branchess.sort((a, b) => a.distanceInMeters - b.distanceInMeters);
    return branchess;
  }

  // Esta funcion solo se encarga de filtrar el listado de branches por el mayor descuento
  function branchesFilterHighestDiscount( 
    branchess: WebMapBranchModel[],
    searchBranch: string,
    categorySelected?: WebMapCategoryModel
  ) : WebMapBranchModel[] {
    let branchesFiltered = branchess.filter((item) => isBranchMatch(item, searchBranch, categorySelected));
    branchesFiltered.sort((a, b) => a.distanceInMeters - b.distanceInMeters);
    branchesFiltered.sort((a, b) => {
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
    return branchesFiltered;
  }

  // Esta funcion solo se encarga de filtrar el listado por alfabetico ascedente
  function branchesFilterAscendingOrder( 
    branchess: WebMapBranchModel[],
    searchBranch: string,
    categorySelected?: WebMapCategoryModel
  ) : WebMapBranchModel[] {
    let branchesFiltered = branchess.filter((item) => isBranchMatch(item, searchBranch, categorySelected));
    branchesFiltered.sort((a, b) => {
      if (replaceVowelAccents(a.name) < replaceVowelAccents(b.name)) return -1;
      if (replaceVowelAccents(a.name) > replaceVowelAccents(b.name)) return 1;  
      return 0; 
    });
  
    return branchesFiltered;
  }
  

  // Esta funcón solo se encarga de filtrar el listgado por albaetico descendente
  function branchesFilterDescendingOrder( 
    branchess: WebMapBranchModel[],
    searchBranch: string,
    categorySelected?: WebMapCategoryModel
  ) : WebMapBranchModel[] {
    let branchesFiltered = branchess.filter((item) => isBranchMatch(item, searchBranch, categorySelected));
    branchesFiltered.sort((a, b) => {
      if (replaceVowelAccents(a.name) > replaceVowelAccents(b.name)) return -1;
      if (replaceVowelAccents(a.name) < replaceVowelAccents(b.name)) return 1;
      return 0;
    });
    return branchesFiltered;
  }

  // Esta funcion solo se encarga de filtrar solo las novelty
  function branchesFilterNovelty(
    branchess: WebMapBranchModel[],
    searchBranch: string,
    categorySelected?: WebMapCategoryModel
  ) : WebMapBranchModel[] {
    let branchesFiltered = branchess.filter((item) => isBranchMatch(item, searchBranch, categorySelected));
    branchesFiltered.sort((a, b) => a.distanceInMeters - b.distanceInMeters);
    return branchesFiltered;
  }

  


  // Function to update branches on the horizontal list
  const updateHorizontalList = (
    branchess: WebMapBranchModel[],
    searchBranch: string,
    easFilter: TypeEasFilterEnum,
    userLatLng: LatLng,
    categorySelected?: WebMapCategoryModel
  ) => {
    let branchesFiltered: WebMapBranchModel[] = [];    
    if( easFilter === TypeEasFilterEnum.highestDiscount ){
      const latLng = leafletMap?.getCenter() ?? new LatLng(0, 0);
      const zoom = leafletMap?.getZoom() ?? 3.0;
      branchesFiltered = WebClusterController.sortBranchesFromCenterMapPoints(
        branchess,
        zoom,
        latLng
      );
      branchesFiltered = checkEasFilterType( branchesFiltered, searchBranch, easFilter,userLatLng, categorySelected );
    } else {
      branchesFiltered = checkEasFilterType( branchess, searchBranch, easFilter,userLatLng, categorySelected );
    }
    setHorizontalList(branchesFiltered);
  };


  const updateVerticalList = (
    branchess: WebMapBranchModel[],
    searchBranch: string,
    easFilter: TypeEasFilterEnum,
    userLatLng: LatLng,
    categorySelected?: WebMapCategoryModel,
  ) => {
    let branchesFiltered: WebMapBranchModel[] = [];
    if( easFilter === TypeEasFilterEnum.highestDiscount ){
      const latLng = leafletMap?.getCenter() ?? new LatLng(0, 0);
      const zoom = leafletMap?.getZoom() ?? 3.0;
      branchesFiltered = WebClusterController.sortBranchesFromCenterMapPoints(
        branchess,
        zoom,
        latLng
      );
      branchesFiltered = checkEasFilterType( branchesFiltered, searchBranch, easFilter,userLatLng, categorySelected );
    } else {
      branchesFiltered = checkEasFilterType( branchess, searchBranch, easFilter,userLatLng, categorySelected );
    }

    setVerticalList(branchesFiltered);
  };

  // This function return novelty branches
  function getNoveltyBranches() {
    let noveltyBranches = branches.filter((item) => item.is_novelty);
    setNoveltyBranches( noveltyBranches );
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
    searchBranch: string,
    categorySelected?: WebMapCategoryModel
  ): boolean => {
    const normalizedSearch = replaceVowelAccents(searchBranch);
    let branchContains = false;

    // Selected category and no search exists
    if (categorySelected !== undefined && searchBranch === "") {
      return branch.company.category_id === categorySelected.id;
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
    if (branchContains && categorySelected != undefined) {
      return branch.company.category_id === categorySelected.id;
    }
    return branchContains;
  };

  // Function to update search string
  const updateSearch = (value: string) => {
    const valueStr = value.trim().toLowerCase();
    setSearch(valueStr);
  };

  const updateEasTypeFilter = (value: number) => {
    setTypeEasFilter(value);
  };

  // Map context value passed to child components
  const contextValue: MapContextProps = {
    leafletMap,
    easTypeFilterSelected: typeEasFilter,
    updateEasTypeFilter,
    updateLeafletMap,
    mapActiveTab,
    updateMapActiveTab,
    horizontalList: horizontalList,
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
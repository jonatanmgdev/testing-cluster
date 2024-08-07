"use client";
import { LatLng } from "leaflet";
import { WebMapBranchModel } from "./WebMapBranchModel";

export interface WebMapClusterModel {
    branches: WebMapBranchModel[];
    center: LatLng;
}
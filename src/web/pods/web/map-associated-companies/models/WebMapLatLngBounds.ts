"use client";
import { LatLng } from "leaflet";

export class WebMapLatLngBounds {
    constructor(public southwest: LatLng, public northeast: LatLng) { }
    contains(point: LatLng): boolean {
        const { lat: lat, lng: lon } = point;
        const { lat: latMin, lng: lonMin } = this.southwest;
        const { lat: latMax, lng: lonMax } = this.northeast;
        return lat >= latMin && lat <= latMax && lon >= lonMin && lon <= lonMax;
    }
}
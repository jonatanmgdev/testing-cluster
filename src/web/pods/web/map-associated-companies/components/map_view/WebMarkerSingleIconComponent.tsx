"use client";
import { Icon } from "leaflet";

export function WebMarkerSingleIconComponent(is_novelty?: boolean) {
 
    return (
        is_novelty ?
        new Icon({
            iconUrl: '/assets/common/icons/map-marker-star.svg',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        }) : new Icon({
            iconUrl: '/assets/common/icons/Map-marker-icon.svg',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        })
    );
}
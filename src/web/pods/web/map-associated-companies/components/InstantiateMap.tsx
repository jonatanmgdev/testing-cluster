"use client"
import { useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import WebClusterController from "../clusters/WebClusterController";

export const InstantiateMap = ({ branches }: any) => {

    // Handle map move event to update marker clusters
    const map = useMapEvents({});


    useEffect(() => {
        const averageLatLng = WebClusterController.calculateAverage(branches);
        const zoomLevelFromDistance = WebClusterController.calculateZoomLevel(averageLatLng, branches[0]);        
        map.flyTo(averageLatLng, zoomLevelFromDistance);
      }, []);

    return null;
  
}
'use client';
import { MapDataContext } from '@/web/core/context/maps/MapContext';
import { UserContext } from '@/web/core/context/user/UserContext';
import L, { ErrorEvent, LatLng, LeafletEvent, LocationEvent, Map } from 'leaflet';
import { useContext, useEffect, useRef, useState } from 'react';

export const WebMarkerUserPositionComponent = () => {
    const mapContext = useContext(MapDataContext);
    const { setUserLatLng } = useContext(UserContext);
    if (!mapContext) throw new Error('Map context is not available');

    const { leafletMap } = mapContext;
    const [ userPosition, setUserPosition] = useState<LatLng>();

    const [ currentZoom, setCurrentZoom ] = useState<number>();
    const markerRef = useRef<L.Marker>(); 

    function calculateSizeCircleUserPositionFromZoom(zoom: number): number {
        const sizeCircle: { [key: number]: number } = {
            2.0: 10.0,
            3.0: 10.0,
            4.0: 10.0,
            5.0: 10.0,
            6.0: 10.0,
            7.0: 10.0,
            8.0: 10.0,
            9.0: 10.0,
            10.0: 13.0,
            11.0: 15.0,
            12.0: 15.0,
            13.0: 15.0,
            14.0: 15.0,
            15.0: 15.0,
            16.0: 15.0,
            17.0: 18.0,
            18.0: 20.0,
        };
    
        return sizeCircle[zoom] || 10.0; // Default value if zoom is not defined
    }

    const createCustomIcon = ( zoom: number ) => {
        const valueFromZoom = calculateSizeCircleUserPositionFromZoom( zoom );

        return L.icon({
            iconUrl: 'https://i0.wp.com/whateverbrightthings.com/wp-content/uploads/2020/05/Dot-Icon-Blue.png?ssl=1',
            iconSize: [valueFromZoom, valueFromZoom],
            iconAnchor: [valueFromZoom / 2, valueFromZoom],
        });
    };

    useEffect(() => {
        if( leafletMap instanceof Map ) {
            leafletMap?.locate({ setView: false, watch: false, enableHighAccuracy: true });
            leafletMap?.on('locationfound', onLocationFound);
            leafletMap?.on('locationerror', onLocationError);
            leafletMap?.on('zoomend', onZoomEnd);
                        
            /// Dispose
            return () => {
                leafletMap?.off('locationfound', onLocationFound);
                leafletMap?.off('locationerror', onLocationError);
                leafletMap?.off('zoomend', onZoomEnd);
            };
        }
    }, [leafletMap]);

    const onLocationFound = ( event: LocationEvent ) => {
        const { lat, lng } = event.latlng;
        setUserPosition(new LatLng(lat, lng));
        setUserLatLng(new LatLng(lat, lng));
    };

    const onLocationError = ( error: ErrorEvent) => {
        // console.error( error );
    };

    const onZoomEnd = ( event: LeafletEvent ) => {
        const zoom = leafletMap!.getZoom();
        setCurrentZoom( zoom );
    };

    useEffect(() => {
        if( currentZoom !== undefined && userPosition !== undefined && leafletMap instanceof Map ){
            let positionMarker = new LatLng(27.981926, -15.378110);
            if( currentZoom !== 3 ){
                positionMarker = userPosition!;                
            }

            const icon = createCustomIcon( currentZoom! );
            if (!markerRef.current) {
                // If the marker does not exist, create it and add it to the map
                const marker = L.marker(positionMarker, { icon });
                marker.addTo(leafletMap!);
                markerRef.current = marker; // Save the reference to the bookmark
            } else {
                // If the marker already exists, update its position and appearance
                markerRef.current.setLatLng(positionMarker);
                markerRef.current.setIcon(icon);
            }
        }
    }, [userPosition, currentZoom]);

    return null;
};
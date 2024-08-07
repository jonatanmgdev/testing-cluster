"use client";
import { MapDataContext } from "@/web/core/context/maps/MapContext";
import { LatLng } from "leaflet";
import Image from "next/image";
import { useContext } from "react";

export const WebUserFloatingActionCircleComponent = () => {
    const mapContext = useContext(MapDataContext);
    if (!mapContext) throw new Error('Map context is not available');
    const { leafletMap } = mapContext;

    function handleClick() {
        if (!leafletMap) return; 

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const userPosition = new LatLng(latitude, longitude);

                leafletMap.flyTo(userPosition, 14, {
                    animate: true,
                    duration: 1.5,
                });
            },
            (error) => {
                console.error('Error al obtener la geolocalización:', error);
                alert('Por favor, activa la geolocalización para una mejor experiencia de navegación.');
            }
        );
    }
    
    return (
        <div onClick={handleClick} className="relative w-10 h-10 rounded-full bg-red-500 cursor-pointer" style={{ backgroundColor: '#CF3339' }}>
            {/* Ícono de localización centrado */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Image src={'/assets/common/icons/PostitionIcon.svg'} width={20} height={20} alt="Icono de posición del usuario" />
            </div>
        </div>
    );
};

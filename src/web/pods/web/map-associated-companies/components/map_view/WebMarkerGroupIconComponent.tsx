"use client";
import L from 'leaflet';// Importa 

export const WebMarkerGroupIconComponent = (totalLength: number) => {
    return (
        L.divIcon({
            className: 'text-white', // Cambiamos el color del texto a blanco
            html: `<div style="width: 40px; height: 40px; border-radius: 50%; border: 5px solid rgba(105, 139, 190, 0.9); background-color: #0d47a1; display: flex; align-items: center; justify-content: center;">
                ${totalLength}
              </div>`
        })
    );
}
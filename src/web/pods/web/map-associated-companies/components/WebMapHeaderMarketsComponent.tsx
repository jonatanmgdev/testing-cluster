'use client'
import { MapDataContext } from "@/web/core/context/maps/MapContext";
import { LatLng } from "leaflet";
import { useContext, useEffect, useState } from "react";

export const WebMapHeaderMarketsComponent: React.FC<{}> = () => {
    const mapContext = useContext(MapDataContext);
    if (!mapContext) throw new Error('Map context is not available');
    const { markets, leafletMap } = mapContext;

    const [selectedMarketCode, setSelectedMarketCode] = useState<string | undefined>('BA');

    useEffect(() => {
        if (leafletMap && selectedMarketCode) {
            const defaultMarket = markets.find(market => market.code === selectedMarketCode);
            if (defaultMarket) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const userPosition = new LatLng(latitude, longitude);
                        leafletMap.flyTo(userPosition, defaultMarket.zoom_level + 1);
                    },
                    () => {
                        leafletMap.flyTo(new LatLng(defaultMarket.latitude, defaultMarket.longitude), defaultMarket.zoom_level + 1);
                    }
                );
            }
        }
    }, [leafletMap, selectedMarketCode, markets]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMarketCode(event.target.value);
    };

    return (
        <select onChange={handleChange} name="markets" id="markets" value={selectedMarketCode}>
        
            <option value="">Selecciona un mercado</option>
            
            {markets.map((market) => (
                <option key={market.code} value={market.code}>{market.name}</option>
            ))}
        </select>
    );
};


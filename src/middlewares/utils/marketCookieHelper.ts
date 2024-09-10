import { SwitchRoutesWithMarketParam } from "@/web/core/config";
import axios from "axios";

export async function getVentajonMarkets(uuid: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const res = await axios.get(`${apiUrl}` + "v1/associates/markets", {
      headers: {
        "session-uuid": uuid,
      },
    });
    return res.data;
  } catch (error) {
    // Si hay un error en la petición, retornamos el valor por defecto
    console.error("Error fetching Ventajon markets:", error);

    // Valor por defecto en caso de error
    return [
      {
        code: "BA",
        name: "Islas Baleares",
        latitude: 39.3809745,
        longitude: 2.7611732,
        zoom_level: 8,
        default: true,
      },
    ];
  }
}

export function isMatchingMarketParamRoute(urlPathname: string): boolean {
  // Convert the enum values to a Set with strings
  const MarketParamRoutesSet = new Set<string>(Object.values(SwitchRoutesWithMarketParam));

  // Check if the current path is in the set of market param routes
  return MarketParamRoutesSet.has(urlPathname);
}

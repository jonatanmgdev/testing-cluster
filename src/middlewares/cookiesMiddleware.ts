import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";
import axios from "axios";
import { CookieNames, cookieUuidNames } from "@/web/core/config";
import { Market } from "@/web/types";

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

export function withCookiesMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {

    let response = NextResponse.next();
    const hasVentajonUuidsCookie = request.cookies.get(CookieNames.ventajonUuids);
    let ventajonUuidsValue = hasVentajonUuidsCookie ? request.cookies.get(CookieNames.ventajonUuids)!.value : "";
    const userMarketDoesNotExists = request.cookies.get(CookieNames.ventajonUuids);
    const searchParams = request.nextUrl.searchParams;
    let marketParam = searchParams.get("market");


    if (!hasVentajonUuidsCookie) {
      ventajonUuidsValue = JSON.stringify({
        [cookieUuidNames.webVentajonUuid]: crypto.randomUUID().toString(),
        [cookieUuidNames.adminVentajonUuid]: crypto.randomUUID().toString(),
        [cookieUuidNames.companiesUuid]: crypto.randomUUID().toString(),
      });
      response.cookies.set(CookieNames.ventajonUuids, ventajonUuidsValue, {
        httpOnly: true,
        secure: true,
        priority: "medium",
        sameSite: "none",
      });
    }

    const webVentajonUuid = JSON.parse(ventajonUuidsValue).webVentajonUuid;


    const markets: Market[] = await getVentajonMarkets(webVentajonUuid);

    let matchingMarket: Market | undefined;

    function isMarket(value: any): value is Market {
      return typeof value === "object";
    }

    switch (true) {
      case !userMarketDoesNotExists && !marketParam:
        // Caso 1: No hay webVentajonUuid y no hay marketParam
        matchingMarket = markets.find((market) => market.default);
        response.cookies.set(CookieNames.UserMarket, JSON.stringify(matchingMarket));
        break;

      case !userMarketDoesNotExists && !!marketParam:
        // Caso 2: No hay userMarketCookie y hay marketParam
        matchingMarket =
          markets.find((market: Market) => market.code === marketParam) ||
          markets.find((market) => market.default);
        response.cookies.set(CookieNames.UserMarket, JSON.stringify(matchingMarket));
        break;

      case userMarketDoesNotExists && !!marketParam:
        // Caso 3: Hay userMarketCookie y marketParam
        matchingMarket = markets.find((market: Market) => market.code === marketParam);
        if (!matchingMarket) {
          matchingMarket = markets.find((market) => market.default);
        }
        response.cookies.set(CookieNames.UserMarket, JSON.stringify(matchingMarket));
        break;

      case userMarketDoesNotExists && !marketParam:
        // Caso 4: Hay UserMarketCookie y NO hay marketParam
        const userMarketCookie = request.cookies.get(CookieNames.UserMarket);
        if (userMarketCookie) {
          const marketData = JSON.parse(userMarketCookie.value);
          if (isMarket(marketData)) {
            const currentCookieMarket = marketData as Market;
            matchingMarket = markets.find(
              (market: Market) => market.code === currentCookieMarket.code
            );
          } else {
            matchingMarket = markets.find((market) => market.default);
          }
        }
        response.cookies.set(CookieNames.UserMarket, JSON.stringify(matchingMarket));
        break;

      default:
        // En caso de que ningún caso anterior sea verdadero
        matchingMarket = markets.find((market) => market.default);
        response.cookies.set(CookieNames.UserMarket, JSON.stringify(matchingMarket));
        break;
    }

    return middleware(request, event, response);
  };
}

"use server";
export const revalidate = 350;
import { CustomMiddleware } from "@/middleware";
import { CookieNames, cookieUuidNames } from "@/web/core/config";
import { Market } from "@/web/types/web";
import axios, { AxiosInstance } from "axios";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const AxiosWebInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: "",
    "refresh-token": "",
    "session-uuid": "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
    "Content-Type": "application/json",
    "Cache-Control": "",
    "app-flavor": "DEVELOP",
    timeout: 30000,
    common: {
      "Content-Type": "application/json",
      "User-Agent": "webapp/1.0.0",
    },
  },
});


export async function getVentajonMarkets(uuid: string) {
  const res = await AxiosWebInstance.get("v1/associates/markets", {
    headers: {
      "session-uuid": uuid,
    },
  });
  return res.data;
}

export const withCookiesMiddleware: CustomMiddleware = async (
  req: NextRequest,
  event: NextFetchEvent,
  res: NextResponse
) => {
  const hasVentajonUuidsCookie = res.cookies.get(CookieNames.ventajonUuids);
  const userMarketDoesNotExists = res.cookies.get(CookieNames.ventajonUuids);
  const searchParams = req.nextUrl.searchParams;
  let marketParam = searchParams.get("market");

  if( !hasVentajonUuidsCookie ){
    const ventajonUuids = JSON.stringify({
      [cookieUuidNames.webVentajonUuid]: crypto.randomUUID().toString(),
      [cookieUuidNames.adminVentajonUuid]: crypto.randomUUID().toString(),
      [cookieUuidNames.companiesUuid]: crypto.randomUUID().toString(),
    });
    res.cookies.set(CookieNames.ventajonUuids, ventajonUuids, {
      httpOnly: true,
      secure: true,
      priority: 'medium',
      sameSite: 'none'
    });
  }

  const webVentajonUuid = JSON.parse(res.cookies.get(CookieNames.ventajonUuids)!.value).webVentajonUuid;
  const markets : Market[] = await getVentajonMarkets(webVentajonUuid);

  // Buscar el market que coincide con marketFromApiOrSelector
  // let matchingMarket = markets.find((market : Market) => market.code === marketParam);


  let matchingMarket: Market | undefined;

  function isMarket(value: any): value is Market {
    return typeof value === 'object';
  }
 
  switch (true) {
    case !userMarketDoesNotExists && !marketParam:
      // Caso 1: No hay webVentajonUuid y no hay marketParam
      matchingMarket = markets.find((market) => market.default);
      res.cookies.set(CookieNames.UserMarket, JSON.stringify(matchingMarket));
      break;
    
    case !userMarketDoesNotExists && !!marketParam:
      // Caso 2: No hay userMarketCookie y hay marketParam
      matchingMarket = markets.find((market: Market) => market.code === marketParam) || markets.find((market) => market.default);
      res.cookies.set(CookieNames.UserMarket, JSON.stringify(matchingMarket));
      break;
    
    case userMarketDoesNotExists && !!marketParam:
      // Caso 3: Hay userMarketCookie y marketParam
      matchingMarket = markets.find((market: Market) => market.code === marketParam);
      if (!matchingMarket) {
        matchingMarket = markets.find((market) => market.default);
      }
      res.cookies.set(CookieNames.UserMarket, JSON.stringify(matchingMarket));
      break;

    case userMarketDoesNotExists && !marketParam:
      // Caso 3: Hay UserMarketCookie y NO hay marketParam
      const userMarketCookie = res.cookies.get(CookieNames.UserMarket);
      if (userMarketCookie) {
        const marketData = JSON.parse(userMarketCookie.value);
        if (isMarket(marketData)) {
          const currentCookieMarket = marketData as Market;
          matchingMarket = markets.find((market: Market) => market.code === currentCookieMarket.code);
        } else {
          matchingMarket = markets.find((market) => market.default);
        }
      }
      res.cookies.set(CookieNames.UserMarket, JSON.stringify(matchingMarket));
      break;
    
    default:
      // En caso de que ningún caso anterior sea verdadero
      matchingMarket = markets.find((market) => market.default);
      res.cookies.set(CookieNames.UserMarket, JSON.stringify(matchingMarket));
      break;
  }

  return res;
};
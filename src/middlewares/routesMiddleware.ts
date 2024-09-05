import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";
import { ParameterizedRoutes } from "./data/routesMiddlewareData";
import {
  CookieNames,
  marketCookieTypes,
  SwitchRoutesAdmin,
  SwitchRoutesCompanies,
  SwitchRoutesWeb,
  SwitchRoutesWithMarketParam,
} from "@/web/core/config";
import {
  AuthAvoidPublicRoutes,
  ParametizedRoute,
  privatedRoutesLists,
} from "./data/routesMiddlewareData";
import {
  getOrFixRouteParam,
  isMatchingParamRoute,
  isValidRouteParam,
} from "./utils/paramRoutesHelper";

export function withRoutesMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    const url = request.nextUrl.clone();
    let isMarketParamPage = false;
    let isParamPage = false;
    const currentMarketCookie = response.cookies.get(
      CookieNames.UserMarket
    )?.value;
    const searchParams = request.nextUrl.searchParams;
    let marketParam = searchParams.get("market");

    // ************** START REDIRECT TO LOGIN ************** //

    // Redirect to login if the user introduce exactly /admin in de url
    if (url.pathname === `/admin`) {
      const newResponse = NextResponse.redirect(
        new URL(SwitchRoutesAdmin.Login, url)
      );
      return newResponse;
    }

    // Redirect to login if the user introduce exactly /admin in de url
    if (url.pathname === `/companies`) {
      const newResponse = NextResponse.redirect(
        new URL(SwitchRoutesCompanies.Login, url)
      );
      return newResponse;
    }

    // ************** END REDIRECT TO LOGIN ************** //

    // ************** START BUILDERIO ************** //

    function isMatchingMarketParamRoute(urlPathname: string): boolean {
      // Convert the enum values to a Set with strings
      const MarketParamRoutesSet = new Set<string>(
        Object.values(SwitchRoutesWithMarketParam)
      );

      // Check if the current path is in the set of market param routes
      return MarketParamRoutesSet.has(urlPathname);
    }

    // Check if the URL is a market param route
    isMarketParamPage = isMatchingMarketParamRoute(url.pathname);

    if ((isMarketParamPage || marketParam) && currentMarketCookie) {
      const marketCookie: marketCookieTypes = JSON.parse(currentMarketCookie);

      const matchedMarketParamRoute = Object.values(
        SwitchRoutesWithMarketParam
      ).find((route) => url.pathname === route);

      if (matchedMarketParamRoute || marketParam !== marketCookie.code) {
        if (!marketParam || marketParam !== marketCookie.code) {
          if (searchParams.size > 0) {
            const params = searchParams.toString();

            if (marketParam !== marketCookie.code) {
              let paramsUpdated = params;
              if (params.includes(`market=${marketParam}`)) {
                paramsUpdated = params.replace(
                  `market=${marketParam}`,
                  `market=${marketCookie.code}`
                );
              } else {
                paramsUpdated = `${params}&market=${marketCookie.code}`;
              }
              return NextResponse.redirect(
                new URL(`${url.pathname}?${paramsUpdated}`, url)
              );
            }

            if (!marketParam) {
              return NextResponse.redirect(
                new URL(
                  `${url.pathname}?${params}&market=${marketCookie.code}`,
                  url
                )
              );
            }
          }
          if (searchParams.size === 0) {
            return NextResponse.redirect(
              new URL(`${url.pathname}?market=${marketCookie.code}`, url)
            );
          }
        }
      }
    }

    // ************** END BUILDERIO ************** //

    // Check if the route need a specific param

    const matchingParamRoute = isMatchingParamRoute(url.pathname);

    if (matchingParamRoute) {
      // Obtener o corregir el valor del parámetro específico para esta ruta
      const currentParamValue = getOrFixRouteParam(searchParams, matchingParamRoute);

      if (searchParams.size > 0) {
        const params = searchParams.toString();
        let paramsUpdated = params;

        // Si el valor actual del parámetro no es válido, corregirlo
        if (
          !isValidRouteParam(
            searchParams.get(matchingParamRoute.param),
            matchingParamRoute.validValues
          )
        ) {
          // Si ya existe el parámetro, reemplazarlo
          if (params.includes(`${matchingParamRoute.param}=`)) {
            paramsUpdated = params.replace(
              new RegExp(`${matchingParamRoute.param}=[^&]*`),
              `${matchingParamRoute.param}=${currentParamValue}`
            );
          } else {
            // Si no existe el parámetro, agregarlo
            paramsUpdated = `${params}&${matchingParamRoute.param}=${currentParamValue}`;
          }
          return NextResponse.redirect(
            new URL(`${url.pathname}?${paramsUpdated}`, url)
          );
        }
      }

      // Si no hay parámetros en la URL, agregar el parámetro con el valor por defecto
      if (searchParams.size === 0) {
        return NextResponse.redirect(
          new URL(
            `${url.pathname}?${matchingParamRoute.param}=${currentParamValue}`,
            url
          )
        );
      }
    }

    // Check if the url is a privated route and redirect if the user DOESN'T have the specific cookie
    const matchingPrivatedRoute = privatedRoutesLists.flat().find((route) => {
      if (
        url.pathname.includes(route.path) &&
        !request.cookies.has(route.cookieName)
      ) {
        return route;
      }
    });

    if (matchingPrivatedRoute) {
      const newResponse = NextResponse.redirect(
        new URL(`${matchingPrivatedRoute.redirectPath}`, url)
      );
      return newResponse;
    }

    // Check if the url is an AuthAvoidPublicRoute and redirect if the user HAS the specific cookie
    const matchingAuthAvoidPublicRoute = AuthAvoidPublicRoutes.flat().find(
      (route) =>
        route.path === url.pathname && request.cookies.has(route.cookieName)
    );

    if (matchingAuthAvoidPublicRoute) {
      const newResponse = NextResponse.redirect(
        new URL(matchingAuthAvoidPublicRoute.redirectPath, url)
      );
      return newResponse;
    }

    return middleware(request, event, response);
  };
}

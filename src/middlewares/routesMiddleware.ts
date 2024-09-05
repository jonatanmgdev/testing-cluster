import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";
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
  privatedRoutesLists,
} from "./data/routesMiddlewareData";

export function withRoutesTestMiddleware(middleware: CustomMiddleware) {
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

    function isMatchingParamRoute(urlPathname: string): boolean {
      // TODO: Convert this comparision to enum
      if (urlPathname === SwitchRoutesWeb.AssociatedCompaniesMap) return true;
      return false;
    }

    isParamPage = isMatchingParamRoute(url.pathname);

    // Verifica si la URL tiene el parámetro tab y si es válido (map o list)
    function isValidTabParam(tabParam: string | null): boolean {
      return tabParam === "map" || tabParam === "list";
    }

    // Verifica si el valor del parámetro tab está presente y es válido
    function checkAndFixTabParam(searchParams: URLSearchParams): string {
      const tabParam = searchParams.get("tab");

      if (!tabParam || !isValidTabParam(tabParam)) {
        // Si no hay parámetro tab o no es válido, devolver 'map' por defecto
        return "map";
      }

      // Si es válido, devolver el valor actual
      return tabParam;
    }

    // Ejemplo de uso en el código principal
    isParamPage = isMatchingParamRoute(url.pathname);

    if (isParamPage) {
      const currentTab = checkAndFixTabParam(searchParams);

      if (searchParams.size > 0) {
        const params = searchParams.toString();
        let paramsUpdated = params;

        if (!isValidTabParam(searchParams.get("tab"))) {
          // Si el tab no es válido o no existe, actualizar la URL
          if (params.includes("tab=")) {
            // Si ya existe el parámetro tab, reemplazarlo
            paramsUpdated = params.replace(/tab=[^&]*/, `tab=${currentTab}`);
          } else {
            // Si no existe el parámetro tab, agregarlo
            paramsUpdated = `${params}&tab=${currentTab}`;
          }
          return NextResponse.redirect(
            new URL(`${url.pathname}?${paramsUpdated}`, url)
          );
        }
      }

      // Si no hay parámetros en la URL, agregar el parámetro tab por defecto
      if (searchParams.size === 0) {
        return NextResponse.redirect(
          new URL(`${url.pathname}?tab=${currentTab}`, url)
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

import { CookieNames, marketCookieTypes } from "@/web/core/config";
import {
  SwitchRoutesAdmin,
  SwitchRoutesBuilderio,
  SwitchRoutesCompanies,
} from "@/web/core/config/router";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "@/middleware";
import { AuthAvoidPublicRoutes, privatedRoutesLists } from "./data/routesMiddlewareData";

export const withRoutesMiddleware: CustomMiddleware = async (
  req: NextRequest,
  event: NextFetchEvent,
  res: NextResponse
) => {
  const url = req.nextUrl.clone();
  let isBuilderioPage = false;
  const currentMarketCookie = res.cookies.get(CookieNames.UserMarket)?.value;
  const searchParams = req.nextUrl.searchParams;
  let marketParam = searchParams.get("market");
  // const locale = getLocale(req);

  // ************** START REDIRECT TO LOGIN ************** //

  // Redirect to login if the user introduce exactly /admin in de url
  if (url.pathname === `/admin`) {
    const newResponse = NextResponse.redirect(new URL(SwitchRoutesAdmin.Login, url));
    return newResponse;
  }

  // Redirect to login if the user introduce exactly /admin in de url
  if (url.pathname === `/companies`) {
    const newResponse = NextResponse.redirect(new URL(SwitchRoutesCompanies.login, url));
    return newResponse;
  }

  // ************** END REDIRECT TO LOGIN ************** //
  
  
  // ************** START BUILDERIO ************** //

  function isMatchingBuilderioRoute(urlPathname: string): boolean {
    // Convert the enum values to a Set with strings
    const builderioRoutesSet = new Set<string>(Object.values(SwitchRoutesBuilderio));
  
    // Check if the current path is in the set of Builderio routes
    return builderioRoutesSet.has(urlPathname);
  }
  
  // Check if the URL is a Builderio route
  isBuilderioPage = isMatchingBuilderioRoute(url.pathname);

  if ((isBuilderioPage || marketParam) && currentMarketCookie) {
    const marketCookie: marketCookieTypes = JSON.parse(currentMarketCookie);

    const matchedBuilderioRoute = Object.values(SwitchRoutesBuilderio).find(
      (route) => url.pathname === route
    );

    if (matchedBuilderioRoute || marketParam !== marketCookie.code) {
      if(!marketParam || (marketParam !== marketCookie.code)) {
        if (searchParams.size > 0) {
          const params = searchParams.toString();

          if(marketParam !== marketCookie.code) {
            let paramsUpdated = params;
            if(params.includes(`market=${marketParam}`)) {
              paramsUpdated = params.replace(`market=${marketParam}`, `market=${marketCookie.code}`);  
            } else {
              paramsUpdated = `${params}&market=${marketCookie.code}`
            }
            return NextResponse.redirect(
              new URL(`${url.pathname}?${paramsUpdated}`, url)
            );  
          }

          if(!marketParam) {
            return NextResponse.redirect(
              new URL(`${url.pathname}?${params}&market=${marketCookie.code}`, url)
            );  
          }
          
        } 
        if(searchParams.size === 0) {
          return NextResponse.redirect(new URL(`${url.pathname}?market=${marketCookie.code}`, url));
        }
      }
    }

  }

  // ************** END BUILDERIO ************** //

  // Check if the url is a privated route and redirect if the user DOESN'T have the specific cookie
  const matchingPrivatedRoute = privatedRoutesLists.flat().find((route) => {
    if (url.pathname.includes(route.path) && !req.cookies.has(route.cookieName)) {
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
    (route) => route.path === url.pathname && req.cookies.has(route.cookieName)
  );

  if (matchingAuthAvoidPublicRoute) {
    const newResponse = NextResponse.redirect(
      new URL(matchingAuthAvoidPublicRoute.redirectPath, url)
    );
    return newResponse;
  }



  return res;
};

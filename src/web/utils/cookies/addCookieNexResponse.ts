import { NextResponse } from "next/server";
import { convertToRequestCookies } from "./convertToRequestCookie";
import { convertRequestCookiesToResponseCookies } from "./requestCookieToResponseCookie";
import { checkIsVentajonCookies } from "./checkIsVentajonCookie";
import { NextURL } from "next/dist/server/web/next-url";

export function AddCookieNextResponse(
  cookieStore: string,
  oldResponse: NextResponse
): NextResponse {
  const newResponse = oldResponse;
  const requestCookiesConverted = convertToRequestCookies(cookieStore);
  const responseCookiesConverted = convertRequestCookiesToResponseCookies(requestCookiesConverted);
  const matchedCookies = checkIsVentajonCookies(responseCookiesConverted);
  if (matchedCookies.length !== 0) {
    for (const cookie of matchedCookies) {
      const cookieName = Object.keys(cookie)[0];
      const cookieDetails = cookie[cookieName];
      newResponse.cookies.set(cookieName, cookieDetails.value, {
        httpOnly: cookieDetails.httpOnly,
        secure: cookieDetails.secure,
        priority: cookieDetails.priority,
        sameSite: cookieDetails.sameSite,
        expires: cookieDetails.expires,
      });
    }
  }
  return newResponse;
}

export function AddCookieRedirectNextResponse(
  url: NextURL | string,
  base: NextURL | string,
  oldResponse?: NextResponse
): NextResponse {
  let newResponse = NextResponse.redirect(new URL(url, base));
  if (oldResponse !== undefined) {
    const oldCookies = oldResponse.cookies.getAll();
    if (oldCookies.length !== 0) {
      for (const cookie of oldCookies) {
        newResponse.cookies.set(cookie.name, cookie.value, {
          httpOnly: cookie.httpOnly,
          secure: cookie.secure,
          priority: cookie.priority,
          sameSite: cookie.sameSite,
        });
      }
    }
  }
  return newResponse;
}
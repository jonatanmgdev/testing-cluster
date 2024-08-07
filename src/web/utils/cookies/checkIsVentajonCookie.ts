import { CookieNames } from "../../core/config";
import { ResponseCookies } from "../../types/web/responseCookies";

export function checkIsVentajonCookies(cookies: ResponseCookies[]): ResponseCookies[] {
    let matchedCookies: ResponseCookies[] = [];
    for (const cookie of cookies) {
      const cookieName = Object.keys(cookie)[0];
      const enumValues : string[]  = Object.values(CookieNames);
      if (enumValues.includes(cookieName)) {
        matchedCookies.push(cookie);
      }
    }
    return matchedCookies;
  }
  
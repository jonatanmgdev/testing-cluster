import { environments } from "../../common/types/enviroments";
import { RequestCookies } from "../../types/web/requestCookie";
import { ResponseCookies } from "../../types/web/responseCookies";

export function convertRequestCookiesToResponseCookies(
  requestCookiesArray: RequestCookies[]
): ResponseCookies[] {
  const responseCookiesArray: ResponseCookies[] = [];
  const enviroment = process.env.NODE_ENV;
  for (const requestCookie of requestCookiesArray) {
    const [cookieName, cookieData] = Object.entries(requestCookie)[0];
    responseCookiesArray.push({
      [cookieName]: {
        name: cookieData.name,
        value: cookieData.value,
        httpOnly: true,
        secure: enviroment === environments.PROD.toString() ? true : false,
        sameSite: enviroment === environments.PROD.toString() ? "none" : "lax",
        priority: "high",
      },
    });
  }
  return responseCookiesArray;
}

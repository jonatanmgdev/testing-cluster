import { RequestCookies } from "../../types/web/requestCookie";

export function convertToRequestCookies(
  cookiesToConvert: string
): RequestCookies[] {
  const result: RequestCookies[] = [];
  try {
    const cookiesArray = JSON.parse(cookiesToConvert);

    for (const cookie of cookiesArray) {
      const cookieName = cookie.name;
      const cookieValue = cookie.value;

      const formattedCookie: RequestCookies = {
        [cookieName]: {
          name: cookieName,
          value: cookieValue,
        },
      };

      result.push(formattedCookie);
    }

    return result;
  } catch (error) {
    return [];
  }
}

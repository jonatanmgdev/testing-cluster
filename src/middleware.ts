"use server";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { withCookiesMiddleware } from "./middlewares/cookiesMiddleware";
import { withRoutesMiddleware } from "./middlewares/routesMiddleware";
import { cookies } from "next/headers";
import { AddCookieNextResponse } from "./web/utils/cookies/addCookieNexResponse";


export type CustomMiddleware = (
  req: NextRequest,
  event: NextFetchEvent,
  res: NextResponse
) => Promise<NextResponse>;

// Middlewares list, the order of the middlewares is the order of the execution
const middlewares: CustomMiddleware[] = [
  withCookiesMiddleware,
  withRoutesMiddleware,
];

// Run middlewares in order and with cookies in the response
export default async function runMiddlewares(
  req: NextRequest,
  event: NextFetchEvent,
  res: NextResponse
): Promise<NextResponse> {
  res = NextResponse.next();
  // Clonar la URL original
  const url = req.nextUrl.clone();

  // Agregar los parámetros de búsqueda originales a la nueva URL
  req.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  let cookieStore = cookies().getAll();
  let resWithCookies = AddCookieNextResponse(JSON.stringify(cookieStore), res);

  for (const middleware of middlewares) {
    resWithCookies = await middleware(req, event, resWithCookies);
  }
  return resWithCookies;
}

// Avoid middleware to run for this routes
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|public/|assets/|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
  ],
};

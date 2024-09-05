"use server";
import { chain } from "./middlewares/chain";
import { withCookiesTestMiddleware } from "./middlewares/cookiesMiddleware";
import { withRoutesTestMiddleware } from "./middlewares/routesMiddleware";

export default chain([withCookiesTestMiddleware, withRoutesTestMiddleware])

export const config = {
    matcher: [
      "/((?!_next/static|_next/image|public/|assets/|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
    ],
  };


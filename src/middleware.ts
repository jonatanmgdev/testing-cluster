"use server";
import { chain } from "./middlewares/chain";
import { withCookiesMiddleware } from "./middlewares/cookiesMiddleware";
import { withRoutesMiddleware } from "./middlewares/routesMiddleware";

export default chain([withCookiesMiddleware, withRoutesMiddleware])

export const config = {
    matcher: [
      "/((?!_next/static|_next/image|public/|assets/|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
    ],
  };


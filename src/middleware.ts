"use server";
import { chain } from "./middlewares/chain";
import { withCookiesMiddleware } from "./middlewares/cookiesMiddleware";
import { withRoutesMiddleware } from "./middlewares/routesMiddleware";
import { withTranslationsMiddleware } from "./middlewares/translationMiddleware";

export default chain([withTranslationsMiddleware, withCookiesMiddleware, withRoutesMiddleware])

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/books|icons|manifest).*)'
  ]
  };


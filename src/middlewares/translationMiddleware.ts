import { NextFetchEvent, NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export function withTranslationsMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {

    // Crea el middleware de traducción
    const handleI18nRouting = createMiddleware(routing);

    // Obtener el idioma del usuario de la cookie
    // Cambiar el valor de la cookie en el futuro si se desea cambiar el idioma
    const acceptLanguage = request.cookies.get("NEXT_LOCALE")?.value || "es";

    // Configurar el idioma en el contexto de `next-intl`
    const i18nRequest = new NextRequest(request.url, {
      headers: {
        ...request.headers,
        "Accept-Language": acceptLanguage,
      },
    });

    // Maneja la solicitud con el middleware de traducción
    const i18nResponse = handleI18nRouting(i18nRequest);

    // Continúa con la cadena de middlewares
    return middleware(request, event, i18nResponse);
  };
}

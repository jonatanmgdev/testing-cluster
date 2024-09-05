import { ParametizedRoute, ParameterizedRoutes } from "../data/routesMiddlewareData";


// Función para verificar si la URL coincide con alguna ruta parametrizada
export function isMatchingParamRoute(urlPathname: string): ParametizedRoute | undefined {
  return ParameterizedRoutes.find(route => urlPathname.startsWith(route.path));
}

// Función para validar si el parámetro de la URL es válido
export function isValidRouteParam(paramValue: string | null, validValues: string[]): boolean {
  return paramValue !== null && validValues.includes(paramValue);
}

// Función para obtener o corregir el valor del parámetro basado en los valores válidos
export function getOrFixRouteParam(searchParams: URLSearchParams, route: ParametizedRoute): string {
  const paramValue = searchParams.get(route.param);
  return isValidRouteParam(paramValue, route.validValues) ? paramValue! : route.defaultValue;
}
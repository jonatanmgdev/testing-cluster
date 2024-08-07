export interface AuthCookie {
  token?: string;
  refreshToken?: string;
  uuids?: CookieUuidTypes
}

export interface WebCookie extends AuthCookie {
}

export interface AdminCookie extends AuthCookie {
}

export interface CompaniesCookie extends AuthCookie {
}

export interface UuidCookie {
  uuids: CookieUuidTypes;
}

export interface CookieUuidTypes {
  webVentajonUuid: string,
  companiesUuid: string,
  adminVentajonUuid: string,
 };

 export const cookieUuidNames: CookieUuidTypes = {
  webVentajonUuid: "webVentajonUuid",
  companiesUuid: "companiesUuid",
  adminVentajonUuid: "adminVentajonUuid",
 };

 export interface marketCookieTypes {
  code: string;
  name: string;
  latitude: number;
  longitude: number;
  zoom_level: number;
  default: boolean;
 }

export enum CookieNames {
  WebAuth = "VENTAJON_web_auth",
  CompaniesAuth = "VENTAJON_companies_auth",
  AdminAuth = "VENTAJON_admin_auth",
  ventajonUuids = "VENTAJON_uuids",
  UserMarket = "VENTAJON_user_market",
}

export interface CookieResponse {
  token: string;
  refreshToken: string;
}
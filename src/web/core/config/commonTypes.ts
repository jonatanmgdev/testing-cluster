import { ReactNode } from "react";
import { AdminCookie, AuthCookie, WebCookie } from "./index";
import { apiStatus } from "./apiResponseAdapter";
import { Locale } from '../../../../i18n.config';

export interface privateAuthApiData {
  cookie: WebCookie | AdminCookie | undefined;
  uuid: string | null;
}

export interface publicAuthApiData {
  uuid: string;
}

export interface ApiResponse<T> {
  status?: apiStatus;
  data?: T;
  cookieValues?: any;
}

export interface layoutParams {
  lang: Locale;
  auth?: AuthCookie | AdminCookie | WebCookie | undefined;
 }

 export interface LayoutInterface {
  children: ReactNode;
  params: layoutParams;
 }
"use server";
import { cookies } from "next/headers";
import {
  AuthCookie,
  CookieNames,
  CookieUuidTypes,
} from "../../core/config";

export async function getAuth( cookieName: CookieNames ): Promise<AuthCookie | undefined> {
  'use server'
  const cookieStore = cookies();
  const uuidsString = cookieStore.get(CookieNames.ventajonUuids)?.value;
  const authString = cookieStore.get( cookieName )?.value;

  if (!uuidsString) return undefined;
  const uuids: CookieUuidTypes = JSON.parse(uuidsString);

  if( !authString ) return { uuids };

  const auth: AuthCookie = JSON.parse(authString);
  auth.uuids = uuids;
  return auth;
}

export async function getServerCookie(cookieName: CookieNames) {
  const cookieStore = cookies();
  const selectedCookie = cookieStore.get(cookieName);
  if (!selectedCookie) return undefined;
  return selectedCookie;
}

export async function getServerAllCookies(cookieName: string) {
  const cookieStore = cookies();
  return cookieStore;
}

export async function getParsedServerCookie(
  cookieName: CookieNames
): Promise<AuthCookie | undefined> {
  const serverCookie = await getServerCookie(cookieName);
  if( serverCookie === undefined ) return undefined;
  const parsedCookieData = JSON.parse(serverCookie.value);
  return {
    refreshToken: parsedCookieData.refreshToken,
    token: parsedCookieData.token
  };
}

export async function setServerCookie(
  cookieName: string,
  userToken: string,
  refreshToken: string
) {
  cookies().set(
    cookieName,
    JSON.stringify({
      token: userToken,
      refreshToken: refreshToken,
    })
  );
}

export async function deleteServerCookie(cookieName: CookieNames) {
  cookies().delete(cookieName);
}

export async function setCookie(cookieName: string, value: string) {
  cookies().set(cookieName, value);
  return Promise.resolve(); 
}

export async function cookieExists(cookieName: string): Promise<boolean> {
  return cookies().has(cookieName);
}

export async function getCookieValue(cookieName: string) {
  return cookies().get(cookieName)?.value;
}
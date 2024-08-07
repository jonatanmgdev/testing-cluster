"use server";

import { ApiResponse, AuthCookie, CookieNames } from "@/web/core/config";
import { assignApiStatus, getApiResponse } from "@/web/core/config/web";
import { AxiosWebInstance } from "@/web/core/config/web/webAxiosInstances";
import { Market } from "@/web/types/web";
import { getAuth } from "@/web/utils";
import { AxiosHeaderValue, AxiosInstance, isAxiosError } from "axios";

async function getWebAxiosInstance(): Promise<AxiosInstance> {
  const auth: AuthCookie | undefined = await getAuth(CookieNames.WebAuth);

  if (auth && auth.token && auth.uuids) {
    AxiosWebInstance.defaults.headers["Authorization"] = `Bearer ${auth.token}`;
    AxiosWebInstance.defaults.headers["session-uuid"] =
      auth.uuids.webVentajonUuid;
  }

  return AxiosWebInstance;
}

export async function getMarkets(): Promise<ApiResponse<Market[]>> {
  let apiResponse: ApiResponse<Market[]> = {};
  try {
    const axios: AxiosInstance = await getWebAxiosInstance();
    const URL: string = `${axios.defaults.baseURL}v1/associates/markets`;
    const response = await axios.get(URL);
    apiResponse = getApiResponse(response);
  } catch (error: any) {
    if (!isAxiosError(error)) {
      return apiResponse;
    }
    apiResponse.status = assignApiStatus(error.response!.status);
  }
  return apiResponse;
}

export async function updateUserSettings(
  marketCode: string,
  userAgent: string
) {
  let apiResponse: ApiResponse<number> = {};
  try {
    const axios: AxiosInstance = await getWebAxiosInstance();
    const response = await axios.put(
      `${axios.defaults.baseURL}v1/account/settings`,
      {
        market_code: marketCode,
        language_code: "ES",
      },
      {
        headers: {
          "User-Agent": userAgent as AxiosHeaderValue,
        },
      }
    );
    apiResponse = getApiResponse(response);
  } catch (error: any) {
    if (!isAxiosError(error)) {
      return apiResponse;
    }
    apiResponse.status = assignApiStatus(error.response!.status);
  }
  return apiResponse;
}

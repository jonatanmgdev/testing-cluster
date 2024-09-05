"use server";

import { ApiResponse, AuthCookie, CookieNames } from "@/web/core/config";
import { assignApiStatus, getApiResponse } from "@/web/core/config/web";

import { Market } from "@/web/types/web";
import { getAuth } from "@/web/utils";
import axios, { AxiosHeaderValue, AxiosInstance, isAxiosError } from "axios";


export async function getMarkets(): Promise<ApiResponse<Market[]>> {
  let apiResponse: ApiResponse<Market[]> = {};
  try {
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

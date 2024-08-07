'use server';
import { Market } from "@/web/types/web";
import axios, { AxiosInstance, isAxiosError } from "axios";
import { ApiResponse, AuthCookie, CookieNames } from "../../config";
import {
  getApiResponse,
  assignApiStatus,
} from "../../config/apiResponseAdapter";


const AxiosWebInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: "",
    "refresh-token": "",
    "session-uuid": "sss-sss-ssss-ssss",
    "Content-Type": "application/json",
    "Cache-Control": "",
    "app-flavor": "DEVELOP",
    timeout: 30000,
    common: {
      "Content-Type": "application/json",
      "User-Agent": "webapp/1.0.0",
    },
  },
});


export async function getMarkets(): Promise<ApiResponse<Market[]>> {
  let apiResponse: ApiResponse<Market[]> = {};
  try {
    const URL: string = `${AxiosWebInstance.defaults.baseURL}v1/associates/markets`;
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

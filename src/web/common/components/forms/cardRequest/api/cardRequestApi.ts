'use server';

import { ApiResponse, AuthCookie, CookieNames } from "@/web/core/config";
import {
  getApiResponse,
  assignApiStatus,
} from "@/web/core/config/apiResponseAdapter";
import axios, { AxiosInstance, AxiosHeaderValue, isAxiosError } from "axios";
import { WebCardRequestVm } from "../models";

const AxiosWebInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: "",
    "refresh-token": "",
    "session-uuid": "",
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


interface RequestCardProps {
  cardRequest: WebCardRequestVm;
  userAgent: string;
}

export const requestCard = async ({
  cardRequest,
  userAgent,
}: RequestCardProps): Promise<ApiResponse<number>> => {
  let apiResponse: ApiResponse<number> = {};
  try {
    const URI: string = cardRequest.email
      ? "v1/card/public-request"
      : "v1/card/request";

    const response = await axios.post(
      `${axios.defaults.baseURL}${URI}`,
      cardRequest, {
        headers: {
          "User-Agent": userAgent as AxiosHeaderValue,
        },
      },
    );

    apiResponse = getApiResponse(response);
  } catch (error: any) {
    if (!isAxiosError(error)) {
      return apiResponse;
    }

    console.error(error);

    apiResponse.status = assignApiStatus(error.response!.status);
  }

  return apiResponse;
};

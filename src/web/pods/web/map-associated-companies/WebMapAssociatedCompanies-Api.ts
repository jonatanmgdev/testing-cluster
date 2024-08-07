"use server";
import { WebMapBranchModel, WebMapBranchesAddressesModel } from "./models";
import { WebMapCategoryModel } from "./models/WebMapCategoryModel";
import { ApiResponse, CookieNames } from "@/web/core/config";
import { WebMapMarketModel } from "./models/WebMapMarketModel";
import { AxiosInstance } from 'axios';
import { assignApiStatus, getApiResponse } from "@/web/core/config/apiResponseAdapter";
import axios from "axios";

/**
    @fileoverview Query about the necessary map data.
    @author Domingo Montesdeoca González
    ---------------------------------------------------
    @function getBranches() List of branches.
    @function getCategories() List of categories to filter by branches.
    @function getMarkets() Market list to move around the map.
*/

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

export async function getBranches(): Promise<ApiResponse<WebMapBranchModel[]>> {
  let apiResponse: ApiResponse<any> = {};
  try {

      AxiosWebInstance.defaults.headers["session-uuid"] = "1234-1234-1234-123456789012";
      const axiosResponse = await AxiosWebInstance.get(
        `${AxiosWebInstance.defaults.baseURL}v2/associates/branches`
      );
      apiResponse = getApiResponse(axiosResponse);
    
  } catch (error: any) {
    if (!axios.isAxiosError(error)) return apiResponse;
    apiResponse.status = assignApiStatus(error.response!.status);
  }
  return apiResponse;
}

export async function getCategories(): Promise<ApiResponse<WebMapCategoryModel[]>> {
  try {
    const { data, status } = await AxiosWebInstance.get("v1/associates/categories");
    data.sort((a:WebMapCategoryModel,b:WebMapCategoryModel) => a.priority - b.priority)
    return { status, data: data as WebMapCategoryModel[] };
  } catch (error: any) {
    return { status: error.status };
  }
}

export async function getMarkets(): Promise<ApiResponse<WebMapMarketModel[]>> {
  try {
    const { data, status } = await AxiosWebInstance.get("v1/associates/markets");
    return { status, data: data as WebMapMarketModel[] };
  } catch (error: any) {
    return { status: error.status };
  }
}

export async function getAssociateDetailsByCode(
  code: string
): Promise<ApiResponse<WebMapBranchModel>> {
  let apiResponse: ApiResponse<any> = {};

  try {
      AxiosWebInstance.defaults.headers["session-uuid"] = "1234-1234-1234-123456789012";
      const axiosResponse = await AxiosWebInstance.get(`v2/associates/branch/${code}`);
      apiResponse = getApiResponse(axiosResponse);
  } catch (error: any) {
    if (!axios.isAxiosError(error)) return apiResponse;
    apiResponse.status = assignApiStatus(error.response!.status);
  }
  return apiResponse;
}

export async function getAssociatedBranchAddresses(
  code: string,
  latitude: number,
  longitude: number
): Promise<ApiResponse<WebMapBranchesAddressesModel>> {
  let apiResponse: ApiResponse<any> = {};

  try {
      AxiosWebInstance.defaults.headers["session-uuid"] = "1234-1234-1234-123456789012";
      const axiosResponse = await AxiosWebInstance.get(
        `${AxiosWebInstance.defaults.baseURL}v2/associate/${code}/branch-addresses?latitude=${latitude}&longitude=${longitude}`
      );
      apiResponse = getApiResponse(axiosResponse);
  } catch (error: any) {
    if (!axios.isAxiosError(error)) return apiResponse;
    apiResponse.status = assignApiStatus(error.response!.status);
  }
  return apiResponse;
}

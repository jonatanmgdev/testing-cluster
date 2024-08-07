import axios, { AxiosHeaderValue, AxiosInstance } from "axios";
import { ApiResponse, AuthCookie, CookieNames } from "../../core/config";
import { environments } from "../../common/types/enviroments";
import { getAuth } from "./serverCookies";
import * as https from "https";

interface renewTokenProps {
  headers: Record<string, string | null>;
  environment?: environments;
  baseURL?: string;
  cookieName: CookieNames;
  userAgent: AxiosHeaderValue;
}

export async function renewToken(
  props: renewTokenProps
): Promise<ApiResponse<AuthCookie>> {
  const { headers, environment, baseURL } = props;

  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  if (!baseURL) {
    throw new Error("API base URL is not defined");
  }

  if (!environment) {
    throw new Error("Environment is not defined");
  }

  const auth = await getAuth(props.cookieName);
  if (!auth?.refreshToken) {
    throw new Error("Refresh token is not available");
  }

  const auth_type = (): string => {
    switch (props.cookieName) {
      case CookieNames.WebAuth:
        return "api";
      case CookieNames.AdminAuth:
        return "admin";
      case CookieNames.CompaniesAuth:
        return "company";
      default:
        throw new Error("Invalid cookie name");
    }
  };

  const body = {
    auth_type: auth_type(),
    refresh_token: auth.refreshToken,
  };

  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    httpsAgent,
  });

  axiosInstance.defaults.headers["Content-Type"] = "application/json";
  axiosInstance.defaults.headers["session-uuid"] =
    headers?.["session-uuid"] ?? "";
  axiosInstance.defaults.headers["app-flavor"] = environment;
  axiosInstance.defaults.headers["refresh-token"] = auth?.refreshToken ?? "";

  try {
    const response = await axiosInstance.post("/v1/renew-token", body, {
      withCredentials: true,
      headers: {
         "User-Agent": props.userAgent
      }
    });
    return {
      status: response.status,
      data: {
        token: response.data.token,
        refreshToken: response.data.refresh_token,
      },
    };
  } catch (error: any) {
    return {
      status: error.response?.status ?? 500,
      data: undefined,
    };
  }
}

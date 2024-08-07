"use server";
import { ApiResponse, AuthCookie, CookieNames } from "@/web/core/config";
import {
  assignApiStatus,
  getApiResponse,
} from "@/web/core/config/apiResponseAdapter";
import { PhoneVerificationRequest } from "@/web/pods/web/account/models/PhoneVerificationRequest";
import { deleteServerCookie, getAuth } from "@/web/utils";
import axios, {
  AxiosHeaderValue,
  AxiosInstance,
  AxiosResponse,
  isAxiosError,
} from "axios";
import { AccountNotification, TotalPending } from "./models/notifications";
import {
  AccountCommunicationPreferencesData,
  AccountUserData,
} from "./models/user";
import {
  MarkNotificationsVisibilityProps,
  AccountHiredInsurance,
} from "@/web/types/web";
import { AccountCardData } from "@/web/types/web/account/AccountCardData";
import { WebICategory } from "./accountSettings/models/WebICategories";


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

export async function getAccount(
  userAgent: string
): Promise<ApiResponse<AccountUserData>> {
  let apiResponse: ApiResponse<AccountUserData> = {};
  try {

    const URL: string = `${axios.defaults.baseURL}v1/account/user`;

    const response = await axios.get(URL,
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

interface UpdateAccountProps {
  updatedAccountData: AccountUserData;
  userAgent: string;
}

export async function updateAccount({
  updatedAccountData,
  userAgent,
}: UpdateAccountProps): Promise<ApiResponse<number>> {
  let apiResponse: ApiResponse<number> = {};
  try {

    const response = await axios.put(
      `${axios.defaults.baseURL}v1/account/update`,
      updatedAccountData,
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

export async function getAccountCommunicationPreferences(
  userAgent: string
): Promise<ApiResponse<AccountCommunicationPreferencesData>> {
  let apiResponse: ApiResponse<AccountCommunicationPreferencesData> = {};

  try {
    const response = await axios.get(
      `${axios.defaults.baseURL}v1/account/crm-data`,
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

interface UpdateAccountCommunicationPreferencesProps {
  updatedCommunicationPreferences: AccountCommunicationPreferencesData;
  userAgent: string;
}

export async function updateAccountCommunicationPreferences({
  updatedCommunicationPreferences,
  userAgent,
}: UpdateAccountCommunicationPreferencesProps): Promise<ApiResponse<number>> {
  let apiResponse: ApiResponse<number> = {};

  try {
    const response: AxiosResponse<number> = await axios.post(
      `${axios.defaults.baseURL}v1/account/crm-data`,
      updatedCommunicationPreferences,
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

interface UpdatePasswordProps {
  new_password: string;
  confirm_password: string;
  userAgent: string;
}

export async function updatePassword({
  new_password,
  confirm_password,
  userAgent,
}: UpdatePasswordProps): Promise<ApiResponse<number>> {
  let apiResponse: ApiResponse<number> = {};
  try {

    const response = await axios.post(
      `${axios.defaults.baseURL}v1/account/change-password`,
      { new_password, confirm_password },
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

interface PhoneVerificationProps {
  phoneVerificationRequest: PhoneVerificationRequest;
  userAgent: string;
}

export async function sendSms({
  phoneVerificationRequest,
  userAgent,
}: PhoneVerificationProps): Promise<ApiResponse<number>> {
  let apiResponse: ApiResponse<number> = {};
  try {
    phoneVerificationRequest = {
      ...phoneVerificationRequest,
      signature: 's',
    };


    const response = await axios.post(
      `${axios.defaults.baseURL}v1/account/send-sms`,
      phoneVerificationRequest,
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

export async function verifyPhone({
  phoneVerificationRequest,
  userAgent,
}: PhoneVerificationProps): Promise<ApiResponse<number>> {
  let apiResponse: ApiResponse<number> = {};
  try {

    const response = await axios.post(
      `${axios.defaults.baseURL}v1/account/phone-verification`,
      phoneVerificationRequest,
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

export async function getNotificationsTopics(
  userAgent: string
): Promise<ApiResponse<string[]>> {
  let apiResponse: ApiResponse<string[]> = {};
  try {

    const response = await axios.get(`${axios.defaults.baseURL}v1/topics`, {
      headers: {
        "User-Agent": userAgent as AxiosHeaderValue,
      },
    });

    apiResponse = getApiResponse(response);
  } catch (error: any) {
    if (!isAxiosError(error)) {
      return apiResponse;
    }
    apiResponse.status = assignApiStatus(error.response!.status);
  }

  return apiResponse;
}

export async function getMyTopicsSubscriptions(
  userAgent: string
): Promise<ApiResponse<string[]>> {
  let apiResponse: ApiResponse<string[]> = {};
  try {

    const response = await axios.get(
      `${axios.defaults.baseURL}v1/my-subscriptions-to-topics`,
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

export async function unsuscribeFromTopic(
  topic: string,
  userAgent: string
): Promise<ApiResponse<number>> {
  let apiResponse: ApiResponse<number> = {};
  try {

    const response = await axios.delete(
      `${axios.defaults.baseURL}v1/topic/unsubscribe/${topic}`,
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

export async function suscribeToTopic(
  topic: string,
  userAgent: string
): Promise<ApiResponse<number>> {
  let apiResponse: ApiResponse<number> = {};
  try {

    const response = await axios.post(
      `${axios.defaults.baseURL}v1/topic/subscribe/${topic}`,
      {},
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

interface GetAccountNotificationsProps {
  page: number;
  size?: number;
  userAgent: string;
}

export async function getAccountNotifications({
  page,
  size = 30,
  userAgent,
}: GetAccountNotificationsProps): Promise<ApiResponse<AccountNotification>> {
  let apiResponse: ApiResponse<AccountNotification> = {};
  try {

    axios.defaults.headers["Accept-Language"] = "ES";

    const response = await axios.get(
      `${axios.defaults.baseURL}v1/notifications/client-received?page=${page}&pageSize=${size}`,
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
export async function showPendingNotifications(
  userAgent: string
): Promise<ApiResponse<TotalPending>> {
  let apiResponse: ApiResponse<TotalPending> = {};
  try {
    const axiosResponse = await axios.get(
      `${axios.defaults.baseURL}v1/notifications/count-pending-reading`,
      {
        headers: {
          "User-Agent": userAgent as AxiosHeaderValue,
        },
      }
    );

    apiResponse = getApiResponse(axiosResponse);
  } catch (error: any) {
    if (!isAxiosError(error)) {
      return apiResponse;
    }
    apiResponse.status = assignApiStatus(error.response!.status);
  }

  return apiResponse;
}

export async function markNotificationsAsNotVisible({
  notificationsIds,
  userAgent,
}: MarkNotificationsVisibilityProps): Promise<ApiResponse<any>> {
  let apiResponse: ApiResponse<any> = {};
  try {

    const response = await axios.patch(
      `${axios.defaults.baseURL}v1/notifications/mark-as-not-visible`,
      notificationsIds,
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

export async function markNotificationsAsVisible({
  notificationsIds,
  userAgent,
}: MarkNotificationsVisibilityProps): Promise<ApiResponse<any>> {
  let apiResponse: ApiResponse<any> = {};
  try {

    const response = await axios.patch(
      `${axios.defaults.baseURL}v1/notifications/mark-as-views`,
      notificationsIds,
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

export async function getCategories(
  userAgent: string
): Promise<ApiResponse<WebICategory[]>> {
  let apiResponse: ApiResponse<WebICategory[]> = {};
  try {
    const response = await axios.get(
      `${axios.defaults.baseURL}v1/associates/categories`,
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

export async function getCategoriesSubscriptions(
  userAgent: string
): Promise<ApiResponse<number[]>> {
  let apiResponse: ApiResponse<number[]> = {};
  try {
    const response = await axios.get(
      `${axios.defaults.baseURL}v1/account/user/categories`,
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

export async function createUserCategory(
  categoryId: number,
  userAgent: string
): Promise<ApiResponse<number>> {
  let apiResponse: ApiResponse<number> = {};
  try {
    const response = await axios.post(
      `${axios.defaults.baseURL}v1/account/user/category/${categoryId}`,
      {},
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

export async function deleteUserCategory(
  categoryId: number,
  userAgent: string
): Promise<ApiResponse<number>> {
  let apiResponse: ApiResponse<number> = {};
  try {
    const response = await axios.delete(
      `${axios.defaults.baseURL}v1/account/user/category/${categoryId}`,
      {
        headers: {
          "User-Agent": userAgent as AxiosHeaderValue,
        },
      }
    );

    return getApiResponse(response);
  } catch (error: any) {
    if (!isAxiosError(error)) {
      return apiResponse;
    }
    apiResponse.status = assignApiStatus(error.response!.status);
  }

  return apiResponse;
}

export async function getAccountCardData(
  userAgent: string
): Promise<ApiResponse<AccountCardData>> {
  let apiResponse: ApiResponse<AccountCardData> = {};
  try {

    const response = await axios.get(`${axios.defaults.baseURL}v2/card/data`, {
      headers: {
        "User-Agent": userAgent as AxiosHeaderValue,
      },
    });

    return getApiResponse(response);
  } catch (error: any) {
    if (!isAxiosError(error)) {
      return apiResponse;
    }
    apiResponse.status = assignApiStatus(error.response!.status);
  }

  return apiResponse;
}

export async function deleteAccount(
  userAgent: string
): Promise<ApiResponse<number>> {
  let apiResponse: ApiResponse<number> = {};
  try {

    const response = await axios.delete(
      `${axios.defaults.baseURL}v1/account/delete`,
      {
        headers: {
          "User-Agent": userAgent as AxiosHeaderValue,
        },
      }
    );

    if (response.status == 200) {
      await deleteServerCookie(CookieNames.WebAuth);
    }

    apiResponse = getApiResponse(response);
  } catch (error: any) {
    if (!isAxiosError(error)) {
      return apiResponse;
    }
    apiResponse.status = assignApiStatus(error.response!.status);
  }

  return apiResponse;
}

export async function getAccountHiredInsurances(
  userAgent: string
): Promise<ApiResponse<AccountHiredInsurance[]>> {
  let apiResponse: ApiResponse<AccountHiredInsurance[]> = {};
  try {

    const response = await axios.get(
      `${axios.defaults.baseURL}v1/client/my-insurances`,
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

"use client";

import { UserContext, UserContextProps } from "@/web/core/context/user/UserContext";
import { getUserAgent } from "@/web/utils/getUserAgent";
import { ReactNode, useEffect, useState } from "react";
import { ApiResponse, CookieNames, marketCookieTypes } from "../../config";
import { apiStatus } from "../../config/apiResponseAdapter";
import { getCookieValue, setCookie } from "@/web/utils";
import { Market } from "@/web/types/web";
import { getMarkets } from "./WebMarketsApi";
import { useSearchParams } from "next/navigation";
import { LatLng } from "leaflet";
import { getAccount } from "@/web/pods/web/account/WebAccount-Api";
import { AccountUserData, userSettingsInitialState } from "@/web/pods/web/account/models/user";

export const accountDataInitialState: AccountUserData = {
  phone: "",
  name: "",
  first_surname: "",
  email: "",
  birthdate: "",
  is_allowed_advertising: false,
  is_linked_card: false,
  is_phone_verified: false,
  second_surname: "",
  is_enabled: false,
  refresh_token: "",
  token: "",
  dial_code: "",
  is_incomplete_account: false,
  settings: userSettingsInitialState,
};

interface ContextProp {
  children: ReactNode;
  webAuth: any;
  marketCookie: marketCookieTypes;
}

export const UserContextProvider = ({ children, webAuth, marketCookie }: ContextProp) => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [isMarketsLoading, setIsMarketsLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<AccountUserData>(accountDataInitialState);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const userAgent: string = getUserAgent();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(webAuth?.token !== undefined);
  const [marketSelected, setMarketSelected] = useState<marketCookieTypes>(marketCookie as marketCookieTypes);
  const [userLatLngData, setUserLatLng] = useState<LatLng>({lat: marketSelected.latitude, lng: marketSelected.longitude} as LatLng);
  const searchParams = useSearchParams();
  let marketParam = searchParams.get("market");

  /**
 * Removes accents from a given string.
 *
 * @param {string} str - The string to remove accents from.
 * @return {string} The input string with all accents removed.
 */

  const handleMarkets = async (): Promise<Market[]> => {
    setIsMarketsLoading(true);
    try {
      const { data, status } = await getMarkets();
      console.log(data);
      if (status == apiStatus.Success && data) {
        setMarkets(data);
        return data;
      } else {
        return [];
      }
    } finally {
      setIsMarketsLoading(false);
    }
  };

  useEffect(() => {
    const handleCookie = async () => {
      const currentMarketCookie  = await getCookieValue(CookieNames.UserMarket);
      let marketCookieValue = currentMarketCookie ? currentMarketCookie : "{}";
      const marketCookie: marketCookieTypes = JSON.parse(marketCookieValue!);
      if(marketCookie.code !== marketSelected.code) {
        setMarketSelected(marketCookie);
      }
    };
    handleCookie();
    // handleMarkets();
  }, []);

  const resetUserInfo = () => {
    setUserInfo(accountDataInitialState);
    setIsUserLoggedIn(false);
  };

  const handleMarketForUser = async (marketFromApiOrSelector: string) => {
    const markets = await handleMarkets();
    const params = searchParams.toString();
    let paramsUpdated = params;

    // Buscar el market que coincide con marketFromApiOrSelector
    let matchingMarket = markets.find((market) => market.code === marketFromApiOrSelector);

    // Si no hay coincidencia, buscar el market con default: true
    if (!matchingMarket) {
      matchingMarket = markets.find((market) => market.default);
    }

    // Establecer el market en la cookie y en el context
    if (matchingMarket) {
      setMarketSelected(matchingMarket);
      await setCookie(CookieNames.UserMarket, JSON.stringify(matchingMarket));
    }

    // Update window location to apply market in the middleware
    if (marketParam && matchingMarket) {
      if(params.includes(`market=${marketParam}`)) {
        paramsUpdated = params.replace(`market=${marketParam}`, `market=${matchingMarket.code}`);
      } else {
        paramsUpdated = `${params}&market=${matchingMarket.code}`
      }
      const currentUrl = window.location.origin + window.location.pathname;
      window.location.href = `${currentUrl}?${paramsUpdated}`;
    }

  };

  const getUser = async () => {
    setIsUserLoading(true);
    const currentMarketCookie = await getCookieValue(CookieNames.UserMarket);
    const marketCookie: marketCookieTypes = JSON.parse(currentMarketCookie!);
    getAccount(userAgent)
      .then(({ data, status }: ApiResponse<AccountUserData>) => {
        if (status == apiStatus.Success && data) {
          setUserInfo(data);
          if (marketCookie.code !== data.settings.market_code) {
            handleMarketForUser(marketCookie.code);
          }
          setIsUserLoggedIn(true);
        } else {
          console.error("Error getting user", status);
        }
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const userContextInitialValue: UserContextProps = {
    selectedMarket: marketSelected,
    setMarkets,
    handleMarketForUser,
    markets,
    isMarketsLoading,
    userInfo,
    setUserInfo,
    setUserLatLng,
    userLatLng: userLatLngData,
    resetUserInfo,
    getUser,
    isUserLoading,
    isUserLoggedIn,
    setIsUserLoggedIn
  };

  useEffect(() => {
    if (
      JSON.stringify(userInfo) === JSON.stringify(accountDataInitialState) &&
      webAuth?.token !== undefined
    ) {
      getUser();
    }
  }, [webAuth?.token]);

  return <UserContext.Provider value={userContextInitialValue}>{children}</UserContext.Provider>;
};

"use client";

import { Context, createContext, Dispatch, SetStateAction } from "react";

import { Market } from "@/web/types/web";
import { LatLng } from "leaflet";
import { AccountUserData, accountUserDataInitialState } from "@/web/pods/web/account/models/user";

export interface UserContextProps {
  markets: Market[];
  selectedMarket: Market;
  isMarketsLoading: boolean;
  userInfo: AccountUserData;
  userLatLng: LatLng;
  isUserLoading?: boolean;
  isUserLoggedIn?: boolean;
  setUserInfo: Dispatch<SetStateAction<AccountUserData>>;
  setUserLatLng: Dispatch<SetStateAction<LatLng>>;
  setMarkets: Dispatch<SetStateAction<Market[]>>;
  handleMarketForUser: (market: string) => Promise<void>;
  getUser?: () => Promise<void>;
  setIsUserLoggedIn?: Dispatch<SetStateAction<boolean>>;
  resetUserInfo?: () => void;
}

const userContextInitialValue: UserContextProps = {
  markets: [],
  selectedMarket: {} as Market,
  setMarkets: () => {},
  handleMarketForUser: async () => {},
  isMarketsLoading: false,
  userLatLng: {} as LatLng,
  setUserLatLng: () => {},
  userInfo: accountUserDataInitialState,
  setUserInfo: () => {},
};

export const UserContext: Context<UserContextProps> =
  createContext<UserContextProps>(userContextInitialValue);

UserContext.displayName = "User context";

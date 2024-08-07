"use client";

import { Context, createContext, Dispatch, SetStateAction } from "react";
import { Market } from "@/web/types/web";
import { AccountUserData, accountUserDataInitialState } from "@/web/pods/web/account/models/user";

export interface UserContextProps {
  markets: Market[];
  selectedMarket: Market;
  setMarkets: Dispatch<SetStateAction<Market[]>>;
  handleMarketForUser: (market: string) => Promise<void>;
  isMarketsLoading: boolean;
  userInfo: AccountUserData;
  setUserInfo: Dispatch<SetStateAction<AccountUserData>>;
  resetUserInfo?: () => void;
  getUser?: () => Promise<void>;
  isUserLoading?: boolean;
  isUserLoggedIn?: boolean;
  setIsUserLoggedIn?: Dispatch<SetStateAction<boolean>>;
}

const userContextInitialValue: UserContextProps = {
  markets: [],
  selectedMarket: {} as Market,
  setMarkets: () => {},
  handleMarketForUser: async () => {},
  isMarketsLoading: false,
  userInfo: accountUserDataInitialState,
  setUserInfo: () => {},
};

export const UserContext: Context<UserContextProps> =
  createContext<UserContextProps>(userContextInitialValue);

UserContext.displayName = "User context";

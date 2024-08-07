import React from "react";
import { UserContextProvider } from "@/web/core/context/user/UserContextProvider";
import { getAuth, getCookieValue } from "@/web/utils";
import { CookieNames, marketCookieTypes } from "@/web/core/config";
import { cookies } from "next/headers";

interface WrapperProps {
  children: React.ReactNode;
}

export const webWrapper: React.FC<WrapperProps> = async ({ children }) => {
  const webAuth = await getAuth(CookieNames.WebAuth);
  const cookiesStore = cookies();
  const marketCookie = cookiesStore.get(CookieNames.UserMarket);
  let marketCookieValue = marketCookie ? marketCookie.value : "{}";
  const marketCookieParsed: marketCookieTypes = JSON.parse(marketCookieValue);

  return (
    <>
        <UserContextProvider webAuth={webAuth} marketCookie={marketCookieParsed} >{children}</UserContextProvider>
      <div id="fb-root"></div>
    </>
  );
};

export default webWrapper;

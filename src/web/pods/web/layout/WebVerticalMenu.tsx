"use client";
import {
  CommonVerticalMenu,
  CreditCardLinearIcon,
  DocumentTextIcon,
  ShieldTickIcon,
  ShoppingCartIcon,
  UserBoldIcon,
} from "@/web/common/components";
import { LogoutButton } from "@/web/common/components/button";
import { CookieNames } from "@/web/core/config";
import { SwitchRoutesWeb } from "@/web/core/config/router";
import { TransactionsFilterContext } from "@/web/core/context/transactionsFilter/TransactionsFilterContext";
import { UserContext } from "@/web/core/context/user/UserContext";
import { useToastContext } from "@/web/hooks";
import { MenuRoute } from "@/web/core/config";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export const WebVerticalMenu = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { userInfo } = useContext(UserContext);
  const { resetFilters } = useContext(TransactionsFilterContext);
  const { showToast } = useToastContext();
  const router: AppRouterInstance = useRouter();

  const loggedInMenuRoutes: MenuRoute[] = [
    {
      text: "Mis ahorros",
      icon: UserBoldIcon({ height: 18, width: 18 }),
      link: SwitchRoutesWeb.AccountSavings,
    },
    {
      text: "Mis Seguros",
      icon: ShieldTickIcon({ height: 20, width: 20 }),
      link: SwitchRoutesWeb.AccountInsurances,
    },
    {
      text: "Mis Datos",
      icon: DocumentTextIcon({ height: 20, width: 20 }),
      link: SwitchRoutesWeb.AccountUserDetail,
    },
    {
      text: "Tienda Online",
      icon: ShoppingCartIcon({ height: 20, width: 20 }),
      link: SwitchRoutesWeb.OnlineShopExternalLink,
      isExternal: true,
    },
  ];

  if (userInfo.is_linked_card) {
    loggedInMenuRoutes.splice(1, 0, {
      text: "Mis Movimientos",
      icon: CreditCardLinearIcon({ height: 20, width: 20 }),
      link: SwitchRoutesWeb.AccountTransactions,
    });
  }

  /**
   * Handles the case when the user's account is incomplete.
   *
   * @return {void}
   */
  const handleIncompleteAccount = (): void => {
    const personalDataIndex: number = loggedInMenuRoutes.findIndex(
      (item: MenuRoute) => {
        return item.text.includes("Mis Datos");
      }
    );

    if (personalDataIndex !== -1) {
      router.push(loggedInMenuRoutes[personalDataIndex].link);
      setActiveIndex(personalDataIndex);
      showToast({
        message:
          "El estado de su cuenta es incompleto. Por favor actualice sus datos.",
        type: "error",
      });
    }
  };

  /**
   * Handles the current path by finding the active index based on the pathname.
   *
   * @return {void} no return value
   */
  const handleCurrentPath = (): void => {
    const pathname: string = window.location.pathname;
    const activeIndex: number = loggedInMenuRoutes.findIndex(
      (item: MenuRoute) => item.link == pathname
    );

    if (activeIndex !== -1) {
      setActiveIndex(activeIndex);
    } else {
      setActiveIndex(0);
      router.push(loggedInMenuRoutes[0].link);
    }
  };

  useEffect(() => {
    if (userInfo.is_incomplete_account) {
      handleIncompleteAccount();
    }
    handleCurrentPath();
  }, [userInfo.is_incomplete_account]);

  return (
    <div className="hidden xl:flex xl:flex-col">
      <CommonVerticalMenu
        onTabChange={() => resetFilters && resetFilters()}
        menuItems={loggedInMenuRoutes}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <div className="flex">
        <LogoutButton cookieName={CookieNames.WebAuth} />
      </div>
    </div>
  );
};

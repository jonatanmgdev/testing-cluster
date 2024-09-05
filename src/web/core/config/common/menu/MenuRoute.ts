"use client";

import { environments } from "@/web/common/types/enviroments";
import { SwitchRoutesWeb } from "@/web/core/config/router";
import { ReactNode } from "react";

export type MenuRoute = {
  text: string;
  link: string;
  isExternal?: boolean;
  icon?: ReactNode | JSX.Element;
  subMenus?: MenuRoute[];
  shouldRender: boolean;
};

/**
 * Creates an array of MenuRoute objects based on the provided menuRoutes array.
 *
 * @param {Array<Omit<MenuRoute, "shouldRender"> & { shouldRender?: boolean }>} menuRoutes - An array of menu routes with optional shouldRender property.
 * @return {MenuRoute[]} An array of MenuRoute objects with the shouldRender property set to true if not explicitly set to false.
 */
export const createMenuRoutes = (
  menuRoutes: Array<
    Omit<MenuRoute, "shouldRender"> & { shouldRender?: boolean }
  >
): MenuRoute[] => {
  return menuRoutes.map((menuRoute) => ({
    ...menuRoute,
    shouldRender: menuRoute.shouldRender !== false,
    subMenus: menuRoute.subMenus?.map((subMenu) => ({
      ...subMenu,
      shouldRender: subMenu.shouldRender !== false,
    })),
  }));
};

export const webHeaderItems: MenuRoute[] = createMenuRoutes([
  {
    text: "Donde ahorrar",
    link: SwitchRoutesWeb.AssociatedCompanies,
  },
  {
    text: "Tarjetas",
    link: SwitchRoutesWeb.Cards,
  },
  {
    text: "Seguros",
    link: SwitchRoutesWeb.Insurances,
  },
  {
    text: "Viajeros",
    link: SwitchRoutesWeb.Travel,
  },
  {
    text: "Promociones",
    link: SwitchRoutesWeb.Promotions,
  },
  {
    text: "Revista",
    link: SwitchRoutesWeb.Magazine,
  },
]);


/**
 * Creates an array of MenuRoute objects with the shouldRender property set to true based on the provided boolean.
 * If the icons array is provided, it will be used to assign an icon to each menu item.
 * If the env property is provided and is not equal to 'prod', the link for the "Tienda Online" menu item will be
 * switched to the development link.
 *
 * @param {boolean} isLinkedCard - A boolean indicating if the card is linked.
 * @param {ReactNode[]} [icons] - An array of ReactNode components to be used as icons for each menu item.
 * @param {environments} [env] - The environment to use for the "Tienda Online" link.
 * @return {MenuRoute[]} An array of MenuRoute objects with the shouldRender property set to true.
 */
export const loggedInMenuRoutes: (
  isLinkedCard: boolean,
  icons?: ReactNode[],
  env?: environments
) => MenuRoute[] = (
  isLinkedCard: boolean,
  icons?: ReactNode[],
  env?: environments
): MenuRoute[] => {
  const menus = createMenuRoutes([
    {
      text: "Mis ahorros",
      link: SwitchRoutesWeb.Account,
    },
    {
      text: "Mis Movimientos",
      link: SwitchRoutesWeb.AccountCardTransactions,
      shouldRender: isLinkedCard,
    },
    {
      text: "Mis Seguros",
      link: SwitchRoutesWeb.AccountInsurances,
    },
    {
      text: "Mis Datos",
      link: SwitchRoutesWeb.AccountUserDetail,
    },
    {
      text: "Tienda Online",
      link:
        env != environments.PROD
          ? SwitchRoutesWeb.ExternalLinkShopDev
          : SwitchRoutesWeb.ExternalLinkShop,
      isExternal: true,
    },
  ]);

  if (icons) {
    return menus.map((menu, index) => {
      if (menu.shouldRender && icons && icons[index]) {
        return {
          ...menu,
          icon: icons[index],
        };
      }
      return menu;
    });
  }

  return menus;
};

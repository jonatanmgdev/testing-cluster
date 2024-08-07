import {
    SwitchRoutesBuilderio,
    SwitchRoutesWeb
  } from "@/web/core/config/router";
  import { ReactNode } from "react";

  export type MenuRoute = {
    text: string;
    link: any;
    isExternal?: boolean;
    icon?: ReactNode;
    subMenus?: MenuRoute[];
  };


  export const menuItems: MenuRoute[] = [
    {
      text: "Donde ahorrar",
      link: SwitchRoutesBuilderio.homeWeb,
    },
    {
      text: "Tarjetas",
      link: SwitchRoutesBuilderio.card,
    },
    {
      text: "Seguros",
      link: SwitchRoutesBuilderio.insurance,
    },
    {
      text: "Viajeros",
      link: SwitchRoutesBuilderio.travel,
    },
    {
      text: "Promociones",
      link: SwitchRoutesBuilderio.promotions,
    },
    {
      text: "Revista",
      link: SwitchRoutesWeb.Login, //TODO: modificar por el enlace correcto de builder io
    },
    {
      text: "Mapa de empresas asociadas",
      link: SwitchRoutesWeb.MapAssociatedCompanies,
    },
  ];

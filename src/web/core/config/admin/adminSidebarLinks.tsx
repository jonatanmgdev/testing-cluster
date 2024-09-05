import React from "react";
import { SwitchRoutesAdmin } from "../router";
import { MenuRoute } from "@/web/core/config";

export const adminMenuRoutes: MenuRoute[] = [
  {
    text: "Notificaciones",
    link: SwitchRoutesAdmin.Notifications,
    icon: <></>,
    subMenus: [
      {
        text: "Notificaciones",
        link: SwitchRoutesAdmin.Notifications,
        shouldRender: true,
      },
      {
        text: "Añadir notificación",
        link: SwitchRoutesAdmin.AddNotification,
        shouldRender: true,
      },
    ],
    shouldRender: true,
  },
];

import { Metadata } from "next";

export const web_generic_Metadata: Metadata = {
  icons: {
    icon: '/public/favicon.ico',
  },
};

export const home_Metadata: Metadata = {
  ...web_generic_Metadata,
  title: "VENTAJON - Inicio",
  description: "Descripción de home",
};

export const login_Metadata: Metadata = {
  ...web_generic_Metadata,
  title: "VENTAJON | Iniciar sesión",
  description: "Inicia sesión con tu cuenta VENTAJON",
};

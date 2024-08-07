import { Metadata } from "next";

export const admin_generic_Metadata : Metadata = {
  icons: {
    icon: '/public/favicon.ico',
  },
}

export const admin_notifications_Metadata : Metadata = {
  ...admin_generic_Metadata,
  title: "VENTAJON | Notifications",
  description: "Listado de notificaciones de VENTAJON.",
}

export const admin_notifications_details_Metadata : Metadata = {
  ...admin_generic_Metadata,
  title: "VENTAJON | Notificación",
  description: "Información de la notificación.",
}

export const admin_notifications_edit_Metadata : Metadata = {
  ...admin_generic_Metadata,
  title: "VENTAJON | Editar Notificación",
  description: "Editar una notificación de VENTAJON.",
}

export const admin_login_Metadata : Metadata = {
  ...admin_generic_Metadata,
  title: "VENTAJON | Login",
  description: "Inicia sesión con tu cuenta VENTAJON.",
}

export const admin_notifications_create_Metadata : Metadata = {
  ...admin_generic_Metadata,
  title: "VENTAJON | Crear Notificación",
  description: "Crear una nueva notificación de VENTAJON.",
}

export const admin_insurance_panel_Metadata : Metadata = {
  ...admin_generic_Metadata,
  title: "VENTAJON | Panel de Seguros.",
  description: "Gestiona los seguros de VENTAJON.",
}

export const admin_insurance_details_Metadata : Metadata = {
  ...admin_generic_Metadata,
  title: "VENTAJON | Detalle de Seguros.",
  description: "Información de la solicitud.",
}

export const admin_insurance_edit_Metadata : Metadata = {
  ...admin_generic_Metadata,
  title: "VENTAJON | Editar Seguro",
  description: "Editar una solicitud de seguro de VENTAJON.",
}
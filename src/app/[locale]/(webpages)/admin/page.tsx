import { MagazineBanner } from "@/components/MagazineBanner";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";

type Props = {
  params: { locale: string };
};

export default function AdminIndexPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Home");

  return (
    <MagazineBanner
      title="Revista"
      description="Descubre en este número como acumular descuentos en efectivo con VENTAJON, viaja con nosotros al mejor precio, conoce las promociones exclusivas de nuestras empresas asociadas y mucho más..."
      mobileImage="https://cdn.builder.io/api/v1/image/assets%2F79763df7e0b14004a1c7bf3dbd4453f9%2F791f41c0f78d4277be3d71a3d0ed60f5"
      desktopBackground="https://cdn.builder.io/api/v1/image/assets%2F79763df7e0b14004a1c7bf3dbd4453f9%2F9ee34907b7124fd09732843be25031d4"
      tabletBackground="https://cdn.builder.io/api/v1/image/assets%2F79763df7e0b14004a1c7bf3dbd4453f9%2Ff2caac329bfa409099930e4eb27d94a4"
    />
  );
}

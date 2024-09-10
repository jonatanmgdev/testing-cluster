import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react'

type Props = {
  params: { locale: string };
};

export default function AdminIndexPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Home");

  return (
    <div>{t("description")}</div>
  )
}

import { WebFooter, WebHeader } from "@/web/pods/web/layout";
import { FC } from "react";
import { LayoutInterface } from "@/web/core/config";
import WebWrapper from "./webWrapper";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const WebLayout: FC<LayoutInterface> = async ({
  children,
  params: { locale },
}) => {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body>
          <WebWrapper>
            <WebHeader />
            <main>{children}</main>
            <WebFooter />
          </WebWrapper>
        </body>
      </NextIntlClientProvider>
    </html>
  );
};

export default WebLayout;

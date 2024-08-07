import { WebFooter, WebHeader } from "@/web/pods/web/layout";
import { FC } from "react";
import { LayoutInterface } from "@/web/core/config";
import WebWrapper from "./webWrapper";


const WebLayout: FC<LayoutInterface> = async ({ children }) => {

  return (
    <WebWrapper>
      <WebHeader />
      <main>{children}</main>
      <WebFooter />
    </WebWrapper>
  );
};

export default WebLayout;

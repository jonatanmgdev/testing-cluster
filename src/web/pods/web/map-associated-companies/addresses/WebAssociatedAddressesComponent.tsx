"use client";
import dynamic from "next/dynamic";

const WebAssociatedAddressesMapWrapper = dynamic(
  () => import("./WebAssociatedAddressesMapWrapper"),
  { ssr: false }
);

export const WebAssociatedAddressesComponent = ({ addressesProps }: any) => {
  const { code } = addressesProps;

  return <WebAssociatedAddressesMapWrapper code={code} />;
};

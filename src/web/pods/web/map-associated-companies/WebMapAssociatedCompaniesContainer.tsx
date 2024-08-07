"use server";
import dynamic from "next/dynamic";

const WebMapAssociatedCompaniesComponent = dynamic(
  () => import("./WebMapAssociatedCompaniesComponent"),
  {
    ssr: false,
  }
);

export async function WebMapAssociatedCompaniesContainer() {
  return <WebMapAssociatedCompaniesComponent />;
}

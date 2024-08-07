import { WebAssociatedDetailsContainer } from "@/web/pods/web/map-associated-companies/details/WebAssociatedDetailsContainer";

export default async function AssociatedDetails({ params }: any) {
  const { code } = params;
  return <WebAssociatedDetailsContainer code={code} />;
}

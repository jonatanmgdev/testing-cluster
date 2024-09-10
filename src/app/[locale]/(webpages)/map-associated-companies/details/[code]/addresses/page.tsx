import { WebAssociatedAddressesContainer } from "@/web/pods/web/map-associated-companies/addresses/WebAssociatedAddressesContainer";

export default async function AssociatedDetails({ params }: any) {
  const { code } = params;
  return <WebAssociatedAddressesContainer code={code} />;
}

"use server";
import { WebAssociatedAddressesComponent } from "./WebAssociatedAddressesComponent";
import { getAssociatedBranchAddresses } from "..";

export interface AssociatedAdressessContainerProps {
  code: string;
}

export async function WebAssociatedAddressesContainer(
  props: AssociatedAdressessContainerProps
) {
  return <WebAssociatedAddressesComponent addressesProps={props} />;
}

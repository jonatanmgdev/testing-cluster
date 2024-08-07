"use server";
import React from "react";
import { WebAssociatedDetailsComponent } from "./WebAssociatedDetailsComponent";
import { getAssociateDetailsByCode } from "..";

interface AssociatedDetailsContainerProps {
  code: string;
}

export async function WebAssociatedDetailsContainer(
  props: AssociatedDetailsContainerProps
) {
  const { code } = props;
  async function fetchAssociatedDetail() {
    try {
      const associatedData = await getAssociateDetailsByCode(code);
      return associatedData;
    } catch (error) {
      console.error(error);
    }
  }
  const associatedDetails = await fetchAssociatedDetail();
  return (
    <WebAssociatedDetailsComponent associatedDetails={associatedDetails} />
  );
}

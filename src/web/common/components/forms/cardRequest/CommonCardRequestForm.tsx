
import { FC, useContext, useState } from "react";

interface CommonCardRequestFormProps {
  chipsStyles?: string;
  chipColor?: string;
  chipInactiveStyles?: string;
  chipActiveStyles?: string;
}


export const CommonCardRequestForm: FC<CommonCardRequestFormProps> = ({
  chipsStyles = "border-neutral-soft border-2",
  chipColor = "black",
  chipActiveStyles = "bg-neutral-soft",
  chipInactiveStyles = "",
}: CommonCardRequestFormProps): JSX.Element => {

  return (
    <></>
  );
};



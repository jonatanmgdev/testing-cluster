"use client";
import React, { useEffect } from "react";

export function InitProviders({ children }: { children: JSX.Element }) {
  // useEffect(() => {
  //   const initializedFirebaseFCM = async () => {
  //     onReceiveNotification();
  //   };
  //   initializedFirebaseFCM();
  // });

  return (
            {children}
  );
}
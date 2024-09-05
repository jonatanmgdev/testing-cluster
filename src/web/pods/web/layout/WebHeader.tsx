"use client";
import {
  SwitchRoutesWeb,
  } from "@/web/core/config";
import { UserContext } from "@/web/core/context/user/UserContext";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RefObject, useContext, useRef } from "react";
import { WebUserMenu } from "./components";

export default function WebHeader() {
  const { isUserLoggedIn, userInfo } = useContext(UserContext);
  const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const router: AppRouterInstance = useRouter();


  const UserButtons = ({ onClick }: { onClick: () => void }) => (
    <div className="hidden xl:flex xl:flex-row xl:gap-4 xl:justify-between">

    </div>
  );

  const GuestButtons = () => (
    <Link
      className="border-2 border-red-600 text-black hover:text-black rounded-full flex flex-row justify-center items-center gap-4  py-2 font-bold"
      href="#"
    >

      Iniciar sesión
    </Link>
  );



  return (
    <header>
      <div className="container py-4">
        <div
          className={"flex  items-center justify-between w-full"}
          ref={containerRef}
        >
          <div>
            <Link href={SwitchRoutesWeb.Home}>

            </Link>
          </div>
          <div className="hidden lg:block  w-full">
            <div className="p-2 text-white flex justify-center items-center text-center">

            </div>
          </div>
          <div>
            <div className="m-1 items-center align-middle text-center hidden lg:block w-48">
              {isUserLoggedIn ? (
                <UserButtons onClick={() => {}} />
              ) : (
                <GuestButtons />
              )}
            </div>
            <div className="lg:hidden inline-flex items-center justify-end w-full">

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

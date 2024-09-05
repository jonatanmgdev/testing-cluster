"use client";

import { CookieNames, MenuRoute } from "@/web/core/config";
import { SwitchRoutesWeb } from "@/web/core/config/router";
import Link from "next/link";
import { FC } from "react";

interface WebUserMenuProps {
  username: string;
  isUserLoggedIn: boolean;
}

/**
 * Renders the user menu component with the provided username and menu items.
 *
 * @param {WebUserMenuProps} props - The props object containing the username and isUserLoggedIn boolean.
 * @return {JSX.Element} The rendered user menu component.
 */
export const WebUserMenu: FC<WebUserMenuProps> = ({
  username,
  isUserLoggedIn,
}: WebUserMenuProps): JSX.Element => {


  return (
    <div className="flex flex-col p-8">
      {isUserLoggedIn ? (
        <>
          <h4 className="pb-5">Mi perfil</h4>
          <p className="pb-5 text-3xl font-normal">
            ¡Hola, <span className="font-bold text-3xl">{username}</span>!
          </p>
          
          <div className="flex justify-start pt-4">

          </div>
        </>
      ) : (
        <Link
          className="py-2  border-2 border-red-600 text-black w-full hover:text-black rounded-full flex flex-row justify-center items-center gap-3"
          href="#"
        >

          Iniciar sesión
        </Link>
      )}
    </div>
  );
};

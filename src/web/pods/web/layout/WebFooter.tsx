import Image from "next/image";
import { SwitchRoutesWeb } from "@/web/core/config/router";
import Link from "next/link";


export default function WebFooter() {
  return (
    <footer>
      <div className="container py-8 lg:py-16 px-4">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 md:w-1/4 pb-4 sm:pb-2">
            <p className="font-bold pb-2">Contacta con nosotros</p>
            <div className="">
              <ul className="space-y-2">
                <li>Ventajon Club</li>
                <li>
                  <p>Asegurados Ventajon</p>
                </li>
                <li>
                  <p>Viajeros Ventajon</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 pb-4 sm:pb-2">
            <p className="font-bold pb-2">¿Quienes somos?</p>
            <div className="">
              <ul className="space-y-2">
                <li>
                  <p>Programa de Fidelidad para Empresas</p>
                </li>
                <li>
                  <p>Programa de Fidelidad para Empresas</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 pb-4 sm:pb-2">
            <p className="font-bold pb-2">Condiciones generales</p>
            <div className="sm:pb-5">
              <ul className="space-y-2">
                <li>
                  <p>Síguenos</p>
                </li>
                <li>
                  <p>Revista</p>
                </li>
                <li>
                  <p>Blog</p>
                </li>
                <li>
                  <p>Facebook</p>
                </li>
                <li>
                  <p>Instagram</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 pb-4 sm:pb-2">
            <p className="font-bold pb-2">Enlaces de interés</p>
            <div className="sm:pb-5">
              <ul className="space-y-2">
                <li>
                  <Link href={`${SwitchRoutesWeb.GeneralConditions}`} className="text-inherit">Condiciones de uso</Link>
                </li>
                <li>
                  <Link href={SwitchRoutesWeb.PrivacyPolicy} className="text-inherit">Política de privacidad</Link>
                </li>
                <li>
                  <Link href={SwitchRoutesWeb.DataProtection} className="text-inherit">Política de cookies</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-center md:justify-between">
          <div className="flex md:flex-row items-center md:items-start gap-4">

          </div>
          <div className="social-media flex pt-4 md:pt-0 md:flex-row items-center justify-start md:items-end gap-2 w-full sm:w-1/2 md:w-1/4">
          </div>
        </div>
        <hr className="border-bottom border-zinc-400 my-8" />
        <div className="flex justify-center items-center pt-8">
          <p className="text-xs">© 2015-2023 Ventaja Europa S.A. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

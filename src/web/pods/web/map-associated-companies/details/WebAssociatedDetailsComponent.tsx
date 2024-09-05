"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { SwitchRoutesWeb } from "@/web/core/config/router";
import socialNetworksOptions from "../interfaces/socialNetworksOptions";
import NoveltyCard from "../components/novelty_card/NoveltyCard";
import { WebMapBranchModel, WebMapSocialMediaModel } from "../models";
import { ApiResponse } from "@/web/core/config";
import { apiStatus } from "@/web/core/config/apiResponseAdapter";
import { CommonButton } from "../components/button";
import dynamic from "next/dynamic";
const WebAssociatedDetailsMapWrapper = dynamic(
  () => import("./WebAssociatedDetailsMapWrapper"),
  { ssr: false }
);


interface WebAssociatedDetailsProps {
  associatedDetails?: ApiResponse<WebMapBranchModel>;
}

export const WebAssociatedDetailsComponent = ({ associatedDetails }: WebAssociatedDetailsProps) => {
  const router = useRouter();

  if (!associatedDetails || associatedDetails.status !== apiStatus.Success) {
    return (
      <div className="container">
        <div>
          <h1>No se encontró la sucursal</h1>
          <p>Disculpe las molestias.</p>
        </div>
      </div>
    );
  }

  const data = associatedDetails.data;
  if (!data) return null;

  const {
    company,
    address,
    latitude,
    longitude,
    is_novelty,
    social_media,
    official_hours,
    landline_phone_1,
    landline_phone_2,
    mobile_phone_1,
    mobile_phone_2,
    email,
    website_1,
    website_2,
  } = data;

  const handleDirectionsClick = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  const handleBranchAddresses = () => {
    router.push(
      `${company.code}${SwitchRoutesWeb.Addresses}latitude=${latitude}longitude=${longitude}`
    );
  };

  const showContactSection = () => {
    const parameters = [
      landline_phone_1,
      landline_phone_2,
      mobile_phone_1,
      mobile_phone_2,
      email,
      website_1,
      website_2,
    ];

    return parameters.some((param) => param !== null && param !== "");
  };

  const showSocialSection = (): ReactNode | null => {
    if (!social_media) return null;

    return social_media.map((network: WebMapSocialMediaModel) => {
      const networkOption = Object.values(socialNetworksOptions).find(
        (option) => option.code === network.code
      );

      if (!networkOption) return null;

      const url = network.url?.includes("@") ? network.url.replace("@", "") : network.url;

      return (
        <a key={network.code} href={url} target="_blank" rel="noopener noreferrer" className="m-2">
          <Image
            src={networkOption.icon}
            alt={network.social || network.code}
            width={30}
            height={30}
          />
        </a>
      );
    });
  };

  const formatURL = (url?: string) => {
    if (!url) return "";
    if (!url.startsWith("http://") && !url.startsWith("https://")) return "http://" + url;
    return url;
  };

  return (
    <div className="flex flex-col w-full align-middle">
      <div className="relative">
        <div className="w-full">
          <div
            className="h-[300px]"
            style={{
              backgroundImage: `url(/assets/web/bannerweb.jpg)`,
              backgroundPosition: "top",
              backgroundSize: "cover",
            }}
          />
        </div>
        <div className="p-4 bg-white rounded-t-3xl -mt-[30px] z-[999]">
          <div className="container">
            {/* Logo and name */}
            <div className="flex flex-col justify-center items-center md:mb-6">
              <div className="flex flex-col justify-center w-[92px] h-[92px] bg-white rounded-lg shadow-md p-2 -mt-[65px]">
                <Image
                  src={company.logo}
                  width={90}
                  height={90}
                  className=" max-h-[90px]"
                  alt="branchLogo"
                />
              </div>
              <h1 className="text-center pt-2">{data.name}</h1>
            </div>

            {/* Novelty section */}
            {is_novelty && (
              <div className="flex justify-center my-6">
                <NoveltyCard />
              </div>
            )}

            {/* description and discount */}
            <div className="grid grid-cols-1 md:grid-cols-6">
              <div className="order-2 md:order-1 col-span-1 md:col-span-4 pb-4">
                <h4 className="pb-4">Sobre nosotros</h4>
                <p>{company.about}</p>
                {social_media && <div className="flex flex-wrap mt-2">{showSocialSection()}</div>}
              </div>
              <div className="order-1 md:order-2 my-4 md:my-0 flex col-span-1 md:col-span-2 justify-center items-center md:justify-end">
                <div
                  style={{
                    backgroundImage: `url(/assets/web/rectangle-wave-bottom-red-big.svg)`,
                    backgroundPosition: "bottom",
                    backgroundSize: "cover",
                  }}
                  className="flex justify-center items-center w-full md:w-fit rounded-xl text-white my-3 py-3 px-6 gap-2"
                >
                  <div className="bg-accent-dark border-2 border-accent-medium rounded-lg p-3">
                    <div className="flex items-center justify-center h-full">
                      <p className="text-2xl">
                        <strong>{company.general_discount}%</strong>
                      </p>
                    </div>
                  </div>
                  <div className="my-3">
                    <div className="h-full">
                      <p className="text-xl">
                        <strong>Descuentos en efectivo</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* multiple locations */}
            {company.total_branches > 1 && (
              <div className="flex flex-col mb-4">
                <h4 className="pb-2">Donde estamos</h4>
                <CommonButton
                  onClick={handleBranchAddresses}
                  buttonStyle={{
                    color: "white",
                    rounded: "full",
                    size: "lg",
                    vPadding: "sm",
                  }}
                  buttonVariant="outline"
                  className="mt-2 w-fit"
                >
                  Ver todas las direcciones ({company.total_branches})
                </CommonButton>
              </div>
            )}

            {/* company address */}
            <div className="flex flex-col">
              <div className="grid grid-cols-1">
                <div className="col-span-1 pb-4">
                  <h4 className="pb-4">Dirección</h4>
                  <div className="flex pb-4 gap-2">
                    <div className="w-fit">
                      <HiOutlineLocationMarker size={24} className="text-blue-800" />
                    </div>
                    <div>
                      <p>{address}</p>
                      <CommonButton
                        onClick={
                          company.total_branches > 1 ? handleBranchAddresses : handleDirectionsClick
                        }
                        buttonStyle={{
                          color: "white",
                          rounded: "full",
                          size: "lg",
                          vPadding: "sm",
                        }}
                        buttonVariant="outline"
                        className="mt-2"
                      >
                        Como llegar
                      </CommonButton>
                    </div>
                  </div>
                  {<WebAssociatedDetailsMapWrapper  latitude={latitude} longitude={longitude} />}
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="grid grid-cols-1 md:grid-cols-4">
              {official_hours && (
                <div className="col-span-1 pb-4 gap-1">
                  <h4 className="pb-2">Horario</h4>
                  <p>{official_hours}</p>
                </div>
              )}

              {/* Contact */}
              {showContactSection() && (
                <div className="col-span-1 gap-1">
                  <h4 className="pb-2">Contacto</h4>
                  {landline_phone_1 && <p>{landline_phone_1}</p>}
                  {landline_phone_2 && <p>{landline_phone_2}</p>}
                  {mobile_phone_1 && <p>{mobile_phone_1}</p>}
                  {mobile_phone_2 && <p>{mobile_phone_2}</p>}
                  {email && <a href={`mailto:${email}`}>{email}</a>}
                  {website_1 && <a href={formatURL(website_1)}>{website_1}</a>}
                  {website_2 && <a href={formatURL(website_2)}>{website_2}</a>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

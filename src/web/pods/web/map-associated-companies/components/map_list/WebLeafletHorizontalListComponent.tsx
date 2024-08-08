"use client";
import React, { useContext, useEffect } from "react";
import { MapDataContext } from "@/web/core/context/maps/MapContext";
import { useRouter } from "next/navigation";
import { SwitchRoutesWeb } from "@/web/core/config/router";
import { CommonSlider } from "@/web/common/components/slider/CommonSlider";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import NoveltyCard from "../novelty_card/NoveltyCard";
import { CommonButton } from "../button";


// TODO(Mingo): Hacer de nuevo la lista independiente al cluster y la lista vertical.
const WebLeafletHorizontalListComponent = () => {
  // Gets the map context
  const mapContext = useContext(MapDataContext);

  if (!mapContext) throw new Error("Map context is not available");

  // Extract important variables from the map context
  const { horizontalList } = mapContext;

  const router = useRouter();

  return (
    <>
      {horizontalList.length > 0 ? (
        <CommonSlider swiperContainerHeight={310} spaceBetween={10}>
          {horizontalList.slice(0, Math.min(10, horizontalList.length)).map((branch, index) => (
            <SwiperSlide key={index} style={{ width: "auto", height: "300px" }}>
              <div className="card flex flex-col max-w-[320px] min-h-[280px] rounded-lg bg-white p-6 shadow-md justify-around">
                <div
                  className="flex w-full cursor-pointer gap-2"
                  onClick={() => router.push(`${SwitchRoutesWeb.AssociatedDetails}/${branch.code}`)}
                >
                  <div className="py-4 w-full">
                    <div className="line-clamp-1 mb-2 text-xl font-bold">{branch.name}</div>
                    <p className="line-clamp-2 text-base text-gray-700">{branch.company.about}</p>
                    <p className="text-red-700 font-bold line-clamp-1">
                      {branch.company.current_discount > branch.company.general_discount
                        ? branch.company.current_discount + "% Descuento en efectivo"
                        : branch.company.general_discount + "% Descuento en efectivo"}
                    </p>
                    <p className="text-[#9D9D9C] line-clamp-1 text-sm mt-2">
                      {(branch.distanceInMeters / 1000).toFixed(2)} km | {branch.locality}
                    </p>
                  </div>
                  <Image
                    src={branch.company.logo}
                    alt={`${branch.company.logo} ${branch.company.name}`}
                    width={80}
                    height={80}
                    style={{ objectFit: "contain", maxHeight: "80px" }}
                  />
                </div>
                <div className="grid grid-cols-2 w-full justify-between">
                  <CommonButton
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${branch.latitude},${branch.longitude}`,
                        "_blank"
                      )
                    }
                    buttonStyle={{ color: "white", rounded: "full", size: "md", vPadding: "sm" }}
                    buttonVariant="outline"
                  >
                    Cómo llegar
                  </CommonButton>
                  {branch.is_novelty && (
                    <div className="justify-self-end">
                      <NoveltyCard />
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </CommonSlider>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-12">
          <h2>¡Vaya!</h2>
          <p>
            De momento no tenemos Empresas Asociadas de este sector en tu zona, pero seguimos
            trabajando para incoporar más y más empresas donde poder ahorrar.
          </p>
        </div>
      )}
    </>
  );
};
export default WebLeafletHorizontalListComponent;

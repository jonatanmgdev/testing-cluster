"use client";

import { LatLng } from "leaflet";
import Image from "next/image";
import { useState } from "react";
import { capitalizeFLetter } from "@/web/utils/characterOperations";

interface Address {
  address: string;
  locality: string;
  province: string;
  latitude: number;
  longitude: number;
  landline_phone_1: string;
  landline_phone_2: string;
  postal_code: string;
  official_hours: string;
}

interface AddressesListProps {
  branches: Address[];
  handleMarkerClick: (index: number, latLng: LatLng) => void;
}

export const AddressesList = ({
  branches,
  handleMarkerClick,
}: AddressesListProps) => {
  const [selectedIndex, setSelectedIndex] = useState("");
  const howToGet = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  const warpInto = (latitude: number, longitude: number, index: string) => {
    const branchLatLng = new LatLng(latitude, longitude);
    setSelectedIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleMarkerClick(Number(index), branchLatLng);
  };

  return (
    <div>
      <ul>
        {branches.map((address: Address, index: number) => (
          <div
            key={index}
            id={index.toString()}
            className="hover:bg-gray-100 rounded-lg hover:cursor-pointer my-4 p-2"
          >
            <li
              onClick={() =>
                warpInto(address.latitude, address.longitude, index.toString())
              }
              className="flex"
            >
              <Image
                className="h-5 mt-1 flex items-start"
                src={'/assets/common/icons/MapPinIcon.svg'}
                width={20}
                height={20}
                alt="Icono de ubicación"
              />
              <div className="mx-5 ">
                <p
                  className={`text-xl ${
                    selectedIndex === index.toString() ? "font-bold" : ""
                  }`}
                >
                  {capitalizeFLetter(address.address) +
                    " " +
                    capitalizeFLetter(address.locality) +
                    ` (${capitalizeFLetter(address.postal_code)}) ` +
                    capitalizeFLetter(address.province)}
                </p>
                <p
                  className={`text-xl ${
                    selectedIndex === index.toString() ? "font-bold" : ""
                  }`}
                >
                  {address.postal_code}
                </p>
                <div
                  onClick={() => howToGet(address.latitude, address.longitude)}
                >
                  <p
                    className="text-xl hover:cursor-pointer"
                    style={{ color: "#CF3339" }}
                  >
                    Cómo llegar
                  </p>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

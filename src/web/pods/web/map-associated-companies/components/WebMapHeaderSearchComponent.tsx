"use client";
import { MapDataContext } from "@/web/core/context/maps/MapContext";
import { useContext } from "react";

export const WebMapHeaderSearchComponent: React.FC<{}> = () => {
  const mapContext = useContext(MapDataContext);
  if (!mapContext) throw new Error("Map context is not available");
  const { updateSearch } = mapContext;

  return (
    <input
      type="search"
      id="search"
      className="relative w-full min-h-[48px] rounded-lg bg-white p-2 border focus:outline-none border-neutral-dark text-neutral-deep placeholder:text-neutral-deep"
      placeholder="Dónde comprar"
      onChange={(e) => {
        const value = e.target.value.trim();
        updateSearch(value);
      }}
      required
    />
  );
};

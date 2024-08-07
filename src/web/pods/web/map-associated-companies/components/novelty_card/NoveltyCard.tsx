import React from "react";
import Image from "next/image";

export default function NoveltyCard() {
  return (
    <div className="flex w-fit min-h-[36px] px-4 rounded-lg gap-1 items-center bg-[#E8EFE6] text-[#195E02] text-center font-bold">
      <Image src={'/assets/common/icons/map-marker-star.svg'} alt="star icon" width={15} height={15} /> Novedad
    </div>
  );
}

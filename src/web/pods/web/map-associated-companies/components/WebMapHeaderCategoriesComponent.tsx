"use client";
import CommonChip from "@/web/common/components/chip/CommonChip";
import { MapDataContext } from "@/web/core/context/maps/MapContext";
import { useContext, useState, useEffect } from "react";
import { WebMapCategoryModel } from "../models";
import { WebMapHeaderFilterComponent } from "./WebMapHeaderFilterComponent";
import { CommonSlider } from "@/web/common/components/slider";

export const WebMapHeaderCategoriesComponent: React.FC<{}> = () => {
  const mapContext = useContext(MapDataContext);
  if (!mapContext) throw new Error("Map context is not available");
  const { categories, updateCategory } = mapContext;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    number | null
  >(null);

  const [moveToIndex, setMoveToIndex] = useState<number>(0);

  function updateCategoryAndIndex(
    category: WebMapCategoryModel,
    index: number
  ) {
    setMoveToIndex(-1);
    updateCategory(category);
    setSelectedCategoryIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  }

  const displayedCategories =
    selectedCategoryIndex !== null
      ? [
          categories[selectedCategoryIndex],
          ...categories.filter((_, item) => item !== selectedCategoryIndex),
        ]
      : categories;

  return (
    <CommonSlider selectedIndex={selectedCategoryIndex!} slideToIndex={moveToIndex} spaceBetween={5}>
      <swiper-slide key="filter" style={{ width: "auto" }}>
        <WebMapHeaderFilterComponent />
      </swiper-slide>

      {displayedCategories.map((category, index) => (
        <swiper-slide key={index} style={{ width: "auto", height: "36px" }}>
          <CommonChip
            key={index}
            onClick={() =>
              updateCategoryAndIndex(category, categories.indexOf(category))
            }
            color={
              selectedCategoryIndex === categories.indexOf(category)
                ? category.color
                : "#c3c3c3"
            }
            className={`rounded-full ${
              selectedCategoryIndex === categories.indexOf(category)
                ? "font-bold"
                : "font-semibold"
            } leading-none text-black px-4 py-2 border-2 mr-2`}
            icon={
              <img
                width={14}
                height={13}
                src={category.icon}
                alt="icono de la categoria"
              ></img>
            }
            text={category.name}
          />
        </swiper-slide>
      ))}
    </CommonSlider>
  );
};
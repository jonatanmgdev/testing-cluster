"use client";
import { MapDataContext } from "@/web/core/context/maps/MapContext";
import { useContext, useEffect, useState } from "react";
import { TypeEasFilterEnum } from "@/web/core/context/maps/enum/TypeEasFilterEnum";
import { DataMapperDropdown, mapDataToDropdownOption } from "./dropdown/utils/MapToDropdown";
import CommonDropdown from "./dropdown/CommonDropdown";
import { DropdownOption } from "./dropdown/interfaces/DropdownOption";

export const WebMapHeaderFilterComponent: React.FC<{}> = () => {
    const mapContext = useContext(MapDataContext);
    if (!mapContext) throw new Error('Map context is not available');
    const { updateMapFilterList, mapFilterList } = mapContext;

    const [filterSelected, setFilterSelected] = useState<TypeEasFilterEnum>(TypeEasFilterEnum.distance);

    useEffect(() => {
        updateMapFilterList( filterSelected );
    }, [mapFilterList, filterSelected, updateMapFilterList]);

    const FilterOptionsToMapper : DataMapperDropdown[] = [
        {
            id: TypeEasFilterEnum.distance.toString(),
            name: "Cerca de ti"
        },
        {
            id: TypeEasFilterEnum.novelty.toString(),
            name: "Novedades"
        },
        {
            id: TypeEasFilterEnum.highestDiscount.toString(),
            name: "% de descuento"
        },
        {
            id: TypeEasFilterEnum.AscendingOrder.toString(),
            name: "Nombre A-Z"
        },
        {
            id: TypeEasFilterEnum.DescendingOrder.toString(),
            name: "Nombre Z-A"
        }
    ]
    const filterOptions = mapDataToDropdownOption( FilterOptionsToMapper );
    return (
        <CommonDropdown
            id="filter"
            className="w-fit"
            placeholder="Seleccione filtro"
            CommonDropdownVariant="ROUNDED"
            selectClassName="min-h-[36px] max-w-[160px] mr-2"
            options={filterOptions}
            onSelectOption={(option: DropdownOption) => {
                const selectedValue = parseInt( option.key );
                switch( selectedValue ){
                    case TypeEasFilterEnum.distance:
                        setFilterSelected( TypeEasFilterEnum.distance );
                    break;
                    case TypeEasFilterEnum.highestDiscount:
                        setFilterSelected( TypeEasFilterEnum.highestDiscount );
                    break;
                    case TypeEasFilterEnum.AscendingOrder:
                        setFilterSelected( TypeEasFilterEnum.AscendingOrder );
                    break;
                    case TypeEasFilterEnum.DescendingOrder:
                        setFilterSelected( TypeEasFilterEnum.DescendingOrder );
                    break;
                    case TypeEasFilterEnum.novelty:
                        setFilterSelected( TypeEasFilterEnum.novelty );
                    break;
                }
            }}
            
        />
    );
};
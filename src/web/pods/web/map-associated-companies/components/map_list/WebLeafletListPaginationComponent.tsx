"use client";
import { SwitchRoutesWeb } from "@/web/core/config/router";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import NoveltyCard from "../novelty_card/NoveltyCard";
import { MapDataContext } from "@/web/core/context/maps/MapContext";
import { WebMapBranchModel } from "../../models";

const rowsPerPageOptions = [10, 25, 30];
export const WebLeafletListPaginationComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const router = useRouter();
  const mapContext = useContext(MapDataContext);
  if (!mapContext) throw new Error('Map context is not available');
  const {
    verticalList,
  } = mapContext;

  const [displayedMembers, setDisplayedMembers] = useState<WebMapBranchModel[]>(verticalList);

  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setDisplayedMembers(verticalList.slice(startIndex, endIndex));
  }, [verticalList, page, rowsPerPage]);

  const convertDistance = (meters: number): string => {
    const kilometers = meters / 1000; // Convert meters to kilometers
    if (kilometers < 1) {
      const formattedMeters = meters.toFixed(2).replace('.', ',');
      return `${formattedMeters} m`;
    } else {
      const roundedKilometers = Math.round(kilometers * 100) / 100;
      const formattedKilometers = roundedKilometers.toFixed(2).replace('.', ',');
      return `${formattedKilometers} km`;
    }
  };

  const tableContent = [
    {
      cell: (row: any) => (
        <Image
          data-tag="allowRowEvents"
          alt={`${row.company.logo} ${row.company.name}`}
          src={row.company.logo}
          width={80}
          height={80}
          style={{ objectFit: "cover", maxHeight: "80px" }}
        />
      ),
      grow: 0.5,
    },
    {
      cell: (row: any) => (
        <div className="flex flex-col">
          <div data-tag="allowRowEvents">
            {row.is_novelty && (
              <div className="justify-self-end mb-2">
                <NoveltyCard />
              </div>
            )}
          </div>
          <p data-tag="allowRowEvents" className="text-left font-bold">
            {row.company.name}
          </p>
          <p data-tag="allowRowEvents" className="text-left">
            {row.company.about}
          </p>
          {row.company.current_discount > row.company.general_discount ? (
            <p data-tag="allowRowEvents" className="text-left text-red-700 font-bold">
              {row.company.current_discount} % Descuento en efectivo
            </p>
          ) : (
            <p data-tag="allowRowEvents" className="text-left text-red-700 font-bold">
              {row.company.general_discount} % Descuento en efectivo
            </p>
          )}
          <p data-tag="allowRowEvents" className="text-left">
            {convertDistance (row.distanceInMeters)} {row.locality}
          </p>
        </div>
      ),
      grow: 10,
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página:",
    rangeSeparatorText: "de",
    selectAllRowsItem: false,
    selectAllRowsItemText: "Todos",
  };

  const customStyles = {
    rows: {
      style: {
        padding: "10px",
        backgroundColor: "white",
        "&:hover": {
          backgroundColor: "#F3F4F6",
        },
        cursor: "pointer",
      },
    },
  };
  const handleChangePage = (newPage: any) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
  };

  const handleRowClick = (row: WebMapBranchModel) => {
    //@ts-ignore
    router.push(`${SwitchRoutesWeb.AssociatedDetails}/${row.code}`);
  };

  return (
    <DataTable
      columns={tableContent}
      data={displayedMembers}
      noTableHead
      paginationRowsPerPageOptions={[10, 25, 30]}
      paginationPerPage={rowsPerPage}
      pagination
      paginationTotalRows={Math.floor(verticalList.length/rowsPerPage)}
      paginationServer
      paginationComponentOptions={paginationComponentOptions}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      onRowClicked={handleRowClick}
      customStyles={customStyles}
      noDataComponent={<CustomNoDataComponent />}
    />
  );
};

const CustomNoDataComponent = () => (
  <div className="text-gray-500">No hay elementos para mostrar.</div>
);

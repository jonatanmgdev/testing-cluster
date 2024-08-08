"use client";

import { SwitchRoutesWeb } from "@/web/core/config/router";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import NoveltyCard from "../novelty_card/NoveltyCard";
import { MapDataContext } from "@/web/core/context/maps/MapContext";
import { WebMapBranchModel } from "../../models";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const rowsPerPageOptions = [10, 25, 30];

export const WebLeafletListPaginationComponent = () => {
  const [page, setPage] = useState(0); // Zero-indexed page
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const router = useRouter();
  const mapContext = useContext(MapDataContext);
  if (!mapContext) throw new Error("Map context is not available");
  const { verticalList } = mapContext;

  const [displayedMembers, setDisplayedMembers] =
    useState<WebMapBranchModel[]>(verticalList);

  useEffect(() => {
    setPage(0);
  }, [verticalList]);

  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setDisplayedMembers(verticalList.slice(startIndex, endIndex));
  }, [verticalList, page, rowsPerPage]);

  const convertDistance = (meters: number): string => {
    const kilometers = meters / 1000;
    if (kilometers < 1) {
      const formattedMeters = meters.toFixed(2).replace(".", ",");
      return `${formattedMeters} m`;
    } else {
      const roundedKilometers = Math.round(kilometers * 100) / 100;
      const formattedKilometers = roundedKilometers
        .toFixed(2)
        .replace(".", ",");
      return `${formattedKilometers} km`;
    }
  };

  const handleRowClick = (row: WebMapBranchModel) => {
    router.push(`${SwitchRoutesWeb.AssociatedDetails}/${row.code}`);
  };

  const totalPages = Math.ceil(verticalList.length / rowsPerPage);

  const renderPaginationButtons = () => {
    return (
      <div className="flex items-center space-x-2">
        {/* First Page Button */}
        <Button
          onClick={() => setPage(0)}
          disabled={page === 0}
          variant="outline"
        >
          Primera
        </Button>

        {/* Previous Page Button */}
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          variant="outline"
        >
          Anterior
        </Button>

        {/* Display the current range */}
        <span className="text-gray-600">
          {page * rowsPerPage + 1} -{" "}
          {Math.min((page + 1) * rowsPerPage, verticalList.length)} de{" "}
          {verticalList.length}
        </span>

        {/* Next Page Button */}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages - 1}
          variant="outline"
        >
          Siguiente
        </Button>

        {/* Last Page Button */}
        <Button
          onClick={() => setPage(totalPages - 1)}
          disabled={page >= totalPages - 1}
          variant="outline"
        >
          Última
        </Button>
      </div>
    );
  };

  return (
    <div>
      <Table>
        <TableBody>
          {displayedMembers.map((row) => (
            <TableRow
              key={row.code}
              onClick={() => handleRowClick(row)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <TableCell className="flex items-center">
                <Avatar className="mr-4">
                  {row.company.logo ? (
                    <Image
                      alt={`${row.company.logo} ${row.company.name}`}
                      src={row.company.logo}
                      width={80}
                      height={80}
                      style={{ objectFit: "contain", maxHeight: "80px" }}
                    />
                  ) : (
                    <AvatarFallback>
                      {row.company.name[0].toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  {row.is_novelty && (
                    <div className="justify-self-end mb-2">
                      <NoveltyCard />
                    </div>
                  )}
                  <p className="text-left font-bold">{row.company.name}</p>
                  <p className="text-left">{row.company.about}</p>
                  {row.company.current_discount >
                  row.company.general_discount ? (
                    <p className="text-left text-red-700 font-bold">
                      {row.company.current_discount} % Descuento en Efectivo
                    </p>
                  ) : (
                    <p className="text-left text-red-700 font-bold">
                      {row.company.general_discount} % Descuento en Efectivo
                    </p>
                  )}
                  <p className="text-left text-gray-600">
                    {convertDistance(row.distanceInMeters)} {row.locality}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <div>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(0); // Reset to the first page when changing rows per page
            }}
            className="p-2 border rounded-md"
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option} por página
              </option>
            ))}
          </select>
        </div>

        {/* Pagination Buttons */}
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

export default WebLeafletListPaginationComponent;
"use client";

import { useEffect, useState } from "react";
import { WebMapBranchModel, WebMapCategoryModel, WebMapMarketModel } from "./models";
import CommonCircularProgress from "@/web/common/components/progress/CommonCircularProgress";
import { ApiResponse } from "@/web/core/config";
import { getDistance } from "geolib";
import { getBranches, getCategories, getMarkets } from "./WebMapAssociatedCompanies-Api";
import { MapContextProvider } from "@/web/core/context/maps/MapContextProvider";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import PageHeader from "@/web/common/components/header/pageHeader";
const WebMapWrapper = dynamic(() => import("./components/wrapper/WebMapWrapper"), { ssr: false });

const callback = async function api() {
  const [branches, categories, markets] = await Promise.all([
    getBranches(),
    getCategories(),
    getMarkets(),
  ]);
  return { branches, categories, markets };
};

const WebMapAssociatedCompaniesComponent: React.FC<{}> = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loadedData, setLoadedData] = useState({
    branches: [] as WebMapBranchModel[],
    categories: [] as WebMapCategoryModel[],
    markets: [] as WebMapMarketModel[],
  });
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log(loadedData.branches.length);

  useEffect(() => {
    console.log("tabParam");
    let tabParam = searchParams.get("tab");
    if (tabParam === null) {
      router.push("?tab=map");
    }
  }, [router, searchParams]);


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError("");
        },

        (error) => {
          setError(error.message);
        },

        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError("La geolocalización no es compatible con este navegador.");
    }
  }, []);

  useEffect(() => {
    if (
      loadedData.branches.length === 0 ||
      loadedData.categories.length === 0 ||
      loadedData.markets.length === 0
    ) {
      console.log("locurote");
      callback().then(
        (data: {
          branches: ApiResponse<WebMapBranchModel[]>;
          categories: ApiResponse<WebMapCategoryModel[]>;
          markets: ApiResponse<WebMapMarketModel[]>;
        }) => {
          const { branches, categories, markets } = data;
          setLoadedData({
            branches: branches.data ?? [],
            categories: categories.data ?? [],
            markets: markets.data ?? [],
          });
          setDataLoaded(true);
        }
      );
    } else {
      setDataLoaded(true);
    }
  }, [loadedData.branches, loadedData.categories, loadedData.markets]);

  console.log("LOADED branches", loadedData.branches.length);
  console.log("LOADED categories", loadedData.categories.length);
  console.log("LOADED markets", loadedData.markets.length);

  loadedData.branches = loadedData.branches.map((item) => ({
    ...item,
    distanceInMeters: getDistance(
      { latitude: latitude, longitude: longitude },
      { latitude: item.latitude, longitude: item.longitude }
    ),
  }));

  if (!dataLoaded)
    return <CommonCircularProgress sizeCircular={"100"} textLoading={"Cargando..."} />;

  return (
    <>
      <PageHeader
        title="Mapa de empresas asociadas"
        description="Consulta los descuentos en efectivo en más de 4.000 establecimientos cerca de ti gracias a nuestro mapa, paga con tu tarjeta VENTAJON y sácale el máximo rendimiento a tu dinero."
        className="py-12 text-white bg-gradient-to-r from-[#1C3F8B] to-[#2D9AFF]"
      />
      <div className="mt-3">
        <MapContextProvider
          bra={loadedData.branches.length === 0 ? [] : loadedData.branches}
          cat={loadedData.categories.length === 0 ? [] : loadedData.categories}
          mar={loadedData.markets.length === 0 ? [] : loadedData.markets}
        >
          <WebMapWrapper />
        </MapContextProvider>
      </div>
    </>
  );
};

export default WebMapAssociatedCompaniesComponent;

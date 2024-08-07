"use client";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { LatLng } from "leaflet";
import { useSearchParams } from "next/navigation";
import { WebMarkerSingleIconComponent } from "../components";
import { InstantiateMap } from "../components/InstantiateMap";
import { AddressesList } from "../components/AddressesList";
import { getAssociatedBranchAddresses } from "../WebMapAssociatedCompanies-Api";
import { apiStatus } from "@/web/core/config/apiResponseAdapter";
import { WebMapBranchesAddressesModel } from "../models";
import { ApiResponse } from "@/web/core/config";
import CommonCircularProgress from "@/web/common/components/progress/CommonCircularProgress";

export const WebAssociatedAddressesComponent = ({ addressesProps }: any) => {
  const [fetchedData, setFetchedData] = useState<
    ApiResponse<WebMapBranchesAddressesModel>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWarpAction, setIsWarpAction] = useState<boolean>(false);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number>(0);
  const [markerKey, setMarkerKey] = useState<number>(0);

  const dataInitializer = (
    latitude: string | null,
    longitude: string | null
  ) => [latitude ? Number(latitude) : 0, longitude ? Number(longitude) : 0];

  const handleMarkerClick = (index: number, position: LatLng) => {
    setIsWarpAction(true);
    setMapCenter(position);
    setSelectedMarkerIndex(index);
    setMarkerKey((prevKey) => prevKey + 1);
  };

  const WarpToCenter = ({ center }: any) => {
    const map = useMap();
    useEffect(() => {
      if (isWarpAction) {
        map.flyTo(center, 15);
        setIsWarpAction(false);
      }
    }, [isWarpAction, center, map]);
    return null;
  };

  const { code } = addressesProps;
  const searchParams = useSearchParams();
  const initialDirection = dataInitializer(
    searchParams.get("latitude"),
    searchParams.get("longitude")
  );
  const [mapCenter, setMapCenter] = useState<LatLng>(
    new LatLng(initialDirection[0], initialDirection[1])
  );

  useEffect(() => {
    const fetchData = async () => {
      if (searchParams.get("latitude") && searchParams.get("longitude")) {
        getAssociatedBranchAddresses(
          code,
          initialDirection[0],
          initialDirection[1]
        ).then((response) => {
          switch (response.status) {
            case apiStatus.Success:
              setIsLoading(false);
              setFetchedData(response);
              break;
            default:
              setIsLoading(false);
              break;
          }
        });
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <CommonCircularProgress
        sizeCircular={"100"}
        textLoading="Obteniendo las direcciones..."
        className="py-28"
      />
    );
  }

  return (
    <div>
      {!isLoading && mapCenter && fetchedData.data ? (
        <div className="container">
          <h1 className="text-center mt-8">
            {fetchedData.data.associate_name}
          </h1>
          <p className="text-2xl font-bold">Dónde estamos</p>
          <div className="my-4">
            <MapContainer
              attributionControl={false}
              center={mapCenter}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}?language=es&region=ES"
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
              {fetchedData.data?.addresses.map(
                (
                  address: {
                    official_hours: string;
                    observation: string;
                    landline_phone_1: string;
                    landline_phone_2: string;
                    latitude: number;
                    longitude: number;
                    postal_code: string;
                    locality: string;
                    province: string;
                    mobile_phone_1: string;
                    mobile_phone_2: string;
                    address: string;
                  },
                  index: number
                ) => (
                  <Marker
                    key={`${index}-${markerKey}`}
                    position={[address.latitude, address.longitude]}
                    icon={WebMarkerSingleIconComponent()}
                    eventHandlers={{
                      click: () =>
                        handleMarkerClick(
                          index,
                          new LatLng(address.latitude, address.longitude)
                        ),
                    }}
                  >
                    {/* <BouncingMarker
                      position={[address.latitude, address.longitude]}
                      isSelected={index === selectedMarkerIndex}
                    /> */}
                  </Marker>
                )
              )}
              <InstantiateMap branches={fetchedData.data.addresses} />
              <WarpToCenter center={mapCenter} />
            </MapContainer>
          </div>
          <p className="text-2xl">
            <strong>"Direcciones de la tienda</strong>
          </p>
          <div className="mt-5">
            <AddressesList
              branches={fetchedData.data.addresses}
              handleMarkerClick={handleMarkerClick}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-center py-28">
          <h1>Error</h1>
          <p>No ha sido posible obtener las ubicaciones</p>
        </div>
      )}
    </div>
  );
};

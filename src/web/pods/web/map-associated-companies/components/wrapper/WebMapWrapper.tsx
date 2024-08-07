"use client";
import WebLeafletMapComponent from "../map_view/WebLeafletMapComponent";
import { WebLeafletListComponent } from "../map_list/WebLeafletListComponent";
import WebMapHeadersComponent from "../WebMapHeadersComponent";
import { useContext, useEffect } from "react";
import { MapDataContext } from "@/web/core/context/maps/MapContext";
import { useRouter, useSearchParams } from "next/navigation";

const WebMapWrapper: React.FC<{}> = () => {
  const searchParams = useSearchParams();
  let tabParam = searchParams.get("tab");
  const mapContext = useContext(MapDataContext);
  if (!mapContext) throw new Error("Map context is not available");
  const router = useRouter();
  const { mapActiveTab, updateMapActiveTab } = mapContext;

  useEffect(() => {
    updateMapActiveTab(tabParam !== null ? tabParam : "map");
  }, []);

  const handleTab = (tab: string) => {
    updateMapActiveTab(tab);
    router.push(`?tab=${tab}`);
  };

  return (
    <div className="container my-4">
      <div className="my-8">
        <WebMapHeadersComponent />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <button
            className={`py-2 px-6 bg-white rounded-l-md border ${
              mapActiveTab === "map" ? "font-bold border-neutral-deep" : "font-medium border-neutral-medium"
            }`}
            onClick={() => handleTab("map")}
          >
            Mapa
          </button>
          <button
            className={`py-2 px-6 bg-white rounded-r-md border ${
              mapActiveTab === "list" ? "font-bold border-neutral-deep" : "font-medium border-neutral-medium"
            }`}
            onClick={() => handleTab("list")}
          >
            Lista
          </button>
        </div>
        <div>
          <div
            className={`transition-all duration-300 ${
              mapActiveTab === "map" ? "block" : "hidden"
            } `}
          >
            <WebLeafletMapComponent />
          </div>
          <div
            className={`transition-all duration-300 ${
              mapActiveTab === "map" ? "hidden" : "block"
            } `}
          >
            <WebLeafletListComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebMapWrapper;

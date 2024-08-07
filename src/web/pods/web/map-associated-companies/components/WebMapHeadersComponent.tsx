"use client";
import {
  WebMapHeaderCategoriesComponent,
  WebMapHeaderSearchComponent,
} from ".";

const WebMapHeadersComponent: React.FC<{}> = () => {
  return (
    <div className="grid grid-cols-1">
      <div className="grid gap-6">
        <h3>Empresas asociadas</h3>
        <WebMapHeaderSearchComponent />
      </div>
      <div className="mt-10">
        <WebMapHeaderCategoriesComponent />
      </div>
    </div>
  );
};

export default WebMapHeadersComponent;

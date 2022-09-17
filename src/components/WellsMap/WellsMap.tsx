import { Card } from "antd";
import "leaflet/dist/leaflet.css";
import { Well } from "models/well";
import React, { memo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { GiOilRig } from "react-icons/gi";
import { divIcon } from "leaflet";

type Props = {
  defaultCenter?: [number, number];
  defaultZoom?: number;
  wells: Array<Well>;
};

function WellsMap({
  defaultCenter = [26.8206, 30.8025],
  defaultZoom = 5,
  wells,
}: Props) {
  return (
    <Card>
      <MapContainer
        className="w-full h-full"
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom
        maxZoom={40}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {wells
          ?.filter((e) => e.lat && e.lon)
          ?.map((well, index) => (
            <Marker
              key={index}
              title={well?.name}
              position={[well?.lat, well?.lon]}
              // @ts-ignore
              icon={divIcon({
                className: "bg-transparent border-none !mt-[-30px]",
                iconSize: 30 as any,
                html: renderToStaticMarkup(
                  <GiOilRig className="text-4xl text-indigo-700" />
                ),
              })}
            >
              <Popup>{well?.name}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </Card>
  );
}

export default memo(
  WellsMap,
  (prev: Props | undefined, current: Props) =>
    JSON.stringify(prev) === JSON.stringify(current)
);

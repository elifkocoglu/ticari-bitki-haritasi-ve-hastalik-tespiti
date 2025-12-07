"use client";

import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import type { FeatureCollection } from "geojson";
import { useRouter } from "next/navigation";
import L from "leaflet";

interface TurkeyMapProps {
  className?: string;
  interactive?: boolean;
}

export default function TurkeyMap({ className, interactive = true }: TurkeyMapProps) {
  const [data, setData] = useState<FeatureCollection | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/tr-provinces.geojson").then(r => r.json()).then(setData).catch(() => setData(null));
  }, []);

  const center = useMemo(() => ({ lat: 39, lng: 35 }), []);

  function FitBounds({ fc }: { fc: FeatureCollection }) {
    const map = useMap();
    useEffect(() => {
      const gj = L.geoJSON(fc as any);
      const b = gj.getBounds();
      if (b.isValid()) {
        map.fitBounds(b, { padding: [20, 20] });
      }
    }, [fc, map]);
    return null;
  }

  return (
    <div className={`w-full bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-200 cursor-pointer shadow-sm ${className || "h-[85vh]"}`}>
      <MapContainer center={center} zoom={5.6} scrollWheelZoom={false} zoomControl={false} style={{ height: "100%", width: "100%", background: "transparent" }}>
        {data && (
          <GeoJSON
            data={data}
            style={() => ({
              color: "#4CAF50", // koyu yeşil sınır
              weight: 0.8,
              fillColor: "#F5F5DC", // bej dolgu
              fillOpacity: 0.6,
            })}
            onEachFeature={(feature: any, layer: any) => {
              layer.on({
                click: () => {
                  if (!interactive) return; // Disable navigation if not interactive

                  // GeoJSON IDs are not reliable plate numbers (e.g. Ankara is ID 7 but Plate 06)
                  // So we use the property name which is safer.
                  if (feature.properties?.name) {
                    router.push(`/il/${feature.properties.name}`);
                  }
                },
                mouseover: (e: L.LeafletMouseEvent) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.9,
                    weight: 2,
                    color: "#2E7D32"
                  });
                  layer.openTooltip();
                },
                mouseout: (e: L.LeafletMouseEvent) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.6,
                    weight: 0.8,
                    color: "#4CAF50"
                  });
                  layer.closeTooltip();
                }
              });

              if (feature.properties?.name) {
                layer.bindTooltip(feature.properties.name, {
                  permanent: false,
                  direction: "top",
                  sticky: true,
                  className: "bg-white px-3 py-1 rounded-lg shadow-md border border-zinc-100 text-sm font-medium text-zinc-700"
                });
              }
            }}
          />
        )}
        {data && <FitBounds fc={data} />}
      </MapContainer>
    </div>
  );
}







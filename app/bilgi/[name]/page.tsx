import { readFile } from "fs/promises";
import path from "path";

type Plant = {
  name: string;
  regions: string[];
  soil: string;
  fertilizer: string;
  watering: string;
  sun: string;
};

export default async function PlantDetail({ params }: { params: { name: string } }) {
  const dataPath = path.join(process.cwd(), "data", "plants.json");
  const plants = JSON.parse(await readFile(dataPath, "utf-8")) as Plant[];
  const decoded = decodeURIComponent(params.name);
  const plant = plants.find((p) => p.name.toLowerCase() === decoded.toLowerCase());
  if (!plant) {
    return <div className="max-w-3xl mx-auto px-4 py-10">Bitki bulunamadı.</div>;
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-primary mb-4">{plant.name}</h1>
      <div className="space-y-2">
        <p><span className="font-semibold">Bölgeler:</span> {plant.regions.join(", ")}</p>
        <p><span className="font-semibold">Toprak:</span> {plant.soil}</p>
        <p><span className="font-semibold">Gübre:</span> {plant.fertilizer}</p>
        <p><span className="font-semibold">Sulama:</span> {plant.watering}</p>
        <p><span className="font-semibold">Güneş:</span> {plant.sun}</p>
      </div>
    </div>
  );
}







import { MainNav } from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { PostamatColumn, columns } from "./components/columns";
import axios from "axios";
import { DataTable } from "@/components/ui/data-table";

export default async function Home() {
  const url = "https://api.pochtomat.tech/v1/limited-terminals/?limit=200";
  const headers = {
    Authorization: "Token 2637f00f-5ad8-473b-abdd-53e8c01b52b7",
  };

  const { data } = await axios.get(url, { headers });
  const { results } = data;
  //   console.log(results);

  const freeCells = (item: { cells: { total: any; free: any; }; }) => {
    const free = Number(item.cells.total) - Number(item.cells.free);
    return free;
  };

  const formattedPostamats: PostamatColumn[] = results.map((item: { number: string; status: string; cells: { total: any; free: any; }; structured_address: { city: string; street: string; }; point: {coordinates: number[]} }) => ({
    name: item.number,
    status: item.status === "ОК" ? "ON" : "OFF",
    total: item.cells.total,
    free: item.cells.free,
    loaded: freeCells(item),
    city: item.structured_address.city,
    address: item.structured_address.street,
    sizes: item.cells,
    location: item.point.coordinates
  }));


  return (
    <>
      <div className="mx-6">
        <Separator className="mb-10" />
        <DataTable
          columns={columns}
          data={formattedPostamats}
        />
      </div>
    </>
  );
}

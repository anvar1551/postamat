  
  "use client";
  import { useState, useEffect } from "react";
  import axios from "axios";
  import Image from "next/image";
  import { Separator } from "@/components/ui/separator";
  import { PostamatColumn, columns } from "./components/columns";
  import { DataTable } from "@/components/ui/data-table";

  export default function Home() {
    const [postamats, setPostamats] = useState<PostamatColumn[]>([]); // State to store the data
    const url = "https://api.pochtomat.tech/v1/limited-terminals/?limit=200";
    const headers = {
      Authorization: "Token 2637f00f-5ad8-473b-abdd-53e8c01b52b7",
    };

    const fetchData = () => {
      axios.get(url, { headers }).then((response) => {
        const { data } = response;
        const { results } = data;
  
        const formattedPostamats: PostamatColumn[] = results.map((item: { number: string; status: string; cells: { total: any; free: any; }; structured_address: { city: string; street: string; region: string}; point: {coordinates: number[]} }) => ({
          name: item.number,
          status: item.status === "ОК" ? "ON" : "OFF",
          total: item.cells.total,
          free: item.cells.free,
          loaded: freeCells(item),
          region: item.structured_address.region,
          city: item.structured_address.city,
          address: item.structured_address.street,
          sizes: item.cells,
          location: item.point.coordinates
        }));
        setPostamats(formattedPostamats);
      });
    };

    useEffect(() => {
      fetchData(); // Fetch data when the component mounts
    }, []);

    
    //   console.log(results);

    const freeCells = (item: { cells: { total: any; free: any; }; }) => {
      const free = Number(item.cells.total) - Number(item.cells.free);
      return free;
    };

    return (
      <>
        <div className="mx-6">
          <Separator className="mb-10" />
          <DataTable
            columns={columns}
            data={postamats} 
          />
        </div>
      </>
    );
  }

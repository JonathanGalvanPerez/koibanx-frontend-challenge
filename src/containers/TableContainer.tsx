import React, { useEffect, useState } from "react";
import {
  Box,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "react-query";
import getQuery from "../utils/getQuery";
import { getData } from "../services/HttpService";
import SearchBar from "../components/SearchBar";
import DataTable from "../components/DataTable";
import Commerce from "../models/Commerce.model";

const ROWS_PER_PAGE = 10;
const fields: Array<Array<{ key: keyof Commerce; name: string }>> = [
  [
    { key: "id", name: "ID" },
    { key: "name", name: "Comercio" },
    { key: "cuit", name: "CUIT" },
    { key: "currentBalance", name: "Balance Actual" },
    { key: "active", name: "Activo" },
    { key: "lastSale", name: "Última Venta" },
  ]
]

export default function TableContainer() {
  const [searchData, setSearchData] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [order, setOrder] = useState<string>("id");
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();
  const { data, isPreviousData } = useQuery(
    ["projects", searchData, activeFilter, order, page],
    () =>
      getData(getQuery(searchData, activeFilter, order, page, ROWS_PER_PAGE)),
    { keepPreviousData: true, staleTime: 5000 }
  );

  useEffect(() => {
    console.log("Re fetching...");

    queryClient.prefetchQuery(
      ["projects", searchData, activeFilter, order, page + 1],
      () =>
        getData(
          getQuery(searchData, activeFilter, order, page + 1, ROWS_PER_PAGE)
        )
    );
  }, [activeFilter, order, page, queryClient, searchData]);


  return (
    <Box
      w={{ base: "100%", lg: "80%" }}
      mx={{ lg: "auto" }}
      px={{ base: "10px" }}
    >
      <SearchBar onSearch={setSearchData} />
      <DataTable data={data.data} fields={fields[0]} />
    </Box>
  );
}

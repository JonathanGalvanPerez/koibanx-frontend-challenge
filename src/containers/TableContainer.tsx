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
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import { getData } from "../services/HttpService";
import getQuery from "../utils/getQuery";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import Commerce from "./../models/Commerce.model";

const ROWS_PER_PAGE = 10;
const fields: Array<Array<{ key: keyof Commerce; name: string }>> = [
  [
    { key: "id", name: "ID" },
    { key: "name", name: "Comercio" },
    { key: "cuit", name: "CUIT" },
    { key: "currentBalance", name: "Balance Actual" },
    { key: "active", name: "Activo" },
    { key: "lastSale", name: "Última Venta" },
  ],
  [
    { key: "id", name: "ID" },
    { key: "name", name: "Comercio" },
    { key: "concept1", name: "Concepto 1" },
    { key: "concept2", name: "Concepto 2" },
    { key: "concept3", name: "Concepto 3" },
    { key: "concept4", name: "Concepto 4" },
    { key: "concept5", name: "Concepto 5" },
    { key: "concept6", name: "Concepto 6" },
  ],
];

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

  const placeholder = (
    <Stack align="center" w={{ base: "100%", lg: "80%" }} mx="auto">
      <Skeleton h="30px" w="100%" />
      <Skeleton h="30px" w="100%" />
      <Skeleton h="30px" w="100%" />
      <Skeleton h="30px" w="100%" />
      <Skeleton h="30px" w="100%" />
      <Skeleton h="30px" w="100%" />
      <Skeleton h="30px" w="100%" />
      <Skeleton h="30px" w="100%" />
      <Skeleton h="30px" w="100%" />
      <Skeleton h="30px" w="50%" />
    </Stack>
  );

  return (
    <Box
      w={{ base: "100%", lg: "80%" }}
      mx={{ lg: "auto" }}
      px={{ base: "10px" }}
    >
      <SearchBar onSearch={setSearchData} />
      <Filters
        activeFilter={activeFilter}
        order={order}
        setActiveFilter={setActiveFilter}
        setOrder={setOrder}
        resetPage={() => setPage(1)}
      />
      {data === undefined ? (
        placeholder
      ) : (
        <Box>
          <Tabs variant="soft-rounded">
            <TabList>
              <Tab _selected={{ color: "white", bg: "#04AA6D" }}>
                Información general
              </Tab>
              <Tab _selected={{ color: "white", bg: "#04AA6D" }}>Conceptos</Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0}>
                <DataTable data={data.data} fields={fields[0]} />
              </TabPanel>
              <TabPanel px={0}>
                <DataTable data={data.data} fields={fields[1]} />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Pagination
            page={page}
            pages={data.pages}
            limit={data.limit}
            total={data.total}
            setPage={setPage}
            isPreviousData={isPreviousData}
          />
        </Box>
      )}
    </Box>
  );
}

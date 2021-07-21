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


export default function TableContainer() {
  const [searchData, setSearchData] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [order, setOrder] = useState<string>("id");
  const [page, setPage] = useState<number>(1);

  return (
    <Box
      w={{ base: "100%", lg: "80%" }}
      mx={{ lg: "auto" }}
      px={{ base: "10px" }}
    >
    </Box>
  );
}

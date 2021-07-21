import { HStack, Select } from "@chakra-ui/react";
import React from "react";

type FiltersProps = {
  activeFilter: string;
  order: string;
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  resetPage: () => void;
};

export default function Filters({
  activeFilter,
  order,
  setActiveFilter,
  setOrder,
  resetPage,
}: FiltersProps) {
  return (
    <HStack mb={4}>
      <Select
        value={order}
        onChange={(event) => {
          setOrder(event.target.value);
          resetPage();
        }}
      >
        <option value="cuit">Cuit</option>
        <option value="id">ID</option>
      </Select>
      <Select
        value={activeFilter}
        onChange={(event) => {
          setActiveFilter(event.target.value);
          resetPage();
        }}
      >
        <option value="">Todos</option>
        <option value="activo">Activos</option>
        <option value="no activo">No Activos</option>
      </Select>
    </HStack>
  );
}

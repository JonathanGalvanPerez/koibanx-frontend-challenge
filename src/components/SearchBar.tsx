import { Button, HStack, Input } from "@chakra-ui/react";
import React, { KeyboardEvent, useState } from "react";

type SearchBarProps = {
  onSearch: (searchData: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchData, setSearchData] = useState("");
  const searchButtonHandler = async () => {
    onSearch(searchData);
  };
  const enterPressHandler = (event: KeyboardEvent) => {
    if (event.code === "Enter") searchButtonHandler();
  };
  return (
    <HStack my={2}>
      <Input
        type="search"
        placeholder="Introduzca su búsqueda"
        value={searchData}
        onChange={(event) => setSearchData(event.target.value)}
        onKeyUp={enterPressHandler}
      />
      <Button type="button" onClick={searchButtonHandler}>
        Buscar
      </Button>
    </HStack>
  );
}

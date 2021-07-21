import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";

type PaginationProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isPreviousData: boolean;
  page: number;
  pages: number;
  limit: number;
  total: number;
};

export default function Pagination({
  setPage,
  isPreviousData,
  page,
  pages,
  limit,
  total,
}: PaginationProps) {

  const isMobile = useBreakpointValue({ base: true, sm: false })
  const pageLink = (page: number) => () => setPage(page);

  const paginationNumbers: Array<JSX.Element> = [];
  let start: number;
  let end: number;
  if(isMobile){
    start = pages - page < 3 ? Math.max(pages - 4, 1) : Math.max(page - 2, 1);
    end = page < 3 ? Math.min(5, pages) : Math.min(page + 2, pages);
  } else {
    start = pages - page < 5 ? Math.max(pages - 8, 1) : Math.max(page - 4, 1);
    end = page < 5 ? Math.min(9, pages) : Math.min(page + 4, pages);
  }
  for (let index = start; index <= end; index++) {
    if (index === page)
      paginationNumbers.push(
        <BreadcrumbItem key={page}>
          <BreadcrumbLink
            color="#ffffff"
            bgColor="#04AA6D"
            borderRadius="md"
            p="5px 10px"
            onClick={pageLink(page)}
            isCurrentPage={true}
          >
            {page}
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
    else
      paginationNumbers.push(
        <BreadcrumbItem key={index}>
          <BreadcrumbLink onClick={pageLink(index)}>{index}</BreadcrumbLink>
        </BreadcrumbItem>
      );
  }
  return (
    <HStack justify="center">
      <Button
        onClick={() => setPage((page: number) => Math.max(page - 1, 0))}
        disabled={isPreviousData || page === 1}
      >
        <ArrowLeftIcon />
      </Button>
      <Breadcrumb separator="-">
        {start > 1 && (
          <BreadcrumbItem>
            <BreadcrumbLink>...</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {paginationNumbers.map((pageNumber) => pageNumber)}
        {end < pages && (
          <BreadcrumbItem>
            <BreadcrumbLink>...</BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Button
        onClick={() => {
          setPage((old) => (page < pages ? old + 1 : old));
        }}
        disabled={isPreviousData || page === pages}
      >
        <ArrowRightIcon />
      </Button>
    </HStack>
  );
}

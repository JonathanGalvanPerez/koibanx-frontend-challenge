import CommerceQuery from "./../models/CommerceQuery.model";

const getQuery = (
  searchData: string,
  activeFilter: string,
  order: string,
  page: number,
  limit: number
): CommerceQuery => {
  console.log("Entrada :", { searchData, activeFilter, order, page, limit });
  const filters = getFilters(searchData, activeFilter);

  // Create query params
  let queryParams: CommerceQuery = {
    sort: order,
    page,
    limit,
  };
  if (filters) queryParams.q = filters;

  console.log("Salida: ", queryParams);
  return queryParams;
};

function getFilters(searchData: string, activeFilter: string): any | null {
  const searchs =
    searchData === ""
      ? null
      : {
          $or: [
            getQueryRegex("name", searchData),
            getQueryRegex("cuit", searchData),
            getQueryRegex("id", searchData),
          ],
        };
  const activeParam =
    activeFilter === "activo"
      ? {
          active: true,
        }
      : activeFilter === "no activo"
      ? {
          active: false,
        }
      : null;
  if (searchData && activeParam)
    return {
      $and: [searchs, activeParam],
    };
  if (searchs) return searchs;
  if (activeParam) return activeParam;
  return null;
}

function getQueryRegex(field: string, value: string) {
  return {
    [field]: {
      $regex: value,
    },
  };
}

export default getQuery;

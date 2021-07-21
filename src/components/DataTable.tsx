import { Box } from "@chakra-ui/react";
import React from "react";
import Commerce from "../models/Commerce.model";
import './DataTable.css';

type DataTableProps = {
  data: Commerce[] | null,
  fields: Array<{ key: keyof Commerce, name: string }>
};

export default function DataTable({ data, fields }: DataTableProps) {
  if (!data) return null;
  return (
    <Box overflowX={{base: "scroll", sm: "auto"}}>
      <table style={{margin: "10px auto", width: "100%"}}>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.key}>{field.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((commerce: Commerce) => (
            <tr key={commerce.id}>
              {fields.map((field => (
                <td key={field.key}>{commerce[field.key]}</td>
              )))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

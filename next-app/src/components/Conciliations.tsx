import React, { useEffect, useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRequestData } from "../hooks/useRequestData";

import { useCurrentFilter } from "../context/SetFilter";
import { Box } from "@mui/material";

export default function Conciliations(): JSX.Element {
  const { currentFilter } = useCurrentFilter();
  const data = useRequestData(currentFilter, "doubts");

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      const array = [];
      data.forEach((item, index) => {
        if (item.conciliacion > 0) {
          array.push({
            id: index,
            bank_destiny: item.bank_destiny,
            bank_origin: item.bank_origin,
            conciliacion: item.conciliacion,
          });
        } else if (item.conciliacion < 0) {
          array.push({
            id: index,
            bank_destiny: item.bank_origin,
            bank_origin: item.bank_destiny,
            conciliacion: item.conciliacion * -1,
          });
        }
      });
      setRows(array);
    }
  }, [data]);

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
      />
    </Box>
  );
}

const columns = [
  { field: "id", headerName: "ID", width: 70, hide: true },

  { field: "bank_origin", headerName: "Banco 1 (Deudor)", width: 130 },
  { field: "conciliacion", headerName: "Deuda", width: 130 },
  { field: "bank_destiny", headerName: "Banco 2", width: 130 },
];

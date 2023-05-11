import React, { useEffect, useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRequestData } from "../hooks/useRequestData";

import { useCurrentFilter } from "../context/SetFilter";
import { Box } from "@mui/material";

export default function LastTransactions(): JSX.Element {
  const { currentFilter } = useCurrentFilter();
  const data = useRequestData(currentFilter, "lastTransactions");

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) setRows(data);
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

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "type", headerName: "Tipo", width: 130 },
  { field: "bank_origin", headerName: "Banco Origen", width: 130 },
  { field: "bank_destiny", headerName: "Banco Destino", width: 130 },
  { field: "mount", headerName: "Monto", width: 130 },
  { field: "publish_time", headerName: "Fecha", width: 130 },
  { field: "account_origin", headerName: "Cuenta Origen", width: 130 },
  { field: "account_destiny", headerName: "Cuenta Destino", width: 130 },
];

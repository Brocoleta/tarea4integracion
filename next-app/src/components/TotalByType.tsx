import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";

import { useRequestData } from "../hooks/useRequestData";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCurrentFilter } from "../context/SetFilter";
import { Box } from "@mui/material";

interface Restaurant {
  id: string;
  name: string;
  position: {
    lat: number;
    long: number;
  };
}
interface Props {
  restaurants: Restaurant[];
  destinations: Restaurant[];
}

export default function TotalByType(): JSX.Element {
  const { classes } = useStyles();
  const { currentFilter } = useCurrentFilter();

  const data = useRequestData(currentFilter, "totalByType");

  const [rows, setRows] = useState([
    { id: "2400", count: "0", sum: "0" },
    { id: "2200", count: "0", sum: "0" },
  ]);

  useEffect(() => {
    if (data)
      setRows(
        data.map((item) => {
          return { ...item, id: item.type };
        })
      );
  }, [data]);

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid rows={rows} columns={columns} hideFooter={true} />
    </Box>
  );
}

const columns: GridColDef[] = [
  { field: "id", headerName: "Tipo", width: 70 },
  { field: "count", headerName: "Cantidad", width: 130 },
  { field: "sum", headerName: "Monto Total", width: 130 },
];

const useStyles = makeStyles()(() => ({
  container: {
    width: "100%",
  },
}));

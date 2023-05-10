import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useRequestData } from "../hooks/useRequestData";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

export default function LastTransactions(): JSX.Element {
  const { classes } = useStyles();

  const data = useRequestData({}, "lastTransactions");

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) setRows(data);
  }, [data]);

  return (
    <div>
      <DataGrid rows={rows} columns={columns} />
    </div>
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

const useStyles = makeStyles()(() => ({
  container: {
    width: "100%",
    padding: "30px",
    backgroundColor: "white",
  },
}));

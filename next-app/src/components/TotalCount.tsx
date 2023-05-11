import React from "react";
import { makeStyles } from "tss-react/mui";

import { useRequestData } from "../hooks/useRequestData";
import { useCurrentFilter } from "../context/SetFilter";
import { Typography } from "@mui/material";

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

export default function TotalCount(): JSX.Element {
  const { classes } = useStyles();
  const { currentFilter } = useCurrentFilter();

  const count = useRequestData(currentFilter, "totalCount");

  return (
    <Typography className={classes.title}>
      Hay un total de {count ?? 0} transacciones, presione en los acordeones
      para ver cada estadistica
    </Typography>
  );
}

const useStyles = makeStyles()(() => ({
  title: {
    fontSize: "30px",
    marginBottom: "20px",
  },
}));

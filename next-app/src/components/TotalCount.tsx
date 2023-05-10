import React from "react";
import { makeStyles } from "tss-react/mui";

import { useRequestData } from "../hooks/useRequestData";

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

  const count = useRequestData({}, "totalCount");

  return (
    <div className={classes.container}>
      <h2>Total Count: {count ?? 0}</h2>
    </div>
  );
}

const useStyles = makeStyles()(() => ({
  container: {
    width: "100%",
    padding: "30px",
    backgroundColor: "white",
  },
}));

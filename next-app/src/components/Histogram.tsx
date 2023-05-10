import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";

import { useRequestData } from "../hooks/useRequestData";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(...registerables);

export default function Histogram(): JSX.Element {
  const { classes } = useStyles();

  const data = useRequestData({}, "montoTotalHistograma");

  const [histogramData, setHistogramData] = useState([0, 0, 0, 0, 0, 0, 0]);
  console.log(histogramData);
  useEffect(() => {
    if (data)
      data.forEach((item) => {
        setHistogramData((prev) => {
          const copy = [...prev];
          copy[item.intervalo] = Number(item.total_mount);
          return copy;
        });
      });
  }, [data]);

  return (
    <div className={classes.container}>
      <Bar
        data={{
          labels: [
            "< $10.000",
            "$10.000 - $49.999",
            "$50.000 - $99.999",
            "$100.000 - $499.999",
            "$500.000 - $999.999",
            "$1.000.000 - $9.999.999",
            "> $9.000.000",
          ],
          datasets: [
            {
              label: "Histograma",
              data: histogramData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
}

const useStyles = makeStyles()(() => ({
  container: {
    maxWidth: "700px",
    padding: "30px",
    backgroundColor: "white",
  },
}));

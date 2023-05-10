import { makeStyles } from "tss-react/mui";
import TotalByType from "../src/components/TotalByType";
import TotalCount from "../src/components/TotalCount";
import Histogram from "../src/components/Histogram";
import LastTransactions from "../src/components/LastTransactions";

export default function Home() {
  const { classes } = useStyles();
  return (
    <div className={classes.body}>
      <div className={classes.grid}>
        <Histogram />
        <div>
          <TotalCount />
          <TotalByType />
        </div>
      </div>

      <LastTransactions />
    </div>
  );
}

const useStyles = makeStyles()(() => ({
  body: {
    width: "100%",
    height: "100%",
    padding: "60px",
  },
  grid: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "2fr 2fr",
  },
}));

import { makeStyles } from "tss-react/mui";
import TotalByType from "../src/components/TotalByType";
import TotalCount from "../src/components/TotalCount";
import Histogram from "../src/components/Histogram";
import LastTransactions from "../src/components/LastTransactions";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Conciliations from "../src/components/Conciliations";

export default function Home() {
  const { classes } = useStyles();
  return (
    <div className={classes.body}>
      <TotalCount />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Cantidad de operaciones y desglose por tipo</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.totals}>
            <TotalByType />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Conciliación entre bancos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.totals}>
            <Conciliations />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Histograma monto de transacciones</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.section}>
            <Histogram />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Ultimas 100 transacciones</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.section}>
            <LastTransactions />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const useStyles = makeStyles()(() => ({
  body: {
    width: "100%",
    height: "100%",
    marginTop: "20px",
  },
  section: {
    width: "100%",
    height: "100%",
    display: "flex",
    padding: "30px 0px",
  },
  totals: {
    width: "100%",
    height: "100%",
    padding: "30px 0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useCurrentFilter } from "../context/SetFilter";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { makeStyles } from "tss-react/mui";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxc25oZHV0b3hjYWZlcWV6anB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwNjE0MDksImV4cCI6MTk5ODYzNzQwOX0.VWpmnQnv5JKBb62Svi8Q-QswSeuI-yHMZOYrWLUAdlA";
export default function TopBar(): JSX.Element {
  const { currentFilter, setCurrentFilter } = useCurrentFilter();
  const { classes } = useStyles();
  const [dayValue, setDayValue] = useState<Dayjs | null>(null);
  const [banks, setBanks] = useState({
    bank_destiny: [],
    bank_origin: [],
  });

  useEffect(() => {
    fetch("https://zqsnhdutoxcafeqezjpx.functions.supabase.co/getBanks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      data.bank_origin.sort(function (a, b) {
        return a - b;
      });
      data.bank_destiny.sort(function (a, b) {
        return a - b;
      });
      setBanks(data);
    });
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentFilter((prev) => {
      const newFilter = { ...prev };
      newFilter[event.target.name] = event.target.value;
      return newFilter;
    });
  };

  const handleDateChange = (value: Dayjs) => {
    setCurrentFilter((prev) => {
      const newFilter = { ...prev };
      newFilter.publish_time = value.format("YYYY-MM-DD");
      return newFilter;
    });
    setDayValue(value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.container}>
        <div className={classes.flexBox}>
          <Typography variant="h6" component="div" className={classes.title}>
            Filtros:
          </Typography>
          <div className={classes.form}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Banco Origen
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentFilter.bank_origin}
                label="bank_origin"
                name="bank_origin"
                onChange={handleChange}
              >
                {banks.bank_origin.map((bank) => (
                  <MenuItem value={bank} key={bank}>
                    {bank}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes.form}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Banco Destino
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentFilter.bank_destiny}
                label="bank_destiny"
                name="bank_destiny"
                onChange={handleChange}
              >
                {banks.bank_destiny.map((bank) => (
                  <MenuItem value={bank} key={bank}>
                    {bank}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayValue}
              onChange={(newValue: Dayjs) => handleDateChange(newValue)}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            onClick={() => {
              setCurrentFilter({
                bank_origin: "",
                bank_destiny: "",
                publish_time: "",
              });
              setDayValue(null);
            }}
          >
            Borrar Filtros
          </Button>
        </div>
      </AppBar>
    </Box>
  );
}
const useStyles = makeStyles()(() => ({
  container: {
    padding: "20px 30px",
    backgroundColor: "white",
    borderBottom: "1px solid #e0e0e0",
  },
  flexBox: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "20px",
  },
  form: {
    width: "200px",
  },
  title: {
    color: "#000000",
  },
}));

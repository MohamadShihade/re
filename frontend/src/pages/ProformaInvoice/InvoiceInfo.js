import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core";

function InvoiceInfo() {
  const [exporter, setExporter] = useState("");
   const [invoiceInfo, setInvoiceInfo] = useState({
     exporter: "",
     invoiceNo: "",
     date: "",
     buyerAdress: "",
     cons: "",
     price: "",
     capacity: "",
     image: "",
     description: "",
     netWeight: "",
     grossWeight: "",
     palatSize: "",
     bl: [],
   });
  const handleExporterChange = (event) => {
    setExporter(event.target.value);
    console.log(exporter);
  };

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid style={{ paddingBottom: "30px" }} item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">EXPORTER</InputLabel>
            <Select value={exporter} onChange={handleExporterChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>{" "}
        </Grid>{" "}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">BUYER ADDRESS</InputLabel>
            <Select value={exporter} onChange={handleExporterChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>{" "}
        </Grid>{" "}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">CONSIGNEE</InputLabel>
            <Select value={exporter} onChange={handleExporterChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>{" "}
        </Grid>{" "}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">NOTIFY PARTY</InputLabel>
            <Select value={exporter} onChange={handleExporterChange} displayEmpty inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>{" "}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="country" name="country" label="Country" fullWidth autoComplete="billing country" />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox color="secondary" name="saveAddress" value="yes" />} label="Use this address for payment details" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default InvoiceInfo;

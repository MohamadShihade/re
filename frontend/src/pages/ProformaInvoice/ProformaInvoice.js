import { AppBar, Paper, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import InvoiceInfo from "./InvoiceInfo";
import useStyles from "./styles";

import Table from "../../Components/Table/Table";

const ProformaInvoice = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            AGS{" "}
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Invoice Information
          </Typography>
          <InvoiceInfo />
          <Table />
        </Paper>
      </main>
    </>
  );
};

export default ProformaInvoice;

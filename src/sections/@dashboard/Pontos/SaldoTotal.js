import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../../../layouts/dashboardMui/Title";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function preventDefault(event) {
  event.preventDefault();
}

export default function SaldoTotal() {
  return (
    <React.Fragment>
      <Title align="center" component="p" variant="h6">
        Saldo Total
      </Title>
      <Typography component="p" variant="h4" sx={{color: 'error.main'}}>
        - 57h 02m
      </Typography>
    </React.Fragment>
  );
}

import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../../../layouts/dashboardMui/Title";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function preventDefault(event) {
  event.preventDefault();
}

export default function TrabalhoDia() {
  return (
    <React.Fragment>
      <Title align="center" component="p" variant="h6">
        Trabalho no Dia
      </Title>
      <Typography component="p" variant="h4" >
        10h 42m
      </Typography>
    </React.Fragment>
  );
}

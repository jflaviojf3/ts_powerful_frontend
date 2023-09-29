import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Title from "../../../layouts/dashboardMui/Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function TotaisUsuario() {
  return (
    <React.Fragment>
      <Stack alignItems={"center"}>
        <Title align="center" variant="h5">
          Totais do Usuário
        </Title>
        <Typography component="p" variant="h6">
          Tarefas Concluidas
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }} variant="h6">
          300
        </Typography>

        <Typography component="p" variant="h6">
          Horas Trabalhadas
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }} variant="h6">
          57,2h
        </Typography>

        <Typography component="p" variant="h6">
          Banco de Horas
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }} variant="h6">
          8,5h
        </Typography>
      </Stack>
    </React.Fragment>
  );
}

import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Title from "../../../layouts/dashboardMui/Title";


export default function TotaisUsuario({dados}) {
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
          {dados.length !=0 ? dados[0].total_tarefas : 0}
        </Typography>
      </Stack>
    </React.Fragment>
  );
}

import * as React from "react";
import { TextField, IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Stack from "@mui/material/Stack";
import StopCircleIcon from "@mui/icons-material/StopCircle";

import Relogio from "../../../components/Relogio"
import { tarefaService } from "../../../../pages/api/usuarioService/tarefaService";
import { getCurrentDateTime, fDifMinutos } from "../../../utils/formatTime";
import nookies from "nookies";

export default function AppBarTarefas({ idUsuario, setRecarrega, recarrega }) {
  const [trocaIcone, setTrocaIcone] = React.useState(true);
  const [descricao, setDescricao] = React.useState("");

  
  const handleChange = (e) => {
    const value = e.target.value;
    setDescricao(value);
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{ gap: 1, margin: 1 }}
        alignItems="center"
      >
        <TextField
          label="Registro de Tarefa"
          id="filled-size-normal"
          variant="filled"
          value={descricao}
          onChange={handleChange}
          sx={{
            backgroundColor: "#FFFFFFBF",
            borderRadius: "5px",
            width: "60%",
          }}
        />

        <IconButton>
          {trocaIcone ? (
            <PlayCircleIcon sx={{ fontSize: 50, color: "#FFFFFFBF" }} />
          ) : (
            <StopCircleIcon sx={{ fontSize: 50, color: "#FFFFFFBF" }} />
          )}
        </IconButton>
      </Stack>
    </>
  );
}
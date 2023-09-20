import * as React from "react";
import { TextField, IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Stack from "@mui/material/Stack";
import StopCircleIcon from "@mui/icons-material/StopCircle";

import Relogio from "../../../components/Relogio"
import { tarefaService } from "../../../../pages/api/usuarioService/tarefaService";
import { getCurrentDateTime } from "./../../../utils/formatTime";
import nookies from "nookies";

export default function AppBarTarefas({ idUsuario, setRecarrega, recarrega }) {
  const [trocaIcone, setTrocaIcone] = React.useState(true);
  const [descricao, setDescricao] = React.useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setDescricao(value);
  };

  const playtarefa = async (e) => {
    if (trocaIcone){
      e.preventDefault();
      try {
        if (!descricao) {
          alert("Por favor, Descrição não pode ser vazia");
          return;
        }
        const cookies = nookies.get();
        const body = {
          entrada: 1,
          descricao: descricao,
          data_inicio: getCurrentDateTime(),
        };
        await tarefaService.insereTarefaUsuario(
          cookies.ACCESS_TOKEN,
          idUsuario,
          body
          ).then(function(response){
            //setRecarrega(recarrega+1)
            setTrocaIcone(!trocaIcone);
          })
        } catch (error) {
        alert(error);
        console.error("Erro na solicitação POST:", error);
      }
    } else{
      setTrocaIcone(!trocaIcone);
      setDescricao("")
    }
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

        <Relogio isRunning={!trocaIcone} />
        <IconButton onClick={playtarefa}>
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

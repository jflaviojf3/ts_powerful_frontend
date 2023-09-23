import * as React from "react";
import { TextField, IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Stack from "@mui/material/Stack";
import StopCircleIcon from "@mui/icons-material/StopCircle";

import Relogio from "../../../components/Relogio";
import { tarefaService } from "../../../../pages/api/usuarioService/tarefaService";
import {
  getCurrentDateTime,
  fDifMinutos,
  minutosParaSegundos,
} from "./../../../utils/formatTime";
import nookies from "nookies";

export default function AppBarTarefas({ idUsuario, recarrega, setRecarrega }) {
  const [trocaIcone, setTrocaIcone] = React.useState(true);
  const [running, setRunning] = React.useState(false);

  const [descricao, setDescricao] = React.useState("");
  const [minRelogio, setMinRelogio] = React.useState(null);
  const [tarefaAtiva, setTarefaAtiva] = React.useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setDescricao(value);
  };

  const playtarefa = async (e) => {
    if (!running) {
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
        );

        setTrocaIcone(false);

        setRunning(true);
        setDescricao(descricao);
        setRecarrega(recarrega + 1);
        } catch (error) {
        alert(error);
        console.error("Erro na solicitação POST:", error);
      }
    } else {
      try {
        const body = {
          data_fim: getCurrentDateTime(),
        };
        const cookies = nookies.get();
        await tarefaService.atualizaTarefaUsuario(
          cookies.ACCESS_TOKEN,
          idUsuario,
          tarefaAtiva.id_tarefas,
          tarefaAtiva.entrada,
          body
        );

        setTrocaIcone(true);
        setDescricao("");
        setRunning(false);
        setRecarrega(recarrega + 1);
      } catch (error) {
        alert(error);
        console.error("Erro na solicitação POST:", error);
      }
    }
  };

  const retornaTarefaAtiva = async () => {
    const cookies = nookies.get();
    const resultado = await tarefaService.pegaTarefaAtiva(
      cookies.ACCESS_TOKEN,
      idUsuario
    );
    await setTarefaAtiva(resultado);
  };

  React.useEffect(() => {
    retornaTarefaAtiva();
    atualizaCampo();
  }, [recarrega]);

  const atualizaCampo = async () => {
    (await tarefaAtiva)
      ? (setTrocaIcone(false),
        setDescricao(""),
        setMinRelogio(
          minutosParaSegundos(
            fDifMinutos(tarefaAtiva.data_inicio, getCurrentDateTime())
          )
        ))
      : (setTrocaIcone(true), setDescricao(""), setMinRelogio(null));
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

        <Relogio isRunning={running} minutos={minRelogio} />
        <IconButton onClick={playtarefa}>
          {!running ? (
            <PlayCircleIcon sx={{ fontSize: 50, color: "#FFFFFFBF" }} />
          ) : (
            <StopCircleIcon sx={{ fontSize: 50, color: "#FFFFFFBF" }} />
          )}
        </IconButton>
      </Stack>
    </>
  );
}

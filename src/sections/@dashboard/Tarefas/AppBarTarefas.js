import * as React from "react";
import { TextField, IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Stack from "@mui/material/Stack";
import StopCircleIcon from "@mui/icons-material/StopCircle";

import Relogio from "../../../components/Relogio"
import { tarefaService } from "../../../../pages/api/usuarioService/tarefaService";
import { getCurrentDateTime, fDifMinutos, minutosParaSegundos } from "./../../../utils/formatTime";
import nookies from "nookies";

export default function AppBarTarefas({ idUsuario, recarrega, setDescricaoTarefa }) {
  const [trocaIcone, setTrocaIcone] = React.useState(true);
  const [descricao, setDescricao] = React.useState("");
  const [minRelogio, setMinRelogio] = React.useState(null);
  const [idTarefa, setIdTarefa] = React.useState(1);
  const [tarefaAtiva, setTarefaAtiva] = React.useState(null);
  
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
            setIdTarefa(response.id_tarefas)
            setTrocaIcone(!trocaIcone);
          })
        } catch (error) {
        alert(error);
        console.error("Erro na solicitação POST:", error);
      }
    } else{
      e.preventDefault();
      try {
        const body = {
          data_fim: getCurrentDateTime(),
        };
        const cookies = nookies.get();
        await tarefaService.atualizaTarefaUsuario(
          cookies.ACCESS_TOKEN,
          idUsuario,
          idTarefa,
          1,
          body
        ).then(function(response){
            //setRecarrega(recarrega+1)
            setTrocaIcone(!trocaIcone);
          })
        } catch (error) {
        alert(error);
        console.error("Erro na solicitação POST:", error);
      }
      setTrocaIcone(!trocaIcone);
      setDescricao("")
    }
  };

  const retornaTarefaAtiva = async()=>{
    console.log("Retorna Tarefa Ativa!")
    const cookies = nookies.get();
    const resultado =  await tarefaService.pegaTarefaAtiva(
      cookies.ACCESS_TOKEN,
      idUsuario
    )
    await setTarefaAtiva(resultado)
  }

  //  React.useCallback(() => {
  //   retornaTarefaAtiva()
  //  }, [idUsuario]);

  React.useEffect(() => {
    retornaTarefaAtiva();
    atualizaCampo()
    console.log(recarrega)
    console.log(tarefaAtiva)
  }, [recarrega]);

  const atualizaCampo = async()=> {
    await tarefaAtiva ? (
      console.log(tarefaAtiva.descricao),
      console.log(fDifMinutos(tarefaAtiva.data_inicio, getCurrentDateTime())),
      setTrocaIcone(false),
      setDescricao(tarefaAtiva.descricao),
      setMinRelogio(minutosParaSegundos(fDifMinutos(tarefaAtiva.data_inicio, getCurrentDateTime()) ))
    ): (        
      setDescricao(""),
      setTrocaIcone(true),
      setMinRelogio(null)
    )
  }


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

        <Relogio isRunning={!trocaIcone} minutos={minRelogio} />
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

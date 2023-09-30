import * as React from "react";
import { TextField, IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Stack from "@mui/material/Stack";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Relogio from "../../../components/Relogio";
import { tarefaService } from "../../../../pages/api/usuarioService/tarefaService";
import { projetosService } from "../../../../pages/api/organizacaoService/projetosService";
import {
  getCurrentDateTime,
  fDifMinutos,
  minutosParaSegundos,
} from "./../../../utils/formatTime";
import nookies from "nookies";
import AppContext from "@/hooks/AppContext";

export default function AppBarTarefas({ idUsuario }) {
  const { recarrega, setRecarrega, buscarTarefaPorId, usuarioLogado } =
    React.useContext(AppContext);
  const [trocaIcone, setTrocaIcone] = React.useState(true);
  const [running, setRunning] = React.useState(false);

  const [descricao, setDescricao] = React.useState();
  const [minRelogio, setMinRelogio] = React.useState(null);
  const [tarefaAtiva, setTarefaAtiva] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [listaProjeto, setListaProjeto] = React.useState([]);
  const [projeto, setProjeto] = React.useState("");
  const [idProjeto, setIdProjeto] = React.useState([]);

  const handleChangeButton = (event) => {
    setProjeto(event.target.value);
  };

  const handleClickOpenButton = () => {
    setOpen(true);
  };

  const handleCloseButton = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

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
          id_projetos: retornaIdOrg(projeto, idProjeto)
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

  const retornaProjetos = async () => {
    try {
      const cookies = nookies.get();
      const listaprojeto = await projetosService.pegaTodosProjetos(
        cookies.ACCESS_TOKEN,
        usuarioLogado.id_organizacoes
      );
      await setIdProjeto(listaprojeto);
      listaprojeto ? "" : await setRecarrega(recarrega + 1);
  
      await setListaProjeto(listaprojeto);
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }

  };

  const retornaIdOrg = (descProjeto, dados) => {
    //if (telaEdicao.editando) {
      if (dados.length > 0 && descProjeto) {
        const descricaoCodigo = dados.find((item) => item.nome === descProjeto);
        return descricaoCodigo.id_projetos;
      }
    //}
  };

  React.useEffect(() => {
    retornaTarefaAtiva();
    atualizaCampo();
    buscaTarefaPorId();
    retornaProjetos();
  }, [recarrega]);

  const buscaTarefaPorId = async () => {
    const response = await buscarTarefaPorId(idUsuario);

    if (response) {
      setDescricao(response.descricao);
      setMinRelogio(
        minutosParaSegundos(
          fDifMinutos(response.createdAt, getCurrentDateTime())
        )
      );
      setRunning(true);
    }
  };

  const atualizaCampo = async () => {
    (await tarefaAtiva)
      ? (setTrocaIcone(false),
        setMinRelogio(
          minutosParaSegundos(
            fDifMinutos(tarefaAtiva.createdAt, getCurrentDateTime())
          )
        ))
      : (setTrocaIcone(true), setMinRelogio(null));
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
          InputLabelProps={{ shrink: descricao ? true : false }}
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

        <Button onClick={handleClickOpenButton} sx={{ color: "#FFFFFFBF" }}>
          <AccountTreeIcon sx={{ fontSize: 50, color: "#FFFFFFBF" }} />
        </Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleCloseButton}>
          <DialogTitle>Selecione Projeto</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="demo-dialog-native">Projeto</InputLabel>
                <Select
                  native
                  value={projeto}
                  onChange={handleChangeButton}
                  input={
                    <OutlinedInput label="Projeto" id="demo-dialog-native" />
                  }
                >
                  <option aria-label="None" value="" />
                  {listaProjeto.map((row, index) => (
                    <option key={index} value={row.nome}>
                      {row.nome}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseButton}>Cancel</Button>
            <Button onClick={handleCloseButton}>Ok</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  );
}

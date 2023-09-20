import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Title from "../../../layouts/dashboardMui/Title";
import { Stack, Divider } from "@mui/material";
import { IconButton } from "@mui/material";
import {
  fDataSemana,
  fDateTime,
  fDifMinutos,
  getCurrentDateTime,
} from "../../../utils/formatTime";

import nookies from "nookies";
import { tarefaService } from "../../../../pages/api/usuarioService/tarefaService";

const PontoDia = ({ idUsuario }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleExcluir = async (e, idTarefa, entrada) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    await deletaTarefas(idTarefa, entrada);
  };

  const handleReplay = async (e, entrada, descricao) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    await replayTarefas(entrada, descricao);
  };

  const handleStop = async (e, idTarefas, entrada) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    await stopTarefas(idTarefas, entrada);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const [tarefas, setTarefas] = React.useState([]);
  async function retornaTarefas() {
    const cookies = nookies.get();
    const tarefas = await tarefaService.pegaTarefasDia(
      cookies.ACCESS_TOKEN,
      idUsuario,
      ""
    );
    await setTarefas(tarefas);
  }

  React.useEffect(() => {
    retornaTarefas();
  }, []);

  async function deletaTarefas(id_tarefas, entrada) {
    const cookies = nookies.get();
    await tarefaService.deletaTarefaUsuario(
      cookies.ACCESS_TOKEN,
      idUsuario,
      id_tarefas,
      entrada
    );
  }

  async function replayTarefas(entrada, descricao) {
    const body = {
      descricao: descricao,
      data_inicio: getCurrentDateTime(),
      entrada: entrada + 1,
    };
    const cookies = nookies.get();
    await tarefaService.insereTarefaUsuario(
      cookies.ACCESS_TOKEN,
      idUsuario,
      body
    );
  }

  async function stopTarefas(idTarefa, entrada) {
    const body = {
      data_fim: getCurrentDateTime(),
    };
    const cookies = nookies.get();
    await tarefaService.atualizaTarefaUsuario(
      cookies.ACCESS_TOKEN,
      idUsuario,
      idTarefa,
      entrada,
      body
    );
  }

  return (
    <React.Fragment>
       <Stack  align="center"  direction="column" spacing={2} sx={{ mt: 3 }}>
      <Title align="center" variant="h5">
        Lista de Tarefas
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "60%", color: "primary.main" }}>
              {"20/09/2023"}
            </TableCell>
            <TableCell sx={{ width: "20%", color: "primary.main" }}>
              Periodo
            </TableCell>
            <TableCell sx={{ width: "10%", color: "primary.main" }}></TableCell>
            <TableCell sx={{ width: "10%" }}></TableCell>
          </TableRow>
        </TableHead>
      </Table>
      </Stack>
    </React.Fragment>
  );
};

export default PontoDia;

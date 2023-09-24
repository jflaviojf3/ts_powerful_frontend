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
import Tooltip from '@mui/material/Tooltip';

import { IconButton } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import {
  fDataSemana,
  fDateTime,
  fDifMinutos,
  getCurrentDateTime,
} from "../../../utils/formatTime";

import nookies from "nookies";
import { tarefaService } from "../../../../pages/api/usuarioService/tarefaService";

const GrupoTarefa = ({ idUsuario, dia, recarrega, setRecarrega }) => {

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef && anchorRef.current && anchorRef.current.contains(event.target)) {
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
      dia.data_dia
    );
    await setTarefas(tarefas);
  }

  React.useEffect(() => {
    retornaTarefas();
  }, [recarrega]);

  async function deletaTarefas(id_tarefas, entrada) {
    const cookies = nookies.get();
    await tarefaService.deletaTarefaUsuario(
      cookies.ACCESS_TOKEN,
      idUsuario,
      id_tarefas,
      entrada
    );

    setRecarrega(recarrega+1)
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
    setRecarrega(recarrega+1)
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
    setRecarrega(recarrega+1)
  }
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell sx={{ width: "60%", color: "primary.main" }}>
            {fDataSemana(dia.data_dia)}
          </TableCell>
          <TableCell sx={{ width: "20%", color: "primary.main" }}>
            Periodo
          </TableCell>
          <TableCell sx={{ width: "10%", color: "primary.main" }}>
          </TableCell>
          <TableCell sx={{ width: "10%" }}></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {
        tarefas.map((row, index) => (
          <TableRow key={index}>
            <TableCell sx={{ width: "60%" }} size="small">
              {row.entrada}
              {" | "}
              {row.descricao}
            </TableCell>
            <TableCell sx={{ width: "20%" }}>
            <Tooltip title={row.data_inicio} placement="top-end">
              {fDateTime(row.data_inicio, "HH:mm:ss a")}
              </Tooltip>
              {" "}
              {row.data_fim ? "-" : ""} 
              {" "}
              <Tooltip title={row.data_fim} placement="top-end">
              {fDateTime(row.data_fim, "HH:mm:ss a")}
              </Tooltip>
            </TableCell>
            <TableCell sx={{ width: "10%" }}>
              {row.data_fim
                ? fDifMinutos(row.data_inicio, row.data_fim)
                : "00:00:00"}
            </TableCell>
            <TableCell sx={{ width: "10%" }}>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={
                  row.data_fim
                    ? (e) => handleReplay(e, row.entrada, row.descricao)
                    : (e) => handleStop(e, row.id_tarefas, row.entrada)
                }
              >
                {row.data_fim ? (
                  <PlayCircleOutlineIcon fontSize="inherit" />
                ) : (
                  <StopCircleIcon fontSize="inherit" />
                )}
              </IconButton>
              <IconButton
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                size="small"
              >
                <MoreIcon />
              </IconButton>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="auto"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "auto" ? "left top" : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                          variant="menu"
                        >
                          <MenuItem onClick={handleClose}>Clientes</MenuItem>
                          <MenuItem onClick={handleClose}>Projetos</MenuItem>
                          <MenuItem onClick={handleClose}>Editar</MenuItem>
                          <MenuItem
                            onClick={(e) =>
                              handleExcluir(e, row.id_tarefas, row.entrada)
                            }
                          >
                            Excluir
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GrupoTarefa;

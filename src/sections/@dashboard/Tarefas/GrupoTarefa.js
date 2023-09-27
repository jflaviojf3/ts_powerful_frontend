import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreIcon from "@mui/icons-material/MoreVert";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Tooltip from "@mui/material/Tooltip";

import { Box, Collapse, IconButton, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import {
  fDataSemana,
  fDateTime,
  fDifMinutos,
  getCurrentDateTime,
} from "../../../utils/formatTime";

import nookies from "nookies";
import { tarefaService } from "@/../pages/api/usuarioService/tarefaService";
import AppContext from "@/hooks/AppContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const GrupoTarefa = ({ idUsuario, dia }) => {
  const { recarrega, setRecarrega } = React.useContext(AppContext);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      anchorRef &&
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
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

  const handleReplay = async (
    e,
    entrada,
    descricao,
    data_inicio,
    secundaria
  ) => {
    let MaiorEntrada = entrada;
    if (secundaria.length > 0) {
      const maxIndex = secundaria.reduce(
        (maxIndex, currentElement, currentIndex, array) => {
          if (currentElement.entrada > array[maxIndex].entrada) {
            return currentIndex;
          }
          return maxIndex;
        },
        0
      );
      MaiorEntrada = secundaria[maxIndex].entrada;
    }
    await replayTarefas(MaiorEntrada, descricao, data_inicio);
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

    if (tarefas) {
      var lista = [];
      var secundarias = [];
      var tarefaObj = {};

      for (let i = 0; i < tarefas.length; i++) {
        var secundarias = [];
        var tarefaObj = {};

        const t1 = tarefas[i];

        if (t1.entrada === 1) {
          for (let j = 0; j < tarefas.length; j++) {
            const t2 = tarefas[j];

            if (t2.entrada === 1 && t2.descricao === t1.descricao) {
              tarefaObj = { ...tarefaObj, principal: t2 };
            } else if (t2.descricao === t1.descricao) {
              secundarias.push(t2);
            }
          }

          tarefaObj = { ...tarefaObj, secundarias: secundarias };
        }

        lista.push(tarefaObj);
      }
    }

    await setTarefas(lista);
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

    setRecarrega(recarrega + 1);
  }

  async function replayTarefas(entrada, descricao, data_inicio) {
    const body = {
      descricao: descricao,
      data_inicio: data_inicio,
      entrada: entrada + 1,
    };
    const cookies = nookies.get();
    const response = await tarefaService.insereTarefaUsuario(
      cookies.ACCESS_TOKEN,
      idUsuario,
      body
    );
    setRecarrega(recarrega + 1);
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
    setRecarrega(recarrega + 1);
  }

  const Row = (props) => {
    const { row } = props;

    const [open, setOpen] = React.useState(false);

    const [open2, setOpen2] = React.useState(false);

    return (
      <React.Fragment>
        {row.principal ? (
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            {row && row.secundarias && row.secundarias.length > 0 ? (
              <TableCell sx={{ width: "5%" }}>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen2(!open2)}
                >
                  {open2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
            ) : (
              <TableCell sx={{ width: "5%" }}></TableCell>
            )}
            <TableCell sx={{ width: "55%" }} size="small">
              {row.principal.entrada}
              {" | "}
              {row.principal.descricao}
            </TableCell>
            <TableCell sx={{ width: "20%" }} padding="none">
              <Tooltip
                title={fDateTime(
                  row.principal.createdAt,
                  "dd/MM/yyyy - HH:mm:ss"
                )}
                placement="top-end"
              >
                {fDateTime(row.principal.createdAt, "HH:mm:ss")}
              </Tooltip>{" "}
              {row.principal.data_fim ? "-" : ""}{" "}
              <Tooltip
                title={fDateTime(
                  row.principal.data_fim,
                  "dd/MM/yyyy - HH:mm:ss"
                )}
                placement="top-end"
              >
                {fDateTime(row.principal.data_fim, "HH:mm:ss")}
              </Tooltip>
            </TableCell>
            <TableCell sx={{ width: "10%" }} padding="none">
              {row.principal.data_fim
                ? fDifMinutos(row.principal.createdAt, row.principal.data_fim)
                : "00:00:00"}
            </TableCell>
            <TableCell sx={{ width: "10%" }} padding="none">
              <IconButton
                padding="none"
                aria-label="delete"
                size="small"
                onClick={
                  row.principal.data_fim
                    ? (e) =>
                        handleReplay(
                          e,
                          row.principal.entrada,
                          row.principal.descricao,
                          row.principal.data_inicio,
                          row.secundarias
                        )
                    : (e) =>
                        handleStop(
                          e,
                          row.principal.id_tarefas,
                          row.principal.entrada
                        )
                }
              >
                {row.principal.data_fim ? (
                  <PlayCircleOutlineIcon fontSize="inherit" />
                ) : (
                  <StopCircleIcon fontSize="inherit" />
                )}
              </IconButton>

              <IconButton
                padding="none"
                aria-label="delete"
                size="small"
                onClick={(e) =>
                  handleExcluir(
                    e,
                    row.principal.id_tarefas,
                    row.principal.entrada
                  )
                }
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
              {/* <IconButton
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
                              handleExcluir(
                                e,
                                row.principal.id_tarefas,
                                row.principal.entrada
                              )
                            }
                          >
                            Excluir
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper> */}
            </TableCell>
          </TableRow>
        ) : (
          <></>
        )}
        <TableRow>
          {row.secundarias && row.secundarias.length > 0 ? (
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open2} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Table size="small" aria-label="purchases">
                    <TableBody>
                      {row.secundarias &&
                        row.secundarias.map((secundaria) => (
                          <TableRow key={secundaria.id}>
                            <TableCell sx={{ width: "60%" }} size="small">
                              {secundaria.entrada}
                              {" | "}
                              {secundaria.descricao}
                            </TableCell>
                            <TableCell sx={{ width: "20%" }} padding="none">
                              <Tooltip
                                title={fDateTime(
                                  secundaria.createdAt,
                                  "dd/MM/yyyy - HH:mm:ss"
                                )}
                                placement="top-end"
                              >
                                {fDateTime(secundaria.createdAt, "HH:mm:ss")}
                              </Tooltip>{" "}
                              {secundaria.data_fim ? "-" : ""}{" "}
                              <Tooltip
                                title={fDateTime(
                                  secundaria.data_fim,
                                  "dd/MM/yyyy - HH:mm:ss"
                                )}
                                placement="top-end"
                              >
                                {fDateTime(secundaria.data_fim, "HH:mm:ss")}
                              </Tooltip>
                            </TableCell>
                            <TableCell sx={{ width: "10%" }} padding="none">
                              {secundaria.data_fim
                                ? fDifMinutos(
                                    secundaria.createdAt,
                                    secundaria.data_fim
                                  )
                                : "00:00:00"}
                            </TableCell>
                            <TableCell sx={{ width: "10%" }} padding="none">
                              <IconButton
                                padding="none"
                                aria-label="delete"
                                size="small"
                                disabled={secundaria.data_fim ? true : false}
                                onClick={
                                  secundaria.data_fim
                                    ? (e) =>
                                        handleReplay(
                                          e,
                                          secundaria.entrada,
                                          secundaria.descricao,
                                          secundaria.data_inicio
                                        )
                                    : (e) =>
                                        handleStop(
                                          e,
                                          secundaria.id_tarefas,
                                          secundaria.entrada
                                        )
                                }
                              >
                                {secundaria.data_fim ? (
                                  <PlayCircleOutlineIcon fontSize="inherit" />
                                ) : (
                                  <StopCircleIcon fontSize="inherit" />
                                )}
                              </IconButton>

                              <IconButton
                                padding="none"
                                aria-label="delete"
                                size="small"
                                onClick={(e) =>
                                  handleExcluir(
                                    e,
                                    secundaria.id_tarefas,
                                    secundaria.entrada
                                  )
                                }
                              >
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                              {/* <IconButton
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={
                                  open ? "composition-menu" : undefined
                                }
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
                                        placement === "auto"
                                          ? "left top"
                                          : "left bottom",
                                    }}
                                  >
                                    <Paper>
                                      <ClickAwayListener
                                        onClickAway={handleClose}
                                      >
                                        <MenuList
                                          autoFocusItem={open}
                                          id="composition-menu"
                                          aria-labelledby="composition-button"
                                          onKeyDown={handleListKeyDown}
                                          variant="menu"
                                        >
                                          <MenuItem onClick={handleClose}>
                                            Clientes
                                          </MenuItem>
                                          <MenuItem onClick={handleClose}>
                                            Projetos
                                          </MenuItem>
                                          <MenuItem onClick={handleClose}>
                                            Editar
                                          </MenuItem>
                                          <MenuItem
                                            onClick={(e) =>
                                              handleExcluir(
                                                e,
                                                secundaria.id_tarefas,
                                                secundaria.entrada
                                              )
                                            }
                                          >
                                            Excluir
                                          </MenuItem>
                                        </MenuList>
                                      </ClickAwayListener>
                                    </Paper>
                                  </Grow>
                                )}
                              </Popper> */}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          ) : (
            <></>
          )}
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell sx={{ width: "5%", color: "primary.main" }}></TableCell>
          <TableCell sx={{ width: "55%", color: "primary.main" }}>
            {fDataSemana(dia.data_dia, 1)}
          </TableCell>
          <TableCell
            sx={{ width: "20%", color: "primary.main" }}
            padding="none"
          >
            Periodo
          </TableCell>
          <TableCell
            sx={{ width: "10%", color: "primary.main" }}
            padding="none"
          >
            Tempo
          </TableCell>
          <TableCell sx={{ width: "10%" }}></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {tarefas.map((row) => (
          <Row key={row.name} row={row} />
        ))}
      </TableBody>
    </Table>
  );
};

export default GrupoTarefa;

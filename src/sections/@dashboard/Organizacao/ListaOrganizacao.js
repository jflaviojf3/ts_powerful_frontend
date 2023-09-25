import * as React from "react";
import { Stack, Divider } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MoreIcon from "@mui/icons-material/MoreVert";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";

import Title from "@/layouts/dashboardMui/Title";

import nookies from "nookies";
import { organizacaoService } from "@/../pages/api/organizacaoService/organizacaoService";
import { fDateTime } from "@/utils/formatTime";
import AppContext from "@/hooks/AppContext";

export default function ListaOrganizacao({
  idUsuario,
}) {
  const {recarrega, setRecarrega, dadosAppBar} = React.useContext(AppContext);
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

  const [organizacoes, setOrganizacoes] = React.useState([]);

  async function retornaOrganizacoes() {
    if (dadosAppBar) {
      setOrganizacoes(dadosAppBar);
    } else {
      const cookies = nookies.get();
      const ListaOrgs = await organizacaoService.pegaTodasOrganizacoes(
        cookies.ACCESS_TOKEN
      );
      setOrganizacoes(ListaOrgs);
    }
  }

  async function handleExcluir(e, id_organizacoes) {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    const cookies = nookies.get();
    await organizacaoService.deletaTarefaUsuario(
      cookies.ACCESS_TOKEN,
      id_organizacoes
    );
    setRecarrega(recarrega + 1);
  }

  React.useEffect(() => {
    retornaOrganizacoes();
  }, [recarrega]);

  return (
    <React.Fragment>
      <Title align="center" variant="h5">
        Lista de Organizações
      </Title>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Table size="small">
          <TableBody>
            {organizacoes.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ width: "8%",  padding: "0px", margin: "0px" }} size="small">
                  {index <= 9 ? "0" + (index + 1) : index + 1}
                  {" |"}
                </TableCell>
                <TableCell sx={{ width: "72%", padding: "0px", margin: "0px" }} size="small">
                  {row.nome}
                </TableCell>
                <TableCell sx={{ width: "18%", padding: "0px", margin: "0px" }} size="small">
                  {" | "}
                  {
                    <Tooltip title={row.createdAt} placement="top-end">
                      {fDateTime(row.createdAt, "dd MMM yyyy")}
                    </Tooltip>
                  }
                </TableCell>
                <TableCell sx={{ width: "2%",  padding: "0px", margin: "0px" }} size="small">
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
                              <MenuItem onClick={handleClose}>Editar</MenuItem>
                              <MenuItem
                                onClick={(e) =>
                                  handleExcluir(e, row.id_organizacoes)
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
      </Stack>
    </React.Fragment>
  );
}

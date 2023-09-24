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
import { TextField, Button } from "@mui/material";

import Title from "@/layouts/dashboardMui/Title";

import nookies from "nookies";
import { organizacaoService } from "@/../pages/api/organizacaoService/organizacaoService";
import { fDateTime } from "@/utils/formatTime";

export default function ManterOrganizacao({
  idUsuario,
  setRecarrega,
  recarrega,
  buscaAppBarOrg,
  setBuscaAppBarOrg,
}) {
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
    if (buscaAppBarOrg) {
      setOrganizacoes(buscaAppBarOrg);
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

  const handleEdit = async (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    retornaOrganizacoes();
  }, [recarrega]);

  return (
    <React.Fragment>
      <Title align="center" variant="h5">
        Nova Organização
      </Title>
      <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
      <TextField
          label={"Buscar Organização"}
          id="filled-size-normal"
          variant="filled"
          value={"descricao"}
          sx={{
            backgroundColor: "#FFFFFFBF",
            borderRadius: "5px",
            width: "60%",
          }}
                  />
      </Stack>
    </React.Fragment>
  );
}

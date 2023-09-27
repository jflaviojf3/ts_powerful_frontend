import * as React from "react";
import { Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";

import Title from "@/layouts/dashboardMui/Title";

import nookies from "nookies";
import { organizacaoService } from "@/../pages/api/organizacaoService/organizacaoService";
import { fDateTime } from "@/utils/formatTime";
import AppContext from "@/hooks/AppContext";

export default function ListaOrganizacao({ idUsuario }) {
  const {
    recarrega,
    setRecarrega,
    dadosAppBar,
    setTelaDetalhe,
    setTelaEdicao,
  } = React.useContext(AppContext);

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

  async function handleEdit(e, id_organizacoes, nome, data_criacao) {
    e.preventDefault();
    setTelaDetalhe(true);
    setTelaEdicao({
      editando: true,
      dados: {
        id_organizacoes: id_organizacoes,
        nome: nome,
        data_criacao: data_criacao,
      },
    });
  }

  async function handleExcluir(e, id_organizacoes) {
    const cookies = nookies.get();
    await organizacaoService.deletaOrganizacao(
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
                <TableCell
                  sx={{ width: "8%", padding: "0px", margin: "0px" }}
                  size="small"
                >
                  {index <= 9 ? "0" + (index + 1) : index + 1}
                  {" |"}
                </TableCell>
                <TableCell
                  sx={{ width: "72%", padding: "0px", margin: "0px" }}
                  size="small"
                >
                  {row.nome}
                </TableCell>
                <TableCell
                  sx={{ width: "18%", padding: "0px", margin: "0px" }}
                  size="small"
                >
                  {" | "}
                  {
                    <Tooltip title={row.createdAt} placement="top-end">
                      {fDateTime(row.createdAt, "dd MMM yyyy")}
                    </Tooltip>
                  }
                </TableCell>
                <TableCell
                  sx={{ width: "2%", padding: "0px", margin: "0px" }}
                  size="small"
                >
                  <IconButton
                    padding="none"
                    aria-label="delete"
                    size="small"
                    onClick={(e) =>
                      handleEdit(
                        e,
                        row.id_organizacoes,
                        row.nome,
                        row.createdAt
                      )
                    }
                  >
                    <ModeEditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    padding="none"
                    aria-label="delete"
                    size="small"
                    onClick={(e) => handleExcluir(e, row.id_organizacoes)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </React.Fragment>
  );
}

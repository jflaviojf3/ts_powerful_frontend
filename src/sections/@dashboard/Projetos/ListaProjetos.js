import * as React from "react";
import { Stack, Divider } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { IconButton } from "@mui/material";

import Title from "@/layouts/dashboardMui/Title";

import nookies from "nookies";
import { clientesService } from "@/../pages/api/clientesService/clientesService";
import { fDateTime } from "@/utils/formatTime";
import AppContext from "@/hooks/AppContext";

export default function ListaClientes({ idUsuario }) {
  const {
    recarrega,
    setRecarrega,
    dadosAppBar,
    setTelaDetalhe,
    setTelaEdicao,
  } = React.useContext(AppContext);

  const [clientes, setClientes] = React.useState([]);

  async function retornaClientes() {
    if (dadosAppBar) {
      setClientes(dadosAppBar);
    } else {
      const cookies = nookies.get();
      const ListaClientes = await clientesService.pegaTodosClientes(
        cookies.ACCESS_TOKEN
      );
      setClientes(ListaClientes);
    }
  }

  async function handleEdit(
    e,
    id_clientes,
    nome,
    descricao,
    data_inicio,
    data_fim,
    email,
    cod_prioridade
  ) {
    e.preventDefault();
    setTelaDetalhe(true);
    setTelaEdicao({
      editando: true,
      dados: {
        id_clientes: id_clientes,
        nome: nome,
        descricao: descricao,
        data_inicio: data_inicio,
        data_fim: data_fim,
        email: email,
        cod_prioridade: cod_prioridade,
      },
    });
  }

  async function handleExcluir(e, id_clientes) {
    const cookies = nookies.get();
    await clientesService.deletaClientes(cookies.ACCESS_TOKEN, id_clientes);
    setRecarrega(recarrega + 1);
  }

  React.useEffect(() => {
    retornaClientes();
  }, [recarrega]);

  return (
    <React.Fragment>
      <Title align="center" variant="h5">
        Lista de Projetos
      </Title>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ width: "8%", color: "primary.main" }}
                padding="none"
              ></TableCell>
              <TableCell
                sx={{ width: "60%", color: "primary.main" }}
                padding="none"
              >
                Nome do Projeto
              </TableCell>
              <TableCell
                sx={{ width: "17%", color: "primary.main" }}
                padding="none"
              >
                Inicio do Projeto
              </TableCell>
              <TableCell
                sx={{ width: "13%", color: "primary.main" }}
                padding="none"
              ></TableCell>
              <TableCell
                sx={{ width: "2%", color: "primary.main" }}
                padding="none"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ width: "8%" }} size="small" padding="none">
                  {index <= 9 ? "0" + (index + 1) : index + 1}
                </TableCell>
                <TableCell sx={{ width: "60%" }} size="small" padding="none">
                  {row.nome}
                </TableCell>
                <TableCell sx={{ width: "17%" }} size="small" padding="none">
                  {fDateTime(row.data_inicio, "dd MMM yyyy")}
                </TableCell>
                <TableCell sx={{ width: "13%" }} size="small" padding="none">
                  {row.data_fim
                    ? fDateTime(row.data_fim, "dd MMM yyyy")
                    : "Ativo"}
                </TableCell>
                <TableCell sx={{ width: "2%" }} size="small" padding="none">
                  <IconButton
                    padding="none"
                    aria-label="delete"
                    size="small"
                    onClick={(e) =>
                      handleEdit(
                        e,
                        row.id_clientes,
                        row.nome,
                        row.descricao,
                        row.data_inicio,
                        row.data_fim,
                        row.email,
                        row.cod_prioridade
                      )
                    }
                  >
                    <ModeEditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    padding="none"
                    aria-label="delete"
                    size="small"
                    onClick={(e) => handleExcluir(e, row.id_clientes)}
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

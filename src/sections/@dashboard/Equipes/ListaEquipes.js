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
import { equipesService } from "@/../pages/api/organizacaoService/equipesService";
import { fDateTime } from "@/utils/formatTime";
import AppContext from "@/hooks/AppContext";

export default function ListaEquipes({ idUsuario }) {
  const {
    recarrega,
    setRecarrega,
    dadosAppBar,
    setTelaDetalhe,
    setTelaEdicao,
    usuarioLogado,
  } = React.useContext(AppContext);

  const [equipes, setEquipes] = React.useState([]);

  async function retornaEquipes() {
    if (dadosAppBar) {
      setEquipes(dadosAppBar);
    } else {
      const cookies = nookies.get();
      const ListaEquipes = await equipesService.pegaTodasEquipes(
        cookies.ACCESS_TOKEN,
        usuarioLogado.id_organizacoes
      );
      setEquipes(ListaEquipes);
    }
  }

  async function handleEdit(
    e,
    id_equipes,
    nome,
    descricao,
    data_inicio,
    data_fim,
    id_organizacoes
  ) {
    e.preventDefault();
    setTelaDetalhe(true);
    setTelaEdicao({
      editando: true,
      dados: {
        id_equipes: id_equipes,
        nome: nome,
        descricao: descricao,
        data_inicio: data_inicio,
        data_fim: data_fim,
        id_organizacoes: id_organizacoes,
      },
    });
  }

  async function handleExcluir(e, id_organizacoes, id_equipes) {
    const cookies = nookies.get();
    await equipesService.deletaEquipe(
      cookies.ACCESS_TOKEN,
      id_organizacoes,
      id_equipes
    );
    setRecarrega(recarrega + 1);
  }

  React.useEffect(() => {
    retornaEquipes();
  }, [recarrega]);

  return (
    <React.Fragment>
      <Title align="center" variant="h5">
        Lista de Equipes
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
                Nome da Equipe
              </TableCell>
              <TableCell
                sx={{ width: "17%", color: "primary.main" }}
                padding="none"
              >
                Inicio da Equipe
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
            {equipes.map((row, index) => (
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
                        row.id_equipes,
                        row.nome,
                        row.descricao,
                        row.data_inicio,
                        row.data_fim,
                        row.id_organizacoes,
                      )
                    }
                  >
                    <ModeEditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    padding="none"
                    aria-label="delete"
                    size="small"
                    onClick={(e) => handleExcluir(e, row.id_organizacoes, row.id_equipes)}
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

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
import { projetosService } from "@/../pages/api/organizacaoService/projetosService";
import { fDateTime } from "@/utils/formatTime";
import AppContext from "@/hooks/AppContext";
import { organizacaoService } from "../../../../pages/api/organizacaoService/organizacaoService";

export default function ListaProjetos({ idUsuario }) {
  const {
    recarrega,
    setRecarrega,
    dadosAppBar,
    setTelaDetalhe,
    setTelaEdicao,
    usuarioLogado,
  } = React.useContext(AppContext);

  const [projetos, setProjetos] = React.useState([]);

  async function retornaProjetos() {
    if (dadosAppBar) {
      setProjetos(dadosAppBar);
    } else {
      const cookies = nookies.get();
      const ListaProjetos = await projetosService.pegaTodosProjetos(
        cookies.ACCESS_TOKEN,
        usuarioLogado.id_organizacoes
      );
      setProjetos(ListaProjetos);
    }
  }

  async function handleEdit(
    e,
    id_projetos,
    nome,
    duracao_prevista,
    data_inicio,
    data_fim,
    id_clientes,
    id_equipes,
    id_organizacoes
  ) {
    e.preventDefault();
    setTelaDetalhe(true);
    setTelaEdicao({
      editando: true,
      dados: {
        id_projetos: id_projetos,
        nome: nome,
        duracao_prevista: duracao_prevista,
        data_inicio: data_inicio,
        data_fim: data_fim,
        id_clientes: id_clientes,
        id_equipes: id_equipes,
        id_organizacoes: id_organizacoes,
      },
    });
  }

  async function handleExcluir(e, id_organizacoes, id_projetos) {
    const cookies = nookies.get();
    await projetosService.deletaProjeto(cookies.ACCESS_TOKEN, id_organizacoes, id_projetos);
    setRecarrega(recarrega + 1);
  }

  React.useEffect(() => {
    retornaProjetos();
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
            {projetos.map((row, index) => (
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
                        row.id_projetos,
                        row.nome,
                        row.duracao_prevista,
                        row.data_inicio,
                        row.data_fim,
                        row.id_clientes,
                        row.id_equipes,
                        row.id_organizacoes
                      )
                    }
                  >
                    <ModeEditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    padding="none"
                    aria-label="delete"
                    size="small"
                    onClick={(e) => handleExcluir(e, row.id_projetos)}
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

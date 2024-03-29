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
import { cargosService } from "@/../pages/api/cargosService/cargosService";
import { fDateTime } from "@/utils/formatTime";
import AppContext from "@/hooks/AppContext";

export default function ListaCargos({ idUsuario }) {
  const {
    recarrega,
    setRecarrega,
    dadosAppBar,
    setTelaDetalhe,
    setTelaEdicao,
  } = React.useContext(AppContext);

  const [cargos, setCargos] = React.useState([]);

  async function retornaCargos() {
    if (dadosAppBar) {
      setCargos(dadosAppBar);
    } else {
      const cookies = nookies.get();
      const ListaCargos = await cargosService.pegaTodasCargos(
        cookies.ACCESS_TOKEN
      );
      setCargos(ListaCargos);
    }
  }

  async function handleEdit(
    e,
    id_cargos,
    nome,
    descricao_cargo,
    data_inicio,
    data_fim,
    cod_categoria
  ) {
    e.preventDefault();
    setTelaDetalhe(true);
    setTelaEdicao({
      editando: true,
      dados: {
        id_cargos: id_cargos,
        nome: nome,
        descricao_cargo: descricao_cargo,
        data_inicio: data_inicio,
        data_fim: data_fim,
        cod_categoria: cod_categoria,
      },
    });
  }

  async function handleExcluir(e, id_cargos) {
    const cookies = nookies.get();
    await cargosService.deletaCargos(cookies.ACCESS_TOKEN, id_cargos);
    setRecarrega(recarrega + 1);
  }

  React.useEffect(() => {
    retornaCargos();
  }, [recarrega]);

  return (
    <React.Fragment>
      <Title align="center" variant="h5">
        Lista de Cargos
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
                Descrição do Cargo
              </TableCell>
              <TableCell
                sx={{ width: "17%", color: "primary.main" }}
                padding="none"
              >
                Inicio do Cargo
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
            {cargos.map((row, index) => (
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
                        row.id_cargos,
                        row.nome,
                        row.descricao_cargo,
                        row.data_inicio,
                        row.data_fim,
                        row.cod_categoria
                      )
                    }
                  >
                    <ModeEditIcon fontSize="inherit" />
                  </IconButton>

                  <IconButton
                    padding="none"
                    aria-label="delete"
                    size="small"
                    onClick={(e) => handleExcluir(e, row.id_cargos)}
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

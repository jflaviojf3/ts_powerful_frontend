import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Title from "@/layouts/dashboardMui/Title";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { gerarPlanilhaExcel } from "@/utils/PlanilhaUtil";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";

import {
  fDate,
  fDateTime,
  fDifMinutos,
  getCurrentDateTime,
} from "../../../utils/formatTime";

import nookies from "nookies";
import { tarefaService } from "@/../pages/api/usuarioService/tarefaService";
import { pontoService } from "@/../pages/api/usuarioService/pontoService";
import AppContext from "@/hooks/AppContext";

const ExportarDados = ({ idUsuario }) => {
  const { recarrega, setRecarrega, setDadosAppBar, dadosAppBar, telaDetalhe, setTelaDetalhe } =
    React.useContext(AppContext);

  const [tarefas, setTarefas] = React.useState([]);
  async function retornaTarefas() {
    const cookies = nookies.get();
    const tarefas = await tarefaService.pegaTarefasPeriodo(
      cookies.ACCESS_TOKEN,
      idUsuario,
      telaDetalhe ? telaDetalhe.dataInicio : fDate(getCurrentDateTime(true), "yyyyMMdd"),
      telaDetalhe ? telaDetalhe.dataFim : fDate(getCurrentDateTime(), "yyyyMMdd")
    );
    await setTarefas(tarefas);
  }

  const [pontos, setPontos] = React.useState([]);
  async function retornaPontos() {
    const cookies = nookies.get();
    const pontoDia = await pontoService.pegaPontosPeriodo(
      cookies.ACCESS_TOKEN,
      idUsuario,
      telaDetalhe ? telaDetalhe.dataInicio : fDate(getCurrentDateTime(true), "yyyyMMdd"),
      telaDetalhe ? telaDetalhe.dataFim : fDate(getCurrentDateTime(), "yyyyMMdd")
    );
    await setPontos(pontoDia);
  }

  const dadosListaTarefa = [
    ["Entrada", "Descrição", "Data_Inicio", "Data_Fim", "Tempo"],
  ];
  const enviaDadosTarefa = (col1, col2, col3, col4, col5, col6) => {
    dadosListaTarefa.push([col1, col2, col3, col4, col5, col6]);
  };

  const dadosListaPonto = [["Situação", "Descrição", "Data_Hora"]];
  const enviaDadosPonto = (col1, col2, col3) => {
    dadosListaPonto.push([col1, col2, col3]);
  };

  const enviaDadoExportacao = (aba) => {
    let dadosTela = {}
    if (aba == 1) {
      dadosTela = {
        planilha: "tarefa",
        dados: dadosListaTarefa,
      };
      setDadosAppBar(dadosTela)
    } else if (aba == 2) {
      dadosTela = {
        planilha: "ponto",
        dados: dadosListaPonto,
      };
      setDadosAppBar(dadosTela)
    } else {
      alert("Erro ao exportar dados");
    }
  };
  const [value, setValue] = React.useState("1");
  
  React.useEffect(() => {
    retornaTarefas();
    retornaPontos();
    enviaDadoExportacao(value)
  }, [recarrega, telaDetalhe ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    //setRecarrega(recarrega + 1);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "auto",
                }}
              >
                <Title align="center" variant="h5">
                  Lista de {value == 1 ? "Tarefa" : "Ponto"}
                </Title>
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        centered
                      >
                        <Tab label="EXPORTAR LISTA DE TAREFAS" value="1" />
                        <Tab label="EXPORTAR LISTA DE PONTOS" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{ width: "60%", color: "primary.main" }}
                            >
                              Descrição da Tarefa
                            </TableCell>
                            <TableCell
                              sx={{ width: "25%", color: "primary.main" }}
                            >
                              Periodo
                            </TableCell>
                            <TableCell
                              sx={{ width: "15%", color: "primary.main" }}
                            >
                              Tempo Total
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tarefas.map((row, index) => (
                            <TableRow key={index}>
                              {enviaDadosTarefa(
                                row.entrada,
                                row.descricao,
                                fDateTime(row.createdAt, "dd/MM/yyyy - HH:mm:ss"),
                                fDateTime(row.data_fim, "dd/MM/yyyy - HH:mm:ss"),
                                row.data_fim
                                  ? fDifMinutos(row.createdAt, row.data_fim)
                                  : "00:00:00"
                              )}
                              <TableCell sx={{ width: "60%" }} size="small">
                                {row.entrada}
                                {" | "}
                                {row.descricao}
                              </TableCell>
                              <TableCell sx={{ width: "25%" }}>
                                <Tooltip
                                  title={row.createdAt}
                                  placement="top-end"
                                >
                                  {fDateTime(row.createdAt, "HH:mm:ss")}
                                </Tooltip>{" "}
                                {row.data_fim ? "-" : ""}{" "}
                                <Tooltip
                                  title={row.data_fim}
                                  placement="top-end"
                                >
                                  {fDateTime(row.data_fim, "HH:mm:ss")}
                                </Tooltip>
                              </TableCell>
                              <TableCell sx={{ width: "15%" }}>
                                {row.data_fim
                                  ? fDifMinutos(row.createdAt, row.data_fim)
                                  : "00:00:00"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabPanel>
                    <TabPanel value="2">
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{ width: "18%", color: "primary.main" }}
                            >
                              Situação
                            </TableCell>
                            <TableCell
                              sx={{ width: "57%", color: "primary.main" }}
                            >
                              Descrição do Ponto
                            </TableCell>
                            <TableCell
                              sx={{ width: "25%", color: "primary.main" }}
                            >
                              Data e Hora
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {pontos.map((row, index) => (
                            <TableRow key={index}>
                              {enviaDadosPonto(
                                row.situacao,
                                row.descricao,
                                fDateTime(
                                  row.hora_ponto,
                                  "dd/MM/yyyy - HH:mm:ss"
                                )
                              )}
                              <TableCell sx={{ width: "18%" }} size="small">
                                {row.situacao}
                              </TableCell>
                              <TableCell sx={{ width: "57%" }} size="small">
                                {row.descricao}
                              </TableCell>
                              <TableCell sx={{ width: "25%" }}>
                                {fDateTime(
                                  row.hora_ponto,
                                  "dd/MM/yyyy - HH:mm:ss a"
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabPanel>
                  </TabContext>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ExportarDados;

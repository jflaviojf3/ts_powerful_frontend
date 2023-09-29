import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Title from "@/layouts/dashboardMui/Title";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import TotaisUsuario from "./TotaisUsuario";
import { TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import ChartTotalTarefasPorProjeto from "./ChartTotalTarefaMes";

const VisualizarRelatorios = () => {
  const [usuarios, setUsuarios] = React.useState([]);

  const [value, setValue] = React.useState("1");

  const [listaTotalTarefasPorProjeto, setListaTotalTarefasPorProjeto] =
    React.useState([]);

  const [listaTarefaMes, setListaTarefaMes] = React.useState([]);

  React.useEffect(() => {
    buscarDadosUsuarioSelecionado();
    buscarUsuarios();
  }, []);

  const buscarUsuarios = () => {
    setUsuarios([
      { id: 1, nome: "Manoel" },
      { id: 2, nome: "Jessé" },
    ]);
  };

  const buscarDadosUsuarioSelecionado = (idUsuario) => {
    buscarTotalTarefasPorProjeto(idUsuario);
    buscarTarefasMes(idUsuario);
  };

  const buscarTotalTarefasPorProjeto = (idUsuario) => {
    const dados = [];

    for (let i = 0; i <= 20; i++) {
      dados.push({
        projeto: "P" + i,
        quantidade: Math.floor(Math.random() * 50),
      });
    }

    setListaTotalTarefasPorProjeto(dados);
  };

  const buscarTarefasMes = (idUsuario) => {
    const dados = [];

    for (let i = 0; i <= 30; i++) {
      dados.push({ dia: i, quantidade: i * Math.ceil(Math.random(1) * 25) });
    }

    setListaTarefaMes(dados);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                  Visualizar Relatorios
                </Title>
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        centered
                      >
                        {usuarios.map((usuario, index) => (
                          <Tab
                            label={usuario.nome}
                            value={index}
                            key={index}
                            onClick={() =>
                              buscarDadosUsuarioSelecionado(usuario.id)
                            }
                          />
                        ))}
                      </TabList>
                    </Box>
                  </TabContext>

                  <Box sx={{ m: 2 }}></Box>
                  <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          height: 350,
                        }}
                      >
                        <Chart dados={listaTarefaMes} />
                      </Paper>
                    </Grid>

                    <Grid item xs={12} md={8} lg={9}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          height: 350,
                        }}
                      >
                        <ChartTotalTarefasPorProjeto
                          dados={listaTotalTarefasPorProjeto}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          height: 300,
                          width: "100%",
                          maxWidth: "33vh",
                          margin: "auto",
                          alignItems: "center"
                        }}
                      >
                        <TotaisUsuario />
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default VisualizarRelatorios;

import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Ponto from "./Ponto";
import TrabalhoDia from "./TrabalhoDia";
import SaldoDia from "./SaldoDia";
import SaldoTotal from "./SaldoTotal";
import AppContext from "@/hooks/AppContext";

const Pontos = ({ idUsuario }) => {
  const { recarrega, setRecarrega } = React.useContext(AppContext);
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
          height: "90vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" align="center" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={2} align="center">
            <Grid item xs={12} align="center">
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 410,
                }}
              >
                <Ponto idUsuario={idUsuario} />
              </Paper>
            </Grid>
            <Grid
              container
              spacing={3}
              align="center"
              sx={{ p: 2, display: "flex", flexDirection: "row" }}
            >
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 100,
                    width: "100%", // Use 100% para preencher o espaço disponível horizontalmente
                    maxWidth: "33vh", // Adicione uma largura máxima
                    margin: "auto", // Centralize horizontalmente
                  }}
                >
                  <TrabalhoDia />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 100,
                    width: "100%", // Use 100% para preencher o espaço disponível horizontalmente
                    maxWidth: "33vh", // Adicione uma largura máxima
                    margin: "auto", // Centralize horizontalmente
                  }}
                >
                  <SaldoDia />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 100,
                    width: "100%", // Use 100% para preencher o espaço disponível horizontalmente
                    maxWidth: "33vh", // Adicione uma largura máxima
                    margin: "auto", // Centralize horizontalmente
                  }}
                >
                  <SaldoTotal />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Pontos;

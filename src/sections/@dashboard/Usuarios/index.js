import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ListaUsuarios from "./ListaUsuarios";
import ManterUsuarios from "./ManterUsuarios";
import AppBarUsuarios from "./AppBarUsuarios";
import AppContext from "@/hooks/AppContext";

const Usuarios = ({ AppBar, idUsuario, perfil }) => {
  const { recarrega, setRecarrega, telaDetalhe } = React.useContext(AppContext);
  React.useEffect(() => {}, [recarrega]);

  return (
    <>
      {AppBar ? (
        <>
          <AppBarUsuarios idUsuario={idUsuario} perfil={perfil} />
        </>
      ) : (
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
                  {!telaDetalhe ? (
                    <ListaUsuarios idUsuario={idUsuario} perfil={perfil} />
                  ) : (
                    <ManterUsuarios idUsuario={idUsuario} perfil={perfil} />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Usuarios;

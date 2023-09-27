import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ListaClientes from "./ListaClientes";
import ManterClientes from "./ManterClientes";
import AppBarClientes from "./AppBarClientes";
import AppContext from "@/hooks/AppContext";

const Clientes = ({ AppBar, idUsuario }) => {
  const { recarrega, setRecarrega, telaDetalhe } = React.useContext(AppContext);
  React.useEffect(() => {}, [recarrega]);

  return (
    <>
      {AppBar ? (
        <>
          <AppBarClientes idUsuario={idUsuario} />
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
                    <ListaClientes idUsuario={idUsuario} />
                  ) : (
                    <ManterClientes idUsuario={idUsuario} />
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

export default Clientes;

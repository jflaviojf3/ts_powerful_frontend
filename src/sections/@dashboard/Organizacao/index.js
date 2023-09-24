import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ListaOrganizacao from "./ListaOrganizacao";
import AppBarOrganizacao from "./AppBarOrganizacao";

const Organizacao = ({ AppBar, idUsuario, recarrega, setRecarrega }) => {
  const [buscaAppBar, setBuscaAppBar] = React.useState("");

  React.useEffect(() => {
    console.log("IndexOrg", buscaAppBar)
  }, [recarrega]);
  return (
    <>
      {AppBar ? (
        <>
          <AppBarOrganizacao
            buscaAppBar={buscaAppBar}
            setBuscaAppBar={setBuscaAppBar}
            idUsuario={idUsuario}
            recarrega={recarrega}
            setRecarrega={setRecarrega}
          />
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
                  <ListaOrganizacao
                    buscaAppBar={buscaAppBar}
                    idUsuario={idUsuario}
                    recarrega={recarrega}
                    setRecarrega={setRecarrega}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Organizacao;

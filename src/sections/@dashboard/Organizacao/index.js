import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ListaOrganizacao from "./ListaOrganizacao";
import ManterOrganizacao from "./ManterOrganizacao";
import AppBarOrganizacao from "./AppBarOrganizacao";

const Organizacao = ({
  AppBar,
  idUsuario,
  recarrega,
  setRecarrega,
  buscaAppBarOrg,
  setBuscaAppBarOrg,
}) => {

  const [telaCadastro, setTelaCadastro] = React.useState("kk")
  React.useEffect(() => {
  }, [recarrega]);

  return (
    <>
      {AppBar ? (
        <>
          <AppBarOrganizacao
            buscaAppBarOrg={buscaAppBarOrg}
            setBuscaAppBarOrg={setBuscaAppBarOrg}
            idUsuario={idUsuario}
            recarrega={recarrega}
            setRecarrega={setRecarrega}
            telaCadastro={telaCadastro}
            setTelaCadastro={setTelaCadastro}
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
                  {
                    telaCadastro ? (
                      <ListaOrganizacao
                      buscaAppBarOrg={buscaAppBarOrg}
                      setBuscaAppBarOrg={setBuscaAppBarOrg}
                      idUsuario={idUsuario}
                      recarrega={recarrega}
                      setRecarrega={setRecarrega}
                    />
                    ) : (
                      <ManterOrganizacao
                      buscaAppBarOrg={buscaAppBarOrg}
                      setBuscaAppBarOrg={setBuscaAppBarOrg}
                      idUsuario={idUsuario}
                      recarrega={recarrega}
                      setRecarrega={setRecarrega}
                    />
                    )
                  }
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

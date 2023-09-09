import { useRouter } from "next/router";

import Head from "next/head";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
// hooks
import useResponsive from "../src/hooks/useResponsive";
import { useEffect } from "react";

// ----------------------------------------------------------------------

function Autenticacao() {
  const router = useRouter();
  const { token } = router.query;
  const isAuthenticated = token;

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("1 - Autenticar");
      router.push("/");
    } else {
      router.replace(router.pathname, undefined, { shallow: true });
    }

  }, []);
}

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

const PainelInterno = () => {
  Autenticacao();
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <Head>
        <title>Painel Interno</title>
      </Head>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Bem vindo a pagina interna!
            </Typography>
            <img src="/TS_.svg" alt="login" />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              href="/"
            >Voltar pro Login</Button>
          </StyledSection>
        )}
      </StyledRoot>
    </>
  );
};

export default PainelInterno;
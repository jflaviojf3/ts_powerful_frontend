import { useState } from "react";
import Head from "next/head";
// @mui
import { styled } from "@mui/material/styles";
import { Link, Container, Typography } from "@mui/material";
// hooks
import useResponsive from "../src/hooks/useResponsive";
// sections
import { LoginForm } from "../src/sections/auth/login";
import { CadastroForm } from "../src/sections/auth/cadastro";

// ----------------------------------------------------------------------

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

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const Login = () => {
  const [formularioAtual, setFormularioAtual] = useState("LoginForm");
  const mdUp = useResponsive("up", "md");

  const alternarFormulario = () => {
    if (formularioAtual === "LoginForm") {
      setFormularioAtual("CadastroForm");
    } else {
      setFormularioAtual("LoginForm");
    }
  };

  return (
    <>
      <Head>
        <title>Login | Cadastro</title>
      </Head>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Olá, Bem vindo de volta
            </Typography>
            <img src="/TS_.svg" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              {formularioAtual === "LoginForm"
                ? "Acesso Ao Sistema"
                : "Faça O Seu Cadastro"}
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              {formularioAtual === "LoginForm"
                ? "Primeiro Acesso?"
                : "Você Já Tem Cadastro?"}{" "}
              {""}
              <Link variant="subtitle2" onClick={alternarFormulario}>
                {" "}
                {formularioAtual === "LoginForm"
                  ? "Comece aqui."
                  : "Login"}{" "}
              </Link>
            </Typography>

            {formularioAtual === "LoginForm" ? (
              <LoginForm />
            ) : (
              <CadastroForm setFormularioAtual={setFormularioAtual} />
            )}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};

export default Login;

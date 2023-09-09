import { useRouter } from "next/router";
import Head from "next/head";
// @mui
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";

// ----------------------------------------------------------------------

function Autenticacao() {
  const router = useRouter();
  const { token } = router.query;
  console.log("painelInterno");
  console.log(token);
  // Verifica o estado de autenticação
  const isAuthenticated = token; /* Sua lógica de autenticação aqui */

//   useEffect(() => {
//     // Se o usuário não estiver autenticado, redirecione-o para a página de login
//     if (!isAuthenticated) {
//       router.push("/");
//     }
//   }, [isAuthenticated]);
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
          </StyledSection>
        )}
      </StyledRoot>
    </>
  );
}

export default PainelInterno;
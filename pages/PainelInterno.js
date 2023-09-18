import Head from "next/head";
import nookies from "nookies";
// @mui
import { styled } from "@mui/material/styles";
// hooks
import useResponsive from "../src/hooks/useResponsive";
import { authService } from "./api/autenticacaoService/auth";
import { usuarioService } from "./api/usuarioService/usuarioService";
// componentes & layouts
import DashboardLayout from "./../src/layouts/dashboardMui";

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

// ----------------------------------------------------------------------

const PainelInterno = (props) => {
  const mdUp = useResponsive("up", "md");

  return (
    <>
        <Head>
          <title>Painel Interno</title>
        </Head>
        <DashboardLayout dados={props}>
        </DashboardLayout>
    </>
  );
};

export default PainelInterno

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  try {
    const session = await authService.verificaToken(cookies.ACCESS_TOKEN);
    const usuario = await usuarioService.pegaUsuarioLogado(
      cookies.ACCESS_TOKEN,
      session.usuarioId
    );
    return {
      props: {
        usuario,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
}

import * as React from "react";
import { useRouter } from "next/router";
import {
  styled,
  createTheme,
  ThemeProvider,
  alpha,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

//MeusComponentes
import MeusItems from "./listItems.js";
import Tarefas from "../../sections/@dashboard/Tarefas";
import Pontos from "../../sections/@dashboard/Pontos";
import Cargos from "../../sections/@dashboard/Cargos";
import Clientes from "../../sections/@dashboard/Clientes";
import Equipes from "../../sections/@dashboard/Equipes";
import ExportarDados from "../../sections/@dashboard/ExportarDados";
import Projetos from "../../sections/@dashboard/Projetos";
import VisualizarRelatorios from "../../sections/@dashboard/VisualizarRelatorios";
import Configuracao from "../../sections/@dashboard/Configuracao";
import Organizacao from "../../sections/@dashboard/Organizacao";
import Carregando from "../../sections/@dashboard/Carregando";

import AppBarTarefas from "../../sections/@dashboard/Tarefas/AppBarTarefas.js";
import AppBarPonto from "../../sections/@dashboard/Pontos/AppBarPonto.js";
import AppBarCargos from "../../sections/@dashboard/Cargos/AppBarCargos.js";
import AppBarCarregando from "../../sections/@dashboard/Carregando/AppBarCarregando.js";
import AppBarClientes from "../../sections/@dashboard/Clientes/AppBarClientes.js";
import AppBarConfiguracao from "../../sections/@dashboard/Configuracao/AppBarConfiguracao.js";
import AppBarEquipes from "../../sections/@dashboard/Equipes/AppBarEquipes.js";
import AppBarExportarDados from "../../sections/@dashboard/ExportarDados/AppBarExportarDados.js";
import AppBarOrganizacao from "../../sections/@dashboard/Organizacao/AppBarOrganizacao.js";
import AppBarProjetos from "../../sections/@dashboard/Projetos/AppBarProjetos.js";
import AppBarVisualizarRelatorios from "../../sections/@dashboard/VisualizarRelatorios/AppBarVisualizarRelatorios.js";
import AppBarUsuario from "../../sections/@dashboard/Tarefas/AppBarTarefas.js";

import { authService } from "../../../pages/api/autenticacaoService/auth.js";

import AppContext from "@/hooks/AppContext";

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Acesse a Api "}
      <Link
        color="inherit"
        href="https://api-ts-powerful.jamb-devs.tech/v1/api-docs/"
      >
        Documentação Swagger
      </Link>
      {"."}
    </Typography>
  );
}
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard(props) {
  const {
    recarrega,
    setRecarrega,
    setTelaDetalhe,
    setDadosAppBar,
    setTelaEdicao,
  } = React.useContext(AppContext);

  const router = useRouter();
  const [nome, setNome] = React.useState("null");
  const [perfi, setPerfil] = React.useState("null");
  const [sobrenome, setSobrenome] = React.useState("null");
  const [foto, setFoto] = React.useState("null");
  const [idUsuario, setIdUsuario] = React.useState(
    props.dados.usuario.id_usuarios
  );
  const [menuDescricao, setMenuDescricao] = React.useState("Tarefa");
  const [appBarAtual, setAppBarAtual] = React.useState("Tarefa");

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const usuarios = props.dados.usuario;
  const carregaDados = React.useCallback(() => {
    const cod_perfil = usuarios.cod_perfil;
    if (cod_perfil == 4) {
      setPerfil("Adm. Sistema");
    } else if (cod_perfil == 3) {
      setPerfil("Gerente");
    } else if (cod_perfil == 2) {
      setPerfil("Funcionário");
    } else {
      setPerfil("Usuário");
    }
    setSobrenome(usuarios.sobrenome);
    setNome(usuarios.nome);
    setIdUsuario(usuarios.id_usuarios);
    setMenuDescricao("Tarefa");
    const bufferData = !usuarios.foto ? "0" : usuarios.foto.data;
    const fotoBase = Buffer.from(bufferData).toString("base64");
    const fotoAvatar = atob(fotoBase);
    bufferData != "0"
      ? setFoto(fotoAvatar)
      : setFoto("/assets/images/avatars/avatar_default.jpg");
  }, [props.dados.usuario]);

  React.useEffect(() => {
    carregaDados();
  }, [carregaDados]);

  const ClickItem = (itemText) => {
    setMenuDescricao(itemText);
    setAppBarAtual(itemText);
    setDadosAppBar(null);
    setTelaDetalhe(false);
    setTelaEdicao({ editando: false });
    setRecarrega(recarrega + 1);
  };

  //Tranferencia de dados de AppBar para Tela
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          sx={{ backgroundColor: "#3F51B5", padding: "2px" }}
        >
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {appBarAtual === "Tarefa" ? (
                <AppBarTarefas idUsuario={idUsuario} />
              ) : appBarAtual === "Cargos" ? (
                <AppBarCargos idUsuario={idUsuario} />
              ) : appBarAtual === "Clientes" ? (
                <AppBarClientes idUsuario={idUsuario} />
              ) : appBarAtual === "Configuração" ? (
                <AppBarConfiguracao idUsuario={idUsuario} />
              ) : appBarAtual === "Equipes" ? (
                <AppBarEquipes idUsuario={idUsuario} />
              ) : appBarAtual === "Exportar Dados" ? (
                <AppBarExportarDados idUsuario={idUsuario} />
              ) : appBarAtual === "Organização" ? (
                <Organizacao AppBar={true} idUsuario={idUsuario} />
              ) : appBarAtual === "Projetos" ? (
                <AppBarProjetos idUsuario={idUsuario} />
              ) : appBarAtual === "Visualizar Relatorios" ? (
                <AppBarVisualizarRelatorios idUsuario={idUsuario} />
              ) : appBarAtual === "Ponto" ? (
                <AppBarPonto idUsuario={idUsuario} />
              ) : appBarAtual === "Carregando" ? (
                <AppBarCarregando />
              ) : (
                (router.push("/"), authService.logout())
              )}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <Box>
              <Link underline="none" href="PainelInterno">
                <StyledAccount>
                  <Avatar src={foto} alt="photoURL" />
                  <Box sx={{ ml: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "text.primary" }}
                    >
                      {nome} {sobrenome}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {perfi}
                    </Typography>
                  </Box>
                </StyledAccount>
              </Link>
            </Box>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <List component="nav">
            <MeusItems ClickItem={ClickItem} />
          </List>
        </Drawer>
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
          {menuDescricao === "Tarefa" ? (
            <Tarefas idUsuario={idUsuario} />
          ) : menuDescricao === "Cargos" ? (
            <Cargos idUsuario={idUsuario} />
          ) : menuDescricao === "Clientes" ? (
            <Clientes idUsuario={idUsuario} />
          ) : menuDescricao === "Configuração" ? (
            <Configuracao idUsuario={idUsuario} />
          ) : menuDescricao === "Equipes" ? (
            <Equipes idUsuario={idUsuario} />
          ) : menuDescricao === "Exportar Dados" ? (
            <ExportarDados idUsuario={idUsuario} />
          ) : menuDescricao === "Organização" ? (
            <Organizacao idUsuario={idUsuario} />
          ) : menuDescricao === "Projetos" ? (
            <Projetos idUsuario={idUsuario} />
          ) : menuDescricao === "Visualizar Relatorios" ? (
            <VisualizarRelatorios idUsuario={idUsuario} />
          ) : menuDescricao === "Ponto" ? (
            <Pontos idUsuario={idUsuario} />
          ) : menuDescricao === "Carregando" ? (
            <Carregando />
          ) : (
            (router.push("/"), authService.logout())
          )}
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

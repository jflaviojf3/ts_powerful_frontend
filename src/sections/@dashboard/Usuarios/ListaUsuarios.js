import * as React from "react";
import { Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import Title from "@/layouts/dashboardMui/Title";

import nookies from "nookies";
import { usuarioService } from "@/../pages/api/usuarioService/usuarioService";
import AppContext from "@/hooks/AppContext";

export default function ListaOrganizacao({ idUsuario, perfil }) {
  const {
    recarrega,
    setRecarrega,
    dadosAppBar,
    setTelaDetalhe,
    telaDetalhe,
    setTelaEdicao,
  } = React.useContext(AppContext);

  const [usuarios, setUsuarios] = React.useState([]);
  
  async function retornaUsuarios() {
    if (!telaDetalhe && (perfil === "Adm. Sistema" || perfil === "Gerente")) {
      if (dadosAppBar) {
        setUsuarios(dadosAppBar);
      } else {
        const cookies = nookies.get();
        const ListaUsuarios = await usuarioService.pegaTodosUsuarios(
          cookies.ACCESS_TOKEN
        );
        setUsuarios(ListaUsuarios);
      }
    } else {
      const cookies = nookies.get();
      const Usuario = await usuarioService.pegaUmUsuario(
        cookies.ACCESS_TOKEN,
        idUsuario
      );
      await setTelaEdicao({
        editando: true,
        dados: {
          id_usuarios: Usuario.id_usuarios,
          nome: Usuario.nome,
          sobrenome: Usuario.sobrenome,
          email: Usuario.email,
          ativo: Usuario.ativo,
          ddd: Usuario.ddd,
          telefone: Usuario.telefone,
          data_nascimento: Usuario.data_nascimento,
          cpf: Usuario.cpf,
          descricao: Usuario.descricao,
          foto: Usuario.foto,
          cod_sexo: Usuario.cod_sexo,
          cod_perfil: Usuario.cod_perfil,
          id_cargos: Usuario.id_cargos,
          id_organizacoes: Usuario.id_organizacoes,
        },
      });
      await setTelaDetalhe(true);
    }
  }

  const carregaAvatar = (avatar) => {
    const bufferData = !avatar ? "0" : avatar.data;
    const fotoBase = Buffer.from(bufferData).toString("base64");
    const fotoAvatar = atob(fotoBase);
    if (bufferData != "0") {
      return fotoAvatar;
    } else {
      return "/assets/images/avatars/avatar_default.jpg";
    }
  };

  async function handleEdit(
    e,
    id_usuarios,
    nome,
    sobrenome,
    email,
    ativo,
    ddd,
    telefone,
    data_nascimento,
    cpf,
    descricao,
    foto,
    cod_sexo,
    cod_perfil,
    id_cargos,
    id_organizacoes
  ) {
    e.preventDefault();
    setTelaDetalhe(true);
    setTelaEdicao({
      editando: true,
      dados: {
        id_usuarios: id_usuarios,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        ativo: ativo,
        ddd: ddd,
        telefone: telefone,
        data_nascimento: data_nascimento,
        cpf: cpf,
        descricao: descricao,
        foto: foto,
        cod_sexo: cod_sexo,
        cod_perfil: cod_perfil,
        id_cargos: id_cargos,
        id_organizacoes: id_organizacoes,
      },
    });
  }

  async function handleExcluir(e, id_usuarios) {
    const cookies = nookies.get();
    await usuarioService.deletaUsuario(cookies.ACCESS_TOKEN, id_usuarios);
    setRecarrega(recarrega + 1);
  }

  function retornaPerfil(cod_perfil) {
    if (cod_perfil == 4) {
      return "Adm. Sistema";
    } else if (cod_perfil == 3) {
      return "Gerente";
    } else if (cod_perfil == 2) {
      return "Funcionário";
    } else {
      return "Usuário";
    }
  }

  React.useEffect(() => {
    retornaUsuarios();
  }, [recarrega]);

  return (
    <React.Fragment>
      <Title align="center" variant="h5">
        Lista de Usuários
      </Title>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ width: "25%", color: "primary.main" }}
                padding="none"
              >
                Nome do Usuário
              </TableCell>
              <TableCell
                sx={{ width: "25%", color: "primary.main" }}
                padding="none"
              >
                Perfil do Usuário
              </TableCell>
              <TableCell
                sx={{ width: "20%", color: "primary.main" }}
                padding="none"
              >
                <Tooltip title="Está vinculado a Organização?">
                  Organização
                </Tooltip>
              </TableCell>
              <TableCell
                sx={{ width: "13%", color: "primary.main" }}
                padding="none"
              >
                <Tooltip title="Possui Algum Cargo?">Cargo</Tooltip>
              </TableCell>
              <TableCell
                sx={{ width: "12%", color: "primary.main" }}
                padding="none"
              >
                <Tooltip title="Está Ativo na Organização">Ativo</Tooltip>
              </TableCell>
              <TableCell
                sx={{ width: "5%", color: "primary.main" }}
                padding="none"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{ width: "30%", padding: "0px", margin: "0px" }}
                  size="small"
                >
                  <Stack direction="row" alignItems={"center"}>
                    <Avatar
                      src={carregaAvatar(row.foto)}
                      alt="photoURL"
                      sx={{ mr: "10%" }}
                    />
                    {row.nome} {row.sobrenome}
                  </Stack>
                </TableCell>
                <TableCell
                  aria-sort="ascending"
                  sx={{ width: "20%", padding: "0px", margin: "0px" }}
                  size="small"
                >
                  {retornaPerfil(row.cod_perfil)}
                </TableCell>
                <TableCell
                  sx={{ width: "20%", padding: "0px", margin: "0px" }}
                  size="small"
                >
                  {row.id_organizacoes ? "Sim" : "Não"}
                </TableCell>
                <TableCell
                  sx={{ width: "13%", padding: "0px", margin: "0px" }}
                  size="small"
                >
                  {row.id_cargos ? " Sim " : " Não "}
                </TableCell>
                <TableCell
                  sx={{ width: "12%", padding: "0px", margin: "0px" }}
                  size="small"
                >
                  {(row.ativo = 1 ? " Sim " : " Não ")}
                </TableCell>
                <TableCell
                  sx={{ width: "5%", padding: "0px", margin: "0px" }}
                  size="small"
                >
                  <IconButton
                    padding="none"
                    aria-label="delete"
                    size="small"
                    onClick={(e) =>
                      handleEdit(
                        e,
                        row.id_usuarios,
                        row.nome,
                        row.sobrenome,
                        row.email,
                        row.ativo,
                        row.ddd,
                        row.telefone,
                        row.data_nascimento,
                        row.cpf,
                        row.descricao,
                        row.foto,
                        row.cod_sexo,
                        row.cod_perfil,
                        row.id_cargos,
                        row.id_organizacoes
                      )
                    }
                  >
                    <ModeEditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    padding="none"
                    aria-label="delete"
                    size="small"
                    onClick={(e) => handleExcluir(e, row.id_usuarios)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </React.Fragment>
  );
}

import * as React from "react";
import {
  Stack,
  TextField,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Title from "@/layouts/dashboardMui/Title";

import nookies from "nookies";
import { organizacaoService } from "@/../pages/api/organizacaoService/organizacaoService";
import { fDateTime } from "@/utils/formatTime";
import AppContext from "@/hooks/AppContext";

export default function ManterCargo({ idUsuario }) {
  const { recarrega, setRecarrega, dadosAppBar, setTelaDetalhe, telaEdicao, setTelaEdicao } =
    React.useContext(AppContext);

  const [formData, setFormData] = React.useState({
    nome: telaEdicao.editando ? telaEdicao.dados.nome : "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.nome) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
      const body = {
        nome: formData.nome,
      };
      const cookies = nookies.get();
      const ListaOrgs = await organizacaoService.insereOrganizacao(
        cookies.ACCESS_TOKEN,
        body
      );

        alert("Cadastro realizado com sucesso!");
        setTimeout(() => {
          setTelaDetalhe(false);
        }, 1000);
      
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const EditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.nome) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
      const body = {
        nome: formData.nome,
      };
      const cookies = nookies.get();
      const ListaOrgs = await organizacaoService.atualizaOrganizacao(
        cookies.ACCESS_TOKEN,
        telaEdicao.dados.id_organizacoes,
        body
      );
        alert("Cadastro Atulizado com sucesso!");
        setTimeout(() => {
          setTelaDetalhe(false);
          setTelaEdicao({editando: false});
        }, 1000);
      
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  return (
    <React.Fragment>
      <Title align="center" variant="h5">
        {telaEdicao.editando ? "Atualiza Organização" : "Nova Organização"}
      </Title>
      <Divider sx={{ my: 3 }}></Divider>
      <Stack spacing={3}>
        <Stack direction="row" spacing={4}>
          <TextField
            name="nome"
            label="Nome da Organização"
            value={formData.nome}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={telaEdicao.editando ? EditSubmit : handleSubmit } 
          >
            {telaEdicao.editando ? "ATUALIZAR": "CADASTRAR" }
          </LoadingButton>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}

import * as React from "react";
import { Stack, TextField, Divider } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Title from "@/layouts/dashboardMui/Title";

import nookies from "nookies";
import { cargosService } from "@/../pages/api/cargosService/cargosService";
import { fDateTime } from "@/utils/formatTime";
import AppContext from "@/hooks/AppContext";

export default function ManterCargo({ idUsuario }) {
  const {
    recarrega,
    setRecarrega,
    dadosAppBar,
    setTelaDetalhe,
    telaEdicao,
    setTelaEdicao,
  } = React.useContext(AppContext);

  const [formData, setFormData] = React.useState({
    id_cargos: telaEdicao.editando ? telaEdicao.dados.id_cargos : "",
    nome: telaEdicao.editando ? telaEdicao.dados.nome : "",
    descricao_cargo: telaEdicao.editando
      ? telaEdicao.dados.descricao_cargo
      : "",
    data_inicio: telaEdicao.editando ? telaEdicao.dados.data_inicio : "",
    data_fim: telaEdicao.editando ? telaEdicao.dados.data_fim : "",
    cod_categoria: telaEdicao.editando ? telaEdicao.dados.cod_categoria : "",
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
      const ListaCargos = await cargosService.insereCargos(
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
      const ListaCargos = await cargosService.atualizaCargos(
        cookies.ACCESS_TOKEN,
        telaEdicao.dados.id_cargos,
        body
      );
      alert("Cadastro atulizado com sucesso!");
      setTimeout(() => {
        setTelaDetalhe(false);
        setTelaEdicao({ editando: false });
      }, 1000);
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  return (
    <React.Fragment>
      <Title align="center" variant="h5">
        {telaEdicao.editando ? "Atualiza Cargo" : "Novo Cargo"}
      </Title>
      <Divider sx={{ my: 3 }}></Divider>
      <Stack spacing={3}>
        <Stack spacing={4}>
          <Stack direction="row" spacing={4}>
            <TextField
              name="nome"
              label="Nome do Cargo"
              value={formData.nome}
              onChange={handleChange}
              sx={{ width: "50%" }}
            />
          </Stack>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            defaultValue="Default Value"
            name="descricao_cargo"
            label="Descrição do Cargo"
            value={formData.descricao_cargo}
            onChange={handleChange}
            sx={{ width: "auto" }}
          />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={telaEdicao.editando ? EditSubmit : handleSubmit}
        >
          {telaEdicao.editando ? "ATUALIZAR" : "CADASTRAR"}
        </LoadingButton>
      </Stack>
    </React.Fragment>
  );
}

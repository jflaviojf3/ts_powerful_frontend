import * as React from "react";
import { Stack, TextField, Divider, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Title from "@/layouts/dashboardMui/Title";

import nookies from "nookies";
import { usuarioService } from "@/../pages/api/usuarioService/usuarioService";
import { cargosService } from "@/../pages/api/cargosService/cargosService";
import { organizacaoService } from "@/../pages/api/organizacaoService/organizacaoService";
import { tabGenericaService } from "@/../pages/api/tabGenericaService/tabGenericaService";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AppContext from "@/hooks/AppContext";
import { formatarDataBR, fDate } from "../../../utils/formatTime";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ManterUsuario({ idUsuarioProp, PerfilProp }) {
  const [chaveSexo, setChaveSexo] = React.useState("");
  const [chaveEquipe, setChaveEquipe] = React.useState("");
  const [chaveOrg, setChaveOrg] = React.useState("");
  const [chaveCargo, setChaveCargo] = React.useState("");
  const [chavePerfil, setChavePerfil] = React.useState("");
  const [parSexo, setParSexo] = React.useState([]);
  const [parPerfil, setParPerfil] = React.useState([]);
  const [equipes, setEquipes] = React.useState([]);
  const [idOrganizacao, setIdOrganizacao] = React.useState([]);
  const [idCargo, setIdCargo] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [dataNasc, setDataNasc] = React.useState(null);

  const handleChangeSeletedSexo = (event) => {
    setChaveSexo(event.target.value);
  };

  const handleChangeSeletedEquipe = (event) => {
    setChaveEquipe(event.target.value);
  };

  const handleChangeSeletedOrg = (event) => {
    console.log(idOrganizacao);
    setChaveOrg(event.target.value);
  };

  const handleChangeSeletedPerfil = (event) => {
    setChavePerfil(event.target.value);
  };

  const handleChangeSeletedCargo = (event) => {
    setChaveCargo(event.target.value);
  };

  const {
    recarrega,
    setRecarrega,
    dadosAppBar,
    telaDetalhe,
    setTelaDetalhe,
    telaEdicao,
    setTelaEdicao,
    usuarioLogado,
  } = React.useContext(AppContext);

  const [formData, setFormData] = React.useState({
    id_usuarios: telaEdicao.editando ? telaEdicao.dados.id_usuarios : "",
    nome: telaEdicao.editando ? telaEdicao.dados.nome : "",
    sobrenome: telaEdicao.editando ? telaEdicao.dados.sobrenome : "",
    email: telaEdicao.editando ? telaEdicao.dados.email : "",
    ativo: telaEdicao.editando ? telaEdicao.dados.ativo : "",
    ddd: telaEdicao.editando ? telaEdicao.dados.ddd : "",
    telefone: telaEdicao.editando ? telaEdicao.dados.telefone : "",
    data_nascimento: telaEdicao.editando
      ? telaEdicao.dados.data_nascimento
      : "",
    cpf: telaEdicao.editando ? telaEdicao.dados.cpf : "",
    descricao: telaEdicao.editando ? telaEdicao.dados.descricao : "",
    foto: telaEdicao.editando ? telaEdicao.dados.foto : "",
    cod_sexo: telaEdicao.editando ? telaEdicao.dados.cod_sexo : "",
    cod_perfil: telaEdicao.editando ? telaEdicao.dados.cod_perfil : "",
    id_cargos: telaEdicao.editando ? telaEdicao.dados.id_cargos : "",
    id_organizacoes: telaEdicao.editando
      ? telaEdicao.dados.id_organizacoes
      : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true)
    // try {
    //   if (!formData.nome || !valueInicio || !formData.descricao || !formData.email || !chave) {
    //     setLoading(false)
    //     alert(`Por favor, preencha todos os campos.`);
    //     return;
    //   }

    //   const body = {
    //     nome: formData.nome,
    //     descricao: formData.descricao,
    //     email: formData.email,
    //     data_inicio: formatarDataBR(valueInicio),
    //     cod_prioridade: chave,
    //   };
    //   const cookies = nookies.get();
    //   const ListaClientes = await clientesService.insereClientes(
    //     cookies.ACCESS_TOKEN,
    //     body
    //   );

    //   alert("Cadastro realizado com sucesso!");
    //   setTimeout(() => {
    //     setTelaDetalhe(false);
    //   }, 1000);
    // } catch (error) {
    //   setLoading(false)
    //   alert(error);
    //   console.error("Erro na solicitação POST:", error);
    // }
  };

  const EditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(telaEdicao.dados.id_usuarios);
    console.log("formData.nome", formData.nome);
    console.log("formData.sobrenome", formData.sobrenome);
    console.log("dataNasc", dataNasc);
    console.log("formData.email", formData.email);
    console.log("formData.ativo", formData.ativo === " Sim " ? 1 : 0);
    console.log("formData.ddd", formData.ddd);
    console.log("formData.telefone", formData.telefone);
    console.log("formData.cpf", formData.cpf);
    console.log("formData.descricao", formData.descricao);
    console.log("formData.cod_sexo", chaveSexo == "" ? null : chaveSexo);
    console.log("formData.cod_perfil", chavePerfil == "" ? null : chavePerfil);
    console.log(
      "formData.id_cargos",
      chaveCargo == "" ? null : retornaIdCargo(chaveCargo, idCargo)
    );
    console.log(
      "formData.id_organizacoes",
      chaveOrg == "" ? null : retornaIdOrg(chaveOrg, idOrganizacao)
    );

    try {
      if (
        !formData.nome ||
        !formData.sobrenome ||
        !formData.email ||
        !formData.ativo ||
        !formData.cod_perfil
      ) {
        setLoading(false);
        alert(
          "Por favor, preencha os campos: nome, sobrenome, email e perfil."
        );
        return;
      }
      const body = {
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        data_nascimento: dataNasc,
        email: formData.email,
        ativo: formData.ativo === " Sim " ? 1 : 0,
        ddd: formData.ddd,
        telefone: formData.telefone,
        cpf: formData.cpf,
        descricao: formData.descricao,
        cod_sexo: chaveSexo == "" ? null : chaveSexo,
        cod_perfil: chavePerfil == "" ? null : chavePerfil,
        id_cargos:
          chaveCargo == "" ? null : retornaIdCargo(chaveCargo, idCargo),
        id_organizacoes:
          chaveOrg == "" ? null : retornaIdOrg(chaveOrg, idOrganizacao),
      };
      console.log("Edit", body);
      const cookies = nookies.get();
      const UsuarioAtualizado = await usuarioService.atualizaUsuario(
        cookies.ACCESS_TOKEN,
        telaEdicao.dados.id_usuarios,
        body
      );
      alert("Usuário atualizado com sucesso!");
      setTimeout(() => {
        setTelaDetalhe(false);
        setTelaEdicao({ editando: false });
      }, 1000);
    } catch (error) {
      setLoading(false);
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const retornaParametro = async (parametro) => {
    try {
      const cookies = nookies.get();
      const ListaParam = await tabGenericaService.pegaListaPropriedadeId(
        cookies.ACCESS_TOKEN,
        parametro
      );
      await setParSexo(ListaParam);
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const retornaParametroPerfil = async (parametro) => {
    try {
      const cookies = nookies.get();
      const ListaParam = await tabGenericaService.pegaListaPropriedadeId(
        cookies.ACCESS_TOKEN,
        parametro
      );
      await setParPerfil(ListaParam);
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const retornaOrganizacao = async () => {
    try {
      const cookies = nookies.get();
      const Organizacao = await organizacaoService.pegaTodasOrganizacoes(
        cookies.ACCESS_TOKEN
      );
      await setIdOrganizacao(Organizacao);
      Organizacao ? "" : await setRecarrega(recarrega + 1);
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const retornaCargo = async () => {
    try {
      const cookies = nookies.get();
      const Cargos = await cargosService.pegaTodasCargos(cookies.ACCESS_TOKEN);
      await setIdCargo(Cargos);
      Cargos ? "" : await setRecarrega(recarrega + 1);
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const retornaValorPar = async (cod_prioridade, consultaParam) => {
    if (telaEdicao.editando) {
      if (consultaParam.length > 0 && cod_prioridade) {
        const descricaoCodigo = await consultaParam.find(
          (item) => item.cod_propriedade === cod_prioridade
        );
        await setChaveSexo(descricaoCodigo.cod_propriedade);
      } else {
        parSexo.length == 0 ? setRecarrega(recarrega + 1) : "";
      }
    }
  };

  const retornaValorOrg = async (idorganizacao, dados) => {
    if (telaEdicao.editando) {
      if (dados.length > 0 && idorganizacao) {
        const descricaoCodigo = await dados.find(
          (item) => item.id_organizacoes === idorganizacao
        );
        await setChaveOrg(descricaoCodigo.nome);
      } else {
        idOrganizacao.length == 0 ? setRecarrega(recarrega + 1) : "";
      }
    }
  };

  const retornaIdOrg = (descOrg, dados) => {
    if (telaEdicao.editando) {
      if (dados.length > 0 && descOrg) {
        const descricaoCodigo = dados.find((item) => item.nome === descOrg);
        return descricaoCodigo.id_organizacoes;
      }
    }
  };

  const retornaIdCargo = (descCargo, dados) => {
    if (telaEdicao.editando) {
      if (dados.length > 0 && descCargo) {
        const descricaoCodigo = dados.find((item) => item.nome === descCargo);
        return descricaoCodigo.id_cargos;
      }
    }
  };

  const retornaValorCargo = async (idcargo, dados) => {
    if (telaEdicao.editando) {
      if (dados.length > 0 && idcargo) {
        const descricaoCodigo = await dados.find(
          (item) => item.id_cargos === idcargo
        );
        await setChaveCargo(descricaoCodigo.nome);
      } else {
        idCargo.length == 0 ? setRecarrega(recarrega + 1) : "";
      }
    }
  };

  const retornaValorParPerfil = async (cod_prioridade, consultaParam) => {
    if (telaEdicao.editando) {
      if (consultaParam.length > 0 && cod_prioridade) {
        const descricaoCodigo = await consultaParam.find(
          (item) => item.cod_propriedade === cod_prioridade
        );
        await setChavePerfil(descricaoCodigo.cod_propriedade);
      } else {
        parPerfil.length == 0 ? setRecarrega(recarrega + 1) : "";
      }
    }
  };

  const carregaDataNasc = (data) => {
    const DataNas = dayjs(data).locale("pt-br").format("YYYY-MM-DD");
    if (data) {
      setDataNasc(DataNas);
    }
  };

  React.useEffect(() => {
    console.log("Passa Parametros:", idUsuarioProp, PerfilProp);
    retornaParametro(1);
    retornaParametroPerfil(2);
    retornaOrganizacao(formData.id_organizacoes);
    retornaCargo(formData.id_cargos);

    retornaValorPar(formData.cod_sexo, parSexo);
    retornaValorOrg(formData.id_organizacoes, idOrganizacao);
    retornaValorCargo(formData.id_cargos, idCargo);
    retornaValorParPerfil(formData.cod_perfil, parPerfil);

    carregaDataNasc(formData.data_nascimento ? formData.data_nascimento : null);
  }, [recarrega]);

  return (
    <React.Fragment>
      <Title align="center" variant="h5">
        Dados Complementares
      </Title>
      <Divider sx={{ my: 3 }}></Divider>
      <Stack spacing={3}>
        <Stack direction="row" spacing={4}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
              <TextField
                name="nome"
                label="Nome"
                value={formData.nome}
                inputProps={{
                  maxLength: 50,
                }}
                onChange={handleChange}
                sx={{ width: "40%" }}
              />
              <TextField
                name="sobrenome"
                label="Sobrenome"
                value={formData.sobrenome}
                inputProps={{
                  maxLength: 50,
                }}
                onChange={handleChange}
                sx={{ width: "40%" }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label="Data Nascimento"
                  value={dataNasc ? dayjs(dataNasc) : dataNasc}
                  onChange={(newValue) =>
                    setDataNasc(
                      dayjs(newValue).locale("pt-br").format("YYYY-MM-DD")
                    )
                  }
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </Stack>
            <Stack direction="row" spacing={3}>
              <TextField
                name="email"
                label="E-mail do Usuario"
                value={formData.email}
                inputProps={{
                  maxLength: 50,
                }}
                onChange={handleChange}
                sx={{ width: "30%" }}
              />

              <TextField
                name="ddd"
                label="DDD"
                value={formData.ddd ? formData.ddd : ""}
                inputProps={{
                  maxLength: 2,
                }}
                onChange={handleChange}
                sx={{ width: "10%" }}
              />

              <TextField
                name="telefone"
                label="Telefone"
                value={formData.telefone ? formData.telefone : ""}
                inputProps={{
                  maxLength: 9,
                }}
                onChange={handleChange}
                sx={{ width: "20%" }}
              />
              <TextField
                name="cpf"
                label="CPF"
                value={formData.cpf}
                onChange={handleChange}
                inputProps={{
                  maxLength: 11,
                }}
                sx={{ width: "20%" }}
              />
              <FormControl sx={{ m: 1, width: "25%" }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Sexo
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={chaveSexo}
                  label="sexo"
                  onChange={handleChangeSeletedSexo}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {parSexo.map((row, index) => (
                    <MenuItem key={index} value={row.cod_propriedade}>
                      {row.descricao_codigo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={3}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={3}
                name="descricao"
                label="Descrição"
                value={formData.descricao}
                inputProps={{
                  maxLength: 250,
                }}
                onChange={handleChange}
                sx={{ width: "100%" }}
              />
            </Stack>
          </Stack>

          {telaDetalhe &&
          (usuarioLogado.cod_perfil === 4 || usuarioLogado.cod_perfil === 3) ? (
            <Stack direction="row" spacing={4}>
              <Stack spacing={4}>
                <FormControl sx={{ m: 1, maxwidth: 300, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Organização
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={chaveOrg}
                    label="Organizacao"
                    onChange={handleChangeSeletedOrg}
                    sx={{ maxwidth: "100%" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {idOrganizacao.map((row, index) => (
                      <MenuItem key={index} value={row.nome}>
                        {row.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, maxwidth: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Perfil
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={chavePerfil}
                    label="Perfil"
                    onChange={handleChangeSeletedPerfil}
                    sx={{ maxwidth: "100%" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {parPerfil.map((row, index) => (
                      <MenuItem key={index} value={row.cod_propriedade}>
                        {row.descricao_codigo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, maxwidth: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Cargo
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={chaveCargo}
                    label="Cargo"
                    onChange={handleChangeSeletedCargo}
                    sx={{ maxwidth: "100%" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {idCargo.map((row, index) => (
                      <MenuItem key={index} value={row.nome}>
                        {row.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          ) : (
            <></>
          )}
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
          onClick={telaEdicao.editando ? EditSubmit : handleSubmit}
        >
          {telaEdicao.editando ? "ATUALIZAR" : "CADASTRAR"}
        </LoadingButton>
      </Stack>
    </React.Fragment>
  );
}

import * as React from "react";
import { Stack, TextField, Divider, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Title from "@/layouts/dashboardMui/Title";

import nookies from "nookies";
import { organizacaoService } from "@/../pages/api/organizacaoService/organizacaoService";
import { projetosService } from "@/../pages/api/organizacaoService/projetosService";
import { equipesService } from "@/../pages/api/organizacaoService/equipesService";
import { clientesService } from "@/../pages/api/clientesService/clientesService";
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

import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function ButtonField(props) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      sx={{
        backgroundColor: "#FFFFFFBF",
        borderRadius: "5px",
        width: "30%",
      }}
    >
      {label ?? "Pick a date"}
    </Button>
  );
}

function ButtonDatePicker(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}

export default function ManterProjetos({ idUsuario }) {
  const [valueInicio, setValueInicio] = React.useState(null);
  const [valueFim, setValueFim] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const [chaveClientes, setChaveClientes] = React.useState("");
  const [chaveEquipe, setChaveEquipe] = React.useState("");
  const [chaveOrg, setChaveOrg] = React.useState("");
  const [idEquipes, setIdEquipes] = React.useState([]);
  const [idOrganizacao, setIdOrganizacao] = React.useState([]);
  const [idClientes, setIdClientes] = React.useState([]);

  const handleChangeSeleted = (event) => {
    setChave(event.target.value);
  };

  const handleChangeSeletedClientes = (event) => {
    setChaveClientes(event.target.value);
  };

  const handleChangeSeletedEquipe = (event) => {
    setChaveEquipe(event.target.value);
  };

  const handleChangeSeletedOrg = (event) => {
    setChaveOrg(event.target.value);
  };

  const {
    recarrega,
    setRecarrega,
    dadosAppBar,
    setTelaDetalhe,
    telaEdicao,
    setTelaEdicao,
    usuarioLogado,
  } = React.useContext(AppContext);

  const [formData, setFormData] = React.useState({
    id_projetos: telaEdicao.editando ? telaEdicao.dados.id_projetos : "",
    nome: telaEdicao.editando ? telaEdicao.dados.nome : "",
    duracao_prevista: telaEdicao.editando
      ? telaEdicao.dados.duracao_prevista
      : "",
    data_inicio: telaEdicao.editando ? telaEdicao.dados.data_inicio : "",
    data_fim: telaEdicao.editando ? telaEdicao.dados.data_fim : "",
    id_clientes: telaEdicao.editando ? telaEdicao.dados.id_clientes : "",
    id_equipes: telaEdicao.editando ? telaEdicao.dados.id_equipes : "",
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
    setLoading(true);
    try {
      if (
        !formData.nome ||
        !chaveOrg ||
        !valueInicio
      ) {
        setLoading(false);
        alert(`Por favor, preencha os campos nome, organização e data inicio.`);
        return;
      }
      const body = {
        nome: formData.nome,
        duracao_prevista: formData.duracao_prevista,
        data_inicio: valueInicio,
        data_fim: valueFim,
        id_clientes:
          chaveClientes == ""
            ? null
            : retornaIdClientes(chaveClientes, idClientes),
        id_equipes:
          chaveEquipe == "" ? null : retornaIdEquipes(chaveEquipe, idEquipes),
        id_organizacoes:
          chaveOrg == "" ? null : retornaIdOrg(chaveOrg, idOrganizacao),
      };
      const cookies = nookies.get();
      const ListaClientes = await projetosService.insereProjeto(
        cookies.ACCESS_TOKEN,
        usuarioLogado.id_organizacoes,
        body
      );

      alert("Cadastro realizado com sucesso!");
      setTimeout(() => {
        setTelaDetalhe(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const EditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setValueInicio(formData.data_inicio);
    setValueFim(formData.data_fim);
    try {
      if (
        !formData.nome ||
        !formData.id_organizacoes ||
        !formData.data_inicio
      ) {
        setLoading(false);
        alert("Por favor, preencha todos os campos.");
        return;
      }
      const body = {
        nome: formData.nome,
        duracao_prevista: formData.duracao_prevista,
        data_inicio: valueInicio,
        data_fim: valueFim,
        id_clientes:
          chaveClientes == ""
            ? null
            : retornaIdClientes(chaveClientes, idClientes),
        id_equipes:
          chaveEquipe == "" ? null : retornaIdEquipes(chaveEquipe, idEquipes),
        id_organizacoes:
          chaveOrg == "" ? null : retornaIdOrg(chaveOrg, idOrganizacao),
      };

      const cookies = nookies.get();
      const ListaClientes = await projetosService.atualizaProjeto(
        cookies.ACCESS_TOKEN,
        telaEdicao.dados.id_organizacoes,
        telaEdicao.dados.id_projetos,
        body
      );
      alert("Cadastro atulizado com sucesso!");
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
      if (dados.length > 0 && descOrg) {
        const descricaoCodigo = dados.find((item) => item.nome === descOrg);
        return descricaoCodigo.id_organizacoes;
      }
  };

  const retornaEquipes = async () => {
    try {
      const cookies = nookies.get();
      const Equipes = await equipesService.pegaTodasEquipes(
        cookies.ACCESS_TOKEN,
        usuarioLogado.id_organizacoes
      );
      await setIdEquipes(Equipes);
      Equipes ? "" : await setRecarrega(recarrega + 1);
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const retornaValorEquipes = async (idequipes, dados) => {
    if (telaEdicao.editando) {
      if (dados.length > 0 && idequipes) {
        const descricaoCodigo = await dados.find(
          (item) => item.id_equipes === idequipes
        );
        await setChaveEquipe(descricaoCodigo.nome);
      } else {
        idEquipes.length == 0 ? setRecarrega(recarrega + 1) : "";
      }
    }
  };

  const retornaIdEquipes = (descEquipes, dados) => {
      if (dados.length > 0 && descEquipes) {
        const descricaoCodigo = dados.find((item) => item.nome === descEquipes);
        return descricaoCodigo.id_equipes;
      }
  };

  const retornaClientes = async () => {
    try {
      const cookies = nookies.get();
      const Clientes = await clientesService.pegaTodosClientes(
        cookies.ACCESS_TOKEN
      );
      await setIdClientes(Clientes);
      Clientes ? "" : await setRecarrega(recarrega + 1);
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const retornaValorClientes = async (idclientes, dados) => {
    if (telaEdicao.editando) {
      if (dados.length > 0 && idclientes) {
        const descricaoCodigo = await dados.find(
          (item) => item.id_clientes === idclientes
        );
        await setChaveClientes(descricaoCodigo.nome);
      } else {
        idClientes.length == 0 ? setRecarrega(recarrega + 1) : "";
      }
    }
  };

  const retornaIdClientes = (descClientes, dados) => {
      if (dados.length > 0 && descClientes) {
        const descricaoCodigo = dados.find(
          (item) => item.nome === descClientes
        );
        return descricaoCodigo.id_clientes;
      }
  };

  const carregaDataInicio = (dataInicio) => {
    const valueInicio = dayjs(dataInicio).locale("pt-br").format("YYYY-MM-DD");
    if (dataInicio) {
      setValueInicio(valueInicio);
    }
  };

  const carregaDataFim = (dataFim) => {
    const valueFim = dayjs(dataFim).locale("pt-br").format("YYYY-MM-DD");
    if (dataFim) {
      setValueFim(valueFim);
    }
  };

  React.useEffect(() => {
    retornaOrganizacao(formData.id_organizacoes);
    retornaValorOrg(formData.id_organizacoes, idOrganizacao);
    retornaEquipes(formData.id_equipes);
    retornaValorEquipes(formData.id_equipes, idEquipes);
    retornaClientes(formData.id_clientes);
    retornaValorClientes(formData.id_clientes, idClientes);

    carregaDataInicio(formData.data_inicio ? formData.data_inicio : null);
    carregaDataFim(formData.data_fim ? formData.data_fim : null);
  }, [recarrega]);

  return (
    <React.Fragment>
      <Title align="center" variant="h5">
        {telaEdicao.editando ? "Atualiza Projetos" : "Novo Projeto"}
      </Title>
      <Divider sx={{ my: 3 }}></Divider>
      <Stack spacing={3}>
        <Stack spacing={4}>
          <Stack direction="row" spacing={2}>
            <TextField
              name="nome"
              label="Nome do Projeto"
              value={formData.nome}
              onChange={handleChange}
              sx={{ width: "60%" }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Data Inicio"
                value={valueInicio ? dayjs(valueInicio) : valueInicio}
                onChange={(newValue) =>
                  setValueInicio(
                    dayjs(newValue).locale("pt-br").format("YYYY-MM-DD")
                  )
                }
                format="DD/MM/YYYY"
              />

              <DateField
                label="Data Fim"
                value={valueFim ? dayjs(valueFim) : valueFim}
                onChange={(newValue) =>
                  setValueFim(
                    dayjs(newValue).locale("pt-br").format("YYYY-MM-DD")
                  )
                }
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
            <TextField
              name="duracao_prevista"
              label="Duração do Projeto"
              value={formData.duracao_prevista}
              onChange={handleChange}
              sx={{ width: "15%" }}
            />
          </Stack>
          <Stack direction="row" spacing={4}>
            <Stack spacing={4}>
              <FormControl sx={{ m: 1, maxwidth: "60%", minWidth: 300 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Clientes
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={chaveClientes}
                  label="Clientes"
                  onChange={handleChangeSeletedClientes}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {idClientes.map((row, index) => (
                    <MenuItem key={index} value={row.nome}>
                      {row.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, maxwidth: "60%", minWidth: 300 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Equipes
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={chaveEquipe}
                  label="Equipes"
                  onChange={handleChangeSeletedEquipe}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {idEquipes.map((row, index) => (
                    <MenuItem key={index} value={row.nome}>
                      {row.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, maxwidth: "60%", minWidth: 300 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Organização
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={chaveOrg}
                  label="Organização"
                  onChange={handleChangeSeletedOrg}
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
            </Stack>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={Objetivos}
              disableCloseOnSelect
              getOptionLabel={(option) => option.descricao}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.descricao}
                </li>
              )}
              style={{ width: 600 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Objetivos"
                  placeholder="Objetivos"
                />
              )}
            />
          </Stack>
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

const Objetivos = [
  {
    id_objetivos: 1,
    descricao: "Finalização Models",
    marcado: 1,
    createdAt: "2023-05-10 23:26:19",
    updatedAt: "2023-05-10 23:26:19",
    deletedAt: null,
    id_projetos: 1,
  },
  {
    id_objetivos: 2,
    descricao: "Finalização dos CRUD e endpoints",
    marcado: 1,
    createdAt: "2023-05-10 23:26:19",
    updatedAt: "2023-05-10 23:26:19",
    deletedAt: null,
    id_projetos: 1,
  },
  {
    id_objetivos: 3,
    descricao: "Finalizando Autenticação",
    marcado: 0,
    createdAt: "2023-05-10 23:26:19",
    updatedAt: "2023-05-10 23:26:19",
    deletedAt: null,
    id_projetos: 1,
  },
  {
    id_objetivos: 4,
    descricao: "Finalizando Teste Automatizados",
    marcado: 0,
    createdAt: "2023-05-10 23:26:19",
    updatedAt: "2023-05-10 23:26:19",
    deletedAt: null,
    id_projetos: 1,
  },
];

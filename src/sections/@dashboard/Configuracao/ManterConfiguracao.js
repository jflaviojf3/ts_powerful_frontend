import * as React from "react";
import { Stack, TextField, Divider, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Title from "@/layouts/dashboardMui/Title";

import nookies from "nookies";
import { clientesService } from "@/../pages/api/clientesService/clientesService";
import { tabGenericaService } from "@/../pages/api/tabGenericaService/tabGenericaService";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AppContext from "@/hooks/AppContext";
import { formatarDataBR, fDate } from "../../../utils/formatTime";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

export default function ManterClientes({ idUsuario }) {
  const [chave, setChave] = React.useState("");
  const [valueInicio, setValueInicio] = React.useState(null);
  const [valueFim, setValueFim] = React.useState(null);
  const [parCategoria, setParCategoria] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleChangeSeleted = (event) => {
    setChave(event.target.value);
  };
  const {
    recarrega,
    setRecarrega,
    dadosAppBar,
    setTelaDetalhe,
    telaEdicao,
    setTelaEdicao,
  } = React.useContext(AppContext);

  const [formData, setFormData] = React.useState({
    id_clientes: telaEdicao.editando ? telaEdicao.dados.id_clientes : "",
    nome: telaEdicao.editando ? telaEdicao.dados.nome : "",
    descricao: telaEdicao.editando
      ? telaEdicao.dados.descricao
      : "",
    data_inicio: telaEdicao.editando ? telaEdicao.dados.data_inicio : "",
    data_fim: telaEdicao.editando ? telaEdicao.dados.data_fim : "",
    email: telaEdicao.editando ? telaEdicao.dados.email : "",
    cod_prioridade: telaEdicao.editando ? telaEdicao.dados.cod_prioridade : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (!formData.nome || !valueInicio || !formData.descricao || !formData.email || !chave) {
        setLoading(false)
        alert(`Por favor, preencha todos os campos.`);
        return;
      }

      const body = {
        nome: formData.nome,
        descricao: formData.descricao,
        email: formData.email,
        data_inicio: formatarDataBR(valueInicio),
        cod_prioridade: chave,
      };
      const cookies = nookies.get();
      const ListaClientes = await clientesService.insereClientes(
        cookies.ACCESS_TOKEN,
        body
      );

      alert("Cadastro realizado com sucesso!");
      setTimeout(() => {
        setTelaDetalhe(false);
      }, 1000);
    } catch (error) {
      setLoading(false)
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const EditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setValueInicio(formData.data_inicio)
    setValueFim(formData.data_fim)
    try {
      if (
        !formData.nome ||
        !valueInicio ||
        !formData.descricao ||
        !formData.email ||
        !chave
      ) {
        setLoading(false)
        alert("Por favor, preencha todos os campos.");
        return;
      }
      const body = {
        nome: formData.nome,
        descricao: formData.descricao,
        data_inicio: formatarDataBR(valueInicio),
        cod_prioridade: chave,
        email: formData.email,
        data_fim: valueFim ? formatarDataBR(valueFim): null,
      };
      console.log("Edit", body)
      const cookies = nookies.get();
      const ListaClientes = await clientesService.atualizaClientes(
        cookies.ACCESS_TOKEN,
        telaEdicao.dados.id_clientes,
        body
      );
      alert("Cadastro atulizado com sucesso!");
      setTimeout(() => {
        setTelaDetalhe(false);
        setTelaEdicao({ editando: false });
      }, 1000);
    } catch (error) {
      setLoading(false)
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
      await setParCategoria(ListaParam);
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const retornaValorPar = async (cod_prioridade, consultaParam) => {
    if (telaEdicao.editando) {
      if (consultaParam.length > 0) {
        const descricaoCodigo = await consultaParam.find(
          (item) => item.cod_propriedade === cod_prioridade
        );
        console.log(descricaoCodigo)
        await setChave(descricaoCodigo.cod_propriedade);
      } else {
        setRecarrega(recarrega + 1);
      }
    }
  };

  const carregaDataInicio = (dataInicio, dataFim) => {
    setValueInicio(dataInicio);
    setValueFim(dataFim);
  };

  React.useEffect(() => {
    retornaParametro(4);
    retornaValorPar(formData.cod_prioridade, parCategoria);
    carregaDataInicio(valueInicio ? "" : valueInicio, valueFim ? "" : valueFim);
  }, [recarrega]);

  return (
    <React.Fragment>
      <Title align="center" variant="h5">
        {telaEdicao.editando ? "Atualiza Cliente" : "Novo Cliente"}
      </Title>
      <Divider sx={{ my: 3 }}></Divider>
      <Stack spacing={3}>
        <Stack spacing={4}>
          <Stack direction="row" spacing={4}>
            <TextField
              name="nome"
              label="Nome do Cliente"
              value={formData.nome}
              onChange={handleChange}
              sx={{ width: "40%" }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ButtonDatePicker
                label={`Data Inicio: ${
                  valueInicio == null
                    ? "27/09/2023"//fDate(formData.data_inicio, "dd/MM/yyyy")
                    : valueInicio
                }`}
                value={"27/09/2023"}//fDate(formData.data_inicio, "dd/MM/yyyy")}
                onChange={(newValue) =>
                  setValueInicio(fDate(`${newValue}`, "dd/MM/yyyy"))
                }
              />
              <ButtonDatePicker
                label={`Data Fim: ${
                  valueFim == null
                    ? fDate(formData.data_fim, "dd/MM/yyyy")
                    : valueFim
                }`}
                value={fDate(formData.data_fim, "dd/MM/yyyy")}
                onChange={(newValue) => {
                  setValueFim(fDate(`${newValue}`, "dd/MM/yyyy"));
                }}
              />
            </LocalizationProvider>
          </Stack>
          <Stack direction="row" spacing={4}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={5}
              defaultValue="Default Value"
              name="descricao"
              label="Descrição do Cargo"
              value={formData.descricao}
              onChange={handleChange}
              sx={{ width: "69%" }}
            />
            <Stack spacing={4}>
            <FormControl sx={{ m: 1, maxwidth: "40%", minWidth: 300, }}>
              <InputLabel id="demo-simple-select-helper-label" >
                Prioridade
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={chave}
                label="Prioridade"
                onChange={handleChangeSeleted}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {parCategoria.map((row, index) => (
                  <MenuItem key={index} value={row.cod_propriedade}>
                    {row.descricao_codigo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="email"
              label="Email do Cliente"
              value={formData.email}
              onChange={handleChange}
              sx={{ width: "40%", minWidth: 300, }}
            />
            </Stack>
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

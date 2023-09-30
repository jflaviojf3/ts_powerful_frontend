import * as React from "react";
import { Stack, TextField, Divider, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Title from "@/layouts/dashboardMui/Title";

import nookies from "nookies";
import { cargosService } from "@/../pages/api/cargosService/cargosService";
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

export default function ManterCargo({ idUsuario }) {
  const [age, setAge] = React.useState("");
  const [valueInicio, setValueInicio] = React.useState(null);
  const [valueFim, setValueFim] = React.useState(null);
  const [parCategoria, setParCategoria] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleChangeSeleted = (event) => {
    setAge(event.target.value);
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
    setLoading(true)
    try {
      if (!formData.nome || !valueInicio || !formData.descricao_cargo || !age) {
        alert(`Por favor, preencha todos os campos.`);
        setLoading(false)
        return;
      }

      const body = {
        nome: formData.nome,
        descricao_cargo: formData.descricao_cargo,
        data_inicio: formatarDataBR(valueInicio),
        cod_categoria: age,
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
      setLoading(false)
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
        !formData.descricao_cargo ||
        !age
      ) {
        setLoading(false)
        alert("Por favor, preencha todos os campos.");
        return;
      }
      const body = {
        nome: formData.nome,
        descricao_cargo: formData.descricao_cargo,
        data_inicio: formatarDataBR(valueInicio),
        cod_categoria: age,
        data_fim: valueFim ? formatarDataBR(valueFim): null,
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
      setLoading(false)
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const retornaParametro = async (parametro) => {
    try {
      const cookies = nookies.get();
      const ListaCargo = await tabGenericaService.pegaListaPropriedadeId(
        cookies.ACCESS_TOKEN,
        parametro
      );
      await setParCategoria(ListaCargo);
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const retornaValorPar = (cod_categoria, consultaParam) => {
    if (telaEdicao.editando) {
      if (consultaParam.length > 0) {
        const descricaoCodigo = consultaParam.find(
          (item) => item.cod_propriedade === cod_categoria
        );
        setAge(descricaoCodigo.cod_propriedade);
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
    retornaParametro(3);
    retornaValorPar(formData.cod_categoria, parCategoria);
    carregaDataInicio(valueInicio ? "" : valueInicio, valueFim ? "" : valueFim);
  }, [recarrega]);

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
              sx={{ width: "40%" }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ButtonDatePicker
                label={`Data Inicio: ${
                  valueInicio == null
                    ? fDate(formData.data_inicio, "dd/MM/yyyy")
                    : valueInicio
                }`}
                value={fDate(formData.data_inicio, "dd/MM/yyyy")}
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
              rows={4}
              defaultValue="Default Value"
              name="descricao_cargo"
              label="Descrição do Cargo"
              value={formData.descricao_cargo}
              onChange={handleChange}
              sx={{ width: "73%" }}
            />
            <FormControl sx={{ m: 1, minWidth: 120, width: "30%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Categoria
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Categoria"
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

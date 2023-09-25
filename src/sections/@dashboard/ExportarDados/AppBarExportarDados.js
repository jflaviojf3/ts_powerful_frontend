import * as React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { Stack, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { gerarPlanilhaExcel } from "@/utils/PlanilhaUtil";
import Relogio from "../../../components/Relogio";
import { tarefaService } from "../../../../pages/api/usuarioService/tarefaService";
import { getCurrentDateTime, fDate } from "../../../utils/formatTime";
import nookies from "nookies";

import AppContext from "@/hooks/AppContext";

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

export default function AppBarTarefas({ idUsuario }) {
  const [valueInicio, setValueInicio] = React.useState(null);
  const [valueFim, setValueFim] = React.useState(null);
  const { recarrega, setRecarrega, telaDetalhe, setTelaDetalhe, dadosAppBar } =
    React.useContext(AppContext);

  const geraPlanilha = (dados) => {
    var dataAtual = new Date();

    let relatorio = {};
    if (dados.planilha === "tarefa") {
      relatorio = {
        title: "Relatório de Tarefas",
        subject: "Tarefas",
        author: "TSPowerful",
        sheetName: "Relatório de Tarefas",
        tabName: "Relatório de Tarefas",
        nameFile:
          "tarefas" +
          "_" +
          dataAtual.getHours().toString().padStart(2, "0") +
          "_" +
          dataAtual.getMinutes().toString().padStart(2, "0") +
          "_" +
          dataAtual.getSeconds().toString().padStart(2, "0") +
          ".xls",
      };
    } else if (dados.planilha === "ponto") {
      relatorio = {
        title: "Relatório de Pontos",
        subject: "Pontos",
        author: "TSPowerful",
        sheetName: "Relatório de Pontos",
        tabName: "Relatório de Pontos",
        nameFile:
          "ponto" +
          "_" +
          dataAtual.getHours().toString().padStart(2, "0") +
          "_" +
          dataAtual.getMinutes().toString().padStart(2, "0") +
          "_" +
          dataAtual.getSeconds().toString().padStart(2, "0") +
          ".xls",
      };
    }
    gerarPlanilhaExcel(dados.dados, relatorio);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    geraPlanilha(dadosAppBar);
  };

  const enviaNovoPeriodo = (dataInicio, dataFim) => {
    const periodo = {
      dataInicio: dataInicio,
      dataFim: dataFim
    }
    setTelaDetalhe(periodo)
  }

  React.useEffect(() => {
    enviaNovoPeriodo(
      valueInicio ? fDate(valueInicio, "yyyyMMdd") : fDate(getCurrentDateTime(true), "yyyyMMdd") , 
      valueFim ? fDate(valueFim, "yyyyMMdd") : fDate(getCurrentDateTime(), "yyyyMMdd") )
  }, [recarrega, valueFim]);

  return (
    <>
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{ gap: 1, margin: 1 }}
        alignItems="center"
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ButtonDatePicker
            label={`Data Inicio: ${
              valueInicio == null ? fDate(getCurrentDateTime(true), "dd/MM/yyyy") : fDate(valueInicio, "dd/MM/yyyy")
            }`}
            value={valueInicio}
            onChange={(newValue) => setValueInicio(newValue)}
          />
          <ButtonDatePicker
            label={`Data Fim: ${
              valueFim == null ? fDate(getCurrentDateTime(), "dd/MM/yyyy") : fDate(valueFim, "dd/MM/yyyy")
            }`}
            
            value={valueFim}
            onChange={(newValue) => setValueFim(newValue)}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          endIcon={<DownloadIcon />}
          onClick={handleCreate}
          sx={{
            backgroundColor: "#FFFFFFBF",
            color: "#111",
          }}
        >
          Exportar
        </Button>
      </Stack>
    </>
  );
}

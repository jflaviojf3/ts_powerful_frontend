import * as React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { Stack, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { gerarPlanilhaExcel } from "@/utils/PlanilhaUtil";
import Relogio from "../../../components/Relogio";
import { tarefaService } from "../../../../pages/api/usuarioService/tarefaService";
import { getCurrentDateTime, fDifMinutos } from "../../../utils/formatTime";
import nookies from "nookies";

import AppContext from "@/hooks/AppContext";

export default function AppBarTarefas({ idUsuario }) {
  const [valueInicio, setSetValueInicio] = React.useState(null);
  const [valueFim, setValueFim] = React.useState(null);
  const { recarrega, setRecarrega, setDadosAppBar, dadosAppBar } =
    React.useContext(AppContext);

  const geraPlanilha = (dados) => {
    var dataAtual = new Date();

    const relatorio = {
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

    gerarPlanilhaExcel(dados, relatorio);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setRecarrega(recarrega+1)
    //geraPlanilha();
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{ gap: 1, margin: 1 }}
        alignItems="center"
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Data Inicio"
            value={valueInicio}
            onChange={(newValue) => setSetValueInicio(newValue)}
            sx={{
              backgroundColor: "#FFFFFFBF",
              borderRadius: "5px",
              width: "30%",
            }}
          />
          <DatePicker
            label="Data Fim"
            value={valueFim}
            onChange={(newValue) => setValueFim(newValue)}
            sx={{
              backgroundColor: "#FFFFFFBF",
              borderRadius: "5px",
              width: "30%",
            }}
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

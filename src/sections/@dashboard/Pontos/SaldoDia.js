import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "../../../layouts/dashboardMui/Title";
import {
  fDifMinutos,
  subtrairDuracao,
  fDifMinutosPonto,
  fDifMinutosPontoTotal,
} from "../../../utils/formatTime";
import AppContext from "@/hooks/AppContext";

export default function SaldoDia() {
  const { recarrega, telaDetalhe } = React.useContext(AppContext);

  const [minRelogio, setMinRelogio] = React.useState(null);
  const [carregaHora, setCarregaHora] = React.useState(true);
  const [horasDoDia, setHorasDoDia] = React.useState(false);

  function carregaTempo() {
    if (telaDetalhe.length === 0) {
      setCarregaHora(false);
    } else if (telaDetalhe.length === 2) {
      setHorasDoDia(
        subtrairDuracao (fDifMinutosPonto(telaDetalhe[0].hora_ponto, telaDetalhe[1].hora_ponto), "8h 45m")
      );
      setCarregaHora(true);
    } else if (telaDetalhe.length === 4) {
      setHorasDoDia(
        subtrairDuracao (
        fDifMinutosPontoTotal(
          telaDetalhe[0].hora_ponto,
          telaDetalhe[1].hora_ponto,
          telaDetalhe[2].hora_ponto,
          telaDetalhe[3].hora_ponto
        ), "8h 45m")
      );
      setCarregaHora(true);
      console.log("saida4", telaDetalhe[3].hora_ponto);
    }
  }

  const carregaResultados = async (cod_prioridade) => {
    console.log("antes deCarrega ", cod_prioridade);
    if (cod_prioridade === false) {
      //setRecarrega(recarrega + 1)
      console.log(recarrega);
    } else {
      console.log("telaDetalhe", cod_prioridade);
    }
  };

  function Negativo(str) {
    const regex = /-/;
    return regex.test(str);
  }

  React.useEffect(() => {
    carregaResultados(telaDetalhe);
    carregaTempo();
  }, [telaDetalhe]);
  return (
    <React.Fragment>
      <Title align="center" component="p" variant="h6">
        Saldo do Dia
      </Title>
      <Typography component="p"  color={ Negativo(horasDoDia) ? "#F00" : "#008000"} variant="h4">
        {console.log("final", horasDoDia)}
        {carregaHora ? horasDoDia : "00h 00m"}
      </Typography>
    </React.Fragment>
  );
}

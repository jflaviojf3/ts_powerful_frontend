import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "../../../layouts/dashboardMui/Title";
import CalculaHora from "../../../components/CalculaHora";
import {
  fDifMinutos,
  fDifMinutosPonto,
  getCurrentDateTime,
  minutosParaSegundos,
  fDifMinutosSomado,
  fDifMinutosPontoTotal,
} from "../../../utils/formatTime";
import AppContext from "@/hooks/AppContext";


export default function TrabalhoDia() {
  const { recarrega, setRecarrega, telaDetalhe } = React.useContext(AppContext);

  const [minRelogio, setMinRelogio] = React.useState(null);
  const [running, setRunning] = React.useState(false);
  const [carregaHora, setCarregaHora] = React.useState(false);
  const [horasDoDia, setHorasDoDia] = React.useState(false);

  function carregaTempo() {
    if (telaDetalhe.length === 0) {
      setCarregaHora(false);
    } else if (telaDetalhe.length === 1) {
      console.log("entrada1", telaDetalhe[0].hora_ponto);
      setMinRelogio(
        minutosParaSegundos(
          fDifMinutos(telaDetalhe[0].hora_ponto, getCurrentDateTime())
        )
      );
      setRunning(true);
      setCarregaHora(false);
    } else if (telaDetalhe.length === 2) {
      setHorasDoDia(
        fDifMinutosPonto(telaDetalhe[0].hora_ponto, telaDetalhe[1].hora_ponto)
      );
      setRunning(false);
      setCarregaHora(true);
      console.log("saida2", telaDetalhe[1].hora_ponto);
    } else if (telaDetalhe.length === 3) {
      setMinRelogio(
        minutosParaSegundos(
          fDifMinutosSomado(
            telaDetalhe[0].hora_ponto,
            telaDetalhe[1].hora_ponto,
            telaDetalhe[2].hora_ponto
          )
        )
      );
      setRunning(true);
      setCarregaHora(false);
      console.log("entrada3", telaDetalhe[2].hora_ponto);
    } else if (telaDetalhe.length === 4) {
      setHorasDoDia(
        fDifMinutosPontoTotal(
          telaDetalhe[0].hora_ponto,
          telaDetalhe[1].hora_ponto,
          telaDetalhe[2].hora_ponto,
          telaDetalhe[3].hora_ponto
        )
      );
        
      setRunning(false);
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

  React.useEffect(() => {
    carregaResultados(telaDetalhe);
    carregaTempo();
  }, [telaDetalhe]);

  return (
    <React.Fragment>
      <Title align="center" component="p" variant="h6">
        Trabalho no Dia
      </Title>
      <Typography component="p" variant="h4">
        {console.log("final",horasDoDia)}
        {carregaHora ? (
          horasDoDia
        ) : (
          <CalculaHora isRunning={running} minutos={minRelogio} />
        )}
      </Typography>
    </React.Fragment>
  );
}

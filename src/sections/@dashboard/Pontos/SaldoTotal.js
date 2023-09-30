import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "../../../layouts/dashboardMui/Title";
import nookies from "nookies";
import { pontoService } from "../../../../pages/api/usuarioService/pontoService";
import {
  fDate,
  subtrairDuracao,
  fDifMinutosPonto,
  fDifMinutosPontoTotal,
  getCurrentDateTime,
} from "../../../utils/formatTime";
import AppContext from "@/hooks/AppContext";

export default function SaldoTotal({ idUsuario }) {
  const { recarrega, telaDetalhe } = React.useContext(AppContext);

  const [minRelogio, setMinRelogio] = React.useState(null);
  const [carregaHora, setCarregaHora] = React.useState(true);
  const [horasDoDia, setHorasDoDia] = React.useState(false);
  const [pontosDoDia, setSetPontosDoDia] = React.useState([]);
  const [pontosDoDiaTemp, setSetPontosDoDiaTemp] = React.useState([]);
  const [pontosDoMes, setSetPontosDoMes] = React.useState([]);

  async function retornaPontosMes() {
    const cookies = nookies.get();
    const pontoDiaMes = await pontoService.pegaPontosPeriodoTotalBanco(
      cookies.ACCESS_TOKEN,
      idUsuario,
      fDate(getCurrentDateTime(true), "yyyyMMdd"),
      fDate(getCurrentDateTime(), "yyyyMMdd")
    );
    await setSetPontosDoMes(pontoDiaMes);
  }

  async function retornaPontosDia(dia) {
    const cookies = nookies.get();
    const pontoDia = await pontoService.pegaPontosDia(
      cookies.ACCESS_TOKEN,
      idUsuario,
      dia
    );
    await setSetPontosDoDiaTemp(pontoDia);
  }

  async function correPontos(pontosDoMes) {
    let TempPontos = []
    if (pontosDoMes) {
      for (const item of pontosDoMes) {
        if (item.total_pontos > 2) {
          const tarefaDia = await retornaPontosDia(
            item.data_ponto.replaceAll("-", "")
          );
          TempPontos.push(pontosDoDiaTemp)

        }
      }
      await setSetPontosDoDia(TempPontos)
    }
  }

  function carregaTempo() {
    if (telaDetalhe.length === 0) {
      setCarregaHora(false);
    } else if (telaDetalhe.length === 2) {
      setHorasDoDia(
        subtrairDuracao(
          fDifMinutosPonto(
            telaDetalhe[0].hora_ponto,
            telaDetalhe[1].hora_ponto
          ),
          "8h 45m"
        )
      );
      setCarregaHora(true);
    } else if (telaDetalhe.length === 4) {
      setHorasDoDia(
        subtrairDuracao(
          fDifMinutosPontoTotal(
            telaDetalhe[0].hora_ponto,
            telaDetalhe[1].hora_ponto,
            telaDetalhe[2].hora_ponto,
            telaDetalhe[3].hora_ponto
          ),
          "8h 45m"
        )
      );
      setCarregaHora(true);
    }
  }

  const carregaResultados = async (cod_prioridade) => {
    if (cod_prioridade === false) {
    } else {
    }
  };

  function Negativo(str) {
    const regex = /-/;
    return regex.test(str);
  }

  React.useEffect(() => {
    retornaPontosMes();
    carregaTempo();
  }, []);

  React.useEffect(() => {
    carregaResultados(telaDetalhe);
    carregaTempo();
    correPontos(pontosDoMes);
  }, [telaDetalhe]);

  return (
    <React.Fragment>
      <Title align="center" component="p" variant="h6">
        Saldo Total
      </Title>
      <Typography
        component="p"
        color={Negativo(horasDoDia) ? "#F00" : "#008000"}
        variant="h4"
      >
        {carregaHora ? horasDoDia : "00h 00m"}
      </Typography>
    </React.Fragment>
  );
}

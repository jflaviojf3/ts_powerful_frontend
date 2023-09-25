import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "../../../layouts/dashboardMui/Title";
import {
  fDataSemana,
  fDate,
  fDateTime,
  getCurrentDateTime,
} from "../../../utils/formatTime";
import { pontoService } from "@/../pages/api/usuarioService/pontoService";
import nookies from "nookies";
import AppContext from "@/hooks/AppContext";

const Ponto = ({ idUsuario }) => {
  const { recarrega, setRecarrega } = React.useContext(AppContext);

  const [pontos, setPontos] = React.useState([]);
  async function retornaPontos() {
    const cookies = nookies.get();
    const pontoDia = await pontoService.pegaPontosDia(
      cookies.ACCESS_TOKEN,
      idUsuario,
      fDate(getCurrentDateTime(), "yyyyMMdd")
    );
    await setPontos(pontoDia);
  }

  React.useEffect(() => {
    retornaPontos();
  }, [recarrega]);

  return (
    <React.Fragment>
      <Title align="center" variant="h4">
        Lista de Pontos do Dia
      </Title>
      <Typography variant="h6">{fDataSemana(getCurrentDateTime())}</Typography>
      <div key={pontos.hora_ponto}>
        {/* <p>{pontos[0].situacao.splint(" ", 1)} {fDateTime(pontos[0].hora_ponto, "hh:mm a")} </p>
      <p>{pontos[1].situacao.splint(" ", 1)} {fDateTime(pontos[1].hora_ponto, "hh:mm a")} </p>
      <p>{pontos[2].situacao.splint(" ", 1)} {fDateTime(pontos[2].hora_ponto, "hh:mm a")} </p> */}
      </div>
    </React.Fragment>
  );
};

export default Ponto;

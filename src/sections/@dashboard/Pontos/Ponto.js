import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from '../../../layouts/dashboardMui/Title';
import {
  fDataSemana,
  fDate,
  fDateTime,
  getCurrentDateTime,
} from "../../../utils/formatTime";
import { pontoService } from "../../../../pages/api/usuarioService/pontoService";
import nookies from "nookies";

function preventDefault(event) {
  event.preventDefault();
}

const Ponto = ({ idUsuario, recarrega, setRecarrega }) =>{

  const [pontos, setPontos] = React.useState([]);
  async function retornaPontos() {
    const cookies = nookies.get();
    const pontoDia = await pontoService.pegaPontosDia(
      cookies.ACCESS_TOKEN,
      idUsuario,
      fDate(getCurrentDateTime(), 'yyyyMMdd')
    );

    console.log(pontoDia)
    await setPontos(pontoDia);
  }
  
  React.useEffect(() => {
    retornaPontos();
  }, [recarrega]);

  return (
    <React.Fragment>
      <Title align="center" variant="h4" >Lista de Pontos do Dia</Title>
      <Typography variant="h6">
        {fDataSemana(getCurrentDateTime())}
      </Typography>
      <div key={pontos.hora_ponto}>
      {/* <p>{pontos[0].situacao.splint(" ", 1)} {fDateTime(pontos[0].hora_ponto, "hh:mm a")} </p>
      <p>{pontos[1].situacao.splint(" ", 1)} {fDateTime(pontos[1].hora_ponto, "hh:mm a")} </p>
      <p>{pontos[2].situacao.splint(" ", 1)} {fDateTime(pontos[2].hora_ponto, "hh:mm a")} </p> */}
      </div>

    </React.Fragment>
  );
}


export default Ponto
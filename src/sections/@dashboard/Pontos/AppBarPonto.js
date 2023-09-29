import * as React from "react";
import { TextField, IconButton } from "@mui/material";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import Stack from "@mui/material/Stack";

import Relogio from "../../../components/RelogioBrasil";
import DataAtual from "../../../components/DataAtualBrasil";
import { pontoService } from "../../../../pages/api/usuarioService/pontoService";
import { getCurrentDateTime, fDate } from "./../../../utils/formatTime";
import nookies from "nookies";
import AppContext from "@/hooks/AppContext";

export default function AppBarPonto({ idUsuario }) {
  const {recarrega, setRecarrega} = React.useContext(AppContext);
  const [trocaIcone, setTrocaIcone] = React.useState(true);
  const [descricao, setDescricao] = React.useState("");
  const [situacao, setSituacao] = React.useState("Entrada Expediente");

  const handleChange = (e) => {
    const value = e.target.value;
    setDescricao(value);
  };

  const batePonto = async (e) => {
      e.preventDefault();
      try {
        const cookies = nookies.get();
        const body = {
          situacao: situacao,
          hora_ponto: getCurrentDateTime(),
          descricao: descricao,
        };
        await pontoService
          .inserePontoUsuario(cookies.ACCESS_TOKEN, idUsuario, body)
          .then(function (response) {
            setTrocaIcone(!trocaIcone);
          });
          setDescricao("")
          setRecarrega(recarrega+1)
      } catch (error) {
        alert(error);
        console.error("Erro na solicitação POST:", error);
      }
  };

  const retornaPontosDia = async () => {
    const cookies = nookies.get();
    const resultado = await pontoService.pegaPontosDia(
      cookies.ACCESS_TOKEN,
      idUsuario,
      fDate(getCurrentDateTime(), 'yyyyMMdd')
    );
    atualizaCampo(resultado);    
  };

  React.useEffect(() => {
    retornaPontosDia();
    atualizaCampo();
  }, [recarrega]);

  const atualizaCampo = async (result) => {
    try {
      if (result == []){
        setSituacao("Entrada Expediente")
      } else if (result[result.length - 1].situacao == "Entrada Expediente") {
        setSituacao("Saída para Almoço")
      } else if (result[result.length - 1].situacao == "Saída para Almoço") {
        setSituacao("Entrada após Almoço")
      } else if (result[result.length - 1].situacao == "Entrada após Almoço") {
        setSituacao("Saida Expediente")
      }
    } catch (error) {
    }
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{ gap: 1, margin: 1 }}
        alignItems="center"
      >
        <TextField
          id="normal"
          label={situacao}
          placeholder="Descrição"
          variant="filled"
          value={descricao}
          onChange={handleChange}
          sx={{
            backgroundColor: "#FFFFFFBF",
            borderRadius: "5px",
            width: "40%",
          }}
        />
        <Relogio />
        <DataAtual />
        <IconButton onClick={batePonto}>
          <TouchAppIcon sx={{ fontSize: 50, color: "#FFFFFFBF" }} />
        </IconButton>
      </Stack>
    </>
  );
}

import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "../../../layouts/dashboardMui/Title";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
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
  const {     
    recarrega,
    setRecarrega,
    telaDetalhe,
    setTelaDetalhe,
    usuarioLogado, } = React.useContext(AppContext);

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

  const carregaResultados = async (cod_prioridade) => {
    if (cod_prioridade.length == 0) {
      pontos.length == 0 ? setRecarrega(recarrega + 1) : "";
    } else {
      //!telaDetalhe ? setRecarrega(recarrega + 1) : setTelaDetalhe(pontos)
      console.log(pontos)
      setTelaDetalhe(pontos)
    }
  };

  React.useEffect(() => {
    retornaPontos();
    carregaResultados(pontos);
  }, [recarrega]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
    maxWidth: 300,
  }));

  return (
    <React.Fragment>
      <Title align="center" variant="h5">
        Lista de Pontos do Dia
      </Title>
      <Typography variant="h6">{fDataSemana(getCurrentDateTime())}</Typography>
      <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
        {pontos.map((row, index) => (
          <Item
            key={index}
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
          >
            <Stack spacing={2} direction="row" alignItems="center">
              <Avatar>
                {row.situacao.split(" ", 1) == "Entrada" ? (
                  <ArrowCircleRightTwoToneIcon sx={{ color: "#008000" }} />
                ) : (
                  <ArrowCircleLeftTwoToneIcon sx={{ color: "#F00" }} />
                )}
              </Avatar>
              <Stack spacing={0.1} alignItems="flex-start">
                <Typography variant="h6" noWrap>
                  {row.situacao.split(" ", 1)}{" "}
                  {fDateTime(row.hora_ponto, "HH:mm")}
                </Typography>
                <Typography variant="p" Wrap>
                  {row.descricao}
                </Typography>
              </Stack>
            </Stack>
          </Item>
        ))}
      </Box>
    </React.Fragment>
  );
};

export default Ponto;

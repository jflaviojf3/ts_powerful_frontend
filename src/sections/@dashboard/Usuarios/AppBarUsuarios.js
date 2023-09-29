import * as React from "react";
import { TextField, Button, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import Alert from "@mui/material/Alert";

import { gerarPlanilhaExcel } from "@/utils/PlanilhaUtil";
import { usuarioService } from "@/../pages/api/usuarioService/usuarioService";
import { getCurrentDateTime, fDifMinutos } from "../../../utils/formatTime";
import nookies from "nookies";
import AppContext from "@/hooks/AppContext";

const AppBarUsuarios = ({ idUsuario }) => {
  const {
    recarrega,
    setRecarrega,
    telaDetalhe,
    setTelaDetalhe,
    dadosAppBar,
    setDadosAppBar,
  } = React.useContext(AppContext);
  const [descricao, setDescricao] = React.useState("");
  const [alertado, setAlertado] = React.useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (!descricao) {
        alert("Por favor, Nome do usuário não pode ser vazia");
        return;
      }
      const cookies = nookies.get();
      const body = {
        nome: descricao,
      };
      const resultado = await usuarioService.pegaNomeUsuario(
        cookies.ACCESS_TOKEN,
        body
      );
      console.log("Resultado", resultado)
      resultado
        ? setDadosAppBar(resultado)
        : (setDadosAppBar(null),
          alert("Resultado não encontrado."),
          setDescricao(""));

      setRecarrega(recarrega + 1);
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const geraPlanilha = (dados) => {
    var dataAtual = new Date();
    let relatorio = {
        title: "Relatório de Usuários",
        subject: "Usuários",
        author: "TSPowerful",
        sheetName: "Relatório de Usuários",
        tabName: "Relatório de Usuários",
        nameFile:
          "listaUsuarios" +
          "_" +
          dataAtual.getHours().toString().padStart(2, "0") +
          "_" +
          dataAtual.getMinutes().toString().padStart(2, "0") +
          "_" +
          dataAtual.getSeconds().toString().padStart(2, "0") +
          ".xls",
      };

    gerarPlanilhaExcel(dados.dados, relatorio);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
//       setRecarrega(recarrega+1)
//       setTimeout(() => {
//         enviaDados()
//       }, "1000");
  };

 function enviaDados(){
  geraPlanilha(dadosAppBar)
 }

  return (
    <>
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{ gap: 1, margin: 1 }}
        alignItems="center"
      >
        <TextField
          label={"Buscar Usuário"}
          id="filled-size-normal"
          variant="filled"
          value={descricao}
          disabled={telaDetalhe}
          sx={{
            backgroundColor: "#FFFFFFBF",
            borderRadius: "5px",
            width: "60%",
          }}
          onChange={(e) => setDescricao(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e);
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={telaDetalhe ? ()=>{}: handleSearch} edge="end">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <Button
          variant="contained"
          endIcon={<DownloadIcon />}
          onClick={handleCreate}
          disabled={telaDetalhe}
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
};

export default AppBarUsuarios

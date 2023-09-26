import * as React from "react";
import { TextField, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Alert from '@mui/material/Alert';

import Relogio from "../../../components/Relogio";
import { organizacaoService } from "@/../pages/api/organizacaoService/organizacaoService";
import { getCurrentDateTime, fDifMinutos } from "../../../utils/formatTime";
import nookies from "nookies";
import AppContext from "@/hooks/AppContext";

const AppBarOrganizacao = ({ idUsuario }) => {
  const {
    recarrega,
    setRecarrega,
    telaDetalhe,
    setTelaDetalhe,
    setDadosAppBar,
  } = React.useContext(AppContext);
  const [descricao, setDescricao] = React.useState("");
  const [alertado, setAlertado] = React.useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (!descricao) {
        alert("Por favor, Nome da Organização não pode ser vazia");
        return;
      }
      const cookies = nookies.get();
      const body = {
        nome: descricao,
      };
      const resultado = await organizacaoService.pegaOrganizacaoNome(
        cookies.ACCESS_TOKEN,
        body
      );

      resultado
        ? setDadosAppBar([resultado])
        : (setDadosAppBar(null),
          alert("Resultado não encontrado."),
          setDescricao(""));

      setRecarrega(recarrega + 1);
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setTelaDetalhe(true);
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
          label={"Buscar Cargo"}
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
          endIcon={<AssignmentIndIcon />}
          onClick={handleCreate}
          disabled={telaDetalhe}
          sx={{
            backgroundColor: "#FFFFFFBF",
            color: "#111",
          }}
        >
          Novo Cargo
        </Button>
      </Stack>
    </>
  );
};

export default AppBarOrganizacao;

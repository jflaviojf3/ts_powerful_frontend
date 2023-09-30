import * as React from "react";
import { TextField, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import { projetosService } from "@/../pages/api/organizacaoService/projetosService";
import nookies from "nookies";
import AppContext from "@/hooks/AppContext";

const AppBarClientes = ({ idUsuario }) => {
  const {
    recarrega,
    setRecarrega,
    telaDetalhe,
    setTelaDetalhe,
    setDadosAppBar,
    usuarioLogado
  } = React.useContext(AppContext);
  const [descricao, setDescricao] = React.useState("");
  const [alertado, setAlertado] = React.useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (!descricao) {
        alert("Por favor, preencha o campo de busca");
        return;
      }
      const cookies = nookies.get();
      const body = {
        nome: descricao,
      };
      const resultado = await projetosService.pegaNomeProjeto(
        cookies.ACCESS_TOKEN,
        usuarioLogado.id_organizacoes,
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
          label={"Buscar Projeto"}
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
              <IconButton
                onClick={telaDetalhe ? () => {} : handleSearch}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <Button
          variant="contained"
          endIcon={<AccountTreeIcon />}
          onClick={handleCreate}
          disabled={telaDetalhe}
          sx={{
            backgroundColor: "#FFFFFFBF",
            color: "#111",
          }}
        >
          Novo Projeto
        </Button>
      </Stack>
    </>
  );
};

export default AppBarClientes;

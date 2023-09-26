import * as React from "react";

import { tarefaService } from "../../pages/api/usuarioService/tarefaService";
import nookies from "nookies";

const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {
  const [tempoAtualTarefa, setTempoAtualTarefa] = React.useState(0);
  const [telaDetalhe, setTelaDetalhe] = React.useState(false);
  const [telaEdicao, setTelaEdicao] = React.useState({ editando: false });
  const [dadosAppBar, setDadosAppBar] = React.useState(null);
  const [recarrega, setRecarrega] = React.useState(0);

  async function buscarTarefaPorId(idUsuario) {
    const cookies = nookies.get();
    const response = await tarefaService.pegaTarefaAtiva(
      cookies.ACCESS_TOKEN,
      idUsuario
    );
    return response;
  }

  return (
    <AppContext.Provider
      value={{
        buscarTarefaPorId,
        setTempoAtualTarefa,
        tempoAtualTarefa,
        setTelaDetalhe,
        telaDetalhe,
        setTelaEdicao,
        telaEdicao,
        setDadosAppBar,
        dadosAppBar,
        setRecarrega,
        recarrega,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

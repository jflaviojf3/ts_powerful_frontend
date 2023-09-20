import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import { Stack, Divider } from "@mui/material";

import Title from "../../../layouts/dashboardMui/Title";
import GrupoTarefa from "./GrupoTarefa";

import nookies from "nookies";
import { tarefaService } from "../../../../pages/api/usuarioService/tarefaService";

function preventDefault(event) {
  event.preventDefault();
}

export default function ListaTarefas({ idUsuario, setDescricaoTarefa }) {

  const [listaDia, setListaDia] = React.useState([]);
  async function retornaListaDias() {
    const cookies = nookies.get();
    const ListaDia = await tarefaService.pegaTarefasPorDiaUsuario(
      cookies.ACCESS_TOKEN,
      idUsuario
    );
    setListaDia(ListaDia);
  }

  React.useEffect(() => {
    retornaListaDias();
  }, []);

  return (
    <React.Fragment>
      <Title align="center" variant="h5">
        Lista de Tarefas
      </Title>
      {listaDia &&
        listaDia.map((dia) => (
          <>
          <Stack direction="row" spacing={2} key={dia} sx={{ mt: 3 }}>
            <Table size="small">
              <GrupoTarefa idUsuario={idUsuario} dia={dia} setDescricaoTarefa={setDescricaoTarefa} />
            </Table>
          </Stack>
            {/* <Divider sx={{ mt: 4 }} color='secondary' /> */}
            </>
        ))}

      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Carregar Mais...
      </Link> */}
    </React.Fragment>
  );
}

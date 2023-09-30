import * as React from "react";
import { Stack, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { IconButton } from "@mui/material";
import Tooltip from "@mui/material";

import Title from "@/layouts/dashboardMui/Title";

import nookies from "nookies";
import { clientesService } from "@/../pages/api/clientesService/clientesService";
import { fDateTime, fDifMinutos } from "@/utils/formatTime";
import AppContext from "@/hooks/AppContext";

export default function ListaClientes({ idUsuario }) {
  const {
    recarrega,
    setRecarrega,
    dadosAppBar,
    setTelaDetalhe,
    setTelaEdicao,
  } = React.useContext(AppContext);

  const [clientes, setClientes] = React.useState([]);
  const [value, setValue] = React.useState("1");

  async function retornaClientes() {
    if (dadosAppBar) {
      setClientes(dadosAppBar);
    } else {
      const cookies = nookies.get();
      const ListaClientes = await clientesService.pegaTodosClientes(
        cookies.ACCESS_TOKEN
      );
      setClientes(ListaClientes);
    }
  }

  async function handleEdit(
    e,
    id_clientes,
    nome,
    descricao,
    data_inicio,
    data_fim,
    email,
    cod_prioridade
  ) {
    e.preventDefault();
    setTelaDetalhe(true);
    setTelaEdicao({
      editando: true,
      dados: {
        id_clientes: id_clientes,
        nome: nome,
        descricao: descricao,
        data_inicio: data_inicio,
        data_fim: data_fim,
        email: email,
        cod_prioridade: cod_prioridade,
      },
    });
  }

  async function handleExcluir(e, id_clientes) {
    const cookies = nookies.get();
    await clientesService.deletaClientes(cookies.ACCESS_TOKEN, id_clientes);
    setRecarrega(recarrega + 1);
  }

  React.useEffect(() => {
    retornaClientes();
  }, [recarrega]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    //setRecarrega(recarrega + 1);
  };

  return (
    <React.Fragment>
      <Title align="center" variant="h5">
        Configurações
      </Title>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
              >
                <Tab label="Parametros" value="1" />
                <Tab label="Objetivos" value="2" />
                <Tab label="Pontos" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Table size="small">

              </Table>
            </TabPanel>
            <TabPanel value="2">
              <Table size="small">

              </Table>
            </TabPanel>
            <TabPanel value="3">
              <Table size="small">

              </Table>
            </TabPanel>
          </TabContext>
        </Box>
      </Stack>
    </React.Fragment>
  );
}

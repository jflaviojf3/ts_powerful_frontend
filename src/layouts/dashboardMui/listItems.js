import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import InsightsIcon from "@mui/icons-material/Insights";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import TaskIcon from "@mui/icons-material/Task";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import SaveIcon from "@mui/icons-material/Save";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Groups2Icon from "@mui/icons-material/Groups2";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";

const meusItems = ({ ClickItem }) => {
  return (
    <React.Fragment>
      <Divider />
      <React.Fragment>
        <ListSubheader component="div" inset color="inherit">
          Registros
        </ListSubheader>
        <ListItemButton onClick={() => ClickItem("Tarefa")}>
          <ListItemIcon>
            <TaskIcon />
          </ListItemIcon>
          <ListItemText secondary="Tarefa" />
        </ListItemButton>
        <ListItemButton onClick={() => ClickItem("Ponto")}>
          <ListItemIcon>
            <TouchAppIcon />
          </ListItemIcon>
          <ListItemText secondary="Ponto" />
        </ListItemButton>
      </React.Fragment>
      <Divider />

      <React.Fragment>
        <ListSubheader component="div" inset color="inherit">
          Relatorios
        </ListSubheader>
        <ListItemButton onClick={() => ClickItem("Exportar Dados")}>
          <ListItemIcon>
            <SaveIcon />
          </ListItemIcon>
          <ListItemText secondary="Exportar Dados" />
        </ListItemButton>
        <ListItemButton
          onClick={() => ClickItem("Visualizar Relatorios")}
        >
          <ListItemIcon>
            <InsightsIcon />
          </ListItemIcon>
          <ListItemText secondary="Visualizar Relatorios" />
        </ListItemButton>
      </React.Fragment>
      <Divider />
      <React.Fragment>
        <ListSubheader component="div" inset color="inherit">
          Gerenciamento
        </ListSubheader>
        <ListItemButton onClick={() => ClickItem("Projetos")}>
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>
          <ListItemText secondary="Projetos" />
        </ListItemButton>
        <ListItemButton onClick={() => ClickItem("Clientes")}>
          <ListItemIcon>
            <RecentActorsIcon />
          </ListItemIcon>
          <ListItemText secondary="Clientes" />
        </ListItemButton>
        <ListItemButton onClick={() => ClickItem("Equipes")}>
          <ListItemIcon>
            <Groups2Icon />
          </ListItemIcon>
          <ListItemText secondary="Equipes" />
        </ListItemButton>
        <ListItemButton onClick={() => ClickItem("Cargos")}>
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText secondary="Cargos" />
        </ListItemButton>
      </React.Fragment>
      <Divider sx={{ mt: 6 }} />
      <React.Fragment>
        <ListItemButton onClick={() => ClickItem("Organização")}>
          <ListItemIcon>
            <CorporateFareIcon />
          </ListItemIcon>
          <ListItemText secondary="Organização" />
        </ListItemButton>
        <ListItemButton onClick={() => ClickItem("Configuração")}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText secondary="Configuração" />
        </ListItemButton>
      </React.Fragment>
    </React.Fragment>
  );

  //   const relatoriosListItems = (
  //     <React.Fragment>
  //       <ListSubheader component="div" inset color="inherit">
  //         Relatorios
  //       </ListSubheader>
  //       <ListItemButton onClick={() => ClickItem("Exportar Dados")}>
  //         <ListItemIcon>
  //           <SaveIcon />
  //         </ListItemIcon>
  //         <ListItemText secondary="Exportar Dados" />
  //       </ListItemButton>
  //       <ListItemButton onClick={() => ClickItem("TarVisualizar Relatoriosefa")}>
  //         <ListItemIcon>
  //           <InsightsIcon />
  //         </ListItemIcon>
  //         <ListItemText secondary="Visualizar Relatorios" />
  //       </ListItemButton>
  //     </React.Fragment>
  //   );

  //   const gerenciamentoListItems = (
  //     <React.Fragment>
  //       <ListSubheader component="div" inset color="inherit">
  //         Gerenciamento
  //       </ListSubheader>
  //       <ListItemButton onClick={() => ClickItem("Projetos")}>
  //         <ListItemIcon>
  //           <AccountTreeIcon />
  //         </ListItemIcon>
  //         <ListItemText secondary="Projetos" />
  //       </ListItemButton>
  //       <ListItemButton onClick={() => ClickItem("Clientes")}>
  //         <ListItemIcon>
  //           <RecentActorsIcon />
  //         </ListItemIcon>
  //         <ListItemText secondary="Clientes" />
  //       </ListItemButton>
  //       <ListItemButton onClick={() => ClickItem("Equipes")}>
  //         <ListItemIcon>
  //           <Groups2Icon />
  //         </ListItemIcon>
  //         <ListItemText secondary="Equipes" />
  //       </ListItemButton>
  //       <ListItemButton onClick={() => ClickItem("Cargos")}>
  //         <ListItemIcon>
  //           <AssignmentIndIcon />
  //         </ListItemIcon>
  //         <ListItemText secondary="Cargos" />
  //       </ListItemButton>
  //     </React.Fragment>
  //   );

  //   const secondaryListItems = (
  //     <React.Fragment>
  //       <ListItemButton onClick={() => ClickItem("Organização")}>
  //         <ListItemIcon>
  //           <CorporateFareIcon />
  //         </ListItemIcon>
  //         <ListItemText secondary="Organização" />
  //       </ListItemButton>
  //       <ListItemButton onClick={() => ClickItem("Configuração")}>
  //         <ListItemIcon>
  //           <SettingsIcon />
  //         </ListItemIcon>
  //         <ListItemText secondary="Configuração" />
  //       </ListItemButton>
  //     </React.Fragment>
  //   );
};

export default meusItems;

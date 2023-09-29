import * as React from "react";
import List from "@mui/material/List";
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
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";

const meusItems = ({ ClickItem, perfil }) => {
  return (
    <React.Fragment>
      <Divider />
      <React.Fragment>
        <ListSubheader component="div" inset color="inherit"  >
          Registros
        </ListSubheader>
        <ListItemButton onClick={() => ClickItem("Tarefa")} >
          <ListItemIcon>
            <TaskIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText secondary="Tarefa" />
        </ListItemButton>
        <ListItemButton onClick={() => ClickItem("Ponto")} >
          <ListItemIcon>
            <TouchAppIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText secondary="Ponto" />
        </ListItemButton>
      </React.Fragment>
      <Divider />

      <React.Fragment>
        <ListSubheader component="div" inset color="inherit" >
          Relatorios
        </ListSubheader>

{        <ListItemButton onClick={() => ClickItem("Exportar Dados")} >
          <ListItemIcon>
            <SaveIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText secondary="Exportar Dados" />
        </ListItemButton>}

{       perfil === "Adm. Sistema" || perfil === "Gerente" ?
        <ListItemButton onClick={() => ClickItem("Visualizar Relatorios")} >
          <ListItemIcon>
            <InsightsIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText secondary="Visualizar Relatorios" />
        </ListItemButton> : <></>}

      </React.Fragment>
      {       perfil === "Adm. Sistema" || perfil === "Gerente" ?
      <Divider /> : <></>}

      <React.Fragment>
        
{       perfil === "Adm. Sistema" || perfil === "Gerente" ?
        <ListSubheader component="div" inset color="inherit" >
          Gerenciamento
        </ListSubheader> : <></>}

{       perfil === "Adm. Sistema" || perfil === "Gerente" ?
        <ListItemButton onClick={() => ClickItem("Projetos")} >
          <ListItemIcon>
            <AccountTreeIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText secondary="Projetos" />
        </ListItemButton> : <></>}

{       perfil === "Adm. Sistema" || perfil === "Gerente" ?
        <ListItemButton onClick={() => ClickItem("Clientes")} >
          <ListItemIcon>
            <RecentActorsIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText secondary="Clientes" />
        </ListItemButton> : <></>}

{       perfil === "Adm. Sistema" || perfil === "Gerente" ?
        <ListItemButton onClick={() => ClickItem("Equipes")} >
          <ListItemIcon>
            <Groups2Icon fontSize="small"/>
          </ListItemIcon>
          <ListItemText secondary="Equipes" />
        </ListItemButton> : <></>}

{       perfil === "Adm. Sistema" || perfil === "Gerente" ? 
        <ListItemButton onClick={() => ClickItem("Cargos")} >
          <ListItemIcon>
            <AssignmentIndIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText secondary="Cargos" />
        </ListItemButton> : <></>}

      </React.Fragment>
      <Divider sx={{ mt: 8 }} />
      
      <List component="nav" >
      <React.Fragment>
{ perfil === "Adm. Sistema" || perfil === "Gerente" ?
        <ListItemButton onClick={() => ClickItem("Organização")}  >
          <ListItemIcon  >
            <CorporateFareIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText secondary="Organização"  />
        </ListItemButton> : <></>}

{       perfil === "Adm. Sistema" ?   
        <ListItemButton onClick={() => ClickItem("Configuração")} >
          <ListItemIcon>
            <SettingsIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText secondary="Configuração" />
        </ListItemButton> : <></>}

        <ListItemButton onClick={() => ClickItem("Logout")} >
          <ListItemIcon>
            <LogoutIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText secondary="Logout" />
        </ListItemButton>
      </React.Fragment>
      </List>

    </React.Fragment>
  );
};

export default meusItems;

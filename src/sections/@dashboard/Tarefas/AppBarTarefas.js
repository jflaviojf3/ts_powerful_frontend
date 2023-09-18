import { TextField } from "@mui/material"

export default function AppBarTarefas ( ){
    return (
        <>
        <TextField
        label="Registro de Tarefa"
        id="filled-size-normal"
        defaultValue="Teste1"
        variant="filled"
        sx={{ backgroundColor: '#FFFFFFBF', borderRadius: "5px" }}
        />
                <TextField
        label="Registro de Tarefa"
        id="filled-size-normal"
        defaultValue="Normal"
        variant="filled"
        sx={{ backgroundColor: '#FFFFFFBF', borderRadius: "5px" }}
      />
        </>
    )
}
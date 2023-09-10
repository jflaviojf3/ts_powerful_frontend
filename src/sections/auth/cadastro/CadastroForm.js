import { useState } from "react";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/Iconify";
//api
import { cadastroService } from "../../../../pages/api/usuarioService/cadastroService";

// ----------------------------------------------------------------------

const CadastroForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    password: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.email ||
        !formData.password ||
        !formData.nome ||
        !formData.sobrenome
      ) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
      const data = await cadastroService.cadastroSimples(
        formData.nome,
        formData.sobrenome,
        formData.email,
        formData.password
      );
      if(data.status === 200){
        alert("Cadastro realizado com sucesso!");
        setTimeout(() => {
          props.setFormularioAtual("LoginForm");
        }, 2000);
      }
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  return (
    <>
      <Divider sx={{ my: 3 }}></Divider>
      <Stack spacing={3}>
        <Stack direction="row" spacing={4}>
          <TextField
            name="nome"
            label="Nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <TextField
            name="sobrenome"
            label="Sobrenome"
            value={formData.sobrenome}
            onChange={handleChange}
          />
        </Stack>

        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Senha"
          value={formData.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Cadastrar
        </LoadingButton>
      </Stack>
    </>
  );
};

export default CadastroForm;

import { useState } from "react";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Divider,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

export default function CadastroForm() {
  //const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    //navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Divider sx={{ my: 3 }}>
      </Divider>
      <Stack spacing={3}>
        <Stack direction="row" spacing={4}>
          <TextField name="nome" label="Nome" />
          <TextField name="sobrenome" label="Sobrenome" />
        </Stack>

        <TextField name="email" label="Email" />
        <TextField
          name="password"
          label="Senha"
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
          onClick={handleClick}
        >
          Cadastrar
        </LoadingButton>
      </Stack>
    </>
  );
}
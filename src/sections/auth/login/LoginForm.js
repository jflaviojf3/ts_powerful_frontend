import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/Iconify";
//api
import { authService } from "../../../../pages/api/autenticacaoService/auth";

// ----------------------------------------------------------------------

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [tokenAuth, setTokenAuth] = useState(null);
  useEffect(() => {
    if (tokenAuth !== null) {
      router.push(`/PainelInterno`, undefined, { shallow: true });
    }
    //{*?token=${tokenAuth}*}
  }, [tokenAuth, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        alert("Por favor, preencha ambos os campos.");
        return;
      }
      const data = await authService.login(formData.email, formData.password);
      setTokenAuth(data.token);
    } catch (error) {
      alert(error);
      console.error("Erro na solicitação POST:", error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify
            icon="eva:google-fill"
            color="#DF3E30"
            width={22}
            height={22}
          />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          OU
        </Typography>
      </Divider>

      <Stack spacing={3}>
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
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Checkbox name="remember" label="Remember me" />

        <Link variant="subtitle2" underline="hover">
          Esqueceu a Senha?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
      >
        Login
      </LoadingButton>
    </>
  );
};

export default LoginForm;

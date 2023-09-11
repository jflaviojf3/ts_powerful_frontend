import axios from "axios";

const api = axios.create({
  baseURL: process.env.DNS_BACKEND,
});

export const cadastroService = {
  async cadastroSimples(nome, sobrenome, email, senha) {
    return api
      .post("/v1/usuarios", {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha,
        cod_perfil: 1
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        throw error.response.data;
      });
  },
};

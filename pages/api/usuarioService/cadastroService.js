import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_DNS_BACKEND;
const api = axios.create({
  baseURL: baseUrl,
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

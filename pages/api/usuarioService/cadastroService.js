import axios from "axios";

const api = axios.create({
  //baseURL: "https://api-ts-powerful.jamb-devs.tech/v1",
  baseURL: "http://localhost:3000/v1",
});

export const cadastroService = {
  async cadastroSimples(nome, sobrenome, email, senha) {
    return api
      .post("/usuarios", {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha,
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        throw error.response.data.message;
      });
  },
};

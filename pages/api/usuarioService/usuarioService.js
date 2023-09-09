import axios from "axios";

const api = axios.create({
  baseURL: "https://api-ts-powerful.jamb-devs.tech/v1",
  //baseURL: "http://localhost:3000/v1",
});

export const usuarioService = {
  async pegaUsuarioLogado(token, usuarioId) {
    return api
      .get(`/usuarios/${usuarioId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data.menssage;
      });
  },
};

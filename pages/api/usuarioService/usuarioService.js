import axios from "axios";

const api = axios.create({
  baseURL: process.env.DNS_BACKEND,
});

export const usuarioService = {
  async pegaUsuarioLogado(token, usuarioId) {
    return api
      .get(`/v1/usuarios/${usuarioId}`, {
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

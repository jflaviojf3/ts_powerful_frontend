import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_DNS_BACKEND;
const api = axios.create({
  baseURL: baseUrl,
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

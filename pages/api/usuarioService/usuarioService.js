import axios from "axios";

const baseUrl = 'https://api-ts-powerful.jamb-devs.tech'; //process.env.DNS_BACKEND;
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
        console.log(response.data)
        return response.data;
      })
      .catch(function (error) {
        throw error.data.menssage;
      });
  },
};

import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_DNS_BACKEND;
const api = axios.create({
  baseURL: baseUrl,
});

export const tarefaService = {
  async pegaTarefasUsuario(token, usuarioId) {
    return api
      .get(`/v1/usuarios/${usuarioId}/tarefa`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async pegaTarefasPorDiaUsuario(token, usuarioId) {
    return api
      .get(`/v1/usuarios/${usuarioId}/tarefaPorDia`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async pegaTarefasDia(token, usuarioId, dia) {
    return api
      .get(`/v1/usuarios/${usuarioId}/tarefaDia/${dia}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async insereTarefaUsuario(token, usuarioId, body) {
    return api
      .post(`/v1/usuarios/${usuarioId}/tarefa`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },
};
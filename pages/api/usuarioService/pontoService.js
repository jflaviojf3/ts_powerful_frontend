import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_DNS_BACKEND;
const api = axios.create({
  baseURL: baseUrl,
});

export const pontoService = {

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

  async pegaTarefaAtiva(token, usuarioId) {
    return api
      .get(`/v1/usuarios/${usuarioId}/tarefaAtiva`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async pegaPontosDia(token, usuarioId, dia) {
    return api
      .get(`/v1/usuarios/${usuarioId}/pontosDia/${dia}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(`/v1/usuarios/${usuarioId}/pontosDia/${dia}`)
        console.log(response.data)
        return response.data;
      })
      .catch(function (error) {
        console.log(error.data)
        throw error.data;
      });
  },

  async inserePontoUsuario(token, usuarioId, body) {
    return api
      .post(`/v1/usuarios/${usuarioId}/pontos`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async atualizaTarefaUsuario(token, usuarioId, idtarefa, entrada, body) {
    return api
      .put(`/v1/usuarios/${usuarioId}/tarefa/${idtarefa}/entrada/${entrada}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async deletaTarefaUsuario(token, usuarioId, idtarefa, entrada) {
    return api
      .delete(`/v1/usuarios/${usuarioId}/tarefa/${idtarefa}/entrada/${entrada}`, {
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
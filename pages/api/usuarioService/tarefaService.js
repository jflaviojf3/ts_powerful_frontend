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

  async pegaTotalTarefaUsuario(token, usuarioId) {
    return api
      .get(`/v1/usuarios/${usuarioId}/totalTarefasUsuario`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async pegaTarefasPorProjetoUsuario(token, usuarioId) {
    return api
      .get(`/v1/usuarios/${usuarioId}/tarefasProjeto`, {
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

  async pegaTarefasPeriodo(token, usuarioId, dataInicio, dataFim) {
    return api
      .get(`/v1/usuarios/${usuarioId}/tarefaInicio/${dataInicio}/tarefaFim/${dataFim}`, {
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
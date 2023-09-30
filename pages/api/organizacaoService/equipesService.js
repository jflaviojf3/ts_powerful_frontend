import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_DNS_BACKEND;
const api = axios.create({
  baseURL: baseUrl,
});

export const equipesService = {
    
    async pegaTodasEquipes(token, organizacaoId) {
        return api
        .get(`/v1/organizacoes/${organizacaoId}/equipes`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            throw error.data;
        });
    },
    
    async pegaEquipeId(token, organizacaoId, equipeId) {
      return api
        .get(`/v1/organizacoes/${organizacaoId}/equipes/${equipeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          throw error.data;
        });
    },

    async pegaUsuariosEquipe(token, equipeId) {
      return api
        .get(`/v1/equipes/${equipeId}/usuarios`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          throw error.data;
        });
    },

  async pegaNomeEquipe(token, organizacaoId, body) {
    return api
      .post(`/v1/organizacoes/${organizacaoId}/equipes/nomeEquipe`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async insereEquipe(token, organizacaoId, body) {
    return api
      .post(`/v1/organizacoes/${organizacaoId}/equipes`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async insereUsuarioEquipe(token, idEquipe, body) {
    return api
      .post(`/v1/equipes/${idEquipe}/usuarios/`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async atualizaEquipe(token, organizacaoId, equipeId, body) {
    return api
      .put(`/v1/organizacoes/${organizacaoId}/equipes/${equipeId}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async deletaEquipe(token, organizacaoId, equipeId) {
    return api
      .delete(`/v1/organizacoes/${organizacaoId}/equipes/${equipeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async deletaUsuarioEquipe(token, equipeId, usuarioId) {
    return api
      .delete(`/v1/equipes/{${equipeId}/usuarios/${usuarioId}`, {
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
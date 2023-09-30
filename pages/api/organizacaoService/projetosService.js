import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_DNS_BACKEND;
const api = axios.create({
  baseURL: baseUrl,
});

export const projetosService = {
    
    async pegaTodosProjetos(token, organizacaoId) {
        return api
        .get(`/v1/organizacoes/${organizacaoId}/projetos`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            throw error.data;
        });
    },
    
    async pegaProjetosId(token, organizacaoId, projetoId) {
      return api
        .get(`/v1/organizacoes/${organizacaoId}/projetos/${projetoId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          throw error.data;
        });
    },

  async pegaNomeProjeto(token, organizacaoId, body) {
    return api
      .post(`/v1/organizacoes/${organizacaoId}/nomeProjeto`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async insereProjeto(token, organizacaoId, body) {
    return api
      .post(`/v1/organizacoes/${organizacaoId}/projetos`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async atualizaProjeto(token, organizacaoId, projetoId, body) {
    return api
      .put(`/v1/organizacoes/${organizacaoId}/projetos/${projetoId}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async deletaProjeto(token, organizacaoId, projetoId) {
    return api
      .delete(`/v1/organizacoes/${organizacaoId}/projetos/${projetoId}`, {
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
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_DNS_BACKEND;
const api = axios.create({
  baseURL: baseUrl,
});

export const organizacaoService = {
  async pegaTodasOrganizacoes(token) {
    return api
      .get(`/v1/organizacoes`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async pegaOrganizacaoId(token, organizacaoId) {
    return api
      .get(`/v1/organizacoes/${organizacaoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async pegaOrganizacaoNome(token, body) {
    return api
      .post(`/v1/organizacoes/nomeOrganizacao`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async insereOrganizacao(token, body) {
    return api
      .post(`/v1/organizacoes/`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async atualizaTarefaUsuario(token, organizacaoId, body) {
    return api
      .put(`/v1/organizacoes/${organizacaoId}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async deletaTarefaUsuario(token, organizacaoId) {
    return api
      .delete(`/v1/organizacoes/${organizacaoId}`, {
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
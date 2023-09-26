import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_DNS_BACKEND;
const api = axios.create({
  baseURL: baseUrl,
});

export const cargosService = {
  async pegaTodasCargos(token) {
    return api
      .get(`/v1/cargos`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async pegaCargosId(token, cargosId) {
    return api
      .get(`/v1/cargos/${cargosId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async pegaCargoNome(token, body) {
    return api
      .post(`/v1/cargos/nomeCargo`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async insereCargos(token, body) {
    return api
      .post(`/v1/cargos/`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async atualizaCargos(token, cargosId, body) {
    return api
      .put(`/v1/cargos/${cargosId}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async deletaCargos(token, cargosId) {
    return api
      .delete(`/v1/cargos/${cargosId}`, {
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
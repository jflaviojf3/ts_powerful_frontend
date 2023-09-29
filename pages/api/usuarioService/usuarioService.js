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

  async pegaNomeUsuario(token, body) {
    return api
      .post(`/v1/usuarios/nomeUsuario`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data.menssage;
      });
  },

  async atualizaUsuario(token, usuarioId, body) {
    return api
      .put(`/v1/usuarios/${usuarioId}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data;
      });
  },

  async pegaTodosUsuarios(token, ) {
    return api
      .get(`/v1/usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data.menssage;
      });
  },

  async pegaUmUsuario(token, idUsuario ) {
    return api
      .get(`/v1/usuarios/${idUsuario}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.data.menssage;
      });
  },

  async deletaUsuario(token, usuarioId) {
    return api
      .delete(`/v1/usuarios/${usuarioId}`, {
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

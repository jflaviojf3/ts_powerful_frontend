import axios from "axios";
import { tokenService } from "./tokenService";


const baseUrl = process.env.NEXT_PUBLIC_DNS_BACKEND;
const api = axios.create({
  baseURL: baseUrl,
});
export const authService = {
  async login(email, senha) {
    return api
      .post("/v1/auth", {
        email: email,
        senha: senha,
      })
      .then(function (response) {
        tokenService.save(response.data.token);
        return response.data;
      })
      .catch(function (error) {
        throw error.response.data.message;
      });
  },

  async verificaToken(token) {
    return api
      .post("/v1/authToken", {
        token: token,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.response.data.message;
      });
  },

  logout() {
    tokenService.delete();
  }

};

import axios from "axios";
import { tokenService } from "./tokenService";

const api = axios.create({
  baseURL: "https://api-ts-powerful.jamb-devs.tech/v1",
  //baseURL: "http://localhost:3000/v1",
});

export const authService = {
  async login(email, senha) {
    return api
      .post("/auth", {
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
      .post("/authToken", {
        token: token,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.response.data.message;
      });
  }
};

import axios from "axios";

const api = axios.create({
  baseURL: "https://api-ts-powerful.jamb-devs.tech/v1",
});

export const authService = {
  async login(email, senha) {
    return api
      .post("/auth", {
        email: email,
        senha: senha,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error.response.data.message;
      });
  },
};

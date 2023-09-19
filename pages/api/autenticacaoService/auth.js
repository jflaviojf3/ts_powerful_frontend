import axios from "axios";
import { tokenService } from "./tokenService";
import { useRouter } from 'next/router'


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
        console.log(baseUrl)
        tokenService.save(response.data.token);
        return response.data;
      })
      .catch(function (error) {
        console.log(baseUrl)
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
    const router = useRouter()
    router.push('/')
  }

};

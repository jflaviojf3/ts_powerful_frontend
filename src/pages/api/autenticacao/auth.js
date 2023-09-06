import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-ts-powerful.jamb-devs.tech', // Substitua pela URL da sua API
});

export const login = async (email, senha) => {
  try {
    const response = await api.post('/v1/auth', { email, senha });
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};
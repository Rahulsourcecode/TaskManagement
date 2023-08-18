import axios from 'axios'

const baseURL = "http://localhost:3001/api";
export const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});


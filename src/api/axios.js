import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // CRA injects this at build
});


export default api;
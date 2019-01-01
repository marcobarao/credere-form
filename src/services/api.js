import axios from "axios";

const api = axios.create({
  baseURL: "https://frozen-basin-72903.herokuapp.com"
});

export default api;

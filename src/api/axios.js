import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_ROUTE_API,
});

export default api;

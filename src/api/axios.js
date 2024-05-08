import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_ROUTE_API,
  // Check .env.example to make sure. Axios function for backend from api_cab_driver
});

export default api;

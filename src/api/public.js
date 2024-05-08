import axios from "axios";

const publicRoute = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_ROUTE_API,
  // Check env to make sure. Axios function to call public API from api_kendaraan
});

export default publicRoute;

import axios from "axios";

const publicRoute = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_ROUTE_API,
});

export default publicRoute;

import axios from "axios";

export default axios.create({
    baseURL: 'http://192.168.18.22:8000/api'
})
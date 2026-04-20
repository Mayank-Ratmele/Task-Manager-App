import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.29.140:5000/api",
});

export default API;
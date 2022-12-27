import axios from "axios";

const miApi = axios.create({
  baseURL: "/api",
});

export default miApi;

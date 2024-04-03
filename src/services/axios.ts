import axios from "axios";
import { BASE_URL } from "./apiUrls";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Accept-Language": "en",
    "Content-Type": "application/json",
    Authorization: "",
  },
});

export default instance;

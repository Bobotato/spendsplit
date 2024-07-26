import axios from "axios";

const apiKey = process.env.API_KEY;
const apiBaseURL = process.env.API_BASEURL;

export const apiClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
    timeout: 1000,
  },
  params: {
    key: apiKey,
  },
});

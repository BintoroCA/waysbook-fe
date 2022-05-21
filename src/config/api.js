import axios from "axios";

export const API = axios.create({
  baseURL:
    "https://waysbook-bintoro.herokuapp.com/api/v1/" ||
    "http://localhost:5005/api/v1/",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.commin["Authorization"];
  }
};

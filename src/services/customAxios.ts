import axios, { AxiosInstance } from "axios";

export const customAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    customAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete customAxios.defaults.headers.common["Authorization"];
  }
};

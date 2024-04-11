import axios, { AxiosInstance, AxiosResponse } from "axios";

// 토큰 안 보낼 때
export const publicApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
});

// 토큰 보낼 때
export const privateApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
  withCredentials: false,
});

// 헤더에 엑세스 토큰 추가하기
privateApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("userToken");
  config.headers.Authorization = "Bearer " + token;

  return config;
});

// 리프레쉬 토큰 처리
privateApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 오류 && 401인 경우
    if (
      !originalRequest._retry &&
      error.response &&
      error.response.status === 401
    ) {
      originalRequest._retry = true;
      try {
        const tokenRes = await publicApi.get("/api/refresh", {
          withCredentials: true,
        });
        if (tokenRes.status === 200) {
          const newAccessToken = tokenRes.data.access_token;
          sessionStorage.setItem("userToken", newAccessToken);

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axios(originalRequest);
        }
      } catch (error) {
        console.error(error);
        sessionStorage.removeItem("userToken");
        window.location.replace("/");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

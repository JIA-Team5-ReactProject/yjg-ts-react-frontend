import axios, { AxiosInstance, AxiosResponse } from "axios";

// 토큰 안 보낼 때
export const publicApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
  withCredentials: true,
});

// 토큰 보낼 때
export const privateApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
});

// 헤더에 엑세스 토큰 추가하기
privateApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("userToken");
  config.headers.Authorization = "Bearer " + token;

  return config;
});

// 리프레쉬 토큰 처리
// privateApi.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;

//     if (status === 401) {
//       console.log("g");
//       const originRequest = config;
//       try {
//         console.log("d");
//         const tokenResponse = await publicApi.get("/api/refresh", {
//           withCredentials: true,
//         });
//         if (tokenResponse.status === 200) {
//           const newAccessToken = tokenResponse.data.token;
//           sessionStorage.setItem("userToken", newAccessToken);
//         }
//         return axios(originRequest);
//       } catch (error) {
//         console.log(error);
//         // if (axios.isAxiosError(error)) {
//         //   if (error.response?.status === 401) {
//         //     alert("로그인이 만료되었습니다.");
//         //     window.location.replace("/");
//         //   } else {
//         //     console.log(error);
//         //   }
//         // }
//       }
//     }
//   }
// );

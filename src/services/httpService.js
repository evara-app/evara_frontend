import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const pathnames = [
  "/api/v2/front/profile/",
  "/api/v2/front/property/",
  "/api/v2/front/user-likes/",
  "/api/v2/front/property-comments/",
];

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

app.interceptors.request.use(
  async (config) => {
    const token = getCookie("access");
    if (token && pathnames.includes(config.url)) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

// app.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalConfig = err.config;
//     if (err.response.status === 401 && !originalConfig._retry) {
//       originalConfig._retry = true;
//       try {
//         const { data } = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`,
//           { withCredentials: true }
//         );
//         if (data) return app(originalConfig);
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(err);
//   }
// );

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;

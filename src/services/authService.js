// import http from "@/services/httpService":

import http from "./httpService";

export function getOtp(data) {
  console.log(data);
  return http
    .post("/auth/login_register/verify/", data)
    .then(({ data }) => data.data);
}

export function checkOtp(data) {
  return http.post("/user/check-otp", data).then(({ data }) => data.data);
}

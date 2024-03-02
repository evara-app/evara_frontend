import http from "./httpService";

export function getOtp({ data }) {
  return http.post("/api/v2/login-register/", data).then(({ data }) => data);
}

export function checkOtp({ CHECK_OTP_DATA }) {
  return http
    .post("/api/v2/login-register-verify/", CHECK_OTP_DATA)
    .then(({ data }) => data);
}

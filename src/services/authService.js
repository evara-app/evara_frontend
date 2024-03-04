import http from "./httpService";
import axios from "axios";

export function getOtp({ data }) {
  return http.post("/api/v2/login-register/", data).then(({ data }) => data);
}

export function checkOtp({ CHECK_OTP_DATA }) {
  return http
    .post("/api/v2/login-register-verify/", CHECK_OTP_DATA)
    .then(({ data }) => data);
}

export function completeProfile(data) {
  return http.patch("/api/v2/front/profile/", data).then(({ data }) => data);
}

export function getUserProfile() {
  return http.get("/api/v2/front/profile/").then(({ data }) => data);
}

// import http from "@/services/httpService":

import http from "./httpService";

export function getOtp(data) {
  return http.post("/auth/login_register/", data).then(({ data }) => data);
}

export function checkOtp(data) {
  return http
    .post("/auth/login_register/verify/", {
      email: data.email,
      phone_number: data.phone_number,
      isd: data.isd,
      password: data.otp,
    })
    .then(({ data }) => data);
}

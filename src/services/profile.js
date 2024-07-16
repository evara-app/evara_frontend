import http from "./httpService";

export function getAllUserProperties() {
  return http
    .get("/api/v2/front/user-properties/")
    .then(({ data }) => data.results);
}

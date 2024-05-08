import http from "./httpService";

export function getCurrency() {
  return http
    .get("/api/v2/front/currency/?no-paginate=true")
    .then(({ data }) => data.results);
}

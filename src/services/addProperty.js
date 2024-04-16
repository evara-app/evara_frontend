import http from "./httpService";

export function getRooms() {
  return http
    .get("/api/v2/front/rooms/?no-paginate=true")
    .then(({ data }) => data.results);
}

export function getCountries() {
  return http
    .get("/api/v2/location/country/?no-paginate=true")
    .then(({ data }) => data.results);
}

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

export function getPropertyFields() {
  return http
    .get("/api/v2/front/template/property-fields/create/data/")
    .then(({ data }) => data.results);
}

export function getCity({ value }) {
  return http
    .get(`/api/v2/location/city/nested/${value}/`)
    .then(({ data }) => data.results);
}

export function getProvince({ value }) {
  return http
    .get(`/api/v2/location/province/nested/${value}/`)
    .then(({ data }) => data.results);
}

export function addProperty({ data }) {
  return http.post(`/api/v2/front/property/`, data).then(({ data }) => data.data);
}

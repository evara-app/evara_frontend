import http from "./httpService";

export function getCities(id) {
  return http
    .get(`/api/v2/location/province/nested/${id}/`)
    .then(({ data }) => data);
}

export function getProvinces(province) {
  return http
    .post("/api/v2/location/city/by_province/", { provinces: province })
    .then(({ data }) => data);
}

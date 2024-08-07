import http from "./httpService";
import axios from "axios";

export function getProvinces(id) {
  return http
    .get(`/api/v2/location/province/nested/${id}/`)
    .then(({ data }) => data);
}

export function getCities(province) {
  return http
    .post("/api/v2/location/city/by_province/", { provinces: province })
    .then(({ data }) => data);
}

export function getAllProvinces() {
  return http
    .get("/api/v2/location/provinces/")
    .then(({ data }) => data.results);
}

export function getAllCities() {
  return http.get("/api/v2/location/cities/").then(({ data }) => data.results);
}

export function getProperties(filter) {
  return http
    .get(`/api/v2/front/property/list?${filter}`)
    .then(({ data }) => data);
}

export function getPropertyBySlug(slug) {
  return http
    .get(`/api/v2/front/property/object/${slug}/`)
    .then(({ data }) => data);
}

export function getPropertyBySlugToken(slug, token) {
  return http
    .get(`/api/v2/front/property/object/${slug}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);
}

export function likeProperty(id) {
  return http
    .post(`/api/v2/front/user-likes/`, { property: id })
    .then(({ data }) => data);
}

export function getAllComments(id, size) {
  const commentSize = size || 1;
  return http
    .get(`/api/v2/front/property-comments/list/${id}/?page_size=${commentSize}`)
    .then(({ data }) => data);
}

export function submitComment(data) {
  return http
    .post(`/api/v2/front/property-comments/`, data)
    .then(({ data }) => data);
}

export function getPropertyDetails(slug, token) {
  return http
    .get(`/api/v2/front/property/user/profile/${slug}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);
}

export function getSpecialAds() {
  return http.get("/api/v2/front/special-properties/").then(({ data }) => data);
}
export function getLastProperties() {
  return http.get("/api/v2/front/last-properties/").then(({ data }) => data);
}

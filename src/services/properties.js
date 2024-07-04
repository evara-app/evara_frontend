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

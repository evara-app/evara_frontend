import http from "./httpService";

export function getAllCategories() {
  return http.get("/api/v2/front/property-category/").then(({ data }) => data);
}
export function getPropertiesListing() {
  return http.get(`/api/v2/front/property-listing/`).then(({ data }) => data);
}

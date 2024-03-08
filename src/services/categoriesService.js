import http from "./httpService";

export function getAllCategories() {
  return http.get("/api/v2/front/property-category/").then(({ data }) => data);
}

import http from "./httpService";

export function getAllUserProperties() {
  return http
    .get("/api/v2/front/user-properties/")
    .then(({ data }) => data.results);
}

export function galleryEdit(data) {
  return http
    .patch(
      `/api/v2/front/property/gallery/profile/${data.slug}/`,
      {
        primary_images: data.primaryImages,
        images: data.galleryImages,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    )
    .then(({ data }) => data);
}

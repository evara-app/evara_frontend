import React from "react";
import { cookies } from "next/headers";

//? import components
import GalleryComponent from "@/app/(profile)/profile/gallery/[slug]/GalleryComponent";

//? import service
import { getGalleryImages } from "@/services/properties";

async function page({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("access")?.value;
  const galleryImages = getGalleryImages(params.slug, token);
  const [{ results: images }] = await Promise.all([galleryImages]);

  return (
    <div>
      <GalleryComponent DBImages={images} slug={params.slug} token={token} />
    </div>
  );
}

export default page;

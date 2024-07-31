import React from "react";
import { cookies } from "next/headers";

//? import service
import { getPropertyDetails } from "@/services/properties";

//? import components
import Details from "@/app/(profile)/profile/property/[slug]/Details";

async function page({ params }) {
  const cookieStore = cookies();
  const token = cookieStore.get("access")?.value;
  const propertyDetails = getPropertyDetails(params.slug, token);
  const [{ results: details }] = await Promise.all([propertyDetails]);
  return (
    <div>
      <Details details={details} />
    </div>
  );
}

export default page;

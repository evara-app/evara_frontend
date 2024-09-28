"use client";

import React from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

//? import hooks
import { useGetUserAllProperties } from "@/hooks/profile";
import { Toast } from "@/hooks/Toast";

//? import components
import PropertyPrice from "@/app/(subPages)/properties/PropertyPrice";
import Loading from "@/common/Loading";

//? import service
import { DeleteProperty } from "@/services/properties";

function page() {
  const router = useRouter();
  const pathname = usePathname();

  const queryClient = useQueryClient();

  const { data: properties, isPending } = useGetUserAllProperties();
  const { mutateAsync: deletePropertyMutation } = useMutation({
    mutationFn: DeleteProperty,
  });

  if (isPending)
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );

  const deleteProperty = async (slug) => {
    const token = getCookie("access");
    try {
      const { results } = await deletePropertyMutation({ slug, token });
      Toast("success", results.en);
      queryClient.invalidateQueries({ queryKey: ["get-user-properties"] });
    } catch (error) {}
  };
  return (
    <div className="p-2">
      <h1 className="text-lg font-medium">Latest news and announcements</h1>
      <p className="text-sm mt-2">
        In the list below, you can see the status of all the properties you have
        registered on the site, and you can delete or edit the ad.
      </p>
      <div className="border border-gray-200 p-2 rounded-md shadow overflow-auto">
        <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
          <thead className="rounded-md">
            <tr className="bg-gray-200 rounded-md text-sm text-gray-default">
              <th>#</th>
              <th>Property Code</th>
              <th>Submitted Properties</th>
              <th>Price</th>
              <th>Status</th>
              <th>View</th>
              <th>Appointments</th>
              <th>Authority</th>
            </tr>
          </thead>
          <tbody className="text-center text-gray-default">
            {properties.map((property) => (
              <tr className="even:bg-green-200">
                <td>{property?.id}</td>
                <td>1221</td>
                <td>{property?.title}</td>
                <td>
                  <PropertyPrice cardData={property} />
                </td>
                <td>{property?.listing?.listing_type}</td>
                <td>1,221</td>
                <td>Fixed</td>
                <td>
                  <div className="flex items-center gap-x-2">
                    <button onClick={() => deleteProperty(property?.slug)}>
                      Delete
                    </button>
                    <Link href={`/profile/property/${property?.slug}/`}>
                      Edit
                    </Link>
                    <Link href={`/profile/gallery/${property?.slug}/`}>
                      Gallery
                    </Link>
                    <Link href={`/property/${property?.slug}/${property?.id}`}>
                      Show
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {/* <tr className="bg-green-200 p-2 rounded-md">
              <td>1</td>
              <td>1221</td>
              <td>150-meter house (yard) for rent - Yaghchian</td>
              <td>100,000,000 USD</td>
              <td>Sell</td>
              <td>1,221</td>
              <td>Fixed</td>
              <td>
                <div>
                  <button>Delete</button>
                  <button>Edit</button>
                </div>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;

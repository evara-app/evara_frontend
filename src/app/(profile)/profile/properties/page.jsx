"use client";

import React from "react";
import Link from "next/link";
//? import hooks
import { useGetUserAllProperties } from "@/hooks/profile";

//? import components
import PropertyPrice from "@/app/(subPages)/properties/PropertyPrice";
import Loading from "@/common/Loading";

function page() {
  const { data: properties, isPending } = useGetUserAllProperties();
  if (isPending)
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );
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
                  <div className="flex items-center gap-x-1">
                    <button>Delete</button>
                    <button>Edit</button>
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

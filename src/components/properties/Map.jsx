"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

//? import components
import Loading from "@/common/Loading";
import PropertyPrice from "@/app/(subPages)/properties/PropertyPrice";

const containerStyle = {
  width: "100%",
  height: "300px",
};

function Map({ properties }) {
  const [property, setProperty] = useState();
  const [infoWindowCoordinate, setInfoWindowCoordinate] = useState();

  const center = {
    lat: 41.00824,
    lng: 28.978359,
  };

  // google map api key
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDdBi-i25sCVM7TPAkDElGLX5z7J7S_mpM",
  });

  const InfoWindowHandler = (property, lat, lng) => {
    setProperty(property);
    setInfoWindowCoordinate({ lat: lat, lng: lng });
  };

  const divStyle = {
    background: `white`,
  };

  return (
    <div className="rounded overflow-hidden mb-4">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          {properties.map((property) => (
            <MarkerF
              position={{
                lat: Number(property?.address_obj?.latitude),
                lng: Number(property?.address_obj?.longitude),
              }}
              onClick={() =>
                InfoWindowHandler(
                  property,
                  Number(property?.address_obj?.latitude),
                  Number(property?.address_obj?.longitude)
                )
              }
            />
          ))}
          {infoWindowCoordinate && (
            <InfoWindowF position={infoWindowCoordinate}>
              <div style={divStyle}>
                <Link href={`/property/${property?.slug}/${property?.id}`}>
                  <div className="flex items-center justify-between gap-x-4">
                    <div>
                      <img
                        src={property?.banner}
                        alt="property-banner"
                        className="w-20 h-20 rounded-md"
                      />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <h1 className="text-lg text-gray-default font-medium">
                        {property?.title}
                      </h1>
                      <h5 className="text-sm text-gray-default">
                        {property?.country?.name} | {property?.province?.name}
                      </h5>
                      <p className="text-sm text-green-500">
                        <PropertyPrice cardData={property} />
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default React.memo(Map);

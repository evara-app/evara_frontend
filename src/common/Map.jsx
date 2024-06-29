"use client";

import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

//? import components
import Loading from "@/common/Loading";

const containerStyle = {
  width: "100%",
  height: "510px",
};

function Map({ lat, lng }) {
  // google map api key
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDdBi-i25sCVM7TPAkDElGLX5z7J7S_mpM",
  });

  const center = {
    lat: lat,
    lng: lng,
  };

  return (
    <div className="w-52 h-full">
      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <MarkerF position={{ lat: lat, lng: lng }} />
        </GoogleMap>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default React.memo(Map);

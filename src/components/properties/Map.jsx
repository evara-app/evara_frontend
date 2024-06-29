"use client";

import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

//? import components
import Loading from "@/common/Loading";

const containerStyle = {
  width: "100%",
  height: "300px",
};

function Map({ properties }) {
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

  const InfoWindowHandler = (lat, lng) => {
    setInfoWindowCoordinate({ lat: lat, lng: lng });
  };

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
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
          {properties.map((item) => (
            <MarkerF
              position={{ lat: center.lat, lng: center.lng }}
              onClick={() => InfoWindowHandler(center.lat, center.lng)}
            />
          ))}
          {infoWindowCoordinate && (
            <InfoWindowF position={infoWindowCoordinate}>
              <div style={divStyle}>
                <h1>InfoWindow</h1>
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

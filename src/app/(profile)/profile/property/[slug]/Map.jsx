import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

//? import components
import Loading from "@/common/Loading";

const containerStyle = {
  width: "100%",
  height: "300px",
};

function Map({ latitude, longitude, handler, validation }) {
  const center = {
    lat: Number(latitude) || 41.00824,
    lng: Number(longitude) || 28.978359,
  };

  // google map api key
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDdBi-i25sCVM7TPAkDElGLX5z7J7S_mpM",
  });
  return (
    <div className="rounded overflow-hidden mb-4">
      <label className="flex items-center justify-between mb-2">
        Select your coordinates
        <span className="text-red-500 text-xs truncate max-w-xs">
          {validation.errors.longitude && validation.errors.longitude}
        </span>
      </label>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={handler}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          {latitude && longitude && (
            <MarkerF
              position={{ lat: Number(latitude), lng: Number(longitude) }}
            />
          )}
        </GoogleMap>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default React.memo(Map);

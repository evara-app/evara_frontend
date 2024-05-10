import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

//? import components
import Loading from "@/common/Loading";

const containerStyle = {
  width: "100%",
  height: "300px",
};

function Map({ data, handler, validation }) {
  const center = {
    lat: Number(data.lat) || 41.00824,
    lng: Number(data.lng) || 28.978359,
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
          {data.latitude && data.longitude && (
            <MarkerF position={{ lat: data.latitude, lng: data.longitude }} />
          )}
        </GoogleMap>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default React.memo(Map);

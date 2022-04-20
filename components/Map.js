import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const libraries = ["places"];
const mapContainerStyle = {
  height: "706px",
  width: "390px",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 53.551086,
  lng: 9.993682,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBVllhlUdExiCHwryLIqfvWuzx4DGJqrhQ",
    libraries,
  });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
      ></GoogleMap>
    </div>
  );
}

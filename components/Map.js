/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styled from "styled-components";
import { FishingdayForm } from "../components/FishingdayForm";
import { useCreateFishingday } from "../utils/hooks/useCreateFishingday";
import useSWR from "swr";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  height: "549px",
  width: "375px",
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
  const { handleCreateFishingday, error } = useCreateFishingday();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBVllhlUdExiCHwryLIqfvWuzx4DGJqrhQ",
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const fishingdays = useSWR("/api/fishingdays");

  console.log(fishingdays.data);

  const onMapClick = React.useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  function Locate({ panTo }) {
    return (
      <MyLocation
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <img src="/kompass.png" alt="standort" width="60px" />
      </MyLocation>
    );
  }

  return (
    <div>
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {fishingdays.data
          ? fishingdays.data.map((marker) => (
              <Marker
                key={marker._id}
                position={{
                  lat: parseFloat(marker.lat),
                  lng: parseFloat(marker.lng),
                }}
                icon={{
                  url: "/float.png",
                  scaledSize: new window.google.maps.Size(70, 70),
                }}
              />
            ))
          : null}

        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/float.png",
              scaledSize: new window.google.maps.Size(70, 70),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{
              lat: selected.lat + 0.0018,
              lng: selected.lng,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <FishingdayForm
              onSubmitFishingday={handleCreateFishingday}
              submitText={"Erstellen"}
              error={error}
              id="create"
              markers={markers}
            />
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

const P = styled.p`
  color: black;
`;

const MyLocation = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  z-index: 10;
`;

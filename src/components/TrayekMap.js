import { useEffect, useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "../api/axios";

const center = {
  lat: -6.402484,
  lng: 106.794243,
};

function Map({ coordinates }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [loaded, setLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  // const markers = [
  //   {
  //     id: 1,
  //     name: "Stop 1: Boss Mini Soccer, Jakarta",
  //     position: { lat: -6.34905, lng: 106.79099 },
  //   },
  //   {
  //     id: 2,
  //     name: "Stop 2: Rojo Sambel Andara, Jakarta",
  //     position: { lat: -6.31354, lng: 106.8035 },
  //   },
  //   {
  //     id: 3,
  //     name: "Stop 3: Astoria Residence, Jakarta",
  //     position: { lat: -6.2866, lng: 106.80717 },
  //   },
  // ];

  // const [activeMarker, setActiveMarker] = useState(null);

  // const handleActiveMarker = (marker) => {
  //   if (marker === activeMarker) {
  //     return;
  //   }
  //   setActiveMarker(marker);
  // };

  async function calculateRoute() {
    const directionsService = new window.google.maps.DirectionsService();

    const coordinatesCopy = coordinates.map((coordinate) => {
      return {
        location: { lat: coordinate.lat, lng: coordinate.lng },
        stopover: true,
      };
    });

    const origin =
      coordinatesCopy.length === 1
        ? new window.google.maps.LatLng(
            coordinatesCopy[0].location.lat,
            coordinatesCopy[0].location.lng
          )
        : coordinatesCopy.shift().location;
    const destination =
      coordinatesCopy.length === 1
        ? new window.google.maps.LatLng(
            coordinatesCopy[0].location.lat,
            coordinatesCopy[0].location.lng
          )
        : coordinatesCopy.pop().location;
    //put all the remaining coordinates in waypoints after(pop and shift)
    const waypoints = coordinatesCopy;

    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
  }

  useEffect(() => {
    if (coordinates.length > 0) {
      setLoaded(true);
    }
    console.log();

    calculateRoute(coordinates);
  }, [coordinates, loaded]);

  return isLoaded ? (
    <div className="container-fluid">
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={{
          width: "100%",
          height: "400px",
          marginBottom: "2rem",
        }}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}>
        {/* {markers.map(({ id, name, position }) => (
        <MarkerF
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </MarkerF>
      ))} */}

        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default Map;

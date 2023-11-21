import { useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";

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

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

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
    calculateRoute(coordinates);
  }, [coordinates]);

  return (
    <>
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
          // onLoad={(map) => setMap(map)}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    </>
  );
}

export default Map;

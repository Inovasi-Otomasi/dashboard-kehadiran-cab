import { useEffect, useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
  InfoWindow
} from "@react-google-maps/api";

const center = {
  lat: -6.402484,
  lng: 106.794243,
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });



  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const markers = [
    {
      id: 1,
      name: "Stop 1: Boss Mini Soccer, Jakarta",
      position: { lat: -6.34905, lng: 106.79099 }
    },
    {
      id: 2,
      name: "Stop 2: Rojo Sambel Andara, Jakarta",
      position: { lat: -6.31354, lng: 106.80350 }
    },
    {
      id: 3,
      name: "Stop 3: Astoria Residence, Jakarta",
      position: { lat: -6.28660, lng: 106.80717 }
    },
  ]

  const [activeMarker, setActiveMarker] = useState(null)

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

//   const originRef = useRef();
//   const destiantionRef = useRef();

  async function calculateRoute() {
    // if (originRef.current.value === "" || destiantionRef.current.value === "") {
    //   return;
    // }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: {lat: -6.402484, lng: 106.794243},
      destination: {lat: -6.24055841714706, lng: 106.79858973640994},
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
  }

//   function clearRoute() {
//     setDirectionsResponse(null);
//     originRef.current.value = "";
//     destiantionRef.current.value = "";
//   }

  useEffect(() => {
    calculateRoute()
  }, [])

  return isLoaded ? (
    <div className="container-fluid">
      {/* <div className="searchbox">
        <div className="row">
          <div className="col-lg-4">
            <Autocomplete>
              <input
                type="text"
                name="Origin"
                className="form-control"
                placeholder="Origin"
                ref={originRef}
              />
            </Autocomplete>
          </div>
          <div className="col-lg-4">
            <Autocomplete>
              <input
                type="text"
                name="Destication"
                className="form-control"
                placeholder="Destication"
                ref={destiantionRef}
              />
            </Autocomplete>
          </div>
          <div className="col-lg-2">
            <button
              type="submit"
              name="submit"
              className="btn btn-primary"
              onClick={calculateRoute}>
              Search
            </button>
          </div>
          <div className="col-lg-2">
            <button
              type="submit"
              name="clear"
              className="btn btn-danger"
              onClick={clearRoute}>
              Clear
            </button>
          </div>
        </div>
      </div> */}
      
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={{ width: "100%", height: "400px", marginBottom: '2rem' }}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}>
        
        {markers.map(({ id, name, position }) => (
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
      ))}

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

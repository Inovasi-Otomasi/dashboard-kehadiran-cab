import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "../styles/maps.css";
import useOnclickOutside from "react-cool-onclickoutside";

export default function Places({
  onMapClick,
  coordinates,
  resetCoordinates,
  deleteCoordinate,
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Map
      onMapClick={onMapClick}
      coordinates={coordinates}
      resetCoordinates={resetCoordinates}
      deleteCoordinate={deleteCoordinate}
    />
  );
}

function Map({ onMapClick, coordinates, resetCoordinates, deleteCoordinate }) {
  // const center = useMemo(() => ({ lat: -6.2088, lng: 106.8456 }), []);
  const [selected, setSelected] = useState({ lat: -6.40115, lng: 106.79307 });
  const [loaded, setLoaded] = useState(false);

  // const [markers, setMarkers] = useState([]);

  // const onMapClick = (e) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //     },
  //   ]);
  //   console.log(e);
  // };

  // const resetMarker = () => {
  //   setMarkers([]);
  // };

  useEffect(() => {
    // renderCoordinates(coordinates);
    if (coordinates.length > 0) {
      setLoaded(true);
    }
  }, [coordinates, loaded]);

  const renderCoordinates = (coordinates) => {
    // console.log(JSON.parse(coordinates));
    // let markers = `[{"lat":-6.130250445894336,"lng":106.85315310058594},{"lat":-6.386783226010253,"lng":106.82676315307617},{"lat":-6.180406243016221,"lng":106.79178714752197}]`;
    return (
      <>
        {coordinates.map((marker) => {
          return (
            <MarkerF
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
              // onClick={deleteCoordinate}
            />
          );
        })}
      </>
    );
  };
  return (
    <>
      {loaded == true && (
        <GoogleMap
          zoom={13}
          center={selected}
          mapContainerClassName="map-container"
          onClick={onMapClick}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}>
          <div className="pt-2">
            <div className="row g-3">
              <div className="col-md-8">
                <PlacesAutocomplete setSelected={setSelected} />
              </div>
              <div className="col-md-4 btn-container">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={resetCoordinates}>
                  Reset
                </button>
              </div>
            </div>
          </div>
          {renderCoordinates(coordinates)}
          {/* {
          coordinates.map((marker) => (
            <MarkerF
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            />
          ))} */}
        </GoogleMap>
      )}
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setSelected({ lat, lng });
        console.log("📍 Coordinates: ", { lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className="trayek-container">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Cari Lokasi Stop"
        className="form-control border border-dark"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
    // <Combobox onSelect={handleSelect}>
    //   <ComboboxInput
    //     value={value}
    //     onChange={(e) => setValue(e.target.value)}
    //     disabled={!ready}
    //     className="combobox-input"
    //     placeholder="Search an address"
    //   />
    //   <ComboboxPopover>
    //     <ComboboxList>
    //       {status === "OK" &&
    //         data.map(({ place_id, description }) => (
    //           <ComboboxOption key={place_id} value={description} />
    //         ))}
    //     </ComboboxList>
    //   </ComboboxPopover>
    // </Combobox>
  );
};

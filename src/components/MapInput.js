import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "../styles/maps.css";
import useOnclickOutside from "react-cool-onclickoutside";

export default function Places({ onMapClick, coordinates, resetCoordinates }) {
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
    />
  );
}

function Map({ onMapClick, coordinates, resetCoordinates }) {
  const [selected, setSelected] = useState({ lat: -6.2088, lng: 106.8456 });

  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);

  return (
    <>
      <GoogleMap
        zoom={10}
        center={selected}
        mapContainerClassName="map-container"
        onClick={onMapClick}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}>
        <div className="places-container pt-2">
          <div className="row g-3">
            <div className="col-md-8">
              <PlacesAutocomplete setSelected={setSelected} />
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-dark"
                type="button"
                onClick={resetCoordinates}>
                Reset
              </button>
            </div>
          </div>
        </div>
        {coordinates &&
          coordinates.map((marker) => (
            <MarkerF
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            />
          ))}
      </GoogleMap>
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
    <div ref={ref}>
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
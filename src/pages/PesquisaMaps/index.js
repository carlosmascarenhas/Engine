import React, { useState, useEffect } from 'react';
import usePlacesAutocomplete from "use-places-autocomplete";
import logoGoogleIcon from "../../img/google.png";
import {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId,
} from "react-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

const PlacesAutoComplete = ({ onGetLatLng }) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: new window.google.maps.LatLng(latitude, longitude),
      radius: 15000,
    }
  });

  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  const handleInput = (e) => {
    setValue(e.target.value);
        
  };

 
  const handleSelect = async (val) => {
    clearSuggestions()
    const results = await geocodeByAddress(val);
    const latLng = await getLatLng(results[0]);
    setValue(val, false);
    onGetLatLng([latLng, results[0].address_components]);
    setCoordinates(latLng);
  };
  return (
    <Combobox onSelect={handleSelect} aria-labelledby="demo">
      <ComboboxInput value={value} onChange={handleInput} disabled={!ready} className="inputEnd"  />
      <ComboboxPopover  >
        <ComboboxList  >

          {status === "OK" &&
            data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} style={{ paddingTop: 10, paddingBottom: 10 }}  >
                  📍<ComboboxOptionText />
                </ComboboxOption>
            ))}

        </ComboboxList>
      </ComboboxPopover>
      <li className="logoGoogle">
        <img
          src={logoGoogleIcon}
          alt="Powered by Google"
        />
      </li>
    </Combobox>
  );
};

export default PlacesAutoComplete;
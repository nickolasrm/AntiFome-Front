import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

import { usePlatform } from "../../context/PlatformContext";

export default function CitySelect() {
  const {setCity, getCities, setCities, cities, state, city} = usePlatform();

  async function handleCities() {
    const response = await getCities(state);
    setCities(response)
  }

  useEffect(() => {
      if (state != 'Selecione um estado'){
        handleCities();
        setCity('Selecione uma cidade')
      }
  }, [state]);

  return (
    <Dropdown
      onSelect={(event) => {
      setCity(event);
      }}
    >
      <Dropdown.Toggle disabled={false} style={{justifyContent:'center', width:250}}>{` ${city} `}</Dropdown.Toggle>

      <Dropdown.Menu>
        {cities?.map((city) => (
          <Dropdown.Item eventKey={city}>{city}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

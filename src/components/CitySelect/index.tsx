import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

import { usePlatform } from "../../context/PlatformContext";

export default function CitySelect() {
  const {setCity, getCities, setCities, cities, state, city} = usePlatform();
  const[disabled, isDisabled] = useState(true)

  async function handleCities() {
    const response = await getCities(state);
    setCities(response)
  }

  useEffect(() => {
      if (state != 'Selecione um estado'){
        handleCities();
        setCity('Selecione uma cidade')
        isDisabled(false)
      }else{
        isDisabled(true)
      }
  }, [state]);

  return (
    <Dropdown 
      onSelect={(event) => {
      setCity(event);
      }}
    >
      <Dropdown.Toggle disabled={disabled} style={{
      justifyContent:'center', 
      width:250,
      backgroundColor:'#2194c1'
      }}>{` ${city} `}</Dropdown.Toggle>

      <Dropdown.Menu style={{overflowY:'scroll', height:200}}>
        {cities?.map((city) => (
          <Dropdown.Item eventKey={city}>{city}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

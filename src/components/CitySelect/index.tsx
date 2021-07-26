import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

import { useAuth } from "../../context/AuthContext";

export default function CitySelect() {
  const { getCities, state, city, handleSetCity } = useAuth();
  //const [selected, setSelected] = useState<string>(" - - ");
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    try {
      async function handleCities() {
        console.log(state === ' - - ')
        const response = await getCities( state === ' - - '  ? 'RJ' : state );

        setCities(response.data);
      }

      handleCities();
    } catch (err) {
      console.log(err);
    }
  }, [state]);

  return (
    <Dropdown
      onSelect={(event) => {
      handleSetCity(event);
      }}
    >
      <Dropdown.Toggle style={{justifyContent:'center', minWidth:250}}>{` ${city} `}</Dropdown.Toggle>

      <Dropdown.Menu>
        {cities.map((city) => (
          <Dropdown.Item eventKey={city}>{city}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

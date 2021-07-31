import { Dropdown } from "react-bootstrap";
import { usePlatform } from "../../context/PlatformContext";

export default function StateSelect() {
  const {state, setState } = usePlatform()
  const json = require("./states.json");

  return (
    <Dropdown
      onSelect={(event:string|undefined) => {
        setState(event);
      }}
    >
      <Dropdown.Toggle style={{justifyContent:'center', width:250, backgroundColor:'#2194c1'}}>
        {` ${state} `}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{overflowY:'scroll', height:200}}>
        {json.map((state) => {
          return (
            <Dropdown.Item eventKey={state.abbreviation}>
              {state.name}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

export default function StateSelect() {
  const { state, handleSetState } = useAuth()
  const json = require("./states.json");

  return (
    <Dropdown
      onSelect={(event) => {
        handleSetState(event);
      }}
    >
      <Dropdown.Toggle>{` ${state} `}</Dropdown.Toggle>

      <Dropdown.Menu>
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

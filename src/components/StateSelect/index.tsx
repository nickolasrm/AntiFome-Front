import { useState } from 'react';
import {Dropdown} from 'react-bootstrap';


export default function StateSelect(){
    const json = require('./states.json');
    const [selected, setSelected] = useState<string>(' - - ')

    return(
        <Dropdown  onSelect={(event)=>{setSelected(event)}}>
            <Dropdown.Toggle >
                    {" "+selected+" "}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                json.map(state =>{
                    return(<Dropdown.Item eventKey={state.abbreviation}>{state.name}</Dropdown.Item>)
                })
                }
            </Dropdown.Menu>
        </Dropdown>


    )
} 
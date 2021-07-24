import {ListGroup, Card, Button} from 'react-bootstrap';

import SelectBrazilStates  from "react-brazil-states";

type itemType = {
  name:string;
  quantity:number;
}

type contentTypes ={
  name:string;
  items:itemType[];
  priority:number;
}

export default function OngCard({name, items, priority}:contentTypes){



    return(
      <div>
        <SelectBrazilStates onchange={(name, abbreviation)=>{}}/>

      </div>



    )
}
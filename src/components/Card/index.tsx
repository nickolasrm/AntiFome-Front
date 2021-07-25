import Link from 'next/link';
import {ListGroup, Card, Button} from 'react-bootstrap';

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

  const setPriority = () =>{
    if(priority ==0){
      return <b style={{color:'#00ff00'}}>Baixa</b>
    }
    if(priority ==1){
      return <b style={{color:'#ffff00'}}>Média</b>
    }
    if(priority ==2){
      return <b style={{color:'#ff0000'}}>Alta</b>
    }
  }


 
  return(
    <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <p>Prioridade: {setPriority()} </p>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <p>Morro do alemão</p> 
              <p>Rua do pagodeiro 722</p>
              <p>tel:(21) 4002-8922</p>
          </ListGroup.Item>
          <Link href={`dashboard/001`}>
            <ListGroup.Item><Button> Acessar itens</Button></ListGroup.Item>
          </Link>
        </ListGroup>
    </Card>
  )
}
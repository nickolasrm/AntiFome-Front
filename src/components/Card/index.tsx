import Link from 'next/link';
import {ListGroup, Card, Button} from 'react-bootstrap';

type itemType = {
  name:string;
  quantity:number;
}

type contentTypes ={
  street: string;
  username: string;
  phone: string;
  id: number;
  city: string;
  neighborhood: string;
}

export default function OngCard({ street, username, phone, id, city, neighborhood  }:contentTypes){
    return(
      <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{username}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
                <p>{street}</p>
                <p>{neighborhood}</p>
                <p>{city}</p>
                <p>{`tel: ${phone}`}</p>
            </ListGroup.Item>
            <Link href={`/${id}`}>
              <ListGroup.Item><Button> Acessar itens</Button></ListGroup.Item>
            </Link>
        </ListGroup>
    </Card>
  )
}
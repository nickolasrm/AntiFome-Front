import {ListGroup, Card, Button} from 'react-bootstrap';
import CitySelect from '../CitySelect';
import StateSelect from '../StateSelect';

import styles from './styles.module.scss'


export default function Filters(){

    return(
      <div className={styles.container}>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <StateSelect/>
            </ListGroup.Item> 
        </ListGroup>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <CitySelect />
            </ListGroup.Item> 
        </ListGroup>
      </div>
    )
}
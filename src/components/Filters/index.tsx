import {ListGroup} from 'react-bootstrap';
import CitySelect from '../CitySelect';
import StateSelect from '../StateSelect';

import styles from './styles.module.scss'


export default function Filters(){

    return(
      <div className={styles.container}>
        <ListGroup style={{ borderRadius:25}} className="list-group-flush">
            <ListGroup.Item>
              <StateSelect/>
            </ListGroup.Item> 
        </ListGroup>
        
        <ListGroup style={{ borderRadius:25 }} className="list-group-flush">
            <ListGroup.Item>
              <CitySelect />
            </ListGroup.Item> 
        </ListGroup>
      </div>
    )
}
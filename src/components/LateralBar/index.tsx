import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import {Button, ListGroup} from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { usePlatform } from '../../context/PlatformContext';
import CitySelect from '../CitySelect';
import StateSelect from '../StateSelect';

import styles from './styles.module.scss'


export default function LateralBar(){
  const {getUserPackage, getAllUserPackage, setPkgs, pkgs} = usePlatform();
  


  async function changePkg (){
    const data = await getAllUserPackage()

    let newData =[]; 

    
  }

  useEffect(()=>{
    changePkg()
  },[])

    return(
      <div className={styles.container}>
        <ListGroup style={{ borderRadius:25}} className="list-group-flush">
            <ListGroup.Item>
              <StateSelect/>
            </ListGroup.Item> 
        </ListGroup>
        
        <ListGroup style={{ borderRadius:25, marginBottom:'2rem' }} className="list-group-flush">
            <ListGroup.Item>
              <CitySelect />
            </ListGroup.Item> 
        </ListGroup>


        <ListGroup style={{overflowY:'scroll', height:'60%'}}>
          <ListGroup.Item style={{textAlign:'center'}}><b>Lista de doações</b></ListGroup.Item>
          <ListGroup.Item key={0} action>pkg.description</ListGroup.Item>
          {pkgs?.map(pkg=>{
            return(
              <ListGroup.Item key={pkg.id} action>{pkg.description}<Button>X</Button></ListGroup.Item>
            )
          })}
        </ListGroup>

        <ListGroup style={{flexDirection:'row', gap:10}}>
          <Button style={{flex:1, backgroundColor:'#009900'}}>Finalizar</Button>
          <Button style={{flex:1, backgroundColor:'#990000'}}>Cancelar</Button>
        </ListGroup>
      </div>
    )
}
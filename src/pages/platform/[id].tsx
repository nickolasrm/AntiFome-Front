import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react';
import Filters from "../../components/Filters";
import { useAuth } from '../../context/AuthContext';

import styles from './styles.module.scss';

import {ListGroup} from 'react-bootstrap';

type informationsTypes ={
  password:string;
  email:string;
  username:string;
  cpf?:string;
  cnpj?:string;
  city:string;
  street:string;
  district:string;
  state:string;
  zipcode:string;
  phone:string;
}

type item ={
  name:string;
  quantity:number;
  priority:number;
}

export default function Dashboard({id}) {
  

  const [informations, setInformations] = useState<informationsTypes>()
  const [content, setContent] = useState<item[]>()
  
  async function getInformmation(){
    const {getWaitDonation, getInstitutions, city, state} = useAuth()
    const data = await getWaitDonation('1')
    const institutions = await getInstitutions('RJ', 'Rio de Janeiro')
    console.log(data)
    setContent(data.data)
    for(let i=0; i < institutions.data.lenght; i++){
      if(institutions.data[i].id==id){
        setInformations(institutions.data[i]) 
        }
      }
    }

    useEffect(()=>{
      getInformmation()
    }, [content, informations])
  

  return (
    <div className={styles.container}>
      <section>
          <Filters />
      </section>

      <body className={styles.content}>
        <h1>Nome da ONG {id}</h1>

        <div className={styles.address}>
          <h1>Endereço</h1>
          <span>
            <p>{`Rua: ${informations?.street}`}</p>
            <p>{`Cidade: ${informations?.city}`}</p>
            <p>{`Bairro: ${informations?.district}`}</p>
            <p>{`Estado: ${informations?.state}`}</p>
            <p>{`CEP: ${informations?.zipcode}`}</p>
            <p>{`Telefone: ${informations?.phone}`}</p>
            <p>{`CNPJ: ${informations?.cnpj}`}</p>
          </span> 
        </div>
        <div className={styles.items}>
        <ListGroup as="ul">

        {
        content?.map(content=>{
          return(
            <ListGroup.Item as="li">
              {content.name+' '+ content.quantity +' '+ content.priority + (<input type='number' min={1} max={content.quantity}/>)}
            </ListGroup.Item>
          )
        })
        }
      
      </ListGroup>
        </div>
      </body>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
 
  return {
    props: {
      id,

    }
  }
};

/*
<span>
    <h1>Lista de Items</h1>

    <p>{id} <button>+</button> {id} <button>-</button></p>
</span>

*/
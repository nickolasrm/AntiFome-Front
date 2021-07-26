import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react';
import Filters from "../../components/Filters";
import { useAuth } from '../../context/AuthContext';
import styles from './ong.module.scss'


import {ListGroup} from 'react-bootstrap';

type informationsTypes ={
  city:string;
  cpfCnpj:string;
  id:number;
  neighborhood:string;
  phone:string;
  state:string;
  street:string;
  username:string;
  zip:string;
}

type item ={
  id: number;
  description:string;
  user:number; 
  quantity: number;
  donationFinished: boolean;
}


export default function Dashboard({id}) {
  const {getWaitDonation, getInstitutions, city, state} = useAuth()
  const [informations, setInformations] = useState<informationsTypes>()
  const [content, setContent] = useState<item[]>()

  async function getDados(){
    const data = await getWaitDonation(id)
    const result = data.data;

    setContent(result.map(objeto=>{
      return(objeto)
    }))
  }

  async function getContent(){
    const institutions = await getInstitutions(state, city)
    const data = institutions.data;
    console.log(data)

    data.map(objeto=>{
      if(objeto.id == id){
        setInformations(objeto)
      }
    })
  }

  useEffect(()=>{
    getContent()
  }, [])


  useEffect(()=>{
    getDados()
  }, [])

  

  return (
    <div className={styles.container}>
      <section>
          <Filters />
      </section>

      <body className={styles.content}>
        <h1>{informations?.username}</h1>

        <div className={styles.address}>
          <h1>Endereço</h1>
          <span>
            <p>{`Rua: ${informations?.street}`}</p>
            <p>{`Cidade: ${informations?.city}`}</p>
            <p>{`Bairro: ${informations?.neighborhood}`}</p>
            <p>{`Estado: ${informations?.state}`}</p>
            <p>{`CEP: ${informations?.zip}`}</p>
            <p>{`Telefone: ${informations?.phone}`}</p>
            <p>{`CNPJ: ${informations?.cpfCnpj}`}</p>
          </span> 
        </div>
        <div className={styles.items}>
        <ListGroup as="ul">

        {
        content?.map(content=>{
          return(
            <ListGroup.Item as="li">
              {content.description}&ensp;&ensp;&ensp;&ensp;&ensp;{content.quantity}&ensp;&ensp;&ensp;&ensp;&ensp;<input type='number' min={1} max={content.quantity}/>
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
import {useContext} from 'react'

import styles from './styles.module.scss'
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'react-bootstrap';


export default function testPlatform(){
    const{getInstitutions, signInWithApi, createDonation, getAllDonations, getWaitDonation, getCities} = useContext(AuthContext);

    async function getPedidos(){
        //await signInWithApi('test@test.com',"12345678")
        //createDonation({name:'queijo', quantity:20, priority:3})
        //const data = await getAllDonations()
        //const data = await getInstitutions('RJ', 'Rio de janeiro')
        //const data = getWaitDonation('1')
        const data = getCities('RJ');
        console.log(data);

    }

    return(
        <div className={styles.container}>
            <Button onClick={getPedidos}>Teste</Button>
        </div>
    )
}


//<input type="number" id="quantity" name="quantity" min="1" max="5"/>




/*
export async function getServerSideProps(context) {
    const token = Cookies.get('token')


    const data = await api_donations.get('').then(users =>{
        users.data.map(

        )
    })

    return {
      props: {token}, // Will be passed to the page component as props
    }
  }

  */
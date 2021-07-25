import {useContext} from 'react'

import styles from './styles.module.scss'
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'react-bootstrap';


export default function testPlatform(){
    const{getInstitutions, 
        signInWithApi, 
        createDonation, 
        getAllDonations, 
        getWaitDonation, 
        getCities,
        setUserPackage,
        getAllUserPackage,
        getUserPackage,
        deleteUserPackage,
        deleteContentUserPackage
    } = useContext(AuthContext);

    async function getPedidos(){
        //await signInWithApi('test@test.com',"12345678")
        //createDonation({name:'queijo', quantity:20, priority:3})
        //const data = await getAllDonations()
        //const donations = await getWaitDonation('1')
        //const data = await getInstitutions('RJ', 'Rio de janeiro');
        //console.log(data)
        //await setUserPackage({ institution:data.data[0].id, itens:[{id:donations.data.[0].id, quantity:5},{id:donations.data.[0].id, quantity:5}] })
        //const data = getCities('RJ');
        //const packages = await getAllUserPackage();
        //const pkg = await getUserPackage(packages.data[0].id);
        
        //await deleteContentUserPackage(pkg.data[0].id)
        //console.log(pkg)
        
        


        //console.log(pkg)
        //await deleteUserPackage('1')
        
        //console.log(packages)

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
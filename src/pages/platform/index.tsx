import { useEffect, useState } from 'react'
import { api_donations} from '../../services/api'
import Cookies from 'js-cookie';
import OngCard from '../../components/Card';



export default function Platform(){

    async function getPedidos(){

    }

    return(
        <div >
            <section>


                
            </section>

            <body>
                <OngCard items={[{name:'banana', quantity:20}]} priority={2} name='Trafico caridoso'/>
            </body>

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
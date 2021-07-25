import { useEffect, useState } from 'react'
import { api_donations} from '../../services/api'
import Cookies from 'js-cookie';
import OngCard from '../../components/Card';
import Filters from '../../components/Filters';
import CardsContainer from '../../components/CardsContainer';

import styles from './styles.module.scss'



export default function Platform(){

  async function getPedidos() {

  }

  return(
    <div className={styles.container}>
      <section>
          <Filters/>
      </section>

      <CardsContainer />

    </div>
  )
}
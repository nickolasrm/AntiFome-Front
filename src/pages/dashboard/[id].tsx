import { GetServerSideProps } from 'next'
import Filters from "../../components/Filters";

import styles from './styles.module.scss'

export default function Dashboard({id}) {
  return (
    <div className={styles.container}>
      <section>
          <Filters />
      </section>
      <div>
        <h1>Nome da ONG {id}</h1>
        <div>
          <p>Endereço</p>
          <span>
            <p>Rua: Beco do berro, 100</p>
            <p>Cidade: Rio de Janeiro</p>
            <p>Etado: RJ</p>
            <p>CEP: 20000-000</p>
          </span>
          <span>
            <h1>Lista de Items</h1>
          </span>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params
 
  return {
    props: {
      id
    }
  }
};
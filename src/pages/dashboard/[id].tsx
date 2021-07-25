import { GetServerSideProps } from 'next'
import Filters from "../../components/Filters";

import styles from './styles.module.scss'

export default function Dashboard({id}) {

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
            <p>{`Rua: ${id}, ${id}`}</p>

            <p>{`Cidade: ${id}`}</p>

            <p>{`Estado: ${id}`}</p>

            <p>{`CEP: ${id}`}</p>
          </span> 
        </div>

        <div className={styles.items}>
          <span>
            <h1>Lista de Items</h1>

            <p>{id} <button>+</button> {id} <button>-</button></p>
          </span>
        </div>
      </body>
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
import Filters from '../../components/Filters';
import CardsContainer from '../../components/CardsContainer';
import styles from './styles.module.scss'


export default function Platform(){
  return(
    
    <div className={styles.container}>
        <section className={styles.nav}>
          <Filters/>
        </section>

        <CardsContainer className={styles.cardsContent}/>
    </div>
  
  )
}
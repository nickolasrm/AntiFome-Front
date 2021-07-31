import LateralBar from '../../components/LateralBar';
import CardsContainer from '../../components/CardsContainer';
import styles from './styles.module.scss'


export default function Platform(){
  return(
    
    <div className={styles.container}>
        <section className={styles.nav}>
          <LateralBar/>
        </section>

        <CardsContainer className={styles.cardsContent}/>
    </div>
  
  )
}
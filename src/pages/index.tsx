import Filters from "../components/Filters";
import AboutUs from "./aboutus";
import styles from './home.module.scss'

export default function Home() {


  return (
    <div className={styles.container}>
      <Filters/>
      <AboutUs/>
    </div>
  )
}

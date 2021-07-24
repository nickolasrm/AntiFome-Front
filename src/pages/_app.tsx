import NavBar from "../components/NavBar";
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }) {
  return (
  <div>
    <NavBar/>

    <main>
      <Component {...pageProps} />
    </main>
  </div>
  )
}

export default MyApp

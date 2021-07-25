import NavBar from "../components/NavBar";
import 'bootstrap/dist/css/bootstrap.css'
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
  <div>
    <AuthProvider>
      <NavBar/>
      <main>
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  </div>
  )
}

export default MyApp

import NavBar from "../components/NavBar";
import 'bootstrap/dist/css/bootstrap.css'
import { AuthProvider } from "../context/AuthContext";
import { PlatformProvider } from "../context/PlatformContext";

function MyApp({ Component, pageProps }) {
  return (
  <div>
    <AuthProvider>
      <PlatformProvider>
        <NavBar/>
        <main>
          <Component {...pageProps} />
        </main>
      </PlatformProvider>
    </AuthProvider>
  </div>
  )
}

export default MyApp

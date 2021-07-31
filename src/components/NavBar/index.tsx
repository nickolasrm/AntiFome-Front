import Cookies from 'js-cookie';
import { Navbar, Container } from 'react-bootstrap';

export default function NavBar(){
  const name = Cookies.get('name')

    return(
        <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/logo.svg"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Navbar.Brand>Seja bem-vindo {name}</Navbar.Brand>
    
      

        </Container>
      </Navbar>
    )
}
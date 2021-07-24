import { Navbar, Container } from 'react-bootstrap';

export default function NavBar(){
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
        </Container>
      </Navbar>
    )
}
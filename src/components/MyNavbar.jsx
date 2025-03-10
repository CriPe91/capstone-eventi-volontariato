import { Button, Image, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const MyNavbar = () => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Image src="../assets/GIVE-JOY-LOGO.png" />
            GIVE JOY
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Ospedali</Nav.Link>
            <Nav.Link href="#pricing" className="me-2">
              Eventi
            </Nav.Link>
            <Button className="btn signup-btn mb-2 me-1" type="button">
              <p className="m-0">Sign Up</p>
            </Button>
            <Button className="btn login-btn mb-2" type="button">
              <p className="m-0">Login</p>
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;

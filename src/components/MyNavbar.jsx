import { Button, Image, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/GIVE-JOY-LOGO.png";
import { Link, useLocation } from "react-router-dom";

const MyNavbar = () => {
  const location = useLocation();

  return (
    <Navbar id="main-navbar" fixed="top" expand="lg" className="bg-primary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Image src={logo} alt="Give Joy Logo" width={80} height={80} className="me-3 rounded-circle" />
          <span className="fw-semibold text-light fs-2">
            GIVE <Image src="https://cdn-icons-png.flaticon.com/128/7399/7399362.png" width={40} height={40} /> JOY
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "200px" }} navbarScroll>
            <Link className={`nav-link text-light ${location.pathname === "/" ? "active" : ""} fs-5`} to="/">
              Home
            </Link>
            <Link className={`nav-link text-light ${location.pathname === "/ospedali" ? "active" : ""} fs-5`} to="/ospedali">
              Ospedali
            </Link>
            <Link className={`nav-link text-light ${location.pathname === "/eventi" ? "active" : ""} fs-5`} to="/eventi">
              Eventi
            </Link>
          </Nav>

          <div>
            <Button variant="outline-light" className="fw-semibold me-2">
              Sign Up
            </Button>
            <Button variant="light" className="fw-semibold">
              Login
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

import { useState } from "react";
import { Button, Image, Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/LogoGiveJoy.svg";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

const MyNavbar = () => {
  const location = useLocation();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Navbar sticky="top" expand="lg" className="bg-primary">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <Image src={logo} alt="LogoGiveJoy" width={110} height={110} className="me-3 " />
            <span className="fw-semibold text-light fs-2">
              GIVE <Image src="https://cdn-icons-png.flaticon.com/128/7399/7399355.png" width={40} height={40} /> JOY
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
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
              <Button variant="outline-light" className="fw-semibold me-2" onClick={() => setShowSignUp(true)}>
                Sign Up
              </Button>
              <Button variant="outline-light" className="fw-semibold" onClick={() => setShowLogin(true)}>
                Login
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modali */}
      <SignUpModal show={showSignUp} handleClose={() => setShowSignUp(false)} />
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  );
};

export default MyNavbar;

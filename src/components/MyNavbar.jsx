import { useState } from "react";
import { Button, Image, Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/LogoGiveJoy.svg";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, resetToken, resetUser } from "../redux/authSlice";

const MyNavbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const user = useSelector(selectUser); // Recuperiamo l'utente da Redux

  const handleLogout = () => {
    dispatch(resetToken()); // Rimuove il token dal localStorage
    dispatch(resetUser()); // Resetta l'utente nello store
    // Se l'utente è su una pagina admin, lo riporta alla home
    if (location.pathname.startsWith("/backoffice")) {
      window.location.href = "/"; // Forza il reindirizzamento alla home
    }
  };

  return (
    <>
      <Navbar sticky="top" expand="lg" className="bg-primary">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <Image src={logo} alt="LogoGiveJoy" width={110} height={110} className="me-3" />
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

              {/*  Link Profilo visibile solo agli utenti normali */}
              {user && !user.isAdmin && (
                <Link className={`nav-link text-light ${location.pathname === "/profilo" ? "active" : ""} fs-5`} to="/profilo">
                  Profilo
                </Link>
              )}
            </Nav>

            {/* Se l'utente è autenticato, mostriamo il nome e il bottone Logout */}
            {user ? (
              <div className="d-flex align-items-center">
                <span className="text-light fw-semibold fs-5 me-3">👋 Benvenuto, {user.nome}!</span>
                <Button variant="outline-light" className="fw-semibold" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Button variant="outline-light" className="fw-semibold me-2" onClick={() => setShowSignUp(true)}>
                  Sign Up
                </Button>
                <Button variant="outline-light" className="fw-semibold" onClick={() => setShowLogin(true)}>
                  Login
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modali per SignUp e Login */}
      <SignUpModal show={showSignUp} handleClose={() => setShowSignUp(false)} />
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </>
  );
};

export default MyNavbar;

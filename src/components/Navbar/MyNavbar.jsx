import { useState } from "react";
import { Button, Image, Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import SignUpModal from "../SignUpModal";
import LoginModal from "../LoginModal";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, resetToken, resetUser } from "../../redux/authSlice";
import "./MyNavbarCss.css";

const MyNavbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const user = useSelector(selectUser); // Recuperiamo l'utente da Redux
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    dispatch(resetToken()); // Rimuove il token dal localStorage
    dispatch(resetUser()); // Resetta l'utente nello store
  };

  // Metodo : Chiude il toggle al click del link/Torna in cima al cambio pagina
  const handleNavLinkClick = () => {
    setExpanded(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar sticky="top" expand="lg" className="navbar-custom shadow-lg" expanded={expanded}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <Image src="/src/assets/logo_give_joy.gif" width={110} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto  my-lg-0">
              <Link id="navbar-link-custom" className={`nav-link text-light ${location.pathname === "/" ? "active" : ""} `} to="/" onClick={handleNavLinkClick}>
                HOME
              </Link>
              <Link
                id="navbar-link-custom"
                className={`nav-link text-light ${location.pathname === "/ospedali" ? "active" : ""} `}
                to="/ospedali"
                onClick={handleNavLinkClick}
              >
                OSPEDALI
              </Link>
              <Link
                id="navbar-link-custom"
                className={`nav-link text-light ${location.pathname === "/eventi" ? "active" : ""} `}
                to="/eventi"
                onClick={handleNavLinkClick}
              >
                EVENTI
              </Link>
              <Link
                id="navbar-link-custom"
                className={`nav-link text-light ${location.pathname === "/chi-siamo" ? "active" : ""}`}
                to="/chi-siamo"
                onClick={handleNavLinkClick}
              >
                CHI SIAMO
              </Link>

              {/*  Link Profilo visibile solo agli utenti normali */}
              {user && !user.isAdmin && (
                <Link
                  id="navbar-link-custom"
                  className={`nav-link text-light ${location.pathname === "/profilo" ? "active" : ""} `}
                  to="/profilo"
                  onClick={handleNavLinkClick}
                >
                  PROFILO
                </Link>
              )}
            </Nav>

            {/* Se l'utente è autenticato, mostriamo il nome e il bottone Logout */}
            {user ? (
              <div className="d-flex align-items-center">
                <span className="text-light fw-semibold fs-5 me-3">👋 Benvenuto, {user.nome}!</span>
                <Button className="navbar-btn-custom fw-semibold rounded" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Button className="navbar-btn-custom fw-semibold ms-0 me-2 rounded" onClick={() => setShowSignUp(true)}>
                  Sign Up
                </Button>
                <Button className="navbar-btn-custom fw-semibold rounded" onClick={() => setShowLogin(true)}>
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

import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "react-bootstrap-icons";

const Footer = () => {
  const location = useLocation();

  return (
    <Container fluid className="mt-4 bg-primary py-3">
      <Row className="text-center justify-content-center">
        <Col className="text-light">
          <p className="fs-5">😁 Porta un sorriso a chi ne ha più bisogno. ❤️‍🩹</p>
          <p>Unisciti a noi negli ospedali e fai la differenza nella vita di tanti pazienti.</p>
        </Col>
      </Row>

      <Row className="text-center justify-content-center">
        <Col md={6}>
          <nav className="d-flex flex-wrap justify-content-center gap-3">
            <Link className={`nav-link text-light ${location.pathname === "/" ? "active" : ""} fs-5`} to="/">
              Home
            </Link>
            <Link className={`nav-link text-light ${location.pathname === "/ospedali" ? "active" : ""} fs-5`} to="/ospedali">
              Ospedali
            </Link>
            <Link className={`nav-link text-light ${location.pathname === "/eventi" ? "active" : ""} fs-5`} to="/eventi">
              Eventi
            </Link>
            <Link className="nav-link text-light fs-5" to="#contatti">
              Contatti
            </Link>
            <Link className="nav-link text-light fs-5" to="#privacy">
              Privacy Policy
            </Link>
            <Link className="nav-link text-light fs-5" to="#termini">
              Termini di Servizio
            </Link>
          </nav>
        </Col>
      </Row>

      <Row className="text-center mt-3">
        <Col>
          <div className="d-flex justify-content-center gap-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
              <Facebook />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
              <Instagram />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
              <Twitter />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4">
              <Linkedin />
            </a>
          </div>
        </Col>
      </Row>

      <Row className="mt-3 mb-1">
        <Col className="text-center text-light">
          <span>&copy; {new Date().getFullYear()} Give Joy. Tutti i diritti riservati.</span>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;

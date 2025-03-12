import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "react-bootstrap-icons";
import Marquee from "react-fast-marquee";

const Footer = () => {
  const location = useLocation();

  return (
    <Container fluid className="mt-4 pt-3">
      <Row className="text-center justify-content-center mb-3 bg-primary">
        <Col className="text-light">
          <Marquee>
            <p className="fs-5 mb-0 pb-0 ">
              Unisciti a noi negli ospedali e fai la differenza nella vita di tanti pazienti.
              <br />
              <span className="text-emphasis fw-semibold">Porta un sorriso a chi ne ha più bisogno</span>
            </p>
          </Marquee>
        </Col>
      </Row>

      <Row className="text-center justify-content-center mt-3">
        <Col md={6} className="border-top border-2 border-dark">
          <nav className="d-flex flex-wrap justify-content-center gap-2 pt-3">
            <Link className={`nav-link text-dark ${location.pathname === "/" ? "active" : ""}`} to="/">
              Home
            </Link>
            <Link className={`nav-link text-dark ${location.pathname === "/ospedali" ? "active" : ""}`} to="/ospedali">
              Ospedali
            </Link>
            <Link className={`nav-link text-dark ${location.pathname === "/eventi" ? "active" : ""}`} to="/eventi">
              Eventi
            </Link>
            <Link className="nav-link text-dark" to="#contatti">
              Contatti
            </Link>
            <Link className="nav-link text-dark" to="#privacy">
              Privacy Policy
            </Link>
            <Link className="nav-link text-dark" to="#termini">
              Termini di Servizio
            </Link>
          </nav>
        </Col>
      </Row>

      <Row className="text-center">
        <Col>
          <div className="d-flex justify-content-center gap-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="fs-4" style={{ color: "#1877F2" }}>
              <Facebook />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="fs-4" style={{ color: "#E4405F" }}>
              <Instagram />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="fs-4" style={{ color: "#1DA1F2" }}>
              <Twitter />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="fs-4" style={{ color: "#0A66C2" }}>
              <Linkedin />
            </a>
          </div>
        </Col>
      </Row>

      <Row className="mt-3 mb-1">
        <Col className="text-center text-dark">
          <span>&copy; {new Date().getFullYear()} Give Joy. Tutti i diritti riservati.</span>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;

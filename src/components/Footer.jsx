import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "react-bootstrap-icons";
import "../components/FooterCss.css";

const Footer = () => {
  const location = useLocation();

  return (
    <>
      <Container fluid className="">
        <Row className="text-center justify-content-center mb-3 py-3" style={{ backgroundColor: "#3c224d", color: "white" }}>
          <Col className="text-light">
            <h5 className="fs-5 mb-0 pb-0 ">
              Unisciti a noi negli ospedali e fai la differenza nella vita di tanti pazienti.
              <br />
              <span className="text-emphasis fw-semibold">Porta un sorriso a chi ne ha più bisogno</span>
            </h5>
          </Col>
        </Row>

        <Row className="text-center justify-content-center mt-3 pt-3">
          <Col id="link-footer" xs={8} md={7} lg={6} className="border-top border-2 border-dark">
            <nav className="d-flex flex-wrap justify-content-center gap-3 pt-3">
              <Link className={`nav-link  ${location.pathname === "/" ? "active" : ""}`} to="/">
                Home
              </Link>
              <Link className={`nav-link  ${location.pathname === "/ospedali" ? "active" : ""}`} to="/ospedali">
                Ospedali
              </Link>
              <Link className={`nav-link  ${location.pathname === "/eventi" ? "active" : ""}`} to="/eventi">
                Eventi
              </Link>
              <Link className="nav-link " to="#contatti">
                Chi Siamo
              </Link>
              <Link className="nav-link " to="#privacy">
                Privacy Policy
              </Link>
              <Link className="nav-link " to="#termini">
                Termini di Servizio
              </Link>
            </nav>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center text-center pb-3 mt-2">
          <Col xs={8} md={7} lg={6} className="d-flex flex-wrap justify-content-center gap-4 border-bottom border-2 border-dark pb-3">
            <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="fs-2" style={{ color: "#1877F2" }}>
              <Facebook />
            </Link>
            <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="fs-2" style={{ color: "#E4405F" }}>
              <Instagram />
            </Link>
            <Link to="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="fs-2" style={{ color: "#1DA1F2" }}>
              <Twitter />
            </Link>
            <Link to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="fs-2" style={{ color: "#0A66C2" }}>
              <Linkedin />
            </Link>
          </Col>
        </Row>
      </Container>

      <Container fluid style={{ backgroundColor: "#3c224d" }}>
        <Row className="mt-3 py-2">
          <Col className="text-center text-light">
            <span>&copy; {new Date().getFullYear()} Give Joy. Tutti i diritti riservati.</span>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;

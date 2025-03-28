import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner, Button } from "react-bootstrap";
import { http } from "../../shared/utils/http";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import "./OspedaliCss.css";

const Ospedali = () => {
  const [ospedali, setOspedali] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const user = useSelector(selectUser); // Otteniamo i dati dell'utente autenticato

  const getAllOspedali = async () => {
    try {
      const data = await http.getAuth("ospedali");

      setOspedali(data || []);
    } catch (error) {
      console.error("Errore nella fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOspedali();
  }, []);

  return (
    <Container id="ospedali-container" className="mt-5">
      <Row className="mb-3">
        <Col xs={12} md={8}>
          <h1 className="">Ospedali Disponibili</h1>
          <p className="mt-3 text-muted" style={{ maxWidth: "100%", fontSize: "1.05rem" }}>
            Gli ospedali sono luoghi di cura, ma anche di attesa e fragilità. La nostra presenza vuole portare colore, ascolto e leggerezza dove spesso ci sono
            silenzio e preoccupazione. In questa sezione puoi scoprire le strutture in cui operiamo per donare momenti di umanità e sorriso ai piccoli pazienti.
          </p>
        </Col>

        {user?.isAdmin && location.pathname === "/ospedali" && (
          <Col xs={12} md={4} className="d-flex justify-content-md-end justify-content-start align-items-center mt-3 mt-md-0">
            <Link to="/backoffice-ospedali">
              <Button variant="warning" className="fw-semibold">
                🛠️ Gestisci
              </Button>
            </Link>
          </Col>
        )}
      </Row>

      <Row className="mt-4 justify-content-center g-4 mb-4">
        {loading ? (
          <Col className="text-center mt-5">
            <Spinner animation="border" role="status" variant="primary" size="lg">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
            <p className="mt-2 text-primary fw-bold">Caricamento in corso...</p>
          </Col>
        ) : ospedali.length > 0 ? (
          ospedali.map((ospedale) => (
            <Col key={ospedale.id} xs={12} md={6} lg={4} className="d-flex align-items-stretch">
              <Card className="card-ospedali  p-3 mb-4 d-flex flex-column w-100">
                <Card.Img
                  variant="top"
                  src={ospedale.imgOspedale}
                  alt={ospedale.nome}
                  className="rounded"
                  style={{ height: "250px", objectFit: "cover", width: "100%" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="ospedale-title mb-3 fw-bold">{ospedale.nome}</Card.Title>
                  <Card.Text>
                    <p>
                      📍 <strong>Indirizzo:</strong> {ospedale.indirizzo}
                    </p>
                    <p>
                      ✉️ <strong>Email:</strong> {ospedale.email}
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-danger fw-bold">Nessun ospedale disponibile.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Ospedali;

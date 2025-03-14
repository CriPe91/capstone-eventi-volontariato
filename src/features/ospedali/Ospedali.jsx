import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { http } from "../../shared/utils/http";

const Ospedali = () => {
  const [ospedali, setOspedali] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllOspedali = async () => {
    try {
      const response = await http.get("ospedali");

      if (!response.ok) {
        throw new Error("Errore nel caricamento degli ospedali");
      }

      const data = await response.json();

      setOspedali(data || []);
    } catch (error) {
      console.error("Errore nella fetch:", error);
    } finally {
      setLoading(false); // Una volta finita la fetch, disattiviamo il caricamento
    }
  };

  useEffect(() => {
    getAllOspedali();
  }, []);

  return (
    <Container id="ospedali-container" className="mt-5">
      <h1 className="text-center text-primary">Ospedali Disponibili</h1>
      <Row className="mt-4 justify-content-center g-4">
        {loading ? (
          <Col className="text-center mt-5">
            <Spinner animation="border" role="status" variant="primary" size="lg">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
            <p className="mt-2 text-primary fw-bold">Caricamento in corso...</p>
          </Col>
        ) : ospedali.length > 0 ? (
          ospedali.map((ospedale) => (
            <Col key={ospedale.id} xs={12} md={6} lg={4} className="d-flex">
              <Card className="shadow-lg p-3 mb-4 d-flex flex-column h-100">
                {" "}
                {/* ✅ Altezza uniforme */}
                <Card.Img
                  variant="top"
                  src={ospedale.imgOspedale}
                  alt={ospedale.nome}
                  className="rounded"
                  style={{ height: "250px", objectFit: "cover", width: "100%" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary">{ospedale.nome}</Card.Title>
                  <Card.Text>
                    📍 <strong>Indirizzo:</strong> {ospedale.indirizzo} <br />
                    ✉️ <strong>Email:</strong> {ospedale.email}
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

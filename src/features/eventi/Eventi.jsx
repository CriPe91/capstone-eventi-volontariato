import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { http } from "../../shared/utils/http";

const Eventi = () => {
  const [eventi, setEventi] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllEventi = async () => {
    try {
      const response = await http.get("eventi");

      if (!response.ok) {
        throw new Error("Errore nel caricamento degli eventi");
      }

      const data = await response.json();

      setEventi(data.content || []); // Estraggo correttamente gli eventi da content(JSON SU POSTMAN) data.content
    } catch (error) {
      console.error("Errore nella fetch:", error);
    } finally {
      setLoading(false); // Una volta finita la fetch, disattiviamo il caricamento
    }
  };

  useEffect(() => {
    getAllEventi();
  }, []);

  return (
    <Container id="eventi-container" className="mt-5">
      <h1 className="text-center text-primary">Eventi Disponibili</h1>
      <Row className="mt-4 justify-content-center g-4">
        {" "}
        {loading ? (
          <Col className="text-center mt-5">
            <Spinner animation="border" role="status" variant="primary" size="lg">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
            <p className="mt-2 text-primary fw-bold">Caricamento in corso...</p>
          </Col>
        ) : eventi.length > 0 ? (
          eventi.map((evento) => (
            <Col key={evento.id} xs={12} md={6} lg={4} className="d-flex">
              {" "}
              <Card className="shadow-lg p-3 mb-4 d-flex flex-column h-100">
                {" "}
                {/*  Altezza uniforme */}
                <Card.Img
                  variant="top"
                  src={evento.imgEvento}
                  alt={evento.titolo}
                  className="rounded"
                  style={{ height: "250px", objectFit: "cover", width: "100%" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary">{evento.titolo}</Card.Title>
                  <Card.Text>
                    📅 <strong>Data:</strong> {evento.data} <br />
                    🏥 <strong>Ospedale:</strong> {evento.ospedale.nome} <br />
                    📝 <strong>Descrizione:</strong> {evento.descrizione}
                  </Card.Text>
                  <Button variant="primary" className="mt-auto w-100">
                    Prenota Evento
                  </Button>{" "}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-danger fw-bold">Nessun evento disponibile.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Eventi;

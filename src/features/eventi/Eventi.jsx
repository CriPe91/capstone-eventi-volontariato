import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { http } from "../../shared/utils/http";

const Eventi = () => {
  const [eventi, setEventi] = useState([]);

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
    }
  };

  useEffect(() => {
    getAllEventi();
  }, []);

  return (
    <Container id="eventi-container" className="mt-5">
      <h1 className="text-center text-primary">Eventi in Programma</h1>
      <Row xs={1} md={3} lg={3} className="mt-4 justify-content-center">
        {eventi.length > 0 ? (
          eventi.map((evento) => (
            <Col key={evento.id}>
              <Card className="shadow-lg p-3 mb-4 h-90">
                {/* Immagine con altezza fissa */}
                <Card.Img variant="top" src={evento.imgEvento} alt={evento.titolo} className="rounded" style={{ height: "200px", objectFit: "contain" }} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary">{evento.titolo}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    📅 <strong>Data:</strong> {evento.data} <br />
                    🏥 <strong>Ospedale:</strong> {evento.ospedale ? evento.ospedale.nome : "Non disponibile"} <br />
                    📝 <strong>Descrizione:</strong> {evento.descrizione}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">Caricamento in corso...</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Eventi;

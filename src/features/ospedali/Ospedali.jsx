import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { http } from "../../shared/utils/http";

/**const [name, setName] = useState("Mario");
 const changeName = () => {
    setName("cristian");
    console.log(name);
  };**/
/**return (
    <div>
      <button onClick={changeName}>Cambia nome</button>
      <h1>PAGINA OSPEDALI {name}</h1>
    </div>
  );**/

const Ospedali = () => {
  const [ospedali, setOspedali] = useState([]);

  const getAllOspedali = async () => {
    try {
      const response = await http.get("ospedali");

      if (!response.ok) {
        throw new Error("Errore nel caricamento degli ospedali");
      }

      const data = await response.json();
      setOspedali(data); // Imposta direttamente l'array di ospedali
    } catch (error) {
      console.error("Errore nella fetch:", error);
    }
  };

  // Eseguiamo la fetch al caricamento della pagina
  useEffect(() => {
    getAllOspedali();
  }, []);

  return (
    <Container id="ospedali-container" className="mt-5">
      <h1 className="text-center text-primary">Ospedali Disponibili</h1>
      <Row className="mt-4 justify-content-center">
        {ospedali.length > 0 ? (
          ospedali.map((ospedale) => (
            <Col key={ospedale.id} xs={12} md={6} lg={4}>
              <Card className="shadow-lg p-3 mb-4">
                <Card.Img variant="top" src={ospedale.imgOspedale} alt={ospedale.nome} className="rounded" style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
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
            <p className="text-center">Caricamento in corso...</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};
export default Ospedali;

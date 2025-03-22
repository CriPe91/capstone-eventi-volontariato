import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import { http } from "../../shared/utils/http";
import { PersonCircle, Trash } from "react-bootstrap-icons";

const Profilo = () => {
  const user = useSelector(selectUser);

  const [eventiPrenotati, setEventiPrenotati] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titolo, setTitolo] = useState("");
  const [data, setData] = useState("");
  const filtered = eventiPrenotati.filter((evento) => {
    return evento.titolo.toLowerCase().trim().includes(titolo.toLowerCase().trim()) && (!data || evento.data === data);
  });

  useEffect(() => {
    if (!user || user.isAdmin) return; // Solo utenti normali possono accedere

    const getEventiPrenotati = async () => {
      try {
        const data = await http.getAuth(`eventi/prenotati/${user.id}`);
        setEventiPrenotati(data || []);
      } catch (error) {
        console.error("Errore nel recupero degli eventi prenotati:", error);
      } finally {
        setLoading(false);
      }
    };

    getEventiPrenotati();
  }, [user]);

  const handleAnnullaPrenotazione = async (eventoId) => {
    if (!user) return;

    try {
      await http.deleteAuth(`eventi/${eventoId}/annulla/${user.id}`);
      alert(`Prenotazione annullata con successo!`);
      setEventiPrenotati(eventiPrenotati.filter((e) => e.id !== eventoId));
    } catch (error) {
      console.error("Errore nell'annullamento della prenotazione:", error);
      alert("Errore durante l'annullamento. Riprova!");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div className="text-center">
            <PersonCircle size={80} className="text-primary" />
            <h2 className="text-primary mt-3">Profilo Utente</h2>
            <p className="fw-semibold">
              {user?.nome} {user?.cognome}
            </p>
            <p>{user?.email}</p>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs={12}>
          <h4 className="text-primary">Eventi a cui sei prenotato</h4>

          <Row className="mb-3">
            <Col md={5}>
              <Form.Control type="text" placeholder="Cerca per titolo..." value={titolo} onChange={(e) => setTitolo(e.target.value)} />
            </Col>
            <Col md={5}>
              <Form.Control type="date" value={data} onChange={(e) => setData(e.target.value)} />
            </Col>
          </Row>

          {loading ? (
            <div className="text-center mt-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-primary">Caricamento eventi...</p>
            </div>
          ) : filtered.length > 0 ? (
            <Table striped bordered hover responsive="md">
              <thead>
                <tr style={{ backgroundColor: "#d9eaff" }}>
                  <th>Titolo</th>
                  <th>Data</th>
                  <th>Ospedale</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((evento) => (
                  <tr key={evento.id}>
                    <td>{evento.titolo}</td>
                    <td>{evento.data}</td>
                    <td>{evento.ospedale.nome}</td>
                    <td>
                      <Button variant="outline-danger" size="sm" onClick={() => handleAnnullaPrenotazione(evento.id)}>
                        <Trash size={18} /> Annulla
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="warning" className="text-center">
              Nessun evento trovato.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profilo;

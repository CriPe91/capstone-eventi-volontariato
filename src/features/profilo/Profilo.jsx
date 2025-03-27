import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Form, Spinner, Alert, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import { http } from "../../shared/utils/http";
import { PersonCircle, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./ProfiloCss.css";

const Profilo = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const [eventiPrenotati, setEventiPrenotati] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titolo, setTitolo] = useState("");
  const [data, setData] = useState("");

  const [eventoDaAnnullare, setEventoDaAnnullare] = useState(null);
  const [showAnnullaModal, setShowAnnullaModal] = useState(false);
  const [messaggioConferma, setMessaggioConferma] = useState("");
  const [showConfermaModal, setShowConfermaModal] = useState(false);

  const filtered = eventiPrenotati.filter((evento) => {
    return evento.titolo.toLowerCase().trim().includes(titolo.toLowerCase().trim()) && (!data || evento.data === data);
  });

  // Redirect alla home se l'utente non è loggato
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user || user.isAdmin) return;

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

  const handleApriModaleAnnullamento = (evento) => {
    setEventoDaAnnullare(evento);
    setShowAnnullaModal(true);
  };

  const handleConfermaAnnullamento = async () => {
    if (!user || !eventoDaAnnullare) return;

    try {
      await http.deleteAuth(`eventi/${eventoDaAnnullare.id}/annulla/${user.id}`);
      setEventiPrenotati(eventiPrenotati.filter((e) => e.id !== eventoDaAnnullare.id));
      setMessaggioConferma("Prenotazione annullata con successo!");
    } catch (error) {
      console.error("Errore nell'annullamento della prenotazione:", error);
      setMessaggioConferma("Errore durante l'annullamento. Riprova!");
    } finally {
      setShowAnnullaModal(false);
      setShowConfermaModal(true);
      setEventoDaAnnullare(null);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div className="text-center">
            <PersonCircle size={80} className="person-circle" />
            <h2 className=" mt-3">Profilo Utente</h2>
            <p className="fw-semibold">
              {user?.nome} {user?.cognome}
            </p>
            <p>{user?.email}</p>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col xs={12}>
          <h4 className="">Eventi a cui sei prenotato</h4>

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
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="d-flex align-items-center justify-content-center gap-1 w-auto mx-auto px-2 py-1 text-nowrap"
                        onClick={() => handleApriModaleAnnullamento(evento)}
                      >
                        <Trash size={16} />
                        <span className="d-none d-sm-inline">Annulla</span>
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

      {/* Modale di conferma annullamento */}
      <Modal show={showAnnullaModal} onHide={() => setShowAnnullaModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-light">
          <Modal.Title>⚠️ Conferma Annullamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {eventoDaAnnullare && (
            <>
              <p>Sei sicuro di voler annullare la prenotazione per:</p>
              <p>
                <strong>{eventoDaAnnullare.titolo}</strong> il <strong>{eventoDaAnnullare.data}</strong>
                <br />
                presso <strong>{eventoDaAnnullare.ospedale.nome}</strong>?
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAnnullaModal(false)}>
            Torna indietro
          </Button>
          <Button variant="danger" onClick={handleConfermaAnnullamento}>
            Conferma Annullamento
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modale di feedback */}
      <Modal show={showConfermaModal} onHide={() => setShowConfermaModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-light">
          <Modal.Title>✅ Esito Operazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{messaggioConferma}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowConfermaModal(false)}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profilo;

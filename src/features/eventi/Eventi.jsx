import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner, Modal } from "react-bootstrap";
import { http } from "../../shared/utils/http";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import { Link, useLocation } from "react-router-dom";

const Eventi = () => {
  const [eventi, setEventi] = useState([]);
  const [prenotati, setPrenotati] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrenotaModal, setShowPrenotaModal] = useState(false);
  const [eventoSelezionato, setEventoSelezionato] = useState(null);
  const user = useSelector(selectUser);
  const location = useLocation();

  const getAllEventi = async () => {
    try {
      const data = await http.getAuth("eventi");
      setEventi(data.content || []);
    } catch (error) {
      console.error("Errore nella fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPrenotazioniUtente = async () => {
    if (!user || user.isAdmin) return; // Gli admin non vedono le prenotazioni

    try {
      const data = await http.getAuth(`eventi/prenotati/${user.id}`);
      setPrenotati(Array.isArray(data) ? data : []); // Evita il crash della pagina
    } catch (error) {
      console.error("Errore nel recupero delle prenotazioni:", error);
      setPrenotati([]); // Evita il crash in caso di errore
    }
  };

  useEffect(() => {
    getAllEventi(); // Carica tutti gli eventi quando la pagina viene caricata

    if (!user?.isAdmin) {
      getPrenotazioniUtente(); // Gli utenti normali caricano anche le loro prenotazioni
    }
  }, [user, location.pathname]); // Aggiungiamo location.pathname per aggiornare la lista quando cambiamo pagina

  const handleApriModalePrenotazione = (evento) => {
    setEventoSelezionato(evento);
    setShowPrenotaModal(true);
  };

  const handlePrenotazione = async () => {
    if (!user || user.isAdmin) {
      alert("Solo gli utenti normali possono prenotarsi!");
      return;
    }

    try {
      await http.postAuth(`eventi/${eventoSelezionato.id}/prenota/${user.id}`);
      alert(`Prenotazione confermata per ${user.nome} ${user.cognome}!`);
      setPrenotati([...prenotati, eventoSelezionato]); // Aggiorna lo stato
      setShowPrenotaModal(false);
    } catch (error) {
      console.error("Errore nella prenotazione:", error);
      alert("Errore durante la prenotazione. Riprova!");
    }
  };

  const handleAnnullaPrenotazione = async (eventoId) => {
    if (!user || user.isAdmin) return; // Admin non può annullare

    try {
      await http.deleteAuth(`eventi/${eventoId}/annulla/${user.id}`);
      alert(`Prenotazione annullata per ${user.nome} ${user.cognome}!`);
      setPrenotati(prenotati.filter((e) => e.id !== eventoId)); // Rimuove l'evento dalla lista prenotati
    } catch (error) {
      console.error("Errore nell'annullamento della prenotazione:", error);
      alert("Errore durante l'annullamento. Riprova!");
    }
  };

  return (
    <Container id="eventi-container" className="mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-primary">Eventi Disponibili</h1>
        {user?.isAdmin && location.pathname === "/eventi" && (
          <Link to="/backoffice-eventi">
            <Button variant="warning" className="fw-semibold">
              🛠️ Gestisci
            </Button>
          </Link>
        )}
      </div>

      <Row className="mt-4 justify-content-center g-4">
        {loading ? (
          <Col className="text-center mt-5">
            <Spinner animation="border" role="status" variant="primary" size="lg">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
            <p className="mt-2 text-primary fw-bold">Caricamento in corso...</p>
          </Col>
        ) : eventi.length > 0 ? (
          eventi.map((evento) => {
            const isPrenotato = Array.isArray(prenotati) && prenotati.some((e) => e.id === evento.id);

            return (
              <Col key={evento.id} xs={12} md={6} lg={4} className="d-flex">
                <Card className="shadow-lg p-3 mb-4 d-flex flex-column h-100">
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

                    {!!user && !user?.isAdmin && (
                      <Button
                        variant={isPrenotato ? "danger" : "primary"}
                        className="mt-auto w-100"
                        onClick={() => (isPrenotato ? handleAnnullaPrenotazione(evento.id) : handleApriModalePrenotazione(evento))}
                      >
                        {isPrenotato ? "Annulla Prenotazione" : "Prenota Evento"}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col>
            <p className="text-center text-danger fw-bold">Nessun evento disponibile.</p>
          </Col>
        )}
      </Row>

      <Modal show={showPrenotaModal} onHide={() => setShowPrenotaModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>📌 Conferma Prenotazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {eventoSelezionato && (
            <>
              <p>
                <strong>Evento:</strong> {eventoSelezionato.titolo}
              </p>
              <p>
                <strong>Data:</strong> {eventoSelezionato.data}
              </p>
              <p>
                <strong>Ospedale:</strong> {eventoSelezionato.ospedale.nome}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPrenotaModal(false)}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handlePrenotazione}>
            Conferma Prenotazione
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Eventi;

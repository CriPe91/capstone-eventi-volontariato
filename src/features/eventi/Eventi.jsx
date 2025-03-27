import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner, Modal } from "react-bootstrap";
import { http } from "../../shared/utils/http";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import { Link, useLocation } from "react-router-dom";
import "./EventiCss.css";

const Eventi = () => {
  const [eventi, setEventi] = useState([]);
  const [prenotati, setPrenotati] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrenotaModal, setShowPrenotaModal] = useState(false);
  const [eventoSelezionato, setEventoSelezionato] = useState(null);
  const [showAnnullaModal, setShowAnnullaModal] = useState(false);
  const [eventoDaAnnullare, setEventoDaAnnullare] = useState(null);
  const [showConfermaModal, setShowConfermaModal] = useState(false);
  const [messaggioConferma, setMessaggioConferma] = useState("");

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
    if (!user || user.isAdmin) return;

    try {
      const data = await http.getAuth(`eventi/prenotati/${user.id}`);
      setPrenotati(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Errore nel recupero delle prenotazioni:", error);
      setPrenotati([]);
    }
  };

  useEffect(() => {
    getAllEventi();
    if (!user?.isAdmin) {
      getPrenotazioniUtente();
    }
  }, [user, location.pathname]);

  const handleApriModalePrenotazione = (evento) => {
    setEventoSelezionato(evento);
    setShowPrenotaModal(true);
  };

  const handlePrenotazione = async () => {
    if (!user || user.isAdmin) {
      setMessaggioConferma("Solo gli utenti normali possono prenotarsi!");
      setShowConfermaModal(true);
      return;
    }

    try {
      await http.postAuth(`eventi/${eventoSelezionato.id}/prenota/${user.id}`);
      setPrenotati([...prenotati, eventoSelezionato]);
      setMessaggioConferma(`Prenotazione confermata per ${user.nome} ${user.cognome}, controlla la tua casella postale!`);
    } catch (error) {
      console.error("Errore nella prenotazione:", error);
      setMessaggioConferma("Errore durante la prenotazione. Riprova!");
    } finally {
      setShowPrenotaModal(false);
      setShowConfermaModal(true);
    }
  };

  const handleApriModaleAnnullamento = (evento) => {
    setEventoDaAnnullare(evento);
    setShowAnnullaModal(true);
  };

  const handleConfermaAnnullamento = async () => {
    if (!user || user.isAdmin || !eventoDaAnnullare) return;

    try {
      await http.deleteAuth(`eventi/${eventoDaAnnullare.id}/annulla/${user.id}`);
      setPrenotati(prenotati.filter((e) => e.id !== eventoDaAnnullare.id));
      setMessaggioConferma(`Prenotazione annullata per ${user.nome} ${user.cognome}!`);
    } catch (error) {
      console.error("Errore nell'annullamento della prenotazione:", error);
      setMessaggioConferma("Errore durante l'annullamento. Riprova!");
    } finally {
      setShowAnnullaModal(false);
      setEventoDaAnnullare(null);
      setShowConfermaModal(true);
    }
  };

  return (
    <Container id="eventi-container" className="mt-5">
      <Row className="mb-3">
        <Col xs={12} md={8}>
          <h1 className="">Eventi Disponibili</h1>
          <p className="mt-3 text-muted" style={{ maxWidth: "100%", fontSize: "1.05rem" }}>
            Gli eventi rappresentano il cuore pulsante della nostra iniziativa. Non sono solo momenti da vivere, ma vere e proprie esperienze di condivisione,
            creatività, ascolto e affetto che rendono più leggera la permanenza in ospedale. Partecipare a un evento GIVE JOY significa scegliere di esserci con
            il cuore, regalare un sorriso, costruire connessioni autentiche. In questa sezione trovi tutti gli appuntamenti attivi: unisciti a noi per
            trasformare ogni giornata in un'opportunità di umanità.
          </p>
        </Col>

        {user?.isAdmin && location.pathname === "/eventi" && (
          <Col xs={12} md={4} className="d-flex justify-content-md-end justify-content-start align-items-center mt-3 mt-md-0">
            <Link to="/backoffice-eventi">
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
        ) : eventi.length > 0 ? (
          eventi.map((evento) => {
            const isPrenotato = Array.isArray(prenotati) && prenotati.some((e) => e.id === evento.id);

            return (
              <Col key={evento.id} xs={12} md={6} lg={4} className="d-flex">
                <Card className="card-eventi shadow-lg p-3 mb-4 d-flex flex-column h-100">
                  <Card.Img
                    variant="top"
                    src={evento.imgEvento}
                    alt={evento.titolo}
                    className="rounded"
                    style={{ height: "250px", objectFit: "cover", width: "100%" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="eventi-title">{evento.titolo}</Card.Title>
                    <Card.Text>
                      📅 <strong>Data:</strong> {evento.data} <br />
                      🏥 <strong>Ospedale:</strong> {evento.ospedale.nome} <br />
                      📝 <strong>Descrizione:</strong> {evento.descrizione}
                    </Card.Text>

                    {!!user && !user?.isAdmin && (
                      <Button
                        variant={isPrenotato ? "danger" : "primary"}
                        className="mt-auto w-100"
                        onClick={() => (isPrenotato ? handleApriModaleAnnullamento(evento) : handleApriModalePrenotazione(evento))}
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

      {/* Modale di conferma prenotazione */}
      <Modal show={showPrenotaModal} onHide={() => setShowPrenotaModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-light">
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

      {/* Modale di feedback (messaggi di conferma/errore) */}
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

export default Eventi;

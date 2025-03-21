import { useEffect, useState } from "react";
import { Table, Button, Container, Spinner, Modal, Form, Row, Col } from "react-bootstrap";
import { http } from "../../shared/utils/http";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";
import { Link } from "react-router-dom";
import { People } from "react-bootstrap-icons";

const BackOfficeEventi = () => {
  const [eventi, setEventi] = useState([]);
  const [ospedali, setOspedali] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingEvento, setEditingEvento] = useState(null);
  const [newEvento, setNewEvento] = useState({
    titolo: "",
    descrizione: "",
    data: "",
    ospedaleId: "",
    imgEvento: null,
  });
  const [showPrenotati, setShowPrenotati] = useState(false); // Modale per visualizzare prenotati
  const [prenotati, setPrenotati] = useState([]); // Lista utenti prenotati all'evento
  const [eventoCorrente, setEventoCorrente] = useState(null); // Evento selezionato

  const user = useSelector(selectUser);

  const getAllEventi = async () => {
    try {
      const data = await http.getAuth("eventi");
      setEventi(data.content || []);
    } catch (error) {
      console.error("Errore nella fetch eventi:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllOspedali = async () => {
    try {
      const data = await http.getAuth("ospedali");
      setOspedali(data || []);
    } catch (error) {
      console.error("Errore nella fetch ospedali:", error);
    }
  };

  useEffect(() => {
    if (user?.isAdmin) {
      getAllEventi();
      getAllOspedali();
    }
  }, [user]);

  const handleCreateEvento = async () => {
    try {
      const formData = new FormData();
      const jsonBlob = new Blob(
        [
          JSON.stringify({
            titolo: newEvento.titolo,
            descrizione: newEvento.descrizione,
            data: newEvento.data,
            ospedale: { id: newEvento.ospedaleId },
          }),
        ],
        { type: "application/json" }
      );
      formData.append("dati", jsonBlob);

      if (newEvento.imgEvento) {
        formData.append("imgEvento", newEvento.imgEvento);
      }

      await http.postFormDataAuth("eventi/newEvento", formData);
      setShowCreate(false);
      getAllEventi();
    } catch (error) {
      console.error("Errore nella creazione:", error);
    }
  };

  const handleEditEvento = async () => {
    try {
      await http.putAuth(`eventi/${editingEvento.id}`, {
        titolo: editingEvento.titolo,
        descrizione: editingEvento.descrizione,
        data: editingEvento.data,
        ospedale: { id: editingEvento.ospedaleId },
      });

      setShowEdit(false);
      getAllEventi();
    } catch (error) {
      console.error("Errore nella modifica:", error);
    }
  };

  const handleDeleteEvento = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo evento?")) {
      try {
        await http.deleteAuth(`eventi/${id}`);
        getAllEventi();
      } catch (error) {
        console.error("Errore nella cancellazione:", error);
      }
    }
  };

  const handleShowPrenotati = async (evento) => {
    try {
      setEventoCorrente(evento); // Salva l'evento selezionato
      const data = await http.getAuth(`eventi/${evento.id}/prenotati`);
      setPrenotati(data || []); // Imposta i prenotati, evita errori se la risposta è vuota
      setShowPrenotati(true); // Mostra il modale
    } catch (error) {
      console.error("Errore nel recupero degli utenti prenotati:", error);
      setPrenotati([]); // Evita problemi nel rendering
      setShowPrenotati(true);
    }
  };

  return (
    <Container fluid className="mt-5">
      <Row className="d-flex justify-content-between align-items-center mb-4">
        <Col xs={12} md={6}>
          <h1 className="text-primary">Gestione Eventi</h1>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-md-end justify-content-start">
          <Button variant="primary" className="me-2 text-light" onClick={() => setShowCreate(true)}>
            ➕ Aggiungi Evento
          </Button>
          <Link to="/eventi">
            <Button variant="secondary" className="text-light">
              ⬅️ Torna agli Eventi
            </Button>
          </Link>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-primary">Caricamento dati...</p>
        </div>
      ) : (
        <Row>
          <Col xs={12}>
            <div className="table-responsive">
              <Table striped bordered hover responsive="md" className="mt-4">
                <thead>
                  <tr style={{ backgroundColor: "#d9eaff" }}>
                    <th>ID</th>
                    <th>Titolo</th>
                    <th>Descrizione</th>
                    <th>Data</th>
                    <th>Ospedale</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {eventi.map((evento) => (
                    <tr key={evento.id}>
                      <td>{evento.id}</td>
                      <td>{evento.titolo}</td>
                      <td>{evento.descrizione}</td>
                      <td>{evento.data}</td>
                      <td>{evento.ospedale.nome}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="px-2 py-1 d-flex align-items-center"
                            onClick={() => handleShowPrenotati(evento)}
                          >
                            <People className="me-1" /> Prenotati
                          </Button>

                          <Button
                            variant="outline-warning"
                            size="sm"
                            onClick={() => {
                              setEditingEvento(evento);
                              setShowEdit(true);
                            }}
                          >
                            ✏️
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDeleteEvento(evento.id)}>
                            🗑️
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}

      {/* Modale per Creazione Evento */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>➕ Aggiungi Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Titolo</Form.Label>
              <Form.Control type="text" onChange={(e) => setNewEvento({ ...newEvento, titolo: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrizione</Form.Label>
              <Form.Control type="text" onChange={(e) => setNewEvento({ ...newEvento, descrizione: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data</Form.Label>
              <Form.Control type="date" onChange={(e) => setNewEvento({ ...newEvento, data: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Immagine</Form.Label>
              <Form.Control type="file" onChange={(e) => setNewEvento({ ...newEvento, imgEvento: e.target.files[0] })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ospedale</Form.Label>
              <Form.Select onChange={(e) => setNewEvento({ ...newEvento, ospedaleId: e.target.value })}>
                <option value="">Seleziona un ospedale</option>
                {ospedali.map((osp) => (
                  <option key={osp.id} value={osp.id}>
                    {osp.nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="text-light" onClick={handleCreateEvento}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modale per Modifica Evento */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>✏️ Modifica Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Titolo</Form.Label>
              <Form.Control type="text" value={editingEvento?.titolo} onChange={(e) => setEditingEvento({ ...editingEvento, titolo: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                type="text"
                value={editingEvento?.descrizione}
                onChange={(e) => setEditingEvento({ ...editingEvento, descrizione: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data</Form.Label>
              <Form.Control type="date" value={editingEvento?.data} onChange={(e) => setEditingEvento({ ...editingEvento, data: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ospedale</Form.Label>
              <Form.Select value={editingEvento?.ospedale?.id} onChange={(e) => setEditingEvento({ ...editingEvento, ospedale: { id: e.target.value } })}>
                <option value="">Seleziona un ospedale</option>
                {ospedali.map((osp) => (
                  <option key={osp.id} value={osp.id}>
                    {osp.nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="text-light" onClick={handleEditEvento}>
            Modifica
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modale per Utenti Prenotati */}
      <Modal show={showPrenotati} onHide={() => setShowPrenotati(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>👥 Utenti Prenotati {eventoCorrente ? `- ${eventoCorrente.titolo}` : ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {prenotati.length > 0 ? (
            <ul>
              {prenotati.map((utente) => (
                <li key={utente.id}>
                  {utente.nome} {utente.cognome} - {utente.email}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">Nessun utente prenotato a questo evento</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPrenotati(false)}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BackOfficeEventi;

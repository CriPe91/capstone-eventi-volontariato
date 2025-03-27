import { useEffect, useState } from "react";
import { Table, Button, Container, Spinner, Modal, Form, Row, Col } from "react-bootstrap";
import { http } from "../../shared/utils/http";
import { Link, useNavigate } from "react-router-dom";
import { PencilSquare, Trash, Plus, ArrowLeft } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "../../redux/authSlice";

const BackOfficeOspedali = () => {
  const [ospedali, setOspedali] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingOspedale, setEditingOspedale] = useState(null);
  const [newOspedale, setNewOspedale] = useState({ nome: "", indirizzo: "", email: "", imgOspedale: null });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ospedaleDaEliminare, setOspedaleDaEliminare] = useState(null);

  const [showConfermaModal, setShowConfermaModal] = useState(false);
  const [messaggioConferma, setMessaggioConferma] = useState("");

  const isAdmin = useSelector(selectIsAdmin);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin]);

  const getAllOspedali = async () => {
    try {
      const response = await http.get("ospedali");
      const data = await response.json();
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

  const handleCreateOspedale = async () => {
    try {
      const formData = new FormData();
      const jsonBlob = new Blob(
        [
          JSON.stringify({
            nome: newOspedale.nome,
            indirizzo: newOspedale.indirizzo,
            email: newOspedale.email,
          }),
        ],
        { type: "application/json" }
      );
      formData.append("dati", jsonBlob);
      if (newOspedale.imgOspedale) {
        formData.append("imgOspedale", newOspedale.imgOspedale);
      }

      await http.postFormDataAuth("ospedali/newOspedale", formData);
      setShowCreate(false);
      getAllOspedali();
      setMessaggioConferma("Ospedale creato con successo!");
      setShowConfermaModal(true);
    } catch (error) {
      console.error("Errore nella creazione:", error);
    }
  };

  const handleEditOspedale = async () => {
    try {
      await http.putAuth(`ospedali/${editingOspedale.id}`, {
        nome: editingOspedale.nome,
        indirizzo: editingOspedale.indirizzo,
        email: editingOspedale.email,
      });

      setShowEdit(false);
      getAllOspedali();
      setMessaggioConferma("Modifica effettuata con successo!");
      setShowConfermaModal(true);
    } catch (error) {
      console.error("Errore nella modifica:", error);
    }
  };

  const handleApriModaleEliminazione = (ospedale) => {
    setOspedaleDaEliminare(ospedale);
    setShowDeleteModal(true);
  };

  const handleConfermaEliminazione = async () => {
    try {
      await http.deleteAuth(`ospedali/${ospedaleDaEliminare.id}`);
      setShowDeleteModal(false);
      setOspedaleDaEliminare(null);
      getAllOspedali();
      setMessaggioConferma("Ospedale eliminato con successo!");
      setShowConfermaModal(true);
    } catch (error) {
      console.error("Errore nella cancellazione:", error);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      {isAdmin && (
        <Container fluid className="mt-5">
          <Row className="d-flex justify-content-between align-items-center mb-4">
            <Col xs={12} md={6}>
              <h1 className="">Gestione Ospedali</h1>
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-md-end justify-content-start gap-2">
              <Button variant="outline-success" onClick={() => setShowCreate(true)}>
                <Plus className="me-1" size={18} />
                Aggiungi Ospedale
              </Button>
              <Link to="/ospedali">
                <Button variant="outline-warning">
                  <ArrowLeft className="me-1" size={18} />
                  Torna agli Ospedali
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
                        <th>Nome</th>
                        <th>Indirizzo</th>
                        <th>Email</th>
                        <th>Azioni</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ospedali.map((ospedale) => (
                        <tr key={ospedale.id}>
                          <td>{ospedale.id}</td>
                          <td>{ospedale.nome}</td>
                          <td>{ospedale.indirizzo}</td>
                          <td>{ospedale.email}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-warning"
                                size="sm"
                                onClick={() => {
                                  setEditingOspedale(ospedale);
                                  setShowEdit(true);
                                }}
                              >
                                <PencilSquare size={18} />
                              </Button>
                              <Button variant="outline-danger" size="sm" onClick={() => handleApriModaleEliminazione(ospedale)}>
                                <Trash size={18} />
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

          {/* Modale Creazione */}
          <Modal show={showCreate} onHide={() => setShowCreate(false)} centered>
            <Modal.Header closeButton className="bg-primary text-light">
              <Modal.Title>➕ Aggiungi Ospedale</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" onChange={(e) => setNewOspedale({ ...newOspedale, nome: e.target.value })} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Indirizzo</Form.Label>
                  <Form.Control type="text" onChange={(e) => setNewOspedale({ ...newOspedale, indirizzo: e.target.value })} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" onChange={(e) => setNewOspedale({ ...newOspedale, email: e.target.value })} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Immagine</Form.Label>
                  <Form.Control type="file" onChange={(e) => setNewOspedale({ ...newOspedale, imgOspedale: e.target.files[0] })} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" className="text-light" onClick={handleCreateOspedale}>
                Salva
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modale Modifica */}
          <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
            <Modal.Header closeButton className="bg-primary text-light">
              <Modal.Title>✏️ Modifica Ospedale</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" value={editingOspedale?.nome} onChange={(e) => setEditingOspedale({ ...editingOspedale, nome: e.target.value })} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Indirizzo</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingOspedale?.indirizzo}
                    onChange={(e) => setEditingOspedale({ ...editingOspedale, indirizzo: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={editingOspedale?.email}
                    onChange={(e) => setEditingOspedale({ ...editingOspedale, email: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" className="text-light" onClick={handleEditOspedale}>
                Modifica
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modale Eliminazione */}
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
            <Modal.Header closeButton className="bg-primary text-light">
              <Modal.Title>⚠️ Conferma Eliminazione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {ospedaleDaEliminare && (
                <>
                  <p>Sei sicuro di voler eliminare l'ospedale:</p>
                  <p>
                    <strong>{ospedaleDaEliminare.nome}</strong> – {ospedaleDaEliminare.indirizzo} - {ospedaleDaEliminare.email}
                  </p>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Annulla
              </Button>
              <Button variant="danger" onClick={handleConfermaEliminazione}>
                Elimina
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modale Conferma Operazione */}
          <Modal show={showConfermaModal} onHide={() => setShowConfermaModal(false)} centered>
            <Modal.Header closeButton className="bg-primary text-light">
              <Modal.Title>✅ Operazione completata</Modal.Title>
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
      )}
    </>
  );
};

export default BackOfficeOspedali;

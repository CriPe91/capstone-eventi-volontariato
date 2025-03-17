import { useEffect, useState } from "react";
import { Table, Button, Container, Spinner, Modal, Form } from "react-bootstrap";
import { http } from "../../shared/utils/http";
import { Link } from "react-router-dom";

const BackOfficeOspedali = () => {
  const [ospedali, setOspedali] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingOspedale, setEditingOspedale] = useState(null);
  const [newOspedale, setNewOspedale] = useState({ nome: "", indirizzo: "", email: "", imgOspedale: null });

  // Funzione per ottenere tutti gli ospedali
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
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOspedali();
  }, []);

  // Funzione per creare un nuovo ospedale
  const handleCreateOspedale = async () => {
    try {
      const formData = new FormData();
      formData.append("dati", JSON.stringify({ nome: newOspedale.nome, indirizzo: newOspedale.indirizzo, email: newOspedale.email }));
      if (newOspedale.imgOspedale) {
        formData.append("imgOspedale", newOspedale.imgOspedale);
      }

      const response = await http.post("ospedali/newOspedale", formData, { headers: { "Content-Type": "multipart/form-data" } });

      if (!response.ok) {
        throw new Error("Errore nella creazione dell'ospedale");
      }

      setShowCreate(false);
      getAllOspedali();
    } catch (error) {
      console.error("Errore nella creazione:", error);
    }
  };

  // Funzione per modificare un ospedale
  const handleEditOspedale = async () => {
    try {
      const response = await http.put(`ospedali/${editingOspedale.id}`, {
        nome: editingOspedale.nome,
        indirizzo: editingOspedale.indirizzo,
        email: editingOspedale.email,
      });

      if (!response.ok) {
        throw new Error("Errore nella modifica dell'ospedale");
      }

      setShowEdit(false);
      getAllOspedali();
    } catch (error) {
      console.error("Errore nella modifica:", error);
    }
  };

  // Funzione per eliminare un ospedale
  const handleDeleteOspedale = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo ospedale?")) {
      try {
        const response = await http.delete(`ospedali/${id}`);

        if (!response.ok) {
          throw new Error("Errore nell'eliminazione dell'ospedale");
        }

        getAllOspedali();
      } catch (error) {
        console.error("Errore nella cancellazione:", error);
      }
    }
  };

  return (
    <Container className="mt-5">
      {/* Titolo e pulsante per tornare alla pagina ospedali */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Gestione Ospedali</h1>
        <div>
          <Button variant="info" className="me-2 text-light" onClick={() => setShowCreate(true)}>
            ➕ Aggiungi Ospedale
          </Button>
          <Link to="/ospedali">
            <Button variant="info" className="text-light">
              ⬅️ Torna agli Ospedali
            </Button>
          </Link>
        </div>
      </div>

      {/* Se i dati sono in caricamento, mostra Spinner */}
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-primary">Caricamento dati...</p>
        </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr style={{ backgroundColor: "#1da1f2" }}>
              {" "}
              <th>ID</th>
              <th>Nome</th>
              <th>Indirizzo</th>
              <th>Email</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {ospedali.map((ospedale) => (
              <tr key={ospedale.id} className="bg-primary">
                <td>{ospedale.id}</td>
                <td>{ospedale.nome}</td>
                <td>{ospedale.indirizzo}</td>
                <td>{ospedale.email}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        setEditingOspedale(ospedale);
                        setShowEdit(true);
                      }}
                    >
                      ✏️
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteOspedale(ospedale.id)}>
                      🗑️
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modale per Creazione Ospedale */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)} centered>
        <Modal.Header closeButton>
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
          <Button variant="info" className="text-light" onClick={handleCreateOspedale}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modale per Modifica Ospedale */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>✏️ Modifica Ospedale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" value={editingOspedale?.nome} onChange={(e) => setEditingOspedale({ ...editingOspedale, nome: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" className="text-light" onClick={handleEditOspedale}>
            Modifica
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BackOfficeOspedali;

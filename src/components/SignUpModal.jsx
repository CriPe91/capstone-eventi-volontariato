import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SignUpModal = ({ show, handleClose }) => {
  const initialFormState = { nome: "", cognome: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // Reset dei campi quando il modale si chiude
  useEffect(() => {
    if (!show) setFormData(initialFormState);
  }, [show]);

  const validate = () => {
    let newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = "Il nome è obbligatorio.";
    if (!formData.cognome.trim()) newErrors.cognome = "Il cognome è obbligatorio.";
    if (formData.email.length < 5 || formData.email.length > 40) newErrors.email = "L'email deve avere tra 5 e 40 caratteri.";
    if (formData.password.length < 3 || formData.password.length > 20) newErrors.password = "La password deve avere tra 3 e 20 caratteri.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setFormData(initialFormState); // Resetta i campi dopo l'invio
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary text-light">
        <Modal.Title>Registrati</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            {errors.nome && <p className="text-danger">{errors.nome}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cognome</Form.Label>
            <Form.Control type="text" name="cognome" value={formData.cognome} onChange={handleChange} required />
            {errors.cognome && <p className="text-danger">{errors.cognome}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </Form.Group>

          <Button variant="primary" type="submit">
            Registrati
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;

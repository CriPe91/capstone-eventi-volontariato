import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { http } from "../shared/utils/http";
import { useDispatch } from "react-redux";
import { autoLogin, setToken } from "../redux/authSlice";

const LoginModal = ({ show, handleClose }) => {
  const initialFormState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  // Reset dei campi quando il modale si chiude
  useEffect(() => {
    if (!show) setFormData(initialFormState);
  }, [show]);

  const validate = () => {
    let newErrors = {};
    if (formData.email.length < 5 || formData.email.length > 40) newErrors.email = "L'email deve avere tra 5 e 40 caratteri.";
    if (formData.password.length < 3 || formData.password.length > 20) newErrors.password = "La password deve avere tra 3 e 20 caratteri.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
      /* debugger; */
      const response = await http.post("user/login", formData);
      if (!response.ok) {
        throw new Error("Errore nel caricamento");
      }
      const data = await response.json();

      console.log(data);

      dispatch(setToken(data.token));
      dispatch(autoLogin());
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary text-light">
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
            Accedi
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./components/Footer";
import MyNavbar from "./components/Navbar/MyNavbar";
import { useDispatch } from "react-redux";
import { autoLogin } from "./redux/authSlice";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./features/home/HomePage";
import Ospedali from "./features/ospedali/Ospedali";
import Eventi from "./features/eventi/Eventi";
import BackOfficeOspedali from "./features/GestionaliAdmin/BackOfficeOspedali";
import BackOfficeEventi from "./features/GestionaliAdmin/BackOfficeEventi";
import Profilo from "./features/profilo/Profilo";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ospedali" element={<Ospedali />} />
        <Route path="/eventi" element={<Eventi />} />
        <Route path="/backoffice-ospedali" element={<BackOfficeOspedali />} />
        <Route path="/backoffice-eventi" element={<BackOfficeEventi />} />
        <Route path="/profilo" element={<Profilo />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

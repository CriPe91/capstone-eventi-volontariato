import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./components/Footer";
import MyNavbar from "./components/MyNavbar";
import { useDispatch, useSelector } from "react-redux";
import { selectInit, setInit } from "./redux/authSlice";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./features/home/HomePage";
import Ospedali from "./features/ospedali/Ospedali";
import Eventi from "./features/eventi/Eventi";

function App() {
  const init = useSelector(selectInit);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInit(true));
  }, []);
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ospedali" element={<Ospedali />} />
        <Route path="/eventi" element={<Eventi />} />
      </Routes>
      init: {JSON.stringify(init)}
      <Footer />
    </BrowserRouter>
  );
}

export default App;

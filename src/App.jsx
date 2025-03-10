import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./components/Footer";
import MyNavbar from "./components/MyNavbar";
import { useDispatch, useSelector } from "react-redux";
import { selectInit, setInit } from "./redux/authSlice";
import { useEffect } from "react";

function App() {
  const init = useSelector(selectInit);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInit(true));
  }, []);
  return (
    <>
      <MyNavbar />
      init: {JSON.stringify(init)}
      <Footer />
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Ospedali = () => {
  const [name, setName] = useState("Mario");
  const changeName = () => {
    setName("cristian");
    console.log(name);
  };
  useEffect(() => {
    fetch("http://localhost:8080/ospedali").then((response) => {
      debugger;
      Customizer.withDefaults();
    });
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={changeName}>Cambia nome</button>
      <h1>PAGINA OSPEDALI {name}</h1>
    </div>
  );
};
export default Ospedali;

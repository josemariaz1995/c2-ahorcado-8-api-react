import { useCallback, useEffect, useState } from "react";
import { Ahorcado } from "./Components/Ahorcado";
import { Mensaje } from "./Components/Mensaje";

function App() {
  const urlApi = "http://localhost:3001/palabras";
  const [palabraSecreta, setPalabraSecreta] = useState({});
  const [palabra, setPalabra] = useState("");
  /* const nFallos = 0;
  const maxFallos = 11; */

  const getPalabra = useCallback(async (url) => {
    const response = await fetch(url);
    const { lista } = await response.json();

    setPalabra(getPalabraAleatoria(lista));
  }, []);
  const getPalabraAleatoria = (palabras) => {
    const posicionAleatoria = Math.floor(Math.random() * palabras.length);
    return palabras[posicionAleatoria];
  };
  useEffect(() => getPalabra(urlApi), [getPalabra]);
  console.log(palabra);
  return (
    <>
      <Ahorcado />
      <ul className="palabra"></ul>
      <input type="text" className="constra" maxlength="1" />
      <ul className="letras-usadas"></ul>
      <Mensaje />
    </>
  );
}

export default App;

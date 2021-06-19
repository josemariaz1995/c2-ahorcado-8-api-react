import { useCallback, useEffect, useState } from "react";
import { Ahorcado } from "./Components/Ahorcado";
import { Mensaje } from "./Components/Mensaje";
import { Palabra } from "./Components/Palabra";

function App() {
  const urlApi = "http://localhost:3001/palabras";
  const [palabra, setPalabra] = useState([]);
  const [palabraSecreta, setPalabraSecreta] = useState("");
  const [nFallos, setFallos] = useState(0);
  const [ganar, useGanar] = useState(null);
  const maxFallos = 11;

  const getPalabra = useCallback(async (url) => {
    const response = await fetch(url);
    const { lista } = await response.json();
    setPalabraSecreta(getPalabraAleatoria(lista));
  }, []);

  const getPalabraAleatoria = (palabras) => {
    const posicionAleatoria = Math.floor(Math.random() * palabras.length);
    return palabras[posicionAleatoria];
  };

  useEffect(() => getPalabra(urlApi), [getPalabra]);

  const anyadirLetras = (e) => {
    setPalabra([...palabra, e.target.value]);
    setTimeout(() => {
      e.target.value = "";
    }, 500);
  };

  return (
    <>
      <Ahorcado numeroFallos={nFallos} />
      <ul className="palabra">
        {palabraSecreta.split("").map((letra, i) => (
          <Palabra key={i} />
        ))}
      </ul>
      <input
        type="text"
        className="constra"
        onChange={anyadirLetras}
        maxLength="1"
      />
      <ul className="letras-usadas"></ul>
      <Mensaje />
    </>
  );
}

export default App;

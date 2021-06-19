import { useCallback, useEffect, useState } from "react";
import { Ahorcado } from "./Components/Ahorcado";
import { Mensaje } from "./Components/Mensaje";
import { Palabra } from "./Components/Palabra";

function App() {
  const urlsApis = {
    apiPalabras: "http://localhost:3001/palabras",
    apiAhorcado: "https://letras-ahorcado.herokuapp.com/letras/",
  };
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

  useEffect(
    () => getPalabra(urlsApis.apiPalabras),
    [urlsApis.apiPalabras, getPalabra]
  );

  const anyadirLetras = (e) => {
    setPalabra([...palabra, e.target.value]);
    setTimeout(() => {
      e.target.value = "";
    }, 500);
  };

  const comprobarLetra = (letra) => {};

  const acierto = (arrayPosiciones) => {};

  const error = (mensaje) => {};

  return (
    <>
      <Ahorcado numeroFallos={nFallos} />
      <ul className="palabra">
        <Palabra palabraSecreta={palabraSecreta} />
      </ul>
      <input
        type="text"
        className="constra"
        onChange={anyadirLetras}
        maxLength="1"
      />
      {/* Al componenete letras usadas le tendremos que pasar un array de letras que el jugador haya usado*/}
      <ul className="letras-usadas"></ul>
      {/* Al componenente Mensaje le tendremos que pasar una variable booleana 
      que nos indique si el jugador ha perdido o ganado y mostrar el mensaje
      de ganar o perder*/}
      <Mensaje />
    </>
  );
}

export default App;

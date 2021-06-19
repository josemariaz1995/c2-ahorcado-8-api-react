import { useCallback, useEffect, useState } from "react";
import { Ahorcado } from "./Components/Ahorcado";
import { Mensaje } from "./Components/Mensaje";
import { Palabra } from "./Components/Palabra";

function App() {
  const urlsApis = {
    apiPalabras: "http://localhost:3001/palabras",
    apiAhorcado: "https://letras-ahorcado.herokuapp.com/letras/",
  };
  const [palabraSecreta, setPalabraSecreta] = useState("");
  const [palabraAdivinar, setPalabraAdivinar] = useState("");
  const [nFallos, setFallos] = useState(0);
  const [letrasUsadas, setLetrasUsadas] = useState([]);
  const [juegoTermiando, setJuegoTerminado] = useState(false);
  const [haGanado, setHaGanado] = useState(false);
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

  useEffect(() => {
    getPalabra(urlsApis.apiPalabras);
  }, [urlsApis.apiPalabras, getPalabra]);

  useEffect(
    () => setPalabraAdivinar(palabraSecreta.replace(/[a-z]/gi, " ")),
    [palabraSecreta]
  );

  const anyadirLetras = (letra) => {
    // setPalabra([...palabra, e.target.value]);
    setTimeout(() => {
      letra = "";
    }, 500);
  };

  //Llamara a la Api del ahorcado pasandole a la URL la palabraSecreta y la letra utilizada, devolvera un objeto
  //que nos dira si ha habido error o acierto
  const comprobarLetra = (letra) => {};

  const acierto = (arrayPosiciones) => {};

  const error = (mensaje) => {};

  return (
    <>
      <Ahorcado numeroFallos={nFallos} />
      <Palabra palabraAdivinar={palabraAdivinar} />
      <input
        type="text"
        className="constra"
        onChange={(e) => anyadirLetras(e.target.value)}
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

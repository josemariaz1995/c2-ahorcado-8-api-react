import { useCallback, useEffect, useState } from "react";
import { Ahorcado } from "./Components/Ahorcado";
import { LetrasUsadas } from "./Components/LetrasUsadas";
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
  const [juegoTerminado, setJuegoTerminado] = useState(false);
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

  useEffect(() => {
    setPalabraAdivinar(palabraSecreta.replace(/[a-z]/gi, " "));
  }, [palabraSecreta]);

  useEffect(() => {
    if (nFallos === maxFallos) {
      setJuegoTerminado(true);
    }
  }, [nFallos]);

  useEffect(() => {
    console.log(palabraAdivinar, palabraSecreta);
    if (palabraSecreta === palabraAdivinar && palabraAdivinar !== "") {
      setHaGanado(true);
      setJuegoTerminado(true);
    }
  }, [palabraAdivinar, palabraSecreta]);

  const anyadirLetras = (e) => {
    comprobarLetra(e, e.target.value.toLowerCase());
  };

  //Llamara a la Api del ahorcado pasandole a la URL la palabraSecreta y la letra utilizada
  //la response devolvera un objeto que nos dira si ha habido error o acierto
  const comprobarLetra = async (e, letra) => {
    const response = await fetch(
      `${urlsApis.apiAhorcado}${palabraSecreta}/${letra}`
    );
    const resultado = await response.json();
    setLetrasUsadas([...letrasUsadas, letra]);
    if (!resultado.error) {
      acierto(resultado.posiciones, letra);
    } else {
      error(resultado.mensaje, letra);
    }
    setTimeout(() => {
      e.target.value = "";
    }, 500);
  };

  //Tiene que substituir los espacios de palabraAdivinar por la letra que le pasamos en las posiciones del array
  const acierto = (arrayPosiciones, letraIntento) => {
    console.log(palabraAdivinar, palabraSecreta);
    setPalabraAdivinar(
      palabraAdivinar
        .split("")
        .map((letra, indice) => {
          if (arrayPosiciones.includes(indice)) {
            return letraIntento;
          }
          return letra;
        })
        .join("")
    );
  };

  //
  const error = (mensaje, letra) => {
    setFallos(nFallos + 1);
  };

  return (
    <>
      <Ahorcado numeroFallos={nFallos} />
      <Palabra palabraAdivinar={palabraAdivinar} />
      <input
        type="text"
        className="constra"
        onChange={anyadirLetras}
        maxLength="1"
        disabled={juegoTerminado}
      />
      {/* Al componenete letras usadas le tendremos que pasar un array de letras que el jugador haya usado*/}
      <ul className="letras-usadas">
        <LetrasUsadas letrasUsadas={letrasUsadas} />
      </ul>
      {/* Al componenente Mensaje le tendremos que pasar una variable booleana 
      que nos indique si el jugador ha perdido o ganado y mostrar el mensaje
      de ganar o perder*/}
      {juegoTerminado === true && <Mensaje resultado={haGanado} />}
    </>
  );
}

export default App;

import { Ahorcado } from "./Components/Ahorcado";
import { Mensaje } from "./Components/Mensaje";

function App() {
  return (
    <>
      <Ahorcado />
      <ul className="palabra"></ul>
      <input type="text" className="letra" maxlength="1" />
      <ul className="letras-usadas"></ul>
      <Mensaje />
    </>
  );
}

export default App;

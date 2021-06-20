export const Mensaje = (props) => {
  let resultadoHtml;
  if (props.resultado === true){
  resultadoHtml= <div className="mensaje ganar">¡Ganaste!</div>
  }else{
    resultadoHtml= <div className="mensaje perder">Ooooh... perdiste</div>
  }
  return resultadoHtml

};

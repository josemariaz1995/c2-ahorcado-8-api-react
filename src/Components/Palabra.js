export const Palabra = (props) => {
  const { palabraSecreta } = props;
  const arrayLetras = palabraSecreta.split("");
  return arrayLetras.map((letra, i) => <li key={i}></li>);
};

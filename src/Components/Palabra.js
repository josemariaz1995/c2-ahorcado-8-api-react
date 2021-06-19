export const Palabra = (props) => {
  const { palabraSecreta } = props;
  const arrayLetras = palabraSecreta.split("");
  return arrayLetras.map((letra) => <li></li>);
};

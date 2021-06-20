export const LetrasUsadas = (props) => {
  const { letrasUsadas } = props;
  return letrasUsadas
    .filter((letra, i, arrayLetras) => arrayLetras.indexOf(letra) === i)
    .map((letra) => <li key={letra}>{letra}</li>);
};

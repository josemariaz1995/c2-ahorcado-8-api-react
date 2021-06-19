export const Palabra = (props) => {
  const { palabraAdivinar } = props;

  return (
    <ul className="palabra">
      {[...palabraAdivinar].map((letra, indice) => (
        <li key={indice}>{letra.toUpperCase()}</li>
      ))}
    </ul>
  );
};

export const Ahorcado = (props) => {
  const { numeroFallos } = props;
  const listadoStages = [
    <line
      key={"stage1"}
      className="stage1"
      x1="16"
      y1="80"
      x2="32"
      y2="80"
    ></line>,
    <line
      key={"stage2"}
      className="stage2"
      x1="24"
      y1="80"
      x2="24"
      y2="16"
    ></line>,
    <line
      key={"stage3"}
      className="stage3"
      x1="21"
      y1="16"
      x2="60"
      y2="16"
    ></line>,
    <line
      key={"stage4"}
      className="stage4"
      x1="24"
      y1="24"
      x2="32"
      y2="16"
    ></line>,
    <line
      key={"stage5"}
      className="stage5"
      x1="56"
      y1="16"
      x2="56"
      y2="28"
    ></line>,
    <circle
      key={"stage6"}
      className="stage6"
      cx="56"
      cy="34"
      r="6"
      fill="#bee5eb"
    ></circle>,
    <line
      key={"stage7"}
      className="stage7"
      x1="56"
      y1="40"
      x2="56"
      y2="56"
    ></line>,
    <line
      key={"stage8"}
      className="stage8"
      x1="44"
      y1="46"
      x2="56"
      y2="40"
    ></line>,
    <line
      key={"stage9"}
      className="stage9"
      x1="68"
      y1="46"
      x2="56"
      y2="40"
    ></line>,
    <line
      key={"stage10"}
      className="stage10"
      x1="50"
      y1="70"
      x2="56"
      y2="56"
    ></line>,
    <line
      key={"stage11"}
      className="stage11"
      x1="62"
      y1="70"
      x2="56"
      y2="56"
    ></line>,
  ];

  const pintarStages = () => {
    const stages = [];
    for (let indice = 0; indice < numeroFallos; indice++) {
      stages.push(listadoStages[indice]);
    }
    return stages;
  };

  return (
    <div className="ahorcado">
      <svg id="hangman" viewBox="0 0 96 96" width="300" height="300">
        {pintarStages()}
      </svg>
    </div>
  );
};

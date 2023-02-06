import "./cards.css";
type CardProps = {
  card: Pokemon;
  onClick: (card: Pokemon) => void;
  // disabled: boolean;
};
type Pokemon = {
  id?: number;
  hp: number;
  name: string;
  sprite: string;
  isFlipped: boolean;
  isMatched: boolean;
};
export const Cards = ({ card, onClick }: CardProps) => {
  const className = `${card.isFlipped ? `active` : ``}`;
  const handleClick = () => {
    onClick(card);
    console.log(card.isFlipped);
  };
  return (
    <>
      <div className="flip-card " onClick={handleClick}>
        <div className={`flip-card-inner ${className}`}>
          <div className="flip-card-front">
            <img src="" alt="back of card" />
          </div>
          <div className="flip-card-back">
            <p className="hp">
              <span>HP </span>
              {card.hp}
            </p>
            <img className="poke-img" src={card.sprite} />
            <h2 className="poke-name">{card.name}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

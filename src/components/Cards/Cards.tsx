import { Color } from "../../types/Color";
import { PokemonCard } from "../../types/pokemonCard";
import img from "../../assets/2.png";
import "./Cards.css";

type CardProps = {
  card: PokemonCard;
  onClick: (card: PokemonCard) => void;
  // disabled: boolean;
};

export const Cards = ({ card, onClick }: CardProps) => {
  const className = `${card.isFlipped ? `active` : ``}`;

  const handleBackground = (type: any) => {
    const typeColor = Color.find((item) => item.key === type);
    return `radial-gradient(circle at 50% 0%, ${typeColor?.value} 36%, #fefefe 36.5%)`;
  };

  const handleTypes = (type: any) => {
    const typeColor = Color.find((item) => item.key === type);
    return typeColor?.value;
  };

  const handleClick = () => {
    onClick(card);
  };
  return (
    <>
      <div className="flip-card " onClick={handleClick}>
        <div className={`flip-card-inner ${className}`}>
          <div className="flip-card-front">
            <img draggable="false" src={img} alt="" />
          </div>
          <div
            className="flip-card-back"
            style={{
              background: handleBackground(card.types[0].type.name),
              backgroundPosition: "center",
              backgroundSize: "400px 250px",
            }}
          >
            <p className="hp">
              <span>HP </span>
              {card.hp}
            </p>
            <img draggable="false" className="poke-img" src={card.sprite} />
            <h2 className="poke-name">{card.name}</h2>
            <div className="types">
              {card.types.map((item, index) => (
                <span
                  key={index}
                  className="types-span"
                  style={{ backgroundColor: handleTypes(item.type.name) }}
                >
                  {item.type.name}
                </span>
              ))}
            </div>
            <div className="stats">
              <div>
                <h3>{card.attack}</h3>
                <p>Attack</p>
              </div>
              <div>
                <h3>{card.deffence}</h3>
                <p>Defense</p>
              </div>
              <div>
                <h3>{card.speed}</h3>
                <p>Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

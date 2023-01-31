import { Pokemon } from "../../types/Pokemon";
import { Color } from "../../types/Color";

import "./CardDisplay.css";

// sprites.other.dream_world.front_default
export const Card = ({ name, stats, sprites, types }: Pokemon) => {
  const handleTypes = (type: any) => {
    const typeColor = Color.find((item) => item.key === type);
    return typeColor?.value;
  };

  const handleBackground = (type: any) => {
    const typeColor = Color.find((item) => item.key === type);
    return `radial-gradient(circle at 50% 0%, ${typeColor?.value} 36%, #fefefe 36.5%)`;
  };

  return (
    <div
      className="card"
      style={{ background: handleBackground(types[0].type.name) }}
    >
      <p className="hp">
        <span>HP </span>
        {stats[0].base_stat}
      </p>
      <img className="poke-img" src={sprites.other.dream_world.front_default} />
      <h2 className="poke-name">{name}</h2>
      <div className="types">
        {types.map((item, index) => (
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
          <h3>{stats[1].base_stat}</h3>
          <p>Attack</p>
        </div>
        <div>
          <h3>{stats[2].base_stat}</h3>
          <p>Defense</p>
        </div>
        <div>
          <h3>{stats[5].base_stat}</h3>
          <p>Speed</p>
        </div>
      </div>
    </div>
  );
};

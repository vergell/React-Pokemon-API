import { Pokemon } from "../../types/Pokemon";
import { Color } from "../../types/Color";

import "./CardDisplay.css";

// sprites.other.dream_world.front_default
export const Card = ({ data }: Pokemon) => {
  const handleTypes = (type: any) => {
    const typeColor = Color.find((item) => item.key === type);
    return typeColor?.value;
  };

  return (
    <>
      <p className="hp">
        <span>HP </span>
        {data.stats[0].base_stat}
      </p>
      <img
        className="poke-img"
        src={data.sprites.other.dream_world.front_default}
      />
      <h2 className="poke-name">{data.name}</h2>
      <div className="types">
        {data.types.map((item, index) => (
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
          <h3>{data.stats[1].base_stat}</h3>
          <p>Attack</p>
        </div>
        <div>
          <h3>{data.stats[2].base_stat}</h3>
          <p>Defense</p>
        </div>
        <div>
          <h3>{data.stats[5].base_stat}</h3>
          <p>Speed</p>
        </div>
      </div>
    </>
  );
};

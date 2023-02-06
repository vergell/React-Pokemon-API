import { Cards } from "../Cards/Cards";
import { Context } from "../Context";

export const Container = () => {
  const { loading, pokemonCards, handleClick } = Context();

  if (loading) {
    return (
      <div>
        <h1>loading</h1>
      </div>
    );
  }

  return (
    <div className="container">
      {pokemonCards.map((pokemonCard, index) => (
        <Cards card={pokemonCard} key={index} onClick={handleClick}></Cards>
      ))}
    </div>
  );
};

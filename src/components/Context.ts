import { useEffect, useState } from "react";
import { useGetData } from "../hooks/useGetData";
import { PokemonCard } from "../types/pokemonCard";

export const Context = () => {
  const { response, loading } = useGetData();
  const [pokemonCards, setPokemonCards] = useState<PokemonCard[]>([]);
  const [clickedCards, setClickedCards] = useState<PokemonCard[]>([]);
  const [start, setStart] = useState(false);

  useEffect(() => {
    handlePokemons();
  }, [response]);

  const flipCardBYID = (id: number | undefined, isFlipped: boolean) => {
    setPokemonCards((prev) =>
      prev.map((card) => {
        if (card.id === id) {
          card.isFlipped = isFlipped;
        }
        return card;
      })
    );
  };

  const deleteClickedCards = () => {
    setClickedCards((prev) =>
      prev.filter((_, index) => index !== 0 && index !== 1)
    );
  };

  useEffect(() => {
    if (clickedCards.length > 1) {
      console.log("picked 2 cards");
      if (clickedCards[0].name === clickedCards[1].name) {
        flipCardBYID(clickedCards[0].id, true);
        flipCardBYID(clickedCards[1].id, true);
        deleteClickedCards();
        console.log("true");
      } else {
        setTimeout(() => {
          flipCardBYID(clickedCards[0].id, false);
          flipCardBYID(clickedCards[1].id, false);
        }, 700);
        deleteClickedCards();
        console.log("deleted");
      }
    }
  }, [clickedCards]);

  const handleClick = (card: PokemonCard) => {
    if (!card.isFlipped) {
      flipCardBYID(card.id, true);
      setClickedCards((prevCard) => [...prevCard, card]);
    }
  };

  const handlePokemons = () => {
    let temp: PokemonCard[] = [];
    response.map((value, id) => {
      temp.push({
        id: id,
        name: value.data.name,
        hp: value.data.stats[0].base_stat,
        sprite: value.data.sprites.other.dream_world.front_default,
        types: value.data.types,
        attack: value.data.stats[1].base_stat,
        deffence: value.data.stats[2].base_stat,
        speed: value.data.stats[5].base_stat,
        isFlipped: false,
        isMatched: false,
      });
      temp.push({
        id: id + 12,
        name: value.data.name,
        hp: value.data.stats[0].base_stat,
        sprite: value.data.sprites.other.dream_world.front_default,
        types: value.data.types,
        attack: value.data.stats[1].base_stat,
        deffence: value.data.stats[2].base_stat,
        speed: value.data.stats[5].base_stat,
        isFlipped: false,
        isMatched: false,
      });
    });

    for (let i = temp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tempo = temp[i];
      temp[i] = temp[j];
      temp[j] = tempo;
    }
    setPokemonCards(temp);
  };
  const value = {
    loading,
    pokemonCards,
    handleClick,
  };
  return value;
};

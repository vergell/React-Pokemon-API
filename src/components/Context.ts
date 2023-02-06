import { useEffect, useState } from "react";
import { useGetData } from "../hooks/useGetData";
import { PokemonCard } from "../types/pokemonCard";

export const Context = () => {
  const { response, loading } = useGetData();
  const [pokemonCards, setPokemonCards] = useState<PokemonCard[]>([]);
  const [choiceOne, setChoiceOne] = useState<PokemonCard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<PokemonCard | null>(null);
  const [disabledCards, setDisabledCards] = useState<boolean>(false);

  useEffect(() => {
    handlePokemons();
  }, [response]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabledCards(true);
      if (choiceOne.name === choiceTwo.name) {
        setPokemonCards((prevCards) =>
          prevCards.map((card) => {
            if (card.id === choiceOne?.id || card.id === choiceTwo?.id) {
              card.isMatched = true;
              card.isFlipped = true;
            }
            return card;
          })
        );
        resetTurn();
      } else {
        setTimeout(() => {
          setPokemonCards((prevCard) => {
            return prevCard.map((card) => {
              if (!card.isMatched) {
                return { ...card, isFlipped: false };
              }
              return card;
            });
          });
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabledCards(false);
  };

  const handlePokemons = () => {
    let temp: PokemonCard[] = [];
    response.map((value, id) => {
      temp.push({
        id: id,
        name: value.data.name,
        hp: value.data.stats[0].base_stat,
        sprite: value.data.sprites.other.dream_world.front_default,
        isFlipped: false,
        isMatched: false,
      });
      temp.push({
        id: id + 12,
        name: value.data.name,
        hp: value.data.stats[0].base_stat,
        sprite: value.data.sprites.other.dream_world.front_default,
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
  const handleClick = (card: PokemonCard) => {
    if (!disabledCards) {
      setPokemonCards((prevCard) =>
        prevCard.map((c) => {
          if (c.id === card.id) {
            card.isFlipped = true;
            return card;
          }
          return c;
        })
      );
    }

    if (choiceOne) {
      if (choiceOne.id !== card.id) setChoiceTwo(card);
    } else {
      if (choiceOne === null) {
        setChoiceOne(card);
      }
    }
    // choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const value = {
    loading,
    pokemonCards,
    handleClick,
  };
  return value;
};

import { useState, useEffect } from "react";
import { PokemonAPI } from "../types/PokemonAPI";
import axios from "axios";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomNumbers(min: number, max: number, count: number): number[] {
  let uniqueNumbers = new Set<number>();
  while (uniqueNumbers.size < count) {
    let randomNum = getRandomInt(max - min + 1) + min;
    uniqueNumbers.add(randomNum);
  }
  return Array.from(uniqueNumbers);
}

export const useGetData = () => {
  const cardIds = getRandomNumbers(1, 500, 6);

  const [response, setResponse] = useState<PokemonAPI[]>([]);
  const [loading, setLoading] = useState(true);

  const requests = cardIds.map((id) =>
    axios(`https://pokeapi.co/api/v2/pokemon/` + id)
  );

  const fetchData = async () => {
    Promise.all(requests)
      .then((res) => {
        setResponse(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { response, loading };
};

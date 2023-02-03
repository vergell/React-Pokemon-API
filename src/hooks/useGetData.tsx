import { useState, useEffect } from "react";
import axios from "axios";
import { Pokemon } from "../types/Pokemon";

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

type Props = { numberOfCards: number };
export const useGetData = ({ numberOfCards }: Props) => {
  const cardIds = getRandomNumbers(1, 500, numberOfCards);

  const [response, setResponse] = useState<any>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const request = axios(`https://pokeapi.co/api/v2/pokemon/` + 2);
  const request2 = axios(`https://pokeapi.co/api/v2/pokemon/` + 2);

  const requests = cardIds.map((id) =>
    axios(`https://pokeapi.co/api/v2/pokemon/` + id)
  );

  const fetchData = () => {
    Promise.all(requests)
      .then((res) => {
        setResponse(res);
      })
      .finally(() => {
        setLoading(false);
      });

    // Promise.all(
    //   cardIds.map((cardId) => {
    //     axios.get(`https://pokeapi.co/api/v2/pokemon/` + cardId).then((res) => {
    //       console.log(res);
    //     });
    //   })
    // )
    //   .catch((err) => {
    //     setError(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //     console.log(response);
    //   });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { response, error, loading };
};

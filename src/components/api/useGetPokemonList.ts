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

type PokemonAPI = {
  data: {
    name: string;

    stats: {
      base_stat: number;
    }[];

    types: {
      type: {
        name: string;
      };
    }[];

    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
  };
};

export const useGetPokemonList = async () => {
  const cardIds = getRandomNumbers(1, 500, 6);
  const requests = cardIds.map((id) =>
    axios(`https://pokeapi.co/api/v2/pokemon/` + id)
  );

  const response: PokemonAPI[] = await Promise.all(requests);
  console.log(response);
  return { response };
};

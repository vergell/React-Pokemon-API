export type PokemonCard = {
  id?: number;
  hp: number;
  attack: number;
  deffence: number;
  speed: number;
  name: string;
  sprite: string;
  types: {
    type: {
      name: string;
    };
  }[];
  isFlipped: boolean;
  isMatched: boolean;
};

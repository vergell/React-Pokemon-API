export type PokemonAPI = {
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

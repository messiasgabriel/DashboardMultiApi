// Tipo básico de Pokémon na listagem
export interface Pokemon {
    name: string;
    url: string;
}

// Resposta da API ao listar Pokémons
export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

// Detalhes completos de um Pokemon
export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;

    // Sprites (imagens do Pokémon)
    sprites: {
        front_default: string;
        front_shiny: string;
        back_default: string;
        back_shiny: string;
        other: {
        'official-artwork': {
            front_default: string;
        };
        dream_world: {
            front_default: string;
        };
        };
    };
    // Tipos do Pokémon (fogo, água, elétrico, etc)
    types: Array<{
        slot: number;
        type: {
        name: string;
        url: string;
        };
    }>;
    
    // Habilidades
    abilities: Array<{
        ability: {
        name: string;
        url: string;
        };
        is_hidden: boolean;
        slot: number;
    }>;
    
    // Estatísticas (HP, ataque, defesa, etc)
    stats: Array<{
        base_stat: number;
        effort: number;
        stat: {
        name: string;
        url: string;
        };
    }>;
    
    // Movimentos que o Pokémon pode aprender
    moves: Array<{
        move: {
        name: string;
        url: string;
        };
    }>;
}
export const TYPE_COLORS: Record<string, string> = {
  normal: 'gray',
  fire: 'red',
  water: 'blue',
  electric: 'yellow',
  grass: 'green',
  ice: 'cyan',
  fighting: 'orange',
  poison: 'purple',
  ground: 'brown',
  flying: 'indigo',
  psychic: 'pink',
  bug: 'lime',
  rock: 'amber',
  ghost: 'violet',
  dragon: 'crimson',
  dark: 'gray',
  steel: 'gray',
  fairy: 'pink',
};
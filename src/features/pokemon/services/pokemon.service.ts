import axios from "axios";
import type { PokemonListResponse, Pokemon, PokemonDetails } from "../types/pokeapi.types";

const pokemonApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    timeout: 10000,
    headers: {
        'Content-Type' : 'application/json',
    }
});

// Interceptor para logs
pokemonApi.interceptors.request.use(
  (config) => {
    console.log('[POKEMON API] Requisição:', config.url);
    return config;
  },
  (error) => {
    console.error('[POKEMON API] Erro na requisição:', error);
    return Promise.reject(error);
  }
);

pokemonApi.interceptors.response.use(
  (response) => {
    console.log('✅ [POKEMON API] Resposta recebida:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ [POKEMON API] Erro na resposta:', error);
    return Promise.reject(error);
  }
);

export const pokemonService = {
  // Lista paginada de Pokémons
  getList: async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
    const response = await pokemonApi.get<PokemonListResponse>('/pokemon', {
      params: { limit, offset },
    });
    return response.data;
  },

  // Detalhes completos de um Pokémon (por nome ou ID)
  getDetails: async (nameOrId: string | number): Promise<PokemonDetails> => {
    const response = await pokemonApi.get<PokemonDetails>(`/pokemon/${nameOrId}`);
    return response.data;
  },

  // Buscar Pokémon por nome
  search: async (query: string): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/pokemon', {
      params: { limit: 1000 }, 
    });
    
    // Filtra pokémons que contenham o texto buscado
    return response.data.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
  },
};
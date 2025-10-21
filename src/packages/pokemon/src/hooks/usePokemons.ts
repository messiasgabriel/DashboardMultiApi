import { useQuery } from "@tanstack/react-query";
import { pokemonService } from "../services/pokemon.service";

// Hook para listar Pokémons com paginação
export function usePokemonList(limit = 20, offset = 0){
    return useQuery({
        queryKey: ['pokemon','list', limit, offset],
        queryFn: () => pokemonService.getList(limit, offset),
        staleTime: 5 * 60 * 1000,
    })
}

// Hook para detalhes de um Pokémon específico
export function usePokemonDetails (nameOrId: string | number){
    return useQuery({
        queryKey: ['pokemon', 'details', nameOrId],
        queryFn: () => pokemonService.getDetails(nameOrId),
        enabled: !!nameOrId,
        staleTime: 5 * 60 * 1000,
    })
}

// Hook para buscar Pokémon por nome
export function useSearchPokemon(query: string) {
  return useQuery({
    queryKey: ['pokemon', 'search', query],
    queryFn: () => pokemonService.search(query), 
    enabled: query.length >= 2,
    staleTime: 1 * 60 * 1000, 
  });
}
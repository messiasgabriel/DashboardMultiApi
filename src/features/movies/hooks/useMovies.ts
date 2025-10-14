import { useQuery } from '@tanstack/react-query';
import { moviesService } from '../services/movies';

// Hook para buscar filmes populares
export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => moviesService.getPopular(page),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

// Hook para buscar filmes
export function useSearchMovies(query: string, page = 1) {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => moviesService.search(query, page),
    enabled: query.length > 2, // Só busca se tiver mais de 2 caracteres
  });
}

// Hook para detalhes de um filme
export function useMovie(id: number) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => moviesService.getById(id),
    enabled: !!id,
  });
}
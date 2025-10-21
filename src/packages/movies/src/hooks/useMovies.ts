import { useQuery } from '@tanstack/react-query';
import { moviesService } from '../services/movies.service';

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
    staleTime: 2 * 60 * 1000, // 2 minutos para buscas
  });
}

// Hook para detalhes de um filme
export function useMovie(id: number) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => moviesService.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos para detalhes
  });
}

// Hook para filmes em cartaz
export function useNowPlayingMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'now-playing', page],
    queryFn: () => moviesService.getNowPlaying(page),
    staleTime: 30 * 60 * 1000, // 30 minutos
  });
}

// Hook para próximos lançamentos
export function useUpcomingMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'upcoming', page],
    queryFn: () => moviesService.getUpcoming(page),
    staleTime: 60 * 60 * 1000, // 1 hora
  });
}

// Hook para filmes mais bem avaliados
export function useTopRatedMovies(page = 1) {
  return useQuery({
    queryKey: ['movies', 'top-rated', page],
    queryFn: () => moviesService.getTopRated(page),
    staleTime: 60 * 60 * 1000, // 1 hora
  });
}
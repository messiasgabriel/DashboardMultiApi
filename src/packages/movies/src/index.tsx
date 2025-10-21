/* eslint-disable react-refresh/only-export-components */
// Components
export { MovieCard } from './components/MovieCard';
export { MovieModal } from './components/MovieModal';

// Hooks
export { 
  usePopularMovies, 
  useSearchMovies, 
  useMovie,
  useNowPlayingMovies,
  useUpcomingMovies,
  useTopRatedMovies
} from './hooks/useMovies';

// Services
export { moviesService } from './services/movies.service';

// Types
export type { 
  Movie, 
  MovieDetails,
  MoviesResponse 
} from './types/moives.types';

// Pages
export { MoviesPage } from './pages/MoviesPage';
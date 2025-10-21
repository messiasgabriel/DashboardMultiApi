import axios from "axios";
import type { MoviesResponse, MovieDetails } from '../types/moives.types';

// Configuração base do Axios
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.themoviedb.org/3',
    timeout: 10000,
    headers : {
        'Content-type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) =>{
        console.log('[REQUEST] enviando para:', config.baseURL );
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        if(apiKey) {
            config.params = {
                ...config.params,
                api_key : apiKey,
            };
        }
        return config;
    },
    (error) =>{
        console.error('[REQUEST ERROR]:', error)
       return Promise.reject(error)
    } 
        
)

// Response Interceptor
api.interceptors.response.use(
    (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ [RESPONSE ERROR] Status:', error.response.status);
      console.error('❌ [RESPONSE ERROR] Data:', error.response.data);
    } else if (error.request) {
      console.error('❌ [NETWORK ERROR] Sem resposta');
    } else {
      console.error('❌ [CONFIG ERROR]:', error.message);
    }
    return Promise.reject(error);
  }
)

export const moviesService = {
    // Lista os filmes populares
    getPopular: async (page = 1): Promise<MoviesResponse> => {
        const response = await api.get<MoviesResponse>('/movie/popular', {
            params: { page },
        });
        return response.data;
    },

    // Buscar filme por nome
    search: async (query: string, page = 1): Promise<MoviesResponse> => {
        const response = await api.get<MoviesResponse>('/search/movie', {
            params: { query, page },
        });
        return response.data;
    },

    // Busca detalhes completos pelo ID
    getById: async (id: number): Promise<MovieDetails> => {
        const response = await api.get<MovieDetails>(`/movie/${id}`);
        return response.data;
    },

    // Filmes em cartaz
    getNowPlaying: async (page = 1): Promise<MoviesResponse> => {
        const response = await api.get<MoviesResponse>('/movie/now_playing', {
            params: { page },
        });
        return response.data;
    },

    // Próximos lançamentos
    getUpcoming: async (page = 1): Promise<MoviesResponse> => {
        const response = await api.get<MoviesResponse>('/movie/upcoming', {
            params: { page },
        });
        return response.data;
    },

    // Filmes mais bem avaliados
    getTopRated: async (page = 1): Promise<MoviesResponse> => {
        const response = await api.get<MoviesResponse>('/movie/top_rated', {
            params: { page },
        });
        return response.data;
    },
};


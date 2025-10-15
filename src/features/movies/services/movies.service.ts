import axios from "axios";
import type { MoviesResponse, Movie } from '../types/moives.types';

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
        console.log('[REQUEST] Parâmetros:', config.params)
        const apiKey = import.meta.env.VITE_API_KEY;
        if(apiKey) {
            config.params = {
                ...config.params,
                api_key : apiKey,
            };
        }
        console.log('✅ [REQUEST] Parâmetros finais:', config.params);
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
    console.log('✅ [RESPONSE] Sucesso!', response.status);
    console.log('📥 [RESPONSE] Dados:', response.data);
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
        const response = await api.get<MoviesResponse>('/movie/popular',{
            params: { page},
        });
        return response.data;
    },
    // Buscar Filme por nome
    search: async (query: string, page = 1): Promise<MoviesResponse> =>{
        const response = await api.get<MoviesResponse>('/search/movie', {
            params: { query, page},
        });
        return response.data;
    },

    // Busca pelo ID
    getById: async (id: number): Promise<Movie> => {
        const response = await api.get<Movie>(`/movie/${id}`);
        return response.data;
    },
}


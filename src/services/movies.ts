import { api } from './api';
import type { MoviesResponse, Movie } from '../types';

export const moviesService = {
    getPopular: async (page = 1): Promise<MoviesResponse> => {
        const response = await api.get<MoviesResponse>('/movie/popular',{
            params: { page},
        });
        return response.data;
    },
    search: async (query: string, page = 1): Promise<MoviesResponse> =>{
        const response = await api.get<MoviesResponse>('/search/movie', {
            params: { query, page},
        });
        return response.data;
    },
     getById: async (id: number): Promise<Movie> => {
        const response = await api.get<Movie>(`/movie/${id}`);
        return response.data;
    },
}
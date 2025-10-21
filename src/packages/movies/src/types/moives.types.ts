export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    adult: boolean;
    genre_ids: number[];
}

// Detalhes completos de um filme (quando buscamos por ID)
export interface MovieDetails extends Movie {
    budget: number;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    homepage: string;
    imdb_id: string;
    genres: Array<{
        id: number;
        name: string;
    }>;
    production_companies: Array<{
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }>;
    production_countries: Array<{
        iso_3166_1: string;
        name: string;
    }>;
    spoken_languages: Array<{
        english_name: string;
        iso_639_1: string;
        name: string;
    }>;
}

export interface PaginatedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export type MoviesResponse = PaginatedResponse<Movie>;
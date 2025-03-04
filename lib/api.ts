import { Movie, MovieDetails, GenresResponse } from '../types';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetch a list of popular movies
export async function fetchPopularMovies(): Promise<Movie[]> {
    if (!API_KEY) {
        throw new Error('API key is missing. Please add NEXT_PUBLIC_TMDB_API_KEY to your environment variables.');
    }

    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pl-PL`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch popular movies');
    }

    const data = await response.json();
    return data.results;
}

// Fetch detailed information about a specific movie
export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
    if (!API_KEY) {
        throw new Error('API key is missing. Please add NEXT_PUBLIC_TMDB_API_KEY to your environment variables.');
    }

    const response = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pl-PL`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch movie details for ID: ${id}`);
    }

    return await response.json();
}

// Fetch all available movie genres
export async function fetchMovieGenres() {
    if (!API_KEY) {
        throw new Error('API key is missing. Please add NEXT_PUBLIC_TMDB_API_KEY to your environment variables.');
    }

    const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pl-PL`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch movie genres');
    }

    const data: GenresResponse = await response.json();
    return data.genres;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: Genre[];
  tagline: string;
  runtime: number;
  status: string;
  budget: number;
  revenue: number;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

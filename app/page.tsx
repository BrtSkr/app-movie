'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { fetchPopularMovies, fetchMovieGenres } from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import { Movie, Genre } from '../types';

// Lazy load components
const MovieList = dynamic(() => import('../components/MovieList'), {
  loading: () => <LoadingSpinner />,
});

const CategorySelector = dynamic(() => import('../components/CategorySelector'), {
  loading: () => <LoadingSpinner />,
});

const FilterBar = dynamic(() => import('../components/FilterBar'), {
  loading: () => <LoadingSpinner />,
});

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState<'popularity' | 'title' | 'release_date'>('popularity');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [moviesData, genresData] = await Promise.all([
          fetchPopularMovies(),
          fetchMovieGenres()
        ]);
        setMovies(moviesData);
        setFilteredMovies(moviesData);
        setGenres(genresData);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...movies];
    
    // Filter by genre if selected
    if (selectedGenre) {
      result = result.filter(movie => 
        movie.genre_ids.includes(selectedGenre)
      );
    }
    
    // Sort movies
    result.sort((a, b) => {
      if (sortBy === 'title') {
        return sortOrder === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      } else if (sortBy === 'release_date') {
        return sortOrder === 'asc' 
          ? new Date(a.release_date).getTime() - new Date(b.release_date).getTime() 
          : new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      } else {
        // Default: sort by popularity
        return sortOrder === 'asc' 
          ? a.popularity - b.popularity 
          : b.popularity - a.popularity;
      }
    });
    
    setFilteredMovies(result);
  }, [movies, selectedGenre, sortOrder, sortBy]);

  const handleGenreChange = (genreId: number | null) => {
    setSelectedGenre(genreId);
  };

  const handleSortChange = (sortBy: 'popularity' | 'title' | 'release_date') => {
    setSortBy(sortBy);
  };

  const handleOrderChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Popular Movies
      </h1>
      
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-8">
            <CategorySelector 
              genres={genres}
              selectedGenre={selectedGenre}
              onGenreChange={handleGenreChange}
            />
            <FilterBar 
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              onOrderChange={handleOrderChange}
            />
          </div>
          
          <MovieList movies={filteredMovies} />
        </>
      )}
    </>
  );
}

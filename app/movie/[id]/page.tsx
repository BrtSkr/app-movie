'use client';

import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { fetchMovieDetails } from '../../../lib/api';
import { MovieDetails } from '../../../types';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorDisplay from '../../../components/ErrorDisplay';
import { motion } from 'framer-motion';

// Dynamic imports for better performance
const ProductionCompanies = dynamic(() => import('@/components/ProductionCompanies'), {
  loading: () => <div className="h-20 w-full bg-gray-200 animate-pulse rounded"></div>,
});

export default function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!id) return;
    
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieDetails(Number(id));
        setMovie(data);
        // Set page title dynamically
        document.title = `${data.title} | Movie App`;
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    getMovieDetails();
  }, [id]);
  
  const handleGoBack = () => {
    router.push('/');
  };
  
  if (error) {
    return <ErrorDisplay message={error} />;
  }
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!movie) {
    return null;
  }

  return (
    <>
      <button 
        onClick={handleGoBack}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        &larr; Wróć
      </button>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="md:flex">
          {movie.poster_path ? (
            <div className="md:w-1/3 relative h-96 md:h-auto">
              <Image 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
                priority
                className="md:w-full"
              />
            </div>
          ) : (
            <div className="md:w-1/3 bg-gray-300 dark:bg-gray-700 flex items-center justify-center h-96 md:h-auto">
              <span className="text-gray-500 dark:text-gray-400">No image available</span>
            </div>
          )}
          
          <div className="p-6 md:w-2/3">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              {movie.title}
            </h1>
            
            {movie.tagline && (
              <p className="text-lg italic text-gray-600 dark:text-gray-300 mb-4">
                "{movie.tagline}"
              </p>
            )}
            
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres?.map(genre => (
                <span 
                  key={genre.id} 
                  className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Release Date</p>
                <p className="font-medium">{movie.release_date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                <p className="font-medium">⭐ {movie.vote_average} ({movie.vote_count} votes)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Runtime</p>
                <p className="font-medium">{movie.runtime} minutes</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                <p className="font-medium">{movie.status}</p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Overview</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{movie.overview}</p>
            
            {movie.production_companies?.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Production</h2>
                <div className="flex flex-wrap gap-4 mb-4">
                  {movie.production_companies.map(company => (
                    <div key={company.id} className="text-center">
                      {company.logo_path ? (
                        <div className="w-16 h-16 relative mx-auto mb-1">
                          <Image 
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                            fill
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded mb-1">
                          <span className="text-xs text-gray-500">{company.name[0]}</span>
                        </div>
                      )}
                      <span className="text-xs text-gray-600 dark:text-gray-400">{company.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

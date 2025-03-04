import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '../types';
import { motion } from 'framer-motion';
import { StarIcon, CalendarIcon } from '@heroicons/react/20/solid';

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export default function MovieCard({ movie, index }: MovieCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-card text-card-foreground rounded-xl shadow-movie overflow-hidden border border-border/50 backdrop-blur-sm"
    >
      <Link href={`/movie/${movie.id}`} className="block h-full">
        <div className="aspect-[2/3] relative overflow-hidden rounded-t-xl">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-all duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 right-2 flex items-center space-x-1 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
            <StarIcon className="h-4 w-4 text-yellow-500" />
            <span className="text-foreground text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <motion.div 
          className="p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {movie.title}
          </h2>
          <div className="flex items-center space-x-2 mb-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2 group-hover:text-foreground transition-colors">
            {movie.overview || "No description available."}
          </p>
        </motion.div>
      </Link>
    </motion.div>
  );
}

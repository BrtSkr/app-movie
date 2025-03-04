import { Genre } from '../types';
import { TagIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface CategorySelectorProps {
  genres: Genre[];
  selectedGenre: number | null;
  onGenreChange: (genreId: number | null) => void;
}

export default function CategorySelector({ genres, selectedGenre, onGenreChange }: CategorySelectorProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background/50 dark:bg-background/50 backdrop-blur-xl border border-border/50 rounded-xl shadow-lg p-6 mb-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <TagIcon className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Categories</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onGenreChange(null)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${selectedGenre === null
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
              : 'bg-muted hover:bg-muted/80 text-muted-foreground'
            }
          `}
        >
          All
        </motion.button>
        {genres.map((genre, index) => (
          <motion.button
            key={genre.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onGenreChange(genre.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${selectedGenre === genre.id
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground'
              }
            `}
          >
            {genre.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

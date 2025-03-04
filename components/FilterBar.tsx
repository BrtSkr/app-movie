import { Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';

interface FilterBarProps {
  sortBy: 'popularity' | 'title' | 'release_date';
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: 'popularity' | 'title' | 'release_date') => void;
  onOrderChange: (order: 'asc' | 'desc') => void;
}

export default function FilterBar({ sortBy, sortOrder, onSortChange, onOrderChange }: FilterBarProps) {
  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'title', label: 'Title' },
    { value: 'release_date', label: 'Release Date' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-background/50 dark:bg-background/50 backdrop-blur-xl border border-border/50 rounded-xl shadow-lg p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <FunnelIcon className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Sort Movies</h3>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground transition-colors">
              <span>{sortOptions.find(option => option.value === sortBy)?.label}</span>
              <ChevronDownIcon className="h-5 w-5" />
            </MenuButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-xl bg-background/50 backdrop-blur-xl border border-border shadow-lg focus:outline-none">
                <div className="p-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value}>
                      {({ active }) => (
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onSortChange(option.value as any)}
                          className={`
                            ${active ? 'bg-muted text-foreground' : 'text-muted-foreground'}
                            w-full text-left px-4 py-2 rounded-lg text-sm transition-colors
                          `}
                        >
                          {option.label}
                        </motion.button>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Transition>
          </Menu>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            {sortOrder === 'asc' ? (
              <ArrowUpIcon className="h-5 w-5" />
            ) : (
              <ArrowDownIcon className="h-5 w-5" />
            )}
            <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

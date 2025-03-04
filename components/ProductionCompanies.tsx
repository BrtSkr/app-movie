import Image from 'next/image';
import { ProductionCompany } from '../types';

interface ProductionCompaniesProps {
  companies: ProductionCompany[];
}

export default function ProductionCompanies({ companies }: ProductionCompaniesProps) {
  if (!companies.length) return null;
  
  return (
    <>
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Production</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        {companies.map(company => (
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
  );
}

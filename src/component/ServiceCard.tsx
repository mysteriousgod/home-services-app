// src/components/ServiceCard.tsx
import Link from 'next/link'
import { Service } from '@/types'

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white dark:bg-gray-700 overflow-hidden shadow rounded-lg transition-colors duration-200">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-indigo-500 dark:bg-indigo-600 text-white text-2xl mb-4">
          {service.name[0]}
        </div>
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{service.name}</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-300">
          <p>{service.description}</p>
        </div>
        <div className="mt-3 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`h-5 w-5 ${i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">{service.rating.toFixed(1)} out of 5 stars</p>
        </div>
        <div className="mt-5">
          <Link
            href={`/hire/${service.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
          >
            Hire
          </Link>
        </div>
      </div>
    </div>
  )
}
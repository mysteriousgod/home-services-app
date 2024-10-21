// src/app/page.tsx
import Link from 'next/link'

const services = [
  { name: 'Plumbing', icon: '🔧' },
  { name: 'Carpentry', icon: '🔨' },
  { name: 'Electrical', icon: '⚡' },
  { name: 'Painting', icon: '🎨' },
  { name: 'Gardening', icon: '🌱' },
  { name: 'Cleaning', icon: '🧹' },
]

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
    <div className="text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Professional Home Services</span>
      <span className="block text-indigo-600 dark:text-indigo-400">at Your Fingertips</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connect with top-rated local professionals for all your home service needs.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Our Services</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.name}
                href={`/services/${service.name.toLowerCase()}`}
                className="relative bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center space-x-3 hover:border-gray-400 dark:hover:border-gray-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 transition-colors duration-200"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-l-lg bg-indigo-500 dark:bg-indigo-600 text-white text-2xl">
                  {service.icon}
                </div>
                <div className="flex-1 min-w-0 px-4 py-4">
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">
                    {service.name}
                  </span>
                </div>
      </Link>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to HomeServe</h1>
      <p className="mb-4">Find reliable home service professionals or offer your services.</p>
      <Link href="/services" className="text-blue-500 hover:text-blue-700">
        Explore Services
      </Link>
        </div>
      </div>
    </div>
  )
}
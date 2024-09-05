// src/app/services/[category]/page.tsx
import ServiceCard from '@/component/ServiceCard'
import { Category } from '@/types'
interface Service {
    id: number;
    name: string;
    rating: number;
    description: string;
  }

// This would typically come from an API or database
const mockServices: Category = {
  plumbers: [
    { id: 1, name: 'John Doe', rating: 4.5, description: 'Experienced plumber specializing in residential and commercial plumbing.' },
    { id: 2, name: 'Jane Smith', rating: 4.8, description: 'Master plumber with over 15 years of experience in all aspects of plumbing.' },
  ],
  carpenters: [
    { id: 1, name: 'Bob Builder', rating: 4.7, description: 'Skilled carpenter specializing in custom furniture and home renovations.' },
    { id: 2, name: 'Alice Woodwork', rating: 4.6, description: 'Expert in fine woodworking and architectural millwork.' },
  ],
  // Add more categories as needed
}

export default function ServiceCategory({ params }: { params: { category: string } }) {
  const { category } = params
  const services = mockServices[category] || []

  return (
    <div className="bg-white dark:bg-gray-800 transition-colors duration-200">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Services'}
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}
'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge } from '@/components/ui';
import { Search, Star, Filter, MapPin, Clock, DollarSign, MessageCircle, Calendar } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentUser } from '@/store/auth-slice';
import SearchCard from '@/components/search-card';
import userDefaultImage from "../../assets/icons8-user-default-64.png"
import Image from 'next/image';

interface Builder {
  id: string;
  name: string;
  profession: string;
  experience: string;
  skills: string[];
  rating: number;
  completedJobs: number;
  hourlyRate: number;
  availability: 'Available' | 'Busy' | 'Away';
  location: string;
  avatar: string;
  responseTime: string;
  verificationStatus: boolean;
  recentReviews: Review[];
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Job {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  builder?: Builder;
  price: number;
  startDate?: string;
  endDate?: string;
  location: string;
  category: string;
}

export default function CustomerDashboard() {
  const currentUser = useAppSelector(selectCurrentUser);
  const [searchTerm, setSearchTerm] = useState('');
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [activeJobs, setActiveJobs] = useState<Job[]>([]);
  const [completedJobs, setCompletedJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState({
    profession: '',
    minRating: 0,
    maxPrice: 0,
    availability: '',
    location: ''
  });
  const [favoriteBuilders, setFavoriteBuilders] = useState<Builder[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'All',
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Painting',
    'Gardening',
    'Cleaning',
    'HVAC',
    'Roofing'
  ];

  useEffect(() => {
    // TODO: Fetch data from API
    fetchMockData();
  }, []);

  const fetchMockData = () => {
    const mockBuilders: Builder[] = [
      {
        id: '1',
        name: 'John Doe',
        profession: 'Plumber',
        experience: '5 years',
        skills: ['Plumbing', 'Pipe fitting', 'Water heater installation'],
        rating: 4.8,
        completedJobs: 150,
        hourlyRate: 75,
        availability: 'Available',
        location: 'New York, NY',
        avatar: '/avatars/builder1.jpg',
        responseTime: '< 1 hour',
        verificationStatus: true,
        recentReviews: [
          {
            id: '1',
            userId: 'user1',
            userName: 'Alice Johnson',
            rating: 5,
            comment: 'Excellent work! Very professional and clean.',
            date: '2024-02-15'
          }
        ]
      },
      // Add more mock builders...
    ];

    const mockActiveJobs: Job[] = [
      {
        id: '1',
        title: 'Bathroom Renovation',
        description: 'Complete renovation of master bathroom',
        status: 'in-progress',
        price: 2500,
        startDate: '2024-03-01',
        endDate: '2024-03-15',
        location: 'New York, NY',
        category: 'Plumbing'
      }
    ];

    setBuilders(mockBuilders);
    setActiveJobs(mockActiveJobs);
  };

  const handleSearch = async () => {
    // TODO: Implement API search with filters
    console.log('Searching with filters:', { searchTerm, filters });
  };

  const handleFavorite = (builderId: string) => {
    // TODO: Implement favorite builder functionality
    console.log('Toggling favorite for builder:', builderId);
  };

  const requestQuote = (builder: Builder) => {
    // TODO: Implement quote request
    console.log('Requesting quote from builder:', builder.id);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - User Profile & Stats */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image
                  src={currentUser?.profileImage || userDefaultImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                Welcome, {currentUser?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Active Projects</h3>
                  <p className="text-2xl text-blue-600">{activeJobs.length}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Total Spent</h3>
                  <p className="text-2xl text-green-600">
                    <DollarSign className="inline h-5 w-5" />
                    {activeJobs.reduce((sum, job) => sum + job.price, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <Input
                  type="text"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Minimum Rating</label>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.minRating}
                  onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Maximum Hourly Rate</label>
                <Input
                  type="number"
                  min="0"
                  step="10"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                />
              </div>
              <Button onClick={handleSearch} className="w-full">
                Apply Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Search Bar */}
          {/* Search Bar */}
          {/* <Card className="bg-[#1E1E1E] mb-6">
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Message ChatGPT"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-[#2B2B2B] border-none text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full hover:bg-[#2B2B2B] text-gray-400"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <span className="sr-only">Scroll to top</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.33337 8.00004L8.00004 3.33337L12.6667 8.00004M8.00004 3.33337V12.6667"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </CardContent>
          </Card> */}
          <SearchCard />


          {/* Active Jobs */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {activeJobs.length === 0 ? (
                <p className="text-gray-500">No active projects</p>
              ) : (
                <div className="space-y-4">
                  {activeJobs.map((job) => (
                    <Card key={job.id} className="bg-gray-50">
                      <CardContent className="p-">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{job.title}</h3>
                            <p className="text-sm text-gray-600">{job.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="flex items-center text-sm">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.location}
                              </span>
                              <span className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-1" />
                                {job.startDate}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">${job.price}</p>
                            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                              {job.status}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Builders List */}
          <div className="grid grid-cols-1 gap-6">
            {builders.map((builder) => (
              <Card key={builder.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <img
                        src={builder.avatar}
                        alt={builder.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          {builder.name}
                          {builder.verificationStatus && (
                            <span className="text-blue-500">✓</span>
                          )}
                        </h3>
                        <p className="text-gray-600">{builder.profession}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span>{builder.rating}</span>
                          <span className="text-gray-500">
                            ({builder.completedJobs} jobs)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${builder.hourlyRate}/hr</p>
                      <p className="text-sm text-gray-500">
                        <Clock className="h-4 w-4 inline mr-1" />
                        {builder.responseTime}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Skills:</p>
                    {/* <div className="flex flex-wrap gap-2">
                      {builder.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                        >
                          {skill}
                        </span>

                      ))}
                    </div> */}
                    {builder.skills.map((skill, index) => (
                      <>
                        {" "}
                        <Badge key={index} className="bg-primary/10 text-blue-800 p-2 rounded-md">
                          {skill}
                        </Badge>
                      </>
                    ))}
                  </div>

                  {builder.recentReviews.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                      <p className="text-sm font-semibold mb-2">Recent Review:</p>
                      <div className="background-surface-light p-3 rounded">
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="h-4 w-4 text-accent" />
                          <span className="font-semibold">
                            {builder.recentReviews[0].rating}/5
                          </span>
                          <span className=" text-text-primary">
                            by {builder.recentReviews[0].userName}
                          </span>
                        </div>
                        <p className=" text-text-secondary">
                          {builder.recentReviews[0].comment}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleFavorite(builder.id)}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => requestQuote(builder)}
                    >
                      Request Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
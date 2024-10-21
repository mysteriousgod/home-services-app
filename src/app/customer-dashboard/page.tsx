// src/components/CustomerDashboard.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@/components/ui';
import { Search, Star, Calendar } from 'lucide-react';

interface Builder {
  id: string;
  name: string;
  profession: string;
  experience: string;
  skills: string[];
  rating: number;
}

interface Job {
  id: string;
  title: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  builderName: string;
  date: string;
}

export default function CustomerDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // TODO: Implement API call to fetch customer's jobs
    const mockJobs: Job[] = [
      { id: '1', title: 'Fix leaky faucet', status: 'scheduled', builderName: 'John Doe', date: '2024-03-15' },
      { id: '2', title: 'Paint living room', status: 'in-progress', builderName: 'Jane Smith', date: '2024-03-10' },
      { id: '3', title: 'Install new light fixture', status: 'completed', builderName: 'Bob Johnson', date: '2024-03-05' },
    ];
    setJobs(mockJobs);
  }, []);

  const handleSearch = async () => {
    // TODO: Implement API call to search builders
    const mockBuilders: Builder[] = [
      { id: '1', name: 'John Doe', profession: 'Plumber', experience: '5 years', skills: ['Plumbing', 'Pipe fitting'], rating: 4.8 },
      { id: '2', name: 'Jane Smith', profession: 'Electrician', experience: '7 years', skills: ['Wiring', 'Circuit repair'], rating: 4.9 },
    ];
    setBuilders(mockBuilders);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search for Builders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Search by profession or skill"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch}><Search className="mr-2" />Search</Button>
          </div>
        </CardContent>
      </Card>

      {builders.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {builders.map((builder) => (
                <Card key={builder.id}>
                  <CardHeader>
                    <CardTitle>{builder.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Profession:</strong> {builder.profession}</p>
                    <p><strong>Experience:</strong> {builder.experience}</p>
                    <p><strong>Skills:</strong> {builder.skills.join(', ')}</p>
                    <p className="mt-2"><Star className="inline mr-2" />{builder.rating} / 5</p>
                    <Button className="mt-2">Contact</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Your Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          {jobs.map((job) => (
            <Card key={job.id} className="mb-4">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Status:</strong> {job.status}</p>
                <p><strong>Builder:</strong> {job.builderName}</p>
                <p><Calendar className="inline mr-2" />{job.date}</p>
                <Button className="mt-2">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@/components/ui';

interface Builder {
  id: string;
  name: string;
  profession: string;
  experience: string;
  skills: string[];
}

export default function CustomerDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [builders, setBuilders] = useState<Builder[]>([]);

  const handleSearch = async () => {
    // TODO: Implement API call to search builders
    // For now, we'll use mock data
    const mockBuilders: Builder[] = [
      { id: '1', name: 'John Doe', profession: 'Plumber', experience: '5 years', skills: ['Plumbing', 'Pipe fitting'] },
      { id: '2', name: 'Jane Smith', profession: 'Electrician', experience: '7 years', skills: ['Wiring', 'Circuit repair'] },
    ];
    setBuilders(mockBuilders);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>
      <Card>
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
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {builders.map((builder) => (
          <Card key={builder.id}>
            <CardHeader>
              <CardTitle>{builder.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Profession:</strong> {builder.profession}</p>
              <p><strong>Experience:</strong> {builder.experience}</p>
              <p><strong>Skills:</strong> {builder.skills.join(', ')}</p>
              <Button className="mt-2">Contact</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
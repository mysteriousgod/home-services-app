'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@/components/ui';
import { Upload, DollarSign, Star, Briefcase } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  price: number;
}

interface Builder {
  name: string;
  profession: string;
  experience: string;
  skills: string[];
  rating: number;
  totalEarnings: number;
  completedJobs: number;
}

export default function BuilderDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [builderInfo, setBuilderInfo] = useState<Builder | null>(null);
  const [projectImages, setProjectImages] = useState<string[]>([]);

  useEffect(() => {
    // TODO: Implement API call to fetch builder's info and jobs
    const mockBuilder: Builder = {
      name: "John Doe",
      profession: "Plumber",
      experience: "5 years",
      skills: ["Pipe fitting", "Water heater installation", "Leak repair"],
      rating: 4.8,
      totalEarnings: 15000,
      completedJobs: 50
    };
    setBuilderInfo(mockBuilder);

    const mockJobs: Job[] = [
      { id: '1', title: 'Fix leaky faucet', description: 'Kitchen sink is leaking', status: 'pending', price: 100 },
      { id: '2', title: 'Rewire living room', description: 'New lighting installation needed', status: 'in-progress', price: 250 },
      { id: '3', title: 'Install water heater', description: 'Replace old water heater', status: 'completed', price: 500 },
    ];
    setJobs(mockJobs);

    // Mock project images
    setProjectImages(['/project1.jpg', '/project2.jpg', '/project3.jpg']);
  }, []);

  const updateJobStatus = (jobId: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    setJobs(jobs.map(job => job.id === jobId ? { ...job, status: newStatus } : job));
    // TODO: Implement API call to update job status
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement actual image upload to server
      const imageUrl = URL.createObjectURL(file);
      setProjectImages([...projectImages, imageUrl]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Builder Dashboard</h1>
      
      {builderInfo && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold">{builderInfo.name}</h2>
                <p className="text-gray-600">{builderInfo.profession}</p>
                <p className="mt-2"><Briefcase className="inline mr-2" />{builderInfo.experience}</p>
                <p className="mt-2"><Star className="inline mr-2" />{builderInfo.rating} / 5</p>
              </div>
              <div>
                <p className="font-semibold">Skills:</p>
                <ul className="list-disc list-inside">
                  {builderInfo.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <p className="font-semibold">Total Earnings</p>
                <p className="text-2xl text-green-600"><DollarSign className="inline" />{builderInfo.totalEarnings}</p>
              </div>
              <div>
                <p className="font-semibold">Completed Jobs</p>
                <p className="text-2xl text-blue-600">{builderInfo.completedJobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Project Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {projectImages.map((image, index) => (
              <img key={index} src={image} alt={`Project ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
            ))}
          </div>
          <div className="mt-4">
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
            <Button className="mt-2"><Upload className="mr-2" />Upload New Image</Button>
          </div>
        </CardContent>
      </Card>

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
                <p>{job.description}</p>
                <p><strong>Status:</strong> {job.status}</p>
                <p><strong>Price:</strong> ${job.price}</p>
                <div className="mt-2 space-x-2">
                  <Button onClick={() => updateJobStatus(job.id, 'pending')} disabled={job.status === 'pending'}>
                    Pending
                  </Button>
                  <Button onClick={() => updateJobStatus(job.id, 'in-progress')} disabled={job.status === 'in-progress'}>
                    In Progress
                  </Button>
                  <Button onClick={() => updateJobStatus(job.id, 'completed')} disabled={job.status === 'completed'}>
                    Completed
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
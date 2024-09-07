'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';

interface Job {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export default function BuilderDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // TODO: Implement API call to fetch builder's jobs
    // For now, we'll use mock data
    const mockJobs: Job[] = [
      { id: '1', title: 'Fix leaky faucet', description: 'Kitchen sink is leaking', status: 'pending' },
      { id: '2', title: 'Rewire living room', description: 'New lighting installation needed', status: 'in-progress' },
    ];
    setJobs(mockJobs);
  }, []);

  const updateJobStatus = (jobId: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    setJobs(jobs.map(job => job.id === jobId ? { ...job, status: newStatus } : job));
    // TODO: Implement API call to update job status
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Builder Dashboard</h1>
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
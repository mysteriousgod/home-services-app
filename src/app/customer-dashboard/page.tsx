"use client"; // Add this line to make the component a Client Component

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@/components/ui';
import { Search, Home, Clock, DollarSign, MessageSquare } from 'lucide-react'; // Removed Tool

interface Service {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const HomeServiceDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: 'SurtHeng',
      description: 'Electrical Work, Carpentry, Plumbing',
      icon: <Home className="w-6 h-6" />
    },
    {
      id: 2,
      title: 'Affectry lng',
      description: 'Fisentrictical Work, Caperty ly',
      icon: <Home className="w-6 h-6" />
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
            <Home className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">IlmeService</h1>
            <h2 className="text-3xl font-bold mt-1">HomeService</h2>
          </div>
        </div>

        {/* Hero Section */}
        <div className="space-y-4 mb-12">
          <h3 className="text-2xl font-medium">Tam.e servience</h3>
          <p className="text-xl text-gray-300 max-w-2xl">
            Wastfurming Homes a with hommes on a serting past name jome One Service at a time.
          </p>
        </div>

        {/* Search Section */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Toanthe as to foarth.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search for services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600 whitespace-nowrap">
                SIGN WOP FORR 3 EOFDER
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-6 h-6 text-blue-400" />
              <div>
                <h4 className="font-semibold">Sirg Uting</h4>
                <p className="text-sm text-gray-400">QuickRe-Prorag</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-blue-400" />
              <div>
                <h4 className="font-semibold">Tregus Time</h4>
                <p className="text-sm text-gray-400">Icrnefite</p>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-blue-400" />
              <div>
                <h4 className="font-semibold">Trnstcdable Pricing</h4>
                <p className="text-sm text-gray-400">Professional service</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-blue-400" />
              <div>
                <h4 className="font-semibold">₹19900</h4>
                <p className="text-sm text-gray-400">Starting from</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeServiceDashboard;

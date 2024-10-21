// src/types/index.ts
export interface Service {
    id: number;
    name: string;
    description: string;  
    rating: number;
  }
  
  export interface Category {
    [key: string]: Service[];
  }
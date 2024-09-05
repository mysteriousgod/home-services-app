// src/types/index.ts
export interface Service {
    id: number;
    name: string;
    rating: number;
  }
  
  export interface Category {
    [key: string]: Service[];
  }
import React, { useState } from 'react';
import { CardContent, Input, Button ,Card} from './ui';
import { Search } from 'lucide-react';

const SearchCard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    // <Card className="mb-6 bg-background dark:bg-gray-800 transition-colors duration-200">
    <CardContent className="p-4 flex  sm:flex-row items-center gap-2">
      <div className="flex-1 w-full sm:w-[590px]">
        <Input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-background dark:bg-gray-700 border-gray-200 dark:border-gray-600 
                     text-foreground dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 
                     focus-visible:ring-1 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 
                     focus-visible:ring-offset-0 rounded-md transition-colors duration-200"
        />
      </div>
      <Button 
        variant="ghost" 
        size="icon"
        className="h-10 w-10 p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 
                   text-gray-500 dark:text-gray-400 transition-colors duration-200 self-start sm:self-center"
        onClick={handleSearch}
      >
        <Search className="h-5 w-5" />
      </Button>
    </CardContent>
  // </Card>
  );
};

export default SearchCard;
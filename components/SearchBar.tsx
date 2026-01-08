'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useSearchStore } from '@/store/searchStore';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchTerm(value);
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search books by title..."
          className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
        />
        <button
          type="submit"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}


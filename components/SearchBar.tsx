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
    <form onSubmit={handleSearch} className="mb-12">
      <div className="relative max-w-3xl mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search books by title..."
          className="w-full px-5 py-4 pl-14 pr-14 border border-gray-300 focus:border-black focus:outline-none text-base bg-white text-black placeholder-gray-400 font-medium tracking-wide transition-colors"
        />
        <button
          type="submit"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-black hover:opacity-60 transition-opacity"
          aria-label="Search"
        >
          <Search size={20} strokeWidth={1.5} />
        </button>
      </div>
    </form>
  );
}


'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import BooksContainer from '@/components/BooksContainer';
import booksData from '@/mock/books.json';

export default function Home() {
  const [books] = useState(booksData);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Landing Section - PR and Marketing */}
      <section className="bg-white text-black py-32 px-4 border-b border-black">
        <div className="container mx-auto max-w-5xl">
          <div className="animate-fade-in text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight text-black leading-tight">
              DECENTRALIZED<br />
              E-COMMERCE<br />
              STARTING WITH BOOKS
            </h1>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl mb-4 font-light text-black leading-relaxed">
                Save 10%+ compared to credit cards.
              </p>
              <p className="text-lg md:text-xl font-light text-gray-700 leading-relaxed">
                For every punk who believes in the future of commerce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="py-16 px-4 bg-white border-b border-black">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-xl md:text-2xl font-black text-black mb-12 tracking-tight uppercase text-center">
            Popular Books This Week
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {books.slice(0, 5).map((book) => (
              <div
                key={book.id}
                className="bg-white border border-gray-300 overflow-hidden hover:bg-black hover:text-white hover:border-black group transition-all duration-200"
              >
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity"
                />
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-1 text-black group-hover:text-white transition-colors line-clamp-2">{book.title}</h3>
                  <p className="text-gray-600 text-xs mb-2 group-hover:text-gray-300 transition-colors">{book.author}</p>
                  <p className="text-black font-black text-base group-hover:text-white transition-colors">
                    ${Math.min(book.physicalPrice, book.ebookPrice).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Books Container */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <SearchBar />
          <BooksContainer />
        </div>
      </section>
    </div>
  );
}


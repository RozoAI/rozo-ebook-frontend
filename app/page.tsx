'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import BooksContainer from '@/components/BooksContainer';
import booksData from '@/mock/books.json';

export default function Home() {
  const [books] = useState(booksData);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Landing Section - PR and Marketing */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Buy Books & E-books with Crypto
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Your digital library, powered by cryptocurrency
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-md">
                <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
                <p className="text-lg">
                  Roze Books is a revolutionary platform that brings together 
                  book lovers and the future of digital currency.
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-md">
                <h2 className="text-2xl font-semibold mb-2">What We Do</h2>
                <p className="text-lg">
                  We offer a wide selection of physical books and e-books, 
                  all purchasable with cryptocurrency for a seamless, modern experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="py-8 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Popular Books This Week
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {books.slice(0, 5).map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                  <p className="text-blue-600 font-bold">
                    ${Math.min(book.physicalPrice, book.ebookPrice).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Books Container */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <SearchBar />
          <BooksContainer />
        </div>
      </section>
    </div>
  );
}


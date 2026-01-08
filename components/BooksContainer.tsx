'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Mail } from 'lucide-react';
import { useSearchStore } from '@/store/searchStore';
import { useCartStore } from '@/store/cartStore';
import booksData from '@/mock/books.json';

export default function BooksContainer() {
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const addItem = useCartStore((state) => state.addItem);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestEmail, setRequestEmail] = useState('');

  const filteredBooks = searchTerm
    ? booksData.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : booksData.slice(0, 5); // Default display 5 books

  const handleAddToCart = (
    e: React.MouseEvent,
    book: typeof booksData[0]
  ) => {
    e.stopPropagation();
    const lowestPrice = Math.min(book.physicalPrice, book.ebookPrice);
    const format = book.physicalPrice < book.ebookPrice ? 'physical' : 'ebook';
    addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      thumbnail: book.thumbnail,
      format: format as 'physical' | 'ebook',
      price: lowestPrice,
    });
  };

  const handleRequestBook = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send an email notification
    alert(`We'll notify you at ${requestEmail} when "${searchTerm}" is available!`);
    setShowRequestForm(false);
    setRequestEmail('');
  };

  return (
    <div className="container mx-auto">
      {filteredBooks.length === 0 && searchTerm ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">
            No books found for &quot;{searchTerm}&quot;
          </p>
          {!showRequestForm ? (
            <button
              onClick={() => setShowRequestForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <Mail size={20} />
              Request This Book
            </button>
          ) : (
            <form
              onSubmit={handleRequestBook}
              className="max-w-md mx-auto mt-4 space-y-4"
            >
              <input
                type="email"
                value={requestEmail}
                onChange={(e) => setRequestEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Notified When Available
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredBooks.map((book) => {
            const lowestPrice = Math.min(book.physicalPrice, book.ebookPrice);
            return (
              <Link
                key={book.id}
                href={`/book/${book.id}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                  />
                  <button
                    onClick={(e) => handleAddToCart(e, book)}
                    className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-700"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                  <p className="text-blue-600 font-bold text-lg">
                    ${lowestPrice.toFixed(2)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}


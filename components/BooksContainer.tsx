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
              className="bg-black text-white px-6 py-3 border-2 border-black hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2 font-medium"
            >
              <Mail size={20} strokeWidth={1.5} />
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
                className="w-full px-4 py-2 border-2 border-black focus:border-black focus:outline-none bg-white text-black"
              />
              <button
                type="submit"
                className="w-full bg-black text-white px-6 py-3 border-2 border-black hover:bg-white hover:text-black transition-colors font-medium"
              >
                Get Notified When Available
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredBooks.map((book) => {
            const lowestPrice = Math.min(book.physicalPrice, book.ebookPrice);
            return (
              <Link
                key={book.id}
                href={`/book/${book.id}`}
                className="group bg-white border border-gray-300 overflow-hidden hover:bg-black hover:text-white hover:border-black transition-all duration-200"
              >
                <div className="relative">
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity"
                  />
                  <button
                    onClick={(e) => handleAddToCart(e, book)}
                    className="absolute top-2 right-2 bg-black text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black hover:border-2 hover:border-white rounded"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart size={18} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-1 line-clamp-2 text-black group-hover:text-white transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-xs mb-2 group-hover:text-gray-300 transition-colors">{book.author}</p>
                  <p className="text-black font-black text-base group-hover:text-white transition-colors">
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


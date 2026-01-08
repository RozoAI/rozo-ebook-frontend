'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useCartStore } from '@/store/cartStore';
import booksData from '@/mock/books.json';

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id as string;
  const [selectedFormat, setSelectedFormat] = useState<'physical' | 'ebook'>('physical');
  const addItem = useCartStore((state) => state.addItem);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const book = booksData.find((b) => b.id === bookId);

  useEffect(() => {
    if (!book) {
      router.push('/');
    }
  }, [book, router]);

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-xl text-gray-600">Book not found</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const price = selectedFormat === 'physical' ? book.physicalPrice : book.ebookPrice;
    addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      thumbnail: book.thumbnail,
      format: selectedFormat,
      price,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Book Photo */}
            <div className="flex justify-center items-start">
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full max-w-md h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Book Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {book.title}
                </h1>
                <p className="text-2xl text-gray-600 mb-4">by {book.author}</p>
                <p className="text-gray-500">{book.category}</p>
              </div>

              {/* Price Selection */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="physical"
                      checked={selectedFormat === 'physical'}
                      onChange={(e) => setSelectedFormat(e.target.value as 'physical')}
                      className="w-5 h-5 text-blue-600"
                    />
                    <div>
                      <span className="font-semibold text-lg">Physical Book</span>
                      <p className="text-2xl font-bold text-blue-600">
                        ${book.physicalPrice.toFixed(2)}
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="ebook"
                      checked={selectedFormat === 'ebook'}
                      onChange={(e) => setSelectedFormat(e.target.value as 'ebook')}
                      className="w-5 h-5 text-blue-600"
                    />
                    <div>
                      <span className="font-semibold text-lg">E-Book</span>
                      <p className="text-2xl font-bold text-blue-600">
                        ${book.ebookPrice.toFixed(2)}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold flex items-center justify-center gap-2"
              >
                Add to Shopping Cart
                {totalItems > 0 && (
                  <span className="bg-red-500 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Book Description */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Book Description
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {book.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


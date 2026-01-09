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
      <div className="min-h-screen bg-white">
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
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white border border-black p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Book Photo */}
            <div className="flex justify-center items-start">
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full max-w-md h-auto border border-black"
              />
            </div>

            {/* Book Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
                  {book.title}
                </h1>
                <p className="text-2xl text-gray-600 mb-4 font-light">by {book.author}</p>
                <p className="text-gray-500 uppercase tracking-wide text-sm">{book.category}</p>
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
                      className="w-5 h-5 text-black border-black focus:ring-black"
                    />
                    <div>
                      <span className="font-bold text-lg text-black">Physical Book</span>
                      <p className="text-2xl font-black text-black">
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
                      className="w-5 h-5 text-black border-black focus:ring-black"
                    />
                    <div>
                      <span className="font-bold text-lg text-black">E-Book</span>
                      <p className="text-2xl font-black text-black">
                        ${book.ebookPrice.toFixed(2)}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white px-8 py-4 border-2 border-black hover:bg-white hover:text-black transition-colors text-lg font-bold flex items-center justify-center gap-2"
              >
                Add to Shopping Cart
                {totalItems > 0 && (
                  <span className="bg-black text-white text-sm font-bold h-6 w-6 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Book Description */}
          <div className="mt-8 pt-8 border-t border-black">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-tight uppercase">
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


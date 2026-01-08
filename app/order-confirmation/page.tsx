'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { Mail, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface OrderData {
  items: Array<{
    id: string;
    title: string;
    author: string;
    thumbnail: string;
    format: 'physical' | 'ebook';
    price: number;
    quantity: number;
  }>;
  email: string;
  address?: string;
  phone?: string;
  totalPrice: number;
}

export default function OrderConfirmationPage() {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentOrder');
    if (stored) {
      const data = JSON.parse(stored);
      setOrderData(data);
      clearCart(); // Clear cart after order confirmation
      localStorage.removeItem('currentOrder');
    } else {
      router.push('/');
    }
  }, [router, clearCart]);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-xl text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for your purchase. Your order has been received.
            </p>
          </div>

          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
            
            {/* Headers */}
            <div className="bg-gray-100 rounded-lg p-4 hidden md:grid grid-cols-12 gap-4 font-semibold text-gray-700 mb-2">
              <div className="col-span-6">Books</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Format</div>
              <div className="col-span-2 text-right">Price</div>
            </div>

            {/* Order Items */}
            {orderData.items.map((item) => (
              <div
                key={`${item.id}-${item.format}`}
                className="border-b border-gray-200 py-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.author}</p>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <span className="px-3 py-1 bg-gray-100 rounded text-center inline-block">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="col-span-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold capitalize">
                      {item.format === 'physical' ? 'Physical' : 'E-book'}
                    </span>
                  </div>

                  <div className="col-span-2 text-right">
                    <span className="font-bold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Delivery Format */}
                <div className="mt-2 text-sm text-gray-600">
                  <strong>Delivery Format:</strong>{' '}
                  {item.format === 'physical'
                    ? `Physical copy to ${orderData.address || 'your address'}`
                    : `E-book delivered to ${orderData.email}`}
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="mt-6 pt-4 border-t-2 border-gray-300">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-800">Total:</span>
                <span className="text-3xl font-bold text-blue-600">
                  ${orderData.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Support */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Customer Support
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="text-blue-600" size={20} />
                <div>
                  <span className="font-semibold text-gray-700">Email: </span>
                  <a
                    href="mailto:support@rozebooks.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@rozebooks.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="text-blue-600" size={20} />
                <div>
                  <span className="font-semibold text-gray-700">Discord: </span>
                  <a
                    href="https://discord.gg/rozebooks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    discord.gg/rozebooks
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              If you have any questions or concerns about your order, please don&apos;t
              hesitate to reach out to our support team via email or Discord.
            </p>
          </div>

          {/* Continue Shopping */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


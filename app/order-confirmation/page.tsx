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
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-xl text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white border-2 border-black p-8 mb-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
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
            <h1 className="text-4xl font-black text-black mb-2 tracking-tight uppercase">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-600 font-light">
              Thank you for your purchase. Your order has been received.
            </p>
          </div>

          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-black mb-4 tracking-tight uppercase">Order Summary</h2>
            
            {/* Headers */}
            <div className="bg-black text-white p-4 hidden md:grid grid-cols-12 gap-4 font-bold text-sm uppercase tracking-wide mb-2">
              <div className="col-span-6">Books</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Format</div>
              <div className="col-span-2 text-right">Price</div>
            </div>

            {/* Order Items */}
            {orderData.items.map((item) => (
              <div
                key={`${item.id}-${item.format}`}
                className="border-b-2 border-black py-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-24 object-cover border border-black"
                    />
                    <div>
                      <h3 className="font-bold text-base text-black">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.author}</p>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <span className="px-3 py-1 border border-black text-center inline-block font-medium">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="col-span-2">
                    <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wide">
                      {item.format === 'physical' ? 'Physical' : 'E-book'}
                    </span>
                  </div>

                  <div className="col-span-2 text-right">
                    <span className="font-black text-lg text-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Delivery Format */}
                <div className="mt-2 text-sm text-gray-600">
                  <strong className="font-bold text-black">Delivery Format:</strong>{' '}
                  {item.format === 'physical'
                    ? `Physical copy to ${orderData.address || 'your address'}`
                    : `E-book delivered to ${orderData.email}`}
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="mt-6 pt-4 border-t-2 border-black">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-black text-black uppercase tracking-wide">Total:</span>
                <span className="text-3xl font-black text-black">
                  ${orderData.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Support */}
          <div className="bg-white border-2 border-black p-6">
            <h2 className="text-2xl font-black text-black mb-4 tracking-tight uppercase">
              Customer Support
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="text-black" size={20} strokeWidth={1.5} />
                <div>
                  <span className="font-bold text-black">Email: </span>
                  <a
                    href="mailto:support@rozo.com"
                    className="text-black hover:opacity-70 underline font-medium"
                  >
                    support@rozo.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="text-black" size={20} strokeWidth={1.5} />
                <div>
                  <span className="font-bold text-black">Discord: </span>
                  <a
                    href="https://discord.gg/rozo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:opacity-70 underline font-medium"
                  >
                    discord.gg/rozo
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
              className="bg-black text-white px-8 py-3 border-2 border-black hover:bg-white hover:text-black transition-colors text-lg font-bold uppercase tracking-wide"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


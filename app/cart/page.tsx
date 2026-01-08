'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const hasPhysicalItems = items.some((item) => item.format === 'physical');
  const totalPrice = getTotalPrice();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate based on item types
    if (hasPhysicalItems) {
      if (!address.trim() || !phone.trim() || !email.trim()) {
        alert('Please provide address, phone number, and email for physical books');
        return;
      }
    } else {
      if (!email.trim()) {
        alert('Please provide your email for e-book delivery');
        return;
      }
    }

    // Store order info and redirect to confirmation
    const orderData = {
      items,
      email,
      address: hasPhysicalItems ? address : undefined,
      phone: hasPhysicalItems ? phone : undefined,
      totalPrice,
    };
    localStorage.setItem('currentOrder', JSON.stringify(orderData));
    router.push('/order-confirmation');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <ShoppingCart size={64} className="mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Headers */}
            <div className="bg-white rounded-lg shadow-md p-4 hidden md:grid grid-cols-12 gap-4 font-semibold text-gray-700">
              <div className="col-span-5">Books</div>
              <div className="col-span-3">Quantity</div>
              <div className="col-span-2">Format</div>
              <div className="col-span-2 text-right">Price</div>
            </div>

            {/* Cart Items */}
            {items.map((item) => (
              <div
                key={`${item.id}-${item.format}`}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-5 flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.author}</p>
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.format, item.quantity - 1)
                      }
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-4 py-1 border border-gray-300 rounded min-w-[3rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.format, item.quantity + 1)
                      }
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="col-span-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold capitalize">
                      {item.format}
                    </span>
                  </div>

                  <div className="col-span-2 flex items-center justify-between">
                    <span className="font-bold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id, item.format)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleCheckout} className="bg-white rounded-lg shadow-md p-6 space-y-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h2>
              
              {/* Email (Always Required) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Address & Phone (Required if physical items) */}
              {hasPhysicalItems && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Physical Address *
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      placeholder="Street address, City, State, ZIP"
                      rows={3}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Total Price */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
              >
                Proceed to Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


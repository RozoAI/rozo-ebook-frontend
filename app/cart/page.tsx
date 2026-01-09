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
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white border border-black p-12 text-center">
            <ShoppingCart size={64} className="mx-auto mb-4 text-gray-400" strokeWidth={1} />
            <h2 className="text-2xl font-bold text-black mb-2 tracking-tight">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
            <button
              onClick={() => router.push('/')}
              className="bg-black text-white px-6 py-3 border-2 border-black hover:bg-white hover:text-black transition-colors font-medium"
            >
              Browse Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-black text-black mb-8 tracking-tight uppercase">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Headers */}
            <div className="bg-white border-b-2 border-black p-4 hidden md:grid grid-cols-12 gap-4 font-bold text-black text-sm uppercase tracking-wide">
              <div className="col-span-5">Books</div>
              <div className="col-span-3">Quantity</div>
              <div className="col-span-2">Format</div>
              <div className="col-span-2 text-right">Price</div>
            </div>

            {/* Cart Items */}
            {items.map((item) => (
              <div
                key={`${item.id}-${item.format}`}
                className="bg-white border border-black p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-5 flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-28 object-cover border border-black"
                    />
                    <div>
                      <h3 className="font-bold text-base text-black">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.author}</p>
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.format, item.quantity - 1)
                      }
                      className="p-1 border border-black hover:bg-black hover:text-white transition-colors"
                    >
                      <Minus size={18} strokeWidth={2} />
                    </button>
                    <span className="px-4 py-1 border border-black min-w-[3rem] text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.format, item.quantity + 1)
                      }
                      className="p-1 border border-black hover:bg-black hover:text-white transition-colors"
                    >
                      <Plus size={18} strokeWidth={2} />
                    </button>
                  </div>

                  <div className="col-span-2">
                    <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wide">
                      {item.format}
                    </span>
                  </div>

                  <div className="col-span-2 flex items-center justify-between">
                    <span className="font-black text-lg text-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id, item.format)}
                      className="p-2 text-black hover:bg-black hover:text-white transition-colors border border-black"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleCheckout} className="bg-white border border-black p-6 space-y-6 sticky top-24">
              <h2 className="text-2xl font-black text-black mb-4 tracking-tight uppercase">Checkout</h2>
              
              {/* Email (Always Required) */}
              <div>
                <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border-2 border-black focus:border-black focus:outline-none bg-white text-black"
                />
              </div>

              {/* Address & Phone (Required if physical items) */}
              {hasPhysicalItems && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                      Physical Address *
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      placeholder="Street address, City, State, ZIP"
                      rows={3}
                      className="w-full px-4 py-2 border-2 border-black focus:border-black focus:outline-none bg-white text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-2 border-2 border-black focus:border-black focus:outline-none bg-white text-black"
                    />
                  </div>
                </>
              )}

              {/* Total Price */}
              <div className="border-t-2 border-black pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-black text-black uppercase tracking-wide">Total:</span>
                  <span className="text-2xl font-black text-black">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="submit"
                className="w-full bg-black text-white px-6 py-4 border-2 border-black hover:bg-white hover:text-black transition-colors text-lg font-bold uppercase tracking-wide"
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


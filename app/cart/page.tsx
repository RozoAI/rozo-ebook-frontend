'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useCartStore } from '@/store/cartStore';
import { CryptoPaymentButton } from '@/components/CryptoPaymentButton';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

// Merchant wallet address for receiving payments (Base chain)
const MERCHANT_WALLET_ADDRESS = '0x5772FBe7a7817ef7F586215CA8b23b8dD22C8897';

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const clearCart = useCartStore((state) => state.clearCart);

  const hasPhysicalItems = items.some((item) => item.format === 'physical');
  const totalPrice = getTotalPrice();

  // Validate form based on item types
  const isFormValid = hasPhysicalItems
    ? email.trim() && address.trim() && phone.trim()
    : email.trim();

  const handlePaymentStarted = () => {
    setIsPaymentProcessing(true);
    console.log('Crypto payment started');
  };

  const handlePaymentCompleted = (txHash: string) => {
    setIsPaymentProcessing(false);
    console.log('Payment completed with tx:', txHash);

    // Store order info and redirect to confirmation
    const orderData = {
      items,
      email,
      address: hasPhysicalItems ? address : undefined,
      phone: hasPhysicalItems ? phone : undefined,
      totalPrice,
      txHash,
      paymentMethod: 'crypto',
    };
    localStorage.setItem('currentOrder', JSON.stringify(orderData));
    clearCart();
    router.push('/order-confirmation');
  };

  const handlePaymentBounced = () => {
    setIsPaymentProcessing(false);
    alert('Payment was bounced. Please try again.');
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
            <div className="bg-white border border-black p-6 space-y-6 sticky top-24">
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
                <p className="text-sm text-gray-600 mb-4">
                  Pay with USDC on Base chain
                </p>
              </div>

              {/* Form Validation Message */}
              {!isFormValid && (
                <p className="text-sm text-red-600">
                  {hasPhysicalItems
                    ? 'Please fill in email, address, and phone number to proceed.'
                    : 'Please enter your email to proceed.'}
                </p>
              )}

              {/* Crypto Payment Button */}
              <CryptoPaymentButton
                toAddress={MERCHANT_WALLET_ADDRESS}
                amount={totalPrice}
                onPaymentStarted={handlePaymentStarted}
                onPaymentCompleted={handlePaymentCompleted}
                onPaymentBounced={handlePaymentBounced}
                disabled={!isFormValid || isPaymentProcessing}
              />

              {isPaymentProcessing && (
                <p className="text-sm text-center text-gray-600">
                  Processing payment...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


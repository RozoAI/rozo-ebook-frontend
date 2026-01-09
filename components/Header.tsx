'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart } from 'lucide-react';

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="sticky top-0 z-50 bg-black border-b-2 border-black">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center max-w-7xl">
        <Link href="/" className="text-2xl md:text-3xl font-black text-white tracking-tight hover:opacity-80 transition-opacity">
          ROZO
        </Link>
        <Link
          href="/cart"
          className="relative flex items-center gap-2 px-4 py-2 text-white hover:opacity-70 transition-opacity group"
        >
          <ShoppingCart size={22} strokeWidth={1.5} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-black h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="hidden md:inline text-sm font-medium uppercase tracking-wide">Cart</span>
        </Link>
      </div>
    </header>
  );
}


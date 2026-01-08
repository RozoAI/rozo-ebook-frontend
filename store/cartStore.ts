import { create } from 'zustand';

export type BookFormat = 'physical' | 'ebook';

export interface CartItem {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  format: BookFormat;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, format: BookFormat) => void;
  updateQuantity: (id: string, format: BookFormat, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find(
      (i) => i.id === item.id && i.format === item.format
    );
    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === item.id && i.format === item.format
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      });
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] });
    }
  },
  removeItem: (id, format) => {
    set({
      items: get().items.filter(
        (item) => !(item.id === id && item.format === format)
      ),
    });
  },
  updateQuantity: (id, format, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id, format);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.id === id && item.format === format
          ? { ...item, quantity }
          : item
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));


# ROZO - Decentralized E-commerce Starting with Books

A minimalist decentralized e-commerce platform where users can buy physical books and e-books using cryptocurrency. Save 10%+ compared to credit cards. For every punk who believes in the future of commerce.

## Features

- **Landing Page**: PR and marketing content with animations
- **Search & Browse**: Search books by title with instant results
- **Book Details**: View book information, select format (physical/ebook), and add to cart
- **Shopping Cart**: Manage cart items, update quantities, and proceed to checkout
- **Order Confirmation**: View order summary with customer support information

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js app router pages and layout
- `/components` - Reusable React components
- `/store` - Zustand state management stores
- `/mock` - Mock JSON data files for books

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Lucide React** - Icon library

## Mock Data

All book data is stored in `/mock/books.json` as JSON files. Each book includes:
- ID, title, author
- Thumbnail image URL
- Physical book price
- E-book price
- Description
- Category

# rozo-ebook-frontend

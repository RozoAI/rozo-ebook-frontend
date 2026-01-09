import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ROZO - Decentralized E-commerce Starting with Books',
  description: 'Save 10%+ with crypto payments. Decentralized e-commerce from books, for every punk.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


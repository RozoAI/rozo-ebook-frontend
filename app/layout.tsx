import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Roze Books - Buy Books & E-books with Crypto',
  description: 'Buy books and e-books using cryptocurrency',
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


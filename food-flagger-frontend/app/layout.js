'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './AuthContext';
import { useAuth } from './AuthContext';

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <AuthProvider>

      <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </AuthProvider>
    
  )
}

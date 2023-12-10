'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './AuthContext';
import { useAuth } from './AuthContext';

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  //surround children with authprovider so they all get access to user auth status
  return (
    
      <html lang="en">
      <body className={inter.className}>
        <AuthProvider> 
          {children}
        </AuthProvider>
      </body>
    </html>
    
    
  )
}

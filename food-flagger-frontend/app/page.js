// Home.js
'use client'

import React, { createContext, useState, useContext } from 'react';
import HomePage from '@/components/HomePage';
import SignInPage from '@/components/SignInPage';
import Event from '@/components/Event';
import Header from '@/components/Header';
import { AuthProvider } from './AuthContext';
import { useAuth } from './AuthContext';

const Home = () => {

  const { isSignedIn, signIn, signOut } = useAuth();

  //login function
  

  return (
    
      <div>
        {isSignedIn ? <HomePage signOut={signOut} /> : <SignInPage signIn={signIn} />}
      </div>

  );
};

export default Home;

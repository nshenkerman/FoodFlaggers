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

  const { isSignedIn, signInAsGuest, isGuest, signIn, signOut } = useAuth();
  
  //if you're signed in as a guest or signed in fully, you get to see the header and main page. 
  return (
      
      <div>
        {isSignedIn || isGuest ? <Header useAuth={useAuth}/> : <div />}
        
        {isSignedIn || isGuest ? <HomePage signOut={signOut} /> : <SignInPage signIn={signIn} signInAsGuest={signInAsGuest} />}
      </div>

  );
};

export default Home;

'use client'

import { useState } from 'react';
import HomePage  from '@/components/HomePage';
import SignInPage from '@/components/SignInPage';
const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = (userData) => {
    // Perform sign in logic (e.g., setting a token, fetching user data, etc.)
    setIsSignedIn(true);
  };




  return (
    <div>
      {isSignedIn ? <HomePage signOut={signOut} /> : <SignInPage signIn={signIn} />}
    </div>
  );
};

export default Home;

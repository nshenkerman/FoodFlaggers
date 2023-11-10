'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Access localStorage only when on the client side
    const storedState = localStorage.getItem('isSignedIn');
    if (storedState) {
      setIsSignedIn(JSON.parse(storedState));
    }
    setLoading(false); // Set loading to false after checking the auth state
  }, []);

  // The signIn and signOut functions would be the same as in your original Home.js
  // ...
  async function checkUserLogin(email, netid, password) {
    try {
      const requestBody = { email, netid, password};
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      return response.ok && data.exists;
    } catch (error) {
      console.error('Network error:', error);
      return false;
    }
  }
  const signIn = async (email, netid, password) => {
    // Call the checkUserLogin function with the provided username and netid
    const userExists = await checkUserLogin(email,netid, password);
    if (userExists) {
      // If the user exists, perform sign in logic and set the signed-in state to true
      localStorage.setItem('isSignedIn', 'true');
      alert('User Found')
      setIsSignedIn(true);
    } else {
      // If the user does not exist, handle accordingly (e.g., show an error message)
      alert('Invalid credentials or user does not exist.');
      setIsSignedIn(false);
    }
  };

  const signOut = () => {
    // Perform sign out logic (e.g., clearing a token, resetting user data, etc.)
    localStorage.removeItem('isSignedIn'); 
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
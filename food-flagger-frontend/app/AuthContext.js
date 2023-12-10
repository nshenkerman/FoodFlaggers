'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false); // New state for guest browsing

  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Access localStorage only when on the client side
    const storedState = localStorage.getItem('isSignedIn');
    if (storedState) {
      setIsSignedIn(JSON.parse(storedState));
    }
    setLoading(false); // Set loading to false after checking the auth state
  }, []);
  const signInAsGuest = () => {
    // Set the appropriate states for a guest user
    setIsSignedIn(false);
    setIsGuest(true);
    // Optionally, you can clear or set relevant information in localStorage
  };
  // The signIn and signOut functions would be the same as in your original Home.js
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


  // Add additional user information to the state
  const [user, setUser] = useState(null);

  // Modify signIn to include setting user information
  const signIn = async (email, netid, password) => {
    const userExists = await checkUserLogin(email, netid, password);
    if (userExists) {
      localStorage.setItem('isSignedIn', 'true');
      // Store user information as well
      const userInfo = { email, netid }; // Populate with actual user information
      setUser(userInfo);
      setIsSignedIn(true);
    } else {
      alert('Invalid credentials or user does not exist.');
      setIsSignedIn(false);
    }
  };

  // Modify signOut to clear user information
  const signOut = () => {
    localStorage.removeItem('isSignedIn'); 
    setUser(null); // Clear user information
    setIsSignedIn(false);
    setIsGuest(false)
  };

  // Include the user information in the context value
  return (
    <AuthContext.Provider value={{ isSignedIn, isGuest, signIn, signOut, signInAsGuest, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
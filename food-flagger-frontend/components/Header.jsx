'use client'
import Link from 'next/link';

// import { useAuth } from '@/app/AuthContext';
const Header = ({useAuth}) => {


  const { signOut, isGuest,} = useAuth();
  const handleSignIn = (e) => {
    signOut()
  };
  return (
    <header className="bg-white shadow-md border-8 border-indigo-500">
      {!isGuest && <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/">
          <div className="text-gray-800 text-3xl font-bold hover:text-indigo-500">Food Flaggers</div>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/preferences">
            <div className="text-gray-600 hover:text-indigo-500 transition duration-300">Preferences</div>
          </Link>
          <Link href="/addpost">
            <div className="text-gray-600 hover:text-indigo-500 transition duration-300">Post Event</div>
          </Link>
          <Link href="/leaderboard">
            <div className="text-gray-600 hover:text-indigo-500 transition duration-300">Leaderboard</div>
          </Link>
          <button onClick={signOut}>
            <div className="text-gray-600 hover:text-indigo-500 transition duration-300">Sign Out</div>
          </button>
        </div>
      </nav>}
      {isGuest && <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/">
          <div className="text-gray-800 text-3xl font-bold hover:text-indigo-500">Food Flaggers</div>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/leaderboard">
            <div className="text-gray-600 hover:text-indigo-500 transition duration-300">Leaderboard</div>
          </Link>
          <Link href="/" onClick={handleSignIn}>
            <div className="text-gray-600 hover:text-indigo-500 transition duration-300">Sign in</div>
          </Link>
        </div>
      </nav>}
    </header>
  );
};

export default Header;

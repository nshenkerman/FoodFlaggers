// Header.js
import Link from 'next/link';
const HeaderOther = () => {
  return (
    <header className="bg-white shadow-md border-8 border-indigo-500 ">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
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
        </div>
      </nav>
    </header>
  );
};

export default HeaderOther;

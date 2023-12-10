// Import necessary dependencies
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Header = ({ useAuth }) => {
  // Destructuring methods from the useAuth hook.
  const { signOut, isGuest } = useAuth();

  // handleSignIn function: Handles the sign out process.
  const handleSignIn = (e) => {
    signOut();
  };

  // handleNotificationClick function: Displays an alert when the notification icon is clicked.
  const handleNotificationClick = () => {
    alert('There is one new event');
  };

  // JSX structure of the component
  return (
    <header className="bg-white shadow-md border-8 border-indigo-500">
      {/* Conditional rendering based on isGuest state */}
      {!isGuest && (
        // Navigation bar for regular users
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo/Brand name linking to the home page */}
          <Link href="/">
            <div className="text-gray-800 text-3xl font-bold hover:text-indigo-500">Food Flaggers</div>
          </Link>
          <div className="flex items-center space-x-4">
            {/* Notification button */}
            <button onClick={handleNotificationClick} className="text-gray-600 hover:text-indigo-500 transition duration-300">
              <FontAwesomeIcon icon={faBell} /> {/* Bell icon */}
            </button>
            {/* Navigation links */}
            <Link href="/preferences">
              <div className="text-gray-600 hover:text-indigo-500 transition duration-300">Preferences</div>
            </Link>
            <Link href="/addpost">
              <div className="text-gray-600 hover:text-indigo-500 transition duration-300">Post Event</div>
            </Link>
            <Link href="/leaderboard">
              <div className="text-gray-600 hover:text-indigo-500 transition duration-300">Leaderboard</div>
            </Link>
            {/* Sign out button */}
            <button onClick={signOut}>
              <div className="text-gray-600 hover:text-indigo-500 transition duration-300">Sign Out</div>
            </button>
          </div>
        </nav>
      )}
      {isGuest && (
        // Navigation bar for guest users
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo/Brand name linking to the home page */}
          <Link href="/">
            <div className="text-gray-800 text-3xl font-bold hover:text-indigo-500">Food Flaggers</div>
          </Link>
          <div className="flex items-center space-x-4">
            {/* Leaderboard link */}
            <Link href="/leaderboard">
              <div className="text-gray-600 hover:text-indigo-500 transition duration-300">Leaderboard</div>
            </Link>
            {/* Sign in link */}
            <Link href="/" onClick={handleSignIn}>
              <div className="text-gray-600 hover:text-indigo-500 transition duration-300">Sign in</div>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;

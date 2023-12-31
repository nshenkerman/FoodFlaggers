'use client'

import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import Header from "@/components/Header";

const Home = () => {
  // State variables to manage leaderboard data and pagination
  const [users, setUsers] = useState([]);          // State to store user data
  const [currentPage, setCurrentPage] = useState(1); // State for current page in pagination
  const [perPage, setPerPage] = useState(10);      // State for number of items per page
  const [maxPage, setMaxPage] = useState(null);    // State to store the maximum number of pages

  // useEffect hook to fetch leaderboard data when currentPage or perPage changes
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Fetching leaderboard data from the API
        const response = await fetch(`http://localhost:3000/api/user_leaderboard?page=${currentPage}&perPage=${perPage}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Updating state variables with fetched data
        setUsers(data.users);
        setCurrentPage(data.curPage);
        setMaxPage(data.maxPage);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        // Error handling logic could be added here
      }
    };

    fetchLeaderboard();
  }, [currentPage, perPage]); // Dependency array for useEffect

  // Destructuring methods and states from useAuth hook
  const { isSignedIn, signIn, signOut, isGuest } = useAuth();

  return (
    <div>
        {isSignedIn || isGuest ? <Header useAuth={useAuth}/> : <div />}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Leaderboard</h1>
        <div className="overflow-x-auto ">
          <div className="flex gap-2 my-4">
            {/* Buttons to set items per page */}
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setPerPage(10)}>Display 10</button>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setPerPage(20)}>Display 20</button>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setPerPage(50)}>Display 50</button>
          </div>
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">NetID</th>
                <th className="p-2 whitespace-nowrap">Email</th>
                <th className="p-2 whitespace-nowrap">Total Likes</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-300">
              {users.map(user => (
                <tr key={user.uid}>
                  <td className="p-2 whitespace-nowrap">{user.netid}</td>
                  <td className="p-2 whitespace-nowrap">{user.email}</td>
                  <td className="p-2 whitespace-nowrap">{user.total_likes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button disabled={currentPage <= 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
          <span>Page {currentPage} of {maxPage}</span>
          <button disabled={currentPage >= maxPage} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Home;

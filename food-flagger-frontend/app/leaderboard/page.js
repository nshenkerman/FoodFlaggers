'use client'
import HeaderOther from "@/components/HeaderOther";
import { useEffect, useState } from "react";
const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Function to fetch leaderboard data
        const fetchLeaderboard = async (event) => {
            
            try {
              const response = await fetch('http://localhost:3000/api/user_leaderboard');
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json();
              setUsers(data);
              // Handle success, maybe update state or trigger a re-render
            } catch (err) {
              console.error('Failed to fetch leaderboard:', err);
              // Handle errors, maybe show user an error message
            }
          };
          

        // Call the fetch function
        fetchLeaderboard();
    }, []);
  return(
    <div>
        <HeaderOther/>
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Leaderboard</h1>
      <div className="overflow-x-auto">
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
    </div>
    </div>
    );}
export default Home
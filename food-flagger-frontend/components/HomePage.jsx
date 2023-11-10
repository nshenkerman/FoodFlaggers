import Head from "next/head";
import Event from "./Event";
import Header from "./Header";
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/app/AuthContext";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isSignedIn, userNetID, signIn, signOut } = useAuth();

  const fetchEvents = useCallback(async (searchValue = "") => {
    setLoading(true);
    setError(null);
    try {
      let url = `http://localhost:3000/api/events?netid=${encodeURIComponent(userNetID)}`;
      if (searchValue.length > 0) {
        url += `&search_input=${encodeURIComponent(searchValue)}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Couldn't get events`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [userNetID]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleRefresh = () => {
    fetchEvents();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents(searchTerm);
  };

  return (
    <div>
      <Header useAuth={useAuth}/>
      <div className="container mx-auto my-8">
        <h1 className="text-4xl font-bold mb-8">Events</h1>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events"
            className="text-gray-700 py-2 px-4 rounded-l"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r"
            disabled={loading}
          >
            Search
          </button>
        </form>
        <button 
          onClick={handleRefresh} 
          className="mb-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          disabled={loading}
        >
          Refresh
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && events.map((eventData) => (
            <Event key={eventData.event_id} eventData={eventData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

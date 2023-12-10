import Head from "next/head";
import Event from "./Event";
import Header from "./Header";
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/app/AuthContext";

const HomePage = () => {
  // useState hooks to manage state variables
  const [events, setEvents] = useState([]);         // State for storing events
  const [searchTerm, setSearchTerm] = useState(""); // State for storing the search term
  const [netID, setNetID] = useState("");           // State for storing the NetID
  const [loading, setLoading] = useState(false);    // State to indicate loading status
  const [error, setError] = useState(null);         // State to store any error

  // useCallback hook to memoize the fetchEvents function, 
  // which is dependent on netID and searchTerm
  const fetchEvents = useCallback(async () => {
    setLoading(true); // Sets loading state to true
    setError(null);   // Resets any previous errors
    console.log(netID); // Logs the current NetID (for debugging)
    try {
      // Constructs the URL with query parameters
      let url = `http://localhost:3000/api/events`;
      const params = [];
      if (netID) {
        params.push(`netid=${encodeURIComponent(netID)}`);
      }
      if (searchTerm) {
        params.push(`searchTerm=${encodeURIComponent(searchTerm)}`);
      }
      if (params.length) {
        url += `?${params.join('&')}`;
      }

      // Fetching events from the server
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Couldn't get events`);
      }
      const data = await response.json();
      setEvents(data); // Updates the events state with fetched data
    } catch (error) {
      setError(error.message); // Sets the error state in case of an error
    } finally {
      setLoading(false); // Sets loading state to false regardless of result
    }
  }, [netID, searchTerm]); // Dependencies for useCallback

  // useEffect hook to call fetchEvents when the component mounts or dependencies change
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Function to handle refreshing the events
  const handleRefresh = () => {
    fetchEvents();
  };

  // Function to handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents(searchTerm);
  };

  // JSX structure of the component
  return (
    <div>
      <div className="container mx-auto my-8">
        <h1 className="text-4xl font-bold mb-8">Events</h1>
        {/* Search form */}
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search events"
            className="text-gray-700 py-2 px-4 rounded-l border-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r"
            disabled={loading}
          >
            Search
          </button>
        </form>
        {/* NetID input field */}
        <input
          type="text"
          value={netID}
          onChange={(e) => setNetID(e.target.value)}
          placeholder="Enter NetID"
          className="text-gray-700 py-2 px-4 rounded border-2"
        />
        {/* Refresh button */}
        <button 
          onClick={handleRefresh} 
          className="mb-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          disabled={loading}
        >
          Refresh
        </button>
        {/* Grid layout for events */}
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

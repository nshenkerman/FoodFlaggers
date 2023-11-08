'use client'
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, FlatList } from 'react';

// ... rest of your component


const Home = () => {
  // ... (keep your useState and functions)
  const [foodPreference, setFoodPreference] = useState('');
  const [pricePreference, setPricePreference] = useState('');
  const [uid, setUid] = useState('');
  const [eventDetails, setEventDetails] = useState({
    event_id: '', host_uid: '', title: '', description: '', start_time: '', end_time: '', food_type: '', price_type: '', num_upvotes: 0, num_downvotes: 0
  });
  const [events, setEvents] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State to hold the search results

  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [foodType, setFoodType] = useState('');
  const [priceType, setPriceType] = useState('');


  // API Calls
  const getAllEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      setEvents(data); // Store the events in the state
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };


  const updatePreferences = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/update_preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, food_preference: foodPreference, price_preference: pricePreference }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error('Failed to update preferences:', err);
    }
  };

  const postEvent = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/post_event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: 45,
          host_uid: 3,
          title: eventTitle,
          description: eventDescription,
          start_time: null,
          end_time: null,
          food_type: foodType,
          price_type: priceType,
          num_upvotes: 0,
          num_downvotes: 0,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error('Failed to post the event:', err);
    }
  };

  const upvoteEvent = async (eventId) => {
    try {
      const response = await fetch('http://localhost:5000/api/upvote_event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event_id: eventId }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error('Failed to upvote event:', err);
    }
  };


  const searchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/search_event?search_input=${searchInput}`);
      const data = await response.json();
      setSearchResults(data); // Store the search results in the state
    } catch (err) {
      console.error('Failed to search events:', err);
    }
  };


  return (
    <div className="flex flex-col p-4 bg-white">
      <input
        type="text"
        placeholder="Search for posts"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4"
      />
      <button
        onClick={searchEvent}
        className="bg-blue-500 text-white rounded p-2 mb-4"
      >
        Search
      </button>

      {/* ... (rest of your components, replacing React Native components with HTML elements) */}

      {/* Here's an example for a list item within your FlatList equivalent */}
      <div>
        {searchResults.map((item) => (
          <div key={item.event_id} className="border p-4 rounded mb-4">
            <span className="font-bold">{item.title}</span>
            {/* ... (other fields) */}
          </div>
        ))}
      </div>

      {/* ... (additional UI elements using HTML and Tailwind CSS classes) */}
    </div>
  );
};

export default Home;

import React from 'react';
import { useState } from 'react';
import { useAuth } from '@/app/AuthContext';

const Event = ({ eventData }) => {
    // useState hooks for managing likes and reports state
    const [likes, setLikes] = useState(eventData.num_likes);
    const [reports, setReports] = useState(eventData.num_reports);
    const { isSignedIn, signIn, signOut, isGuest } = useAuth(); // Destructuring methods from useAuth hook

    // Formats the given date to a specific format required by Google Calendar
    const formatDateForGoogleCalendar = (date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    };

    // Constructs a Google Calendar link with event details
    const googleCalendarLink = () => {
      const startTime = formatDateForGoogleCalendar(new Date(eventData.start_time));
      const endTime = formatDateForGoogleCalendar(new Date(eventData.end_time));
      const title = encodeURIComponent(eventData.title);
      const description = encodeURIComponent(eventData.description);
    
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${description}`;
    };

    // Handles the 'like' button click
    const handleLike = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/upvote_event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ event_id: eventData.event_id }),
        });
        if (response.ok) {
          setLikes(likes + 1); // Increment likes if the update was successful
        } else {
          throw new Error('Failed to update likes');
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Handles the 'report' button click
    const handleReport = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/report_event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ event_id: eventData.event_id }),
        });
        if (response.ok) {
          setReports(reports + 1); // Increment reports if the update was successful
        } else {
          throw new Error('Failed to update reports');
        }
      } catch (error) {
        console.error(error);
      }
    };

    // JSX structure of the component
    return (
      <div className="bg-white shadow-md rounded-lg p-4 w-full">
        <h2 className="text-2xl font-semibold">{eventData.title}</h2>
        <p className="text-gray-600">{eventData.description}</p>
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-2 md:mb-0">
            {/* Displaying event details */}
            <p className="text-gray-700">Start Time: {new Date(eventData.start_time).toLocaleString()}</p>
            <p className="text-gray-700">End Time: {new Date(eventData.end_time).toLocaleString()}</p>
            <p className="text-gray-700">Food Type: {eventData.food_type}</p>
            <p className="text-gray-700 mb-2">Price Type: {eventData.price_type}</p>
            {/* Google Calendar link */}
            <a href={googleCalendarLink()} target="_blank" rel="noopener noreferrer" className="bg-indigo-300 hover:bg-indigo-500 text-white font-semibold py-2 px-4 my-3 rounded">
              Add to Google Calendar
            </a>
          </div>
          {/* Like and Report buttons, shown only if not a guest */}
          {!isGuest && (
            <div className="flex space-x-2">
              <button onClick={handleLike} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Like ({likes})
              </button>
              <button onClick={handleReport} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                Report ({reports})
              </button>
            </div>
          )}
        </div>
      </div>
    );
};

export default Event;

import React from 'react';
import { useState } from 'react';
import { useAuth } from '@/app/AuthContext';
const Event = ({ eventData }) => {
    const [likes, setLikes] = useState(eventData.num_likes);
    const [reports, setReports] = useState(eventData.num_reports);
    const { isSignedIn, signIn, signOut , isGuest} = useAuth();


    const formatDateForGoogleCalendar = (date) => {
      // Format the date in 'YYYYMMDDTHHmmssZ' format for Google Calendar
      return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    };
    
    const googleCalendarLink = () => {
      const startTime = formatDateForGoogleCalendar(new Date(eventData.start_time));
      const endTime = formatDateForGoogleCalendar(new Date(eventData.end_time));
      const title = encodeURIComponent(eventData.title);
      const description = encodeURIComponent(eventData.description);
    
      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${description}`;
    };
    
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
          // Increment likes if the update was successful
          setLikes(likes + 1);
        } else {
          throw new Error('Failed to update likes');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
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
          // Increment reports if the update was successful
          setReports(reports + 1);
        } else {
          throw new Error('Failed to update reports');
        }
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <h2 className="text-2xl font-semibold">{eventData.title}</h2>
      <p className="text-gray-600">{eventData.description}</p>
      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-2 md:mb-0">
          <p className="text-gray-700">Start Time: {new Date(eventData.start_time).toLocaleString()}</p>
          <p className="text-gray-700">End Time: {new Date(eventData.end_time).toLocaleString()}</p>
          <p className="text-gray-700">Food Type: {eventData.food_type}</p>
          <p className="text-gray-700 mb-2">Price Type: {eventData.price_type}</p>
          <a href={googleCalendarLink()} target="_blank" rel="noopener noreferrer" className="bg-indigo-300 hover:bg-indigo-500 text-white font-semibold py-2 px-4 my-3 rounded">
            Add to Google Calendar
          </a>
        </div>
        {!isGuest && <div className="flex space-x-2">
            <button onClick={handleLike} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Like ({likes})
            </button>
            <button onClick={handleReport} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                Report ({reports})
            </button>
        </div>}
      </div>
      
    </div>
  );
};

export default Event;

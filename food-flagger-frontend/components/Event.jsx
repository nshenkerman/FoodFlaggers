import React from 'react';

const Event = () => {
  const eventData = {
    event_id: 1,
    host_uid: 123,
    title: 'Sample Event',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel nisi nec dui venenatis lacinia.',
    start_time: '2023-11-09T12:00:00',
    end_time: '2023-11-09T14:00:00',
    food_type: 'Vegetarian',
    price_type: 'Free',
    num_likes: 10,
    num_reports: 2,
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
          <p className="text-gray-700">Price Type: {eventData.price_type}</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Like ({eventData.num_likes})
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
            Report ({eventData.num_reports})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;

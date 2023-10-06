import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, FlatList } from 'react-native';


const App = () => {
  // States
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
      const response = await fetch('/api/post_event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          host_uid: 3,
          title: eventTitle,
          description: eventDescription,
          start_time: startTime,
          end_time: endTime,
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
    <ScrollView style={styles.container}>
      <TextInput placeholder="Search for posts" value={searchInput} onChangeText={setSearchInput} style={styles.input} />
      <Button title="Search" onPress={searchEvent} />


      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.event_id.toString()} // Assuming event_id is a unique number
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Host UID: {item.host_uid}</Text>
            <Text>Event ID: {item.event_id}</Text>
            <Text>Upvotes: {item.num_upvotes}</Text>
            {/* ... Add other fields as required ... */}
          </View>
        )}
      />

      <Button title="Get All Events" onPress={getAllEvents} />

      <FlatList
        data={events}
        keyExtractor={(item) => item.event_id.toString()} // Assuming event_id is a unique number
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Host UID: {item.host_uid}</Text>
            <Text>Event ID: {item.event_id}</Text>
            <Text>Upvotes: {item.num_upvotes}</Text>
            {/* ... Add other fields as required ... */}
          </View>
        )}
      />

      <View style={styles.formGroup}>
        <Text>Update Preferences:</Text>
        <TextInput placeholder="UID" value={uid} onChangeText={setUid} style={styles.input} />
        <TextInput placeholder="Food Preference" value={foodPreference} onChangeText={setFoodPreference} style={styles.input} />
        <TextInput placeholder="Price Preference" value={pricePreference} onChangeText={setPricePreference} style={styles.input} />
        <Button title="Update Preferences" onPress={updatePreferences} />
      </View>

      <View style={styles.formGroup}>
        <Text>Create a New Event:</Text>
        {/* You can add more inputs for eventDetails as required */}
        <TextInput placeholder="Event ID" value={eventDetails.event_id} onChangeText={(text) => setEventDetails(prev => ({ ...prev, event_id: text }))} style={styles.input} />
        <TextInput placeholder="Title" value={eventDetails.title} onChangeText={(text) => setEventDetails(prev => ({ ...prev, title: text }))} style={styles.input} />
        {/* ... add other fields ... */}
        <Button title="Post Event" onPress={postEvent} />
      </View>

      <View style={styles.formGroup}>
        {/* This is a sample input for event ID to upvote. You might want to iterate over events and generate these buttons dynamically. */}
        <TextInput placeholder="Event ID to upvote" value={eventDetails.event_id} onChangeText={(text) => setEventDetails(prev => ({ ...prev, event_id: text }))} style={styles.input} />
        <Button title="Upvote Event" onPress={() => upvoteEvent(eventDetails.event_id)} />
      </View>

      {/* ... Add more UI elements as required ... */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default App;

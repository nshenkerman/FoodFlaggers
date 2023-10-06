import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (err) {
        setError('Failed to fetch events');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const renderEvent = ({ item }) => (
    <View style={styles.eventContainer}>
      {/* Replace below with your actual event properties */}
      <Text style={styles.eventText}>Event Name: {item.name}</Text>
      <Text style={styles.eventText}>Event Date: {item.date}</Text>
      {/* Add more properties as needed */}
    </View>
  );

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList 
          data={events}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id.toString()} // assuming your events have an 'id' property
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  eventContainer: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 16,
    borderRadius: 5,
  },
  eventText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;

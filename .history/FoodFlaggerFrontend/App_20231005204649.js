import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://172.28.92.72:5000/api/events');
        console.log(response.data);

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
      <Text style={styles.eventText}>ID: {item.event_id}</Text>
      <Text style={styles.eventText}>Title: {item.title}</Text>
      <Text style={styles.eventText}>Description: {item.description}</Text>
      <Text style={styles.eventText}>Start Time: {item.start_time}</Text>
      <Text style={styles.eventText}>End Time: {item.end_time}</Text>
      <Text style={styles.eventText}>Food Type: {item.food_type}</Text>
      <Text style={styles.eventText}>Price Type: {item.price_type}</Text>
      <Text style={styles.eventText}>Upvotes: {item.num_upvotes}</Text>
      <Text style={styles.eventText}>Downvotes: {item.num_downvotes}</Text>
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
          keyExtractor={(item) => item.event_id.toString()}
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
    marginBottom: 5,  // to space out the individual properties a bit
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;

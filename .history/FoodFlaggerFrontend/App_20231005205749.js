import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';

const App = () => {
  // Existing state
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  // New state for form input fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    food_type: '',
    price_type: '',
    num_upvotes: '',
    num_downvotes: ''
  });

  // Fetch events as before
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://172.28.92.72:5000/api/events');
      setEvents(response.data);
    } catch (err) {
      setError('Failed to fetch events');
      console.error(err);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://172.28.92.72:5000/api/event_post', formData);
      fetchData(); // Refresh the events list after posting
      setFormData({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        food_type: '',
        price_type: '',
        num_upvotes: '',
        num_downvotes: ''
      });
    } catch (err) {
      setError('Failed to post event');
      console.error(err);
    }
  };

  // ... Your renderEvent and return as before

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Title"
          value={formData.title}
          onChangeText={(text) => handleInputChange('title', text)}
        />
        <TextInput 
          style={styles.input}
          placeholder="Description"
          value={formData.description}
          onChangeText={(text) => handleInputChange('description', text)}
        />
        {/* Add other input fields here similarly */}
        
        <Button title="Submit" onPress={handleSubmit} />
      </View>

      {/* Your events list here */}
    </View>
  );
};

// Add new styles for the form
const styles = StyleSheet.create({
  // ... Your existing styles

  formContainer: {
    marginBottom: 16,
    backgroundColor: '#e9e9e9',
    padding: 8,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  }
});

export default App;

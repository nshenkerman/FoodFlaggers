'use client'
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useAuth } from '../AuthContext';

const Home = () => {
    // Destructuring methods and properties from the useAuth hook
    const { isSignedIn, signIn, signOut, user } = useAuth();

    // State for managing form data
    const [formData, setFormData] = useState({
        food_preference: '',
        price_preference: '',
        notif_preference: ''
    });

    // State for storing current user preferences
    const [currentPreferences, setCurrentPreferences] = useState({
        food_preference: 'Loading...',
        price_preference: 'Loading...',
        notif_preference: 'Loading...'
    });

    // Function to handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to fetch user preferences from an API
    const fetchPreferences = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/preferences/${user.netid}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setCurrentPreferences(data); // Updates state with fetched preferences
        } catch (err) {
            console.error('Failed to fetch preferences:', err);
            // Error handling logic could be added here
        }
    };

    // Function to refresh the user preferences
    const handleRefresh = () => {
        fetchPreferences();
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/update_preferences/${user.netid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const result = await response.json();
            console.log('Preferences Updated:', result);
            // Handle success, e.g., displaying a success message
        } catch (err) {
            console.error('Failed to update preferences:', err);
            // Error handling logic could be added here
        }
    };
    

    return (
        <div>
            {isSignedIn ? <Header useAuth={useAuth}/> : <div />}

            <div className="flex min-h-full flex-col justify-center px-6 pt-12 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Update Preferences</h2>
                </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"> 
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Food Preference:
                        <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="food_preference" value={formData.food_preference} onChange={handleChange} required>
                            <option value="">Select Food Preference</option>
                            <option value="No Preference">No Preference</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Gluten Free">Gluten Free</option>
                            <option value="Vegan and Gluten Free">Vegan and Gluten Free</option>
                            <option value="Vegetarian and Gluten Free">Vegetarian and Gluten Free</option>
                        </select>
                    </label>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Price Preference:
                        <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="price_preference" value={formData.price_preference} onChange={handleChange} required>
                            <option value="">Select Price Preference</option>
                            <option value="Free">Free</option>
                            <option value="Paid, no food points">Paid, no food points</option>
                            <option value="Paid, food points">Paid, food points</option>
                        </select>
                    </label>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Notification Preference:
                        <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="notif_preference" value={formData.notif_preference} onChange={handleChange} required>
                            <option value="">Select Notification Preference</option>
                            <option value="Often">Often</option>
                            <option value="Sometimes">Sometimes</option>
                            <option value="Never">Never</option>
                        </select>
                    </label>
                        <button className="hover:bg-indigo-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  type="submit">Update Preferences</button>
                </form>
                </div>
            </div>

            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                
                <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Current Preferences</h3>
 
                <div className="border-2 border-gray-500">
                    
                    <p className="text-center text-indigo-500 ">Food Preference: {currentPreferences.food_preference}</p>
                    <p className = "text-center text-indigo-500 ">Price Preference: {currentPreferences.price_preference}</p>
                    <p className='text-center text-indigo-500 '>Notification Preference: {currentPreferences.notif_preference}</p>
                    <button onClick={handleRefresh} className="hover:bg-indigo-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >
                        Refresh Preferences
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default Home;

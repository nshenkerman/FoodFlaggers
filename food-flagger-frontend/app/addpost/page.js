'use client'

import Header from "@/components/Header";
import { useState } from 'react';
import { useAuth } from "../AuthContext";
const Home = () => {


    const [formData, setFormData] = useState({
        netid: '',
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        food_type: '',
        price_type: ''
    });
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/post_event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const result = await response.json();
            console.log('Event Created:', result);
            
            // If the post is successful, redirect to the home page
            window.location.href = '/';
        } catch (err) {
            console.error('Failed to create event:', err);
            // Here, you can handle errors, for example by setting an error state and displaying a message to the user
            // setError(err.message); // Uncomment and use if you have an error state set up
        }
    };
    const { isSignedIn, signIn, signOut } = useAuth();

    return (
        <div>
            {isSignedIn ? <Header useAuth={useAuth}/> : <div />}
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Post New Event</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                           NetID:
                            <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" name="netid" value={formData.netid} onChange={handleChange} required />
                        </label>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Title:
                            <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" name="title" value={formData.title} onChange={handleChange} required />
                        </label>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Description:
                            <textarea className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="description" value={formData.description} onChange={handleChange} required />
                        </label>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Start Time:
                            <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} required />
                        </label>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            End Time:
                            <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} required />
                        </label>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Food Type:
                            <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="food_type" value={formData.food_type} onChange={handleChange} required>
                                <option value="">Select Food Type</option>
                                <option value="Limited Menu">Limited Menu</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Gluten Free">Gluten Free</option>
                                <option value="Vegan and Gluten Free">Vegan and Gluten Free</option>
                                <option value="Vegetarian and Gluten Free">Vegetarian and Gluten Free</option>
                            </select>
                        </label>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Price Type:
                            <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" name="price_type" value={formData.price_type} onChange={handleChange} required>
                                <option value="">Select Price Type</option>
                                <option value="Free">Free</option>
                                <option value="Paid, no food points">Paid, no food points</option>
                                <option value="Paid, food points">Paid, food points</option>
                            </select>
                        </label>
                        <button className="hover:bg-indigo-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="submit">Create Event</button>
                    </form>
                </div>
                
            </div>
        </div>
        
    );
};

export default Home;


import React from 'react';
import FitnessLog from '../components/FitnessLog';
import GoalTracking from '../components/GoalTracking';
import Footer from './Footer';
import { Form, Link } from 'react-router-dom';  // Make sure to import Link for routing


const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-screen-xl mx-auto py-12 px-6">
        {/* Dashboard Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Health Dashboard</h1>
          <p className="text-lg text-gray-600">Track your fitness, nutrition, and goals all in one place</p>
        </div>

        {/* Health and Wellness Image
        <div className="mb-12 text-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3nXvgfUresNr-pR-cOWukjmsW5oHSOVu6lg&s" 
            alt="Health and Wellness"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div> */}

        {/* Dashboard Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Fitness Tracking Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Fitness Tracking</h2>
            <FitnessLog />
          </div>

          {/* Goal Tracking Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Goal Tracking</h2>
            <GoalTracking />
          </div>
        </div>

        {/* Link to Contact Page */}
        <div className="text-center mt-8">
          <Link to="/contact" className="text-blue-600 hover:underline">Need Help? Contact Us</Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

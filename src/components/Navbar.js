import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-green-500 p-7 text-white flex justify-between">
    <h1 className="text-xl font-bold">Health & Wellness</h1>
    <div className="flex space-x-4">
      <Link to="/">Home</Link>

      <Link to="/login">Login/Register</Link>

      <Link to="/P">Profile</Link>
     
      <Link to="/fitness">FitnessTracking </Link> 

      <Link to="/nutrition">NutritionTracking</Link>
      {/* <Link to="/nutritionGoal">NutritionGoal</Link> */}
     
      <Link to="/Goal">GoalTracking</Link>
    </div>
  </nav>
);

export default Navbar;


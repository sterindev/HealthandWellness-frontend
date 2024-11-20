import React, { useState } from 'react';
import axios from 'axios';

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '', // Only for registration
  });
  const [error, setError] = useState(null); // To track error messages
  const [successMessage, setSuccessMessage] = useState(null); // For success pop-up message

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register'; // API endpoint based on login or register

    try {
      const response = await axios.post(url, {
        email: formData.email,
        password: formData.password,
        ...(isLogin ? {} : { username: formData.username }), // Add username for registration
      });
      console.log(response.data);

      if (response.status === 200) {
        // Success: Set success message
        setSuccessMessage(isLogin ? 'Login successful!' : 'Registration successful!');
        setError(null); // Clear any previous error messages
        setTimeout(() => setSuccessMessage(null), 3000); // Hide success message after 3 seconds
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      // Handle errors: Set error message (e.g., user already exists or incorrect credentials)
      setError(error.response ? error.response.data.message : 'An error occurred');
      setSuccessMessage(null); // Clear any previous success messages
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {isLogin ? 'Login' : 'Register'}
      </h2>

      {/* Success message pop-up */}
      {successMessage && (
        <div className="bg-green-200 text-green-700 p-2 mb-4 rounded-md text-center">
          {successMessage}
        </div>
      )}

      {/* Error message pop-up */}
      {error && (
        <div className="bg-red-200 text-red-700 p-2 mb-4 rounded-md text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <span className="text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 ml-2"
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </span>
      </div>
    </div>
  );
};

export default LoginRegisterPage;


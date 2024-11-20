import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    preferences: {
      unit: 'metric',
      goal: 'maintain',
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [healthData, setHealthData] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' }); // New state for notifications
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setNotification({ message: 'Error fetching user data', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchHealthData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/user/tracking', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHealthData(response.data);
      } catch (err) {
        console.error('Error fetching health data:', err);
        setNotification({ message: 'Error fetching health data', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    fetchHealthData();
  }, []);

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle form submission to update user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/user/profile', userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false); // Exit edit mode after saving
      setNotification({ message: 'Profile updated successfully!', type: 'success' });
    } catch (err) {
      console.error('Error updating profile:', err);
      setNotification({ message: 'Failed to update profile!', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Notification Popup
  const notificationClass = notification.type === 'success' ? 'bg-green-500' : 'bg-red-500';

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification.message) {
      const timeout = setTimeout(() => setNotification({ message: '', type: '' }), 5000);
      return () => clearTimeout(timeout); // Clean up the timeout
    }
  }, [notification]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Manage Your Profile</h2>

      {/* Display Notification Popup */}
      {notification.message && (
        <div className={`${notificationClass} text-white p-4 rounded-md mb-4`}>
          {notification.message}
        </div>
      )}

      {/* Loading State */}
      {isLoading && <div className="text-center text-gray-500">Loading...</div>}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={!isEditing}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-500"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
            Unit of Measurement
          </label>
          <select
            id="unit"
            name="preferences.unit"
            value={userData.preferences.unit}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={!isEditing}
          >
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lbs, ft)</option>
          </select>
        </div>

        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
            Fitness Goal
          </label>
          <select
            id="goal"
            name="preferences.goal"
            value={userData.preferences.goal}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={!isEditing}
          >
            <option value="maintain">Maintain Weight</option>
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Muscle</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            disabled={!isEditing || isLoading}
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </form>

      {/* Health Tracking Data */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-center mb-4">Your Health Progress</h2>
        {healthData.length === 0 ? (
          <p className="text-center text-gray-500">No health data available.</p>
        ) : (
          <ul className="space-y-4">
            {healthData.map((item, index) => (
              <li key={index} className="p-4 border border-gray-300 rounded-md">
                <div>
                  <strong>{item.date}</strong>
                  <p>Exercise: {item.exercise}</p>
                  <p>Calories Burned: {item.calories}</p>
                  <p>Nutrition: {item.nutrition}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProfilePage = () => {
//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     preferences: {
//       unit: 'metric',
//       goal: 'maintain',
//     },
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [healthData, setHealthData] = useState([]);
//   const [notification, setNotification] = useState({ message: '', type: '' }); // New state for notifications

//   // Fetch user data from API
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('/api/user/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUserData(response.data);
//       } catch (err) {
//         console.error('Error fetching user data:', err);
//       }
//     };

//     const fetchHealthData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('/api/user/tracking', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setHealthData(response.data);
//       } catch (err) {
//         console.error('Error fetching health data:', err);
//       }
//     };

//     fetchUserData();
//     fetchHealthData();
//   }, []);

//   // Handle input change for form fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   // Handle form submission to update user data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put('/api/user/profile', userData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsEditing(false); // Exit edit mode after saving
//       setNotification({ message: 'Profile updated successfully!', type: 'success' }); // Show success notification
//     } catch (err) {
//       console.error('Error updating profile:', err);
//       setNotification({ message: 'Failed to update profile!', type: 'error' }); // Show error notification
//     }
//   };

//   // Notification Popup
//   const notificationClass = notification.type === 'success' ? 'bg-green-500' : 'bg-red-500';

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold text-center mb-4">Manage Your Profile</h2>

//       {/* Display Notification Popup */}
//       {notification.message && (
//         <div className={`${notificationClass} text-white p-4 rounded-md mb-4`}>
//           {notification.message}
//         </div>
//       )}

//       {/* Profile Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={userData.name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             disabled={!isEditing}
//           />
//         </div>

//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={userData.email}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             disabled={!isEditing}
//           />
//         </div>

//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={userData.password}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             disabled={!isEditing}
//           />
//         </div>

//         <div>
//           <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
//             Unit of Measurement
//           </label>
//           <select
//             id="unit"
//             name="preferences.unit"
//             value={userData.preferences.unit}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             disabled={!isEditing}
//           >
//             <option value="metric">Metric (kg, cm)</option>
//             <option value="imperial">Imperial (lbs, ft)</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
//             Fitness Goal
//           </label>
//           <select
//             id="goal"
//             name="preferences.goal"
//             value={userData.preferences.goal}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//             disabled={!isEditing}
//           >
//             <option value="maintain">Maintain Weight</option>
//             <option value="lose">Lose Weight</option>
//             <option value="gain">Gain Muscle</option>
//           </select>
//         </div>

//         <div className="flex justify-between">
//           <button
//             type="submit"
//             className="bg-green-500 text-white px-4 py-2 rounded-md"
//             disabled={!isEditing}
//           >
//             Save Changes
//           </button>
//           <button
//             type="button"
//             onClick={() => setIsEditing(!isEditing)}
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
//           >
//             {isEditing ? 'Cancel' : 'Edit Profile'}
//           </button>
//         </div>
//       </form>

//       {/* Health Tracking Data */}
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold text-center mb-4">Your Health Progress</h2>
//         <ul className="space-y-4">
//           {healthData.map((item, index) => (
//             <li key={index} className="p-4 border border-gray-300 rounded-md">
//               <div>
//                 <strong>{item.date}</strong>
//                 <p>Exercise: {item.exercise}</p>
//                 <p>Calories Burned: {item.calories}</p>
//                 <p>Nutrition: {item.nutrition}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

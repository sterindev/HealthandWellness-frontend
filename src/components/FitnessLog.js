import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // For popups
import 'react-toastify/dist/ReactToastify.css'; // Toast CSS
import { Bar } from 'react-chartjs-2'; // Bar chart

// Import and register Chart.js components
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const FitnessLog = () => {
  const [exerciseData, setExerciseData] = useState({
    exerciseType: 'Running',
    duration: 0,
    distance: 0,
  });

  const [exerciseLogs, setExerciseLogs] = useState([]); // State to store exercise logs

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({ ...exerciseData, [name]: value });
  };

  // Calculate calories burned based on exercise type and duration
  const calculateCalories = () => {
    let calories = 0;
    switch (exerciseData.exerciseType) {
      case 'Running':
        calories = exerciseData.duration * 10;
        break;
      case 'Cycling':
        calories = exerciseData.duration * 8;
        break;
      case 'Strength Training':
        calories = exerciseData.duration * 6;
        break;
      default:
        calories = 0;
    }
    return calories;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (exerciseData.duration <= 0 || exerciseData.distance < 0) {
      toast.error('Invalid input! Duration must be positive and distance cannot be negative.');
      return;
    }

    const calories = calculateCalories();

    try {
      await axios.post('https://healthandwellness-backend.onrender.com/api/exercises', {
        exerciseType: exerciseData.exerciseType,
        duration: exerciseData.duration,
        distance: exerciseData.distance,
        caloriesBurned: calories,
      });

      // Notify success
      toast.success('Exercise logged successfully!');
      setExerciseData({
        exerciseType: 'Running',
        duration: 0,
        distance: 0,
      });

      // Update logs state
      fetchExerciseLogs();
    } catch (error) {
      console.error('Error logging exercise:', error);
      toast.error('Failed to log exercise!');
    }
  };

  // Fetch exercise logs from backend
  const fetchExerciseLogs = async () => {
    try {
      const response = await axios.get('https://healthandwellness-backend.onrender.com/api/exercises');
      setExerciseLogs(response.data); // Set logs in state
    } catch (error) {
      console.error('Error fetching exercise logs:', error);
    }
  };

  useEffect(() => {
    fetchExerciseLogs(); // Fetch logs on component mount
  }, []);

  // Data for the bar chart
  const chartData = {
    labels: exerciseLogs.map((log) => log.exerciseType),
    datasets: [
      {
        label: 'Calories Burned',
        data: exerciseLogs.map((log) => log.caloriesBurned),
        backgroundColor: ['#4CAF50', '#FFC107', '#FF5722'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Toast Notifications */}
      <ToastContainer />

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Log Your Exercise</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Exercise Type */}
        <div>
          <label htmlFor="exerciseType" className="block text-sm font-medium text-gray-600">Exercise Type:</label>
          <select
            id="exerciseType"
            name="exerciseType"
            value={exerciseData.exerciseType}
            onChange={handleInputChange}
            className="mt-2 p-2 w-full border rounded-md"
          >
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Strength Training">Strength Training</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-600">Duration (minutes):</label>
          <input
            id="duration"
            type="number"
            name="duration"
            value={exerciseData.duration}
            onChange={handleInputChange}
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="Duration in minutes"
          />
        </div>

        {/* Distance */}
        <div>
          <label htmlFor="distance" className="block text-sm font-medium text-gray-600">Distance (miles or km):</label>
          <input
            id="distance"
            type="number"
            name="distance"
            value={exerciseData.distance}
            onChange={handleInputChange}
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="Distance traveled"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-yellow-500"
        >
          Log Exercise
        </button>
      </form>

      {/* Bar Chart */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Calories Burned Overview</h2>
        {exerciseLogs.length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <p>No logs to display.</p>
        )}
      </div>
    </div>
  );
};

export default FitnessLog;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify'; // For popups
// import 'react-toastify/dist/ReactToastify.css'; // Toast CSS
// import { Bar } from 'react-chartjs-2'; // Bar chart

// const FitnessLog = () => {
//   const [exerciseData, setExerciseData] = useState({
//     exerciseType: 'Running',
//     duration: 0,
//     distance: 0,
//     caloriesBurned: 0,
//   });

//   const [exerciseLogs, setExerciseLogs] = useState([]); // State to store exercise logs

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setExerciseData({ ...exerciseData, [name]: value });
//   };

//   // Calculate calories burned based on exercise type and duration
//   const calculateCalories = () => {
//     let calories = 0;
//     switch (exerciseData.exerciseType) {
//       case 'Running':
//         calories = exerciseData.duration * 10;
//         break;
//       case 'Cycling':
//         calories = exerciseData.duration * 8;
//         break;
//       case 'Strength Training':
//         calories = exerciseData.duration * 6;
//         break;
//       default:
//         calories = 0;
//     }
//     return calories;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const calories = calculateCalories();

//     try {
//       // const response = 
//       await axios.post('https://healthandwellness-backend.onrender.com/api/exercises', {
//         exerciseType: exerciseData.exerciseType,
//         duration: exerciseData.duration,
//         distance: exerciseData.distance,
//         caloriesBurned: calories,

//       });
  
//       // Notify success
//       toast.success('Exercise logged successfully!');
//       setExerciseData({
//         exerciseType: 'Running',
//         duration: 0,
//         distance: 0,
//         caloriesBurned: 0,
//       });

//       // Update logs state
//       fetchExerciseLogs();
//     } catch (error) {
//       console.error('Error logging exercise:', error);
//       toast.error('Failed to log exercise!');
//     }
//   };

//   // Fetch exercise logs from backend
//   const fetchExerciseLogs = async () => {
//     try {
//       const response = await axios.get('https://healthandwellness-backend.onrender.com/api/exercises');
//       setExerciseLogs(response.data); // Set logs in state
//     } catch (error) {
//       console.error('Error fetching exercise logs:', error);
//     }
//   };

//   useEffect(() => {
//     fetchExerciseLogs(); // Fetch logs on component mount
//   }, []);

//   // Data for the bar chart
//   const chartData = {
//     labels: exerciseLogs.map((log) => log.exerciseType),
//     datasets: [
//       {
//         label: 'Calories Burned',
//         data: exerciseLogs.map((log) => log.caloriesBurned),
//         backgroundColor: ['#4CAF50', '#FFC107', '#FF5722'],
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: true, position: 'top' },
//     },
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Toast Notifications */}
//       <ToastContainer />

//       <h2 className="text-2xl font-semibold text-gray-700 mb-4">Log Your Exercise</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Exercise Type */}
//         <div>
//           <label htmlFor="exerciseType" className="block text-sm font-medium text-gray-600">Exercise Type:</label>
//           <select
//             id="exerciseType"
//             name="exerciseType"
//             value={exerciseData.exerciseType}
//             onChange={handleInputChange}
//             className="mt-2 p-2 w-full border rounded-md"
//           >
//             <option value="Running">Running</option>
//             <option value="Cycling">Cycling</option>
//             <option value="Strength Training">Strength Training</option>
//           </select>
//         </div>

//         {/* Duration */}
//         <div>
//           <label htmlFor="duration" className="block text-sm font-medium text-gray-600">Duration (minutes):</label>
//           <input
//             id="duration"
//             type="number"
//             name="duration"
//             value={exerciseData.duration}
//             onChange={handleInputChange}
//             className="mt-2 p-2 w-full border rounded-md"
//             placeholder="Duration in minutes"
//           />
//         </div>

//         {/* Distance */}
//         <div>
//           <label htmlFor="distance" className="block text-sm font-medium text-gray-600">Distance (miles or km):</label>
//           <input
//             id="distance"
//             type="number"
//             name="distance"
//             value={exerciseData.distance}
//             onChange={handleInputChange}
//             className="mt-2 p-2 w-full border rounded-md"
//             placeholder="Distance traveled"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full py-2 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-yellow-500"
//         >
//           Log Exercise
//         </button>
//       </form>

//       {/* Bar Chart */}
//       <div className="mt-10">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Calories Burned Overview</h2>
//         {exerciseLogs.length > 0 ? (
//           <Bar data={chartData} options={chartOptions} />
//         ) : (
//           <p>No logs to display.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FitnessLog;






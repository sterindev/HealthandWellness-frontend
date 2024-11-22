import React, { useState } from 'react'; // Import useState from React
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NutritionGoals = () => {
  const [goals, setGoals] = useState({
    calorieGoal: 2000,
    proteinGoal: 100,
    carbGoal: 250,
    fatGoal: 70,
  });

  const [popup, setPopup] = useState({ show: false, message: '', type: '' });

  const handleGoalSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://healthandwellness-backend.onrender.com/api/nutrition-goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goals),
      });

      const data = await response.json();

      if (response.ok) {
        setPopup({ show: true, message: 'Goal successfully set!', type: 'success' });
      } else {
        setPopup({ show: true, message: data.message, type: 'error' });
      }
    } catch (error) {
      setPopup({ show: true, message: 'An error occurred. Please try again.', type: 'error' });
    }
  };

  // Chart.js Data
  const chartData = {
    labels: ['Calories', 'Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        label: 'Nutrition Goals',
        data: [goals.calorieGoal, goals.proteinGoal, goals.carbGoal, goals.fatGoal],
        borderColor: '#4BC0C0',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Chart.js Options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Nutrition Goals',
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Set Your Nutrition Goals</h2>
      
      {/* Popup */}
      {popup.show && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-lg text-white ${
            popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {popup.message}
          <button
            className="ml-4 text-black bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            onClick={() => setPopup({ show: false, message: '', type: '' })}
          >
            Close
          </button>
        </div>
      )}

      <form onSubmit={handleGoalSubmit} className="space-y-4">
        <div>
          <label htmlFor="calorieGoal" className="block text-sm font-medium text-gray-600">Daily Calorie Goal:</label>
          <input
            id="calorieGoal"
            type="number"
            value={goals.calorieGoal}
            onChange={(e) => setGoals({ ...goals, calorieGoal: e.target.value })}
            className="mt-2 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="proteinGoal" className="block text-sm font-medium text-gray-600">Protein Goal (g):</label>
          <input
            id="proteinGoal"
            type="number"
            value={goals.proteinGoal}
            onChange={(e) => setGoals({ ...goals, proteinGoal: e.target.value })}
            className="mt-2 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="carbGoal" className="block text-sm font-medium text-gray-600">Carb Goal (g):</label>
          <input
            id="carbGoal"
            type="number"
            value={goals.carbGoal}
            onChange={(e) => setGoals({ ...goals, carbGoal: e.target.value })}
            className="mt-2 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="fatGoal" className="block text-sm font-medium text-gray-600">Fat Goal (g):</label>
          <input
            id="fatGoal"
            type="number"
            value={goals.fatGoal}
            onChange={(e) => setGoals({ ...goals, fatGoal: e.target.value })}
            className="mt-2 p-2 w-full border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-yellow-500"
        >
          Set Goals
        </button>
      </form>

      {/* Chart for Nutrition Goals */}
      <div className="mt-8">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default NutritionGoals;

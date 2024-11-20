import React, { useState } from 'react';
import { PolarArea } from 'react-chartjs-2';

const NutritionTracking = () => {
  const [foodLog, setFoodLog] = useState({
    foodName: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    mealType: 'breakfast',
  });

  const [popup, setPopup] = useState({ show: false, message: '', type: '' });
  const [loggedFoodLogs, setLoggedFoodLogs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/foodlogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodLog),
      });

      const data = await response.json();

      if (response.ok) {
        setPopup({ show: true, message: 'Food log added successfully!', type: 'success' });
        setLoggedFoodLogs([...loggedFoodLogs, foodLog]);
        setFoodLog({
          foodName: '',
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          mealType: 'breakfast',
        });
      } else {
        setPopup({ show: true, message: `Error: ${data.message}`, type: 'error' });
      }
    } catch (error) {
      setPopup({ show: true, message: 'An error occurred. Please try again.', type: 'error' });
    }
  };

  const chartData = {
    labels: ['Calories', 'Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        label: 'Food Nutrition Breakdown',
        data: [foodLog.calories, foodLog.protein, foodLog.carbs, foodLog.fat],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Nutrition Tracking</h2>

      {/* Popup */}
      {popup.show && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-lg text-white ${
            popup.type === 'success' ? 'bg-blue-500' : 'bg-red-500'
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

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section: Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="foodName" className="block text-sm font-medium text-gray-600">
                Food Item:
              </label>
              <input
                id="foodName"
                type="text"
                value={foodLog.foodName}
                onChange={(e) => setFoodLog({ ...foodLog, foodName: e.target.value })}
                className="mt-2 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="calories" className="block text-sm font-medium text-gray-600">
                Calories:
              </label>
              <input
                id="calories"
                type="number"
                value={foodLog.calories}
                onChange={(e) => setFoodLog({ ...foodLog, calories: e.target.value })}
                className="mt-2 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="protein" className="block text-sm font-medium text-gray-600">
                Protein (g):
              </label>
              <input
                id="protein"
                type="number"
                value={foodLog.protein}
                onChange={(e) => setFoodLog({ ...foodLog, protein: e.target.value })}
                className="mt-2 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="carbs" className="block text-sm font-medium text-gray-600">
                Carbs (g):
              </label>
              <input
                id="carbs"
                type="number"
                value={foodLog.carbs}
                onChange={(e) => setFoodLog({ ...foodLog, carbs: e.target.value })}
                className="mt-2 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="fat" className="block text-sm font-medium text-gray-600">
                Fat (g):
              </label>
              <input
                id="fat"
                type="number"
                value={foodLog.fat}
                onChange={(e) => setFoodLog({ ...foodLog, fat: e.target.value })}
                className="mt-2 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="mealType" className="block text-sm font-medium text-gray-600">
                Meal Type:
              </label>
              <select
                id="mealType"
                value={foodLog.mealType}
                onChange={(e) => setFoodLog({ ...foodLog, mealType: e.target.value })}
                className="mt-2 p-2 w-full border rounded-md"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-yellow-500"
            >
              Log Food
            </button>
          </form>
        </div>

        {/* Right Section: Chart */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Food Nutrition Breakdown</h3>
          <div className="p-4 border rounded-md bg-gray-50">
            <PolarArea data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Nutrition Goals Section */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Nutrition Goals</h3>
        <p className="text-gray-600">
          Set personalized nutrition goals to help you achieve a balanced and healthy lifestyle. For example, aim to
          consume 2,000 calories daily with a breakdown of 50% carbs, 30% protein, and 20% fat.
        </p>

        <div className="relative mt-6">
          <a href="/nutritionGoal" className="block">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0YgIWw03O3Iw6VILTUIPwMVtwZ3AQRkU9JA&s" // Image URL
              alt="Set Nutrition Goals"
              className="w-full rounded-lg shadow-lg cursor-pointer"
            />
            <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold bg-black bg-opacity-50 rounded-lg">
              Click me to set nutrition goals
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracking;






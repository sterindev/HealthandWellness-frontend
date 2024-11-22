import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';

// Modal Component
const Modal = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-md shadow-lg">
      <p className="text-lg font-semibold text-gray-700">{message}</p>
      <button
        onClick={onClose}
        className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
);

const GoalTracking = () => {
  const [goals, setGoals] = useState({
    dailyStepsGoal: 10000,
    weeklyWorkoutsGoal: 5,
    calorieIntakeGoal: 2000,
  });

  const [progress, setProgress] = useState({
    dailySteps: 0,
    weeklyWorkouts: 0,
    calorieIntake: 0,
  });

  const [isGoalSet, setIsGoalSet] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setGoals({ ...goals, [name]: value });
  };

  const handleProgressChange = (e) => {
    const { name, value } = e.target;
    setProgress({ ...progress, [name]: value });
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    setIsGoalSet(true);
    try {
      const response = await fetch('https://healthandwellness-backend.onrender.com/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goals),
      });
      // const data = 
      await response.json();
      setModalMessage('Goals set successfully!');
      setShowModal(true);
    } catch (error) {
      setModalMessage('Error setting goals. Please try again.');
      setShowModal(true);
    }
  };

  const handleProgressSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://healthandwellness-backend.onrender.com//api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progress),
      });
      // const data = 
      await response.json();
      setModalMessage('Progress updated successfully!');
      setShowModal(true);
    } catch (error) {
      setModalMessage('Error updating progress. Please try again.');
      setShowModal(true);
    }
  };

  const chartData = {
    labels: ['Today', 'This Week'],
    datasets: [
      {
        label: 'Daily Steps Progress',
        data: [progress.dailySteps, 100],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Calorie Intake Progress',
        data: [progress.calorieIntake, 100],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Set and Track Your Goals</h2>
      
      {/* Goal Setting Form */}
      <form onSubmit={handleGoalSubmit} className="space-y-4">
        <div>
          <label htmlFor="dailyStepsGoal" className="block text-sm font-medium text-gray-600">Daily Steps Goal:</label>
          <input
            id="dailyStepsGoal"
            type="number"
            name="dailyStepsGoal"
            value={goals.dailyStepsGoal}
            onChange={handleGoalChange}
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="Steps per day"
          />
        </div>
        <div>
          <label htmlFor="weeklyWorkoutsGoal" className="block text-sm font-medium text-gray-600">Weekly Workouts Goal:</label>
          <input
            id="weeklyWorkoutsGoal"
            type="number"
            name="weeklyWorkoutsGoal"
            value={goals.weeklyWorkoutsGoal}
            onChange={handleGoalChange}
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="Workouts per week"
          />
        </div>
        <div>
          <label htmlFor="calorieIntakeGoal" className="block text-sm font-medium text-gray-600">Calorie Intake Goal:</label>
          <input
            id="calorieIntakeGoal"
            type="number"
            name="calorieIntakeGoal"
            value={goals.calorieIntakeGoal}
            onChange={handleGoalChange}
            className="mt-2 p-2 w-full border rounded-md"
            placeholder="Calories per day"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-green-600 text-white font-semibold rounded-md hover:bg-yellow-600"
        >
          Set Goals
        </button>
      </form>

      {/* Progress Tracking */}
      {isGoalSet && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700">Track Your Progress</h3>

          {/* Progress Inputs */}
          <form onSubmit={handleProgressSubmit} className="space-y-4">
            <div>
              <label htmlFor="dailySteps" className="block text-sm font-medium text-gray-600">Today's Steps:</label>
              <input
                id="dailySteps"
                type="number"
                name="dailySteps"
                value={progress.dailySteps}
                onChange={handleProgressChange}
                className="mt-2 p-2 w-full border rounded-md"
                placeholder="Enter today's steps"
              />
            </div>
            <div>
              <label htmlFor="weeklyWorkouts" className="block text-sm font-medium text-gray-600">Workouts This Week:</label>
              <input
                id="weeklyWorkouts"
                type="number"
                name="weeklyWorkouts"
                value={progress.weeklyWorkouts}
                onChange={handleProgressChange}
                className="mt-2 p-2 w-full border rounded-md"
                placeholder="Enter this week's workouts"
              />
            </div>
            <div>
              <label htmlFor="calorieIntake" className="block text-sm font-medium text-gray-600">Calories Consumed Today:</label>
              <input
                id="calorieIntake"
                type="number"
                name="calorieIntake"
                value={progress.calorieIntake}
                onChange={handleProgressChange}
                className="mt-2 p-2 w-full border rounded-md"
                placeholder="Enter today's calorie intake"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-yellow-600"
            >
              Update Progress
            </button>
          </form>

          {/* Progress Visualization */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-700">Progress Charts</h4>
            <Line data={chartData} />
          </div>
        </div>
      )}

      {/* Modal Pop-ups */}
      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default GoalTracking;


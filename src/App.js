import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import LoginRegisterPage from './pages/LoginRegisterPage';
import FitnessLog from './components/FitnessLog';
import NutritionTracker from './components/NutritionTracker';
import NutritionGoals from './components/NutritionGoals';
import GoalTracking from './components/GoalTracking';
import ContactPage from './pages/ContactPage';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';


const App = () => (
  <Router>
    <Navbar />
    
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<LoginRegisterPage />} />
 
      <Route path="/P" element={<Profile/>}/>  

      <Route path="/fitness" element={<FitnessLog />} />

      <Route path="/nutrition" element={<NutritionTracker/>}/>
      <Route path="/nutritionGoal" element={<NutritionGoals/>}/>

      <Route path="/Goal" element={<GoalTracking/>}/>
    
      <Route path="/about" element={<About />} />

     <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      <Route path="/contact" element={<ContactPage/>}/>
    
    </Routes>
  </Router>
);
export default App;

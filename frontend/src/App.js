import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import WidgetScreen from './Screen/WidgetScreen/WidgetScreen';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginSignup />} />
    <Route path="/login" element={<LoginSignup />} />
    <Route path="/signup" element={<LoginSignup />} />
    <Route path='/dashboard' element={<WidgetScreen />} />
  </Routes>
);

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

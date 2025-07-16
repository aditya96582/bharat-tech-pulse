import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import CropHealth from './pages/CropHealth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/crop-health" element={<CropHealth />} />
      </Routes>
    </Router>
  );
}

export default App;
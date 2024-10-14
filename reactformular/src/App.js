import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PickupSummary from './PickupSummary';
import PickupError from './PickupError';
import HandoverSummary from './HandoverSummary';
import FormSelection from './FormSelection';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<FormSelection />} />
          <Route path="/summary" element={<PickupSummary />} />
          <Route path="/error" element={<PickupError />} />
          <Route path="/handoversummary" element={<HandoverSummary />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
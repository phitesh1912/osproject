
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Documentation from './pages/Documentation/Documentation';
import TestAndSetSimulation from './pages/SyncDemo/TestAndSetSimulation';
import SwapSimulation from './pages/SyncDemo/SwapSimulation';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="testandsetsimulation" element={<TestAndSetSimulation />} />
          <Route path="swapsimulation" element={<SwapSimulation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
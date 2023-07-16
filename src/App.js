import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Hospitals from './components/Hospitals/Hospitals';
import Forms from './components/Forms/Forms';
import HomePage from './components/HomePage/HomePage';
import LandingPage from './components/landingpage/LandingPage';
import PendingRequest from './components/pendingRequest/PendingRequest'
import Verify from './components/verify/Verify';

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/form" element={<Forms />} />
        <Route path="/hospital" element={<Hospitals />} />
        <Route path="/pending" element={<PendingRequest />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    
  );
}

export default App;

import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LocalPage from './pages/LocalPage';
import CloudinaryPage from './pages/CloudinaryPage';
import AwsPage from './pages/AwsPage';

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/local" element={<LocalPage />} />
          <Route path="/cloudinary" element={<CloudinaryPage />} />
          <Route path="/aws" element={<AwsPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

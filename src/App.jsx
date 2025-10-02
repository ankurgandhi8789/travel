import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Explore from './pages/Explore';
import PlaceDetails from './pages/PlaceDetails';
import Tutors from './pages/Tutors';
import BecomeTutor from './pages/BecomeTutor';
import TutorProfile from './pages/TutorProfile';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/place/:id" element={<PlaceDetails />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/become-tutor" element={<BecomeTutor />} />
            <Route path="/tutor/:id" element={<TutorProfile />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App

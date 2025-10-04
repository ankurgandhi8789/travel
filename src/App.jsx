import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PostsProvider } from './context/PostsContext';
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
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <Router>
          <div className="min-h-screen">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/destinations" element={<Explore />} />
            <Route path="/explore" element={<Explore />} />
              <Route path="/place/:id" element={<PlaceDetails />} />
              <Route path="/tutors" element={<Tutors />} />
              <Route path="/become-tutor" element={<BecomeTutor />} />
              <Route path="/tutor/:id" element={<TutorProfile />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </Router>
      </PostsProvider>
    </AuthProvider>
  );
}

export default App

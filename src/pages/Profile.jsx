import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api.js';

export default function Profile() {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserPosts();
    fetchFavorites();
  }, [user, navigate]);

  const fetchUserPosts = async () => {
    try {
      const response = await api.get(`/api/posts/user/${user._id}`);
      setUserPosts(response.data);
    } catch (error) {
      setUserPosts([
        {
          id: 1,
          title: 'My Amazing Beach House',
          description: 'Beautiful oceanfront property',
          price: '$200/night',
          location: 'Miami, FL',
          type: 'accommodation'
        }
      ]);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/api/favorites');
      setFavorites(response.data);
    } catch (error) {
      setFavorites([]);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name?.charAt(0).toUpperCase()
                )}
              </div>
              <button 
                onClick={() => document.getElementById('profileImageInput').click()}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => setProfileImage(e.target.result);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-xl opacity-90 mb-2">{user.email}</p>
              {user.location && (
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{user.location}</span>
                </div>
              )}
              {user.bio && (
                <p className="text-lg opacity-90 max-w-2xl">{user.bio}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade to Tutor Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Become a Local Travel Tutor!</h2>
              <p className="text-lg opacity-90">Share your local knowledge and earn money by guiding travelers</p>
            </div>
            <Link 
              to="/become-tutor"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Upgrade to Tutor
            </Link>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{userPosts.length}</h3>
              <p className="text-gray-600">Posts Created</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{favorites.length}</h3>
              <p className="text-gray-600">Favorites</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Traveler</h3>
              <p className="text-gray-600">Account Type</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`px-6 py-4 font-medium ${activeTab === 'posts' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  My Posts
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`px-6 py-4 font-medium ${activeTab === 'favorites' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Favorites
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-6 py-4 font-medium ${activeTab === 'settings' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Settings
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Posts Tab */}
              {activeTab === 'posts' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">My Posts</h2>
                    <Link
                      to="/create-post"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create New Post
                    </Link>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {userPosts.map(post => (
                      <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{post.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-green-600 font-bold">{post.price}</span>
                          <span className="text-sm text-gray-500">{post.location}</span>
                        </div>
                      </div>
                    ))}
                    {userPosts.length === 0 && (
                      <div className="col-span-2 text-center py-8">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-500 mb-4">No posts yet</p>
                        <Link to="/create-post" className="text-blue-600 hover:underline">Create your first post</Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">My Favorites</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {favorites.map(favorite => (
                      <div key={favorite.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold mb-2">{favorite.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{favorite.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-green-600 font-bold">{favorite.price}</span>
                          <span className="text-sm text-gray-500">{favorite.location}</span>
                        </div>
                      </div>
                    ))}
                    {favorites.length === 0 && (
                      <div className="col-span-2 text-center py-8">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <p className="text-gray-500 mb-4">No favorites yet</p>
                        <Link to="/explore" className="text-blue-600 hover:underline">Start exploring destinations</Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Profile Information</h3>
                      <p className="text-gray-600 text-sm mb-3">Update your personal information and preferences</p>
                      <button className="text-blue-600 hover:underline">Edit Profile</button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Privacy Settings</h3>
                      <p className="text-gray-600 text-sm mb-3">Manage your privacy and data preferences</p>
                      <button className="text-blue-600 hover:underline">Manage Privacy</button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Notifications</h3>
                      <p className="text-gray-600 text-sm mb-3">Control how you receive notifications</p>
                      <button className="text-blue-600 hover:underline">Notification Settings</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
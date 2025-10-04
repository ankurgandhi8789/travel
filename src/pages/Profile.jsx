import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostsContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api.js';

export default function Profile() {
  const { user } = useAuth();
  const { userPosts, addPost, deletePost, updatePost } = usePosts();
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [profileImage, setProfileImage] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'adventure',
    image: '',
    duration: '',
    difficulty: 'Easy',
    groupSize: '',
    includes: [],
    highlights: [],
    bestTime: '',
    languages: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchFavorites();
  }, [user, navigate]);



  const fetchFavorites = async () => {
    // Mock data for demo
    setFavorites([
      {
        id: 1,
        title: 'Badrinath Temple',
        description: 'Sacred Char Dham destination',
        price: '₹4800',
        location: 'Badrinath, Uttarakhand'
      },
      {
        id: 2,
        title: 'Gangotri Temple',
        description: 'Origin of holy river Ganga',
        price: '₹4000',
        location: 'Gangotri, Uttarakhand'
      }
    ]);
  };

  const handleCreatePost = () => {
    if (editingPost) {
      updatePost(editingPost.id, newPost);
      setEditingPost(null);
    } else {
      addPost(newPost);
    }
    setNewPost({
      title: '',
      description: '',
      price: '',
      location: '',
      type: 'adventure',
      image: '',
      duration: '',
      difficulty: 'Easy',
      groupSize: '',
      includes: [],
      highlights: [],
      bestTime: '',
      languages: []
    });
    setShowCreatePost(false);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      description: post.description,
      price: post.price,
      location: post.location,
      type: post.type,
      image: post.image,
      duration: post.duration,
      difficulty: post.difficulty,
      groupSize: post.groupSize,
      includes: post.includes || [],
      highlights: post.highlights || [],
      bestTime: post.bestTime,
      languages: post.languages || []
    });
    setShowCreatePost(true);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(postId);
    }
  };

  const handleInputChange = (field, value) => {
    setNewPost(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInput = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setNewPost(prev => ({ ...prev, [field]: items }));
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
                    <button
                      onClick={() => setShowCreatePost(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create New Post
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {userPosts.map(post => (
                      <div key={post.id} className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium">
                            {post.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">{post.type}</span>
                            <div className="flex items-center text-sm text-gray-600">
                              <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {post.rating} ({post.reviews})
                            </div>
                          </div>
                          <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.description}</p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {post.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {post.duration} • {post.difficulty}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              {post.groupSize}
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-1">Highlights:</p>
                            <div className="flex flex-wrap gap-1">
                              {post.highlights.slice(0, 3).map((highlight, index) => (
                                <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t">
                            <div>
                              <span className="text-2xl font-bold text-green-600">{post.price}</span>
                              <span className="text-sm text-gray-500 ml-1">per person</span>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleEditPost(post)}
                                className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                                title="Edit post"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button 
                                onClick={() => handleDeletePost(post.id)}
                                className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                title="Delete post"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {userPosts.length === 0 && (
                      <div className="col-span-2 text-center py-12">
                        <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No destination posts yet</h3>
                        <p className="text-gray-500 mb-4">Share your travel experiences and help other travelers discover amazing destinations</p>
                        <button onClick={() => setShowCreatePost(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">Create your first post</button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">My Favorites</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {favorites.map(favorite => (
                      <div key={favorite.id} className="bg-white border rounded-xl p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold text-lg">{favorite.title}</h3>
                          <button className="text-red-500 hover:text-red-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{favorite.description}</p>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {favorite.location}
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t">
                          <span className="text-xl font-bold text-green-600">{favorite.price}</span>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                    {favorites.length === 0 && (
                      <div className="col-span-2 text-center py-12">
                        <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No favorites yet</h3>
                        <p className="text-gray-500 mb-4">Save destinations you love to easily find them later</p>
                        <Link to="/explore" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">Start exploring destinations</Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                  <div className="max-w-2xl space-y-6">
                    <div className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold">Profile Information</h3>
                            <p className="text-gray-600 text-sm">Update your personal information and preferences</p>
                          </div>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Edit Profile
                        </button>
                      </div>
                    </div>
                    <div className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold">Privacy Settings</h3>
                            <p className="text-gray-600 text-sm">Manage your privacy and data preferences</p>
                          </div>
                        </div>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                          Manage Privacy
                        </button>
                      </div>
                    </div>
                    <div className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 4.828A4 4 0 015.5 4H9v1H5.5a3 3 0 00-2.121.879l-.707.707A1 1 0 002 7.414V11H1V7.414a2 2 0 01.586-1.414l.707-.707a1 1 0 01.535-.293z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold">Notifications</h3>
                            <p className="text-gray-600 text-sm">Control how you receive notifications</p>
                          </div>
                        </div>
                        <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                          Notification Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{editingPost ? 'Edit Destination Post' : 'Create New Destination Post'}</h2>
                <button onClick={() => { setShowCreatePost(false); setEditingPost(null); }} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleCreatePost(); }} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title *</label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Location *</label>
                    <input
                      type="text"
                      value={newPost.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    value={newPost.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price *</label>
                    <input
                      type="text"
                      value={newPost.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="₹5000"
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration *</label>
                    <input
                      type="text"
                      value={newPost.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      placeholder="3 days"
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Group Size *</label>
                    <input
                      type="text"
                      value={newPost.groupSize}
                      onChange={(e) => handleInputChange('groupSize', e.target.value)}
                      placeholder="8-12 people"
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Type *</label>
                    <select
                      value={newPost.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="adventure">Adventure</option>
                      <option value="spiritual">Spiritual</option>
                      <option value="cultural">Cultural</option>
                      <option value="nature">Nature</option>
                      <option value="historical">Historical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Difficulty *</label>
                    <select
                      value={newPost.difficulty}
                      onChange={(e) => handleInputChange('difficulty', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newPost.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Best Time to Visit</label>
                  <input
                    type="text"
                    value={newPost.bestTime}
                    onChange={(e) => handleInputChange('bestTime', e.target.value)}
                    placeholder="May to October"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">What's Included (comma separated)</label>
                  <input
                    type="text"
                    onChange={(e) => handleArrayInput('includes', e.target.value)}
                    placeholder="Local guide, Accommodation, Meals, Transportation"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Highlights (comma separated)</label>
                  <input
                    type="text"
                    onChange={(e) => handleArrayInput('highlights', e.target.value)}
                    placeholder="Sacred temple visit, Mountain trekking, Spiritual ceremonies"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Languages (comma separated)</label>
                  <input
                    type="text"
                    onChange={(e) => handleArrayInput('languages', e.target.value)}
                    placeholder="Hindi, English, Sanskrit"
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingPost ? 'Update Post' : 'Create Post'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowCreatePost(false); setEditingPost(null); }}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
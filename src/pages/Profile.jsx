import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
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
      const response = await axios.get(`/api/posts/user/${user.id}`);
      setUserPosts(response.data);
    } catch (error) {
      // Use dummy data if API fails
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
      const response = await axios.get('/api/favorites');
      setFavorites(response.data);
    } catch (error) {
      setFavorites([]);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            {user.location && <p className="text-gray-500">{user.location}</p>}
          </div>
        </div>
        {user.bio && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-gray-700">{user.bio}</p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Posts</h2>
            <button
              onClick={() => navigate('/create-post')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Post
            </button>
          </div>
          <div className="space-y-4">
            {userPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-green-600 font-bold">{post.price}</span>
                  <span className="text-sm text-gray-500">{post.location}</span>
                </div>
              </div>
            ))}
            {userPosts.length === 0 && (
              <p className="text-gray-500">No posts yet. Create your first post!</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Favorites</h2>
          <div className="space-y-4">
            {favorites.map(favorite => (
              <div key={favorite.id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold">{favorite.title}</h3>
                <p className="text-gray-600 text-sm">{favorite.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-green-600 font-bold">{favorite.price}</span>
                  <span className="text-sm text-gray-500">{favorite.location}</span>
                </div>
              </div>
            ))}
            {favorites.length === 0 && (
              <p className="text-gray-500">No favorites yet. Start exploring!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
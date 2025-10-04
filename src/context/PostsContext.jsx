import { createContext, useContext, useState } from 'react';

const PostsContext = createContext();

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

export const PostsProvider = ({ children }) => {
  const [userPosts, setUserPosts] = useState([
    {
      id: 1,
      title: 'Spiritual Journey to Kedarnath',
      description: 'Amazing pilgrimage experience with local guide. Trek through scenic mountains and visit the sacred temple.',
      price: '₹5000',
      location: 'Kedarnath, Uttarakhand',
      type: 'spiritual',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400',
      rating: 4.8,
      reviews: 24,
      duration: '3 days',
      difficulty: 'Moderate',
      groupSize: '8-12 people',
      includes: ['Local guide', 'Accommodation', 'Meals', 'Transportation'],
      highlights: ['Sacred temple visit', 'Mountain trekking', 'Spiritual ceremonies'],
      bestTime: 'May to October',
      languages: ['Hindi', 'English'],
      createdAt: '2024-01-15',
      status: 'active',
      authorId: 'user1',
      authorName: 'Travel Guide'
    },
    {
      id: 2,
      title: 'Rishikesh Yoga Retreat',
      description: 'Peaceful yoga and meditation experience by the holy Ganges river with certified instructors.',
      price: '₹3200',
      location: 'Rishikesh, Uttarakhand',
      type: 'spiritual',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      rating: 4.9,
      reviews: 18,
      duration: '2 days',
      difficulty: 'Easy',
      groupSize: '6-10 people',
      includes: ['Yoga sessions', 'Meditation classes', 'Healthy meals', 'Accommodation'],
      highlights: ['Ganges Aarti', 'Morning yoga', 'Meditation by river'],
      bestTime: 'October to March',
      languages: ['Hindi', 'English', 'Sanskrit'],
      createdAt: '2024-01-10',
      status: 'active',
      authorId: 'user1',
      authorName: 'Yoga Master'
    }
  ]);

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now(),
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      authorId: 'currentUser',
      authorName: 'Current User'
    };
    setUserPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = (id, updates) => {
    setUserPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updates } : post
    ));
  };

  const deletePost = (id) => {
    setUserPosts(prev => prev.filter(post => post.id !== id));
  };

  const getPostsByUser = (userId) => {
    return userPosts.filter(post => post.authorId === userId);
  };

  const getAllActivePosts = () => {
    return userPosts.filter(post => post.status === 'active');
  };

  const value = {
    userPosts,
    addPost,
    updatePost,
    deletePost,
    getPostsByUser,
    getAllActivePosts
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email, password) => {
    // Check if user exists in localStorage from registration
    const existingUser = localStorage.getItem('registeredUser');
    if (existingUser) {
      const userData = JSON.parse(existingUser);
      if (userData.email === email) {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return userData;
      }
    }
    
    // Default mock user if no registered user found
    const mockUser = {
      id: 1,
      name: email.split('@')[0],
      email: email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const register = async (userData) => {
    // Create user with registration data
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      location: userData.location,
      bio: userData.bio,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };
    localStorage.setItem('registeredUser', JSON.stringify(newUser));
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = { user, login, register, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
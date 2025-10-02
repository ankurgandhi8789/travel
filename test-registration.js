// Test registration directly
import axios from 'axios';

const testRegistration = async () => {
  try {
    console.log('Testing user registration...');
    
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      location: 'Test City',
      bio: 'Test bio'
    };
    
    const response = await axios.post('http://localhost:5000/api/auth/register', userData);
    console.log('✅ Registration successful:', response.data);
    
    // Test if user exists in database
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: userData.email,
      password: userData.password
    });
    console.log('✅ Login successful:', loginResponse.data.user.name);
    
  } catch (error) {
    console.error('❌ Registration failed:', error.response?.data || error.message);
  }
};

testRegistration();
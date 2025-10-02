// Check what's in the database
import mongoose from 'mongoose';
import User from './backend/models/User.js';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const users = await User.find({});
    console.log(`📊 Total users in database: ${users.length}`);
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - Created: ${user.createdAt}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database error:', error);
    process.exit(1);
  }
};

checkDatabase();
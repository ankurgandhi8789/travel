# 🚀 TravelTutor - Quick Start Guide

## ✅ Step-by-Step Setup

### 1. Start Backend Server
```bash
cd backend
npm run dev
```
**Expected Output:** 
- `Server running on port 5000`
- `Connected to MongoDB`

### 2. Start Frontend Server (New Terminal)
```bash
npm run dev
```
**Expected Output:**
- `Local: http://localhost:5173/`

### 3. Test the Application

**Open Browser:** http://localhost:5173

**Test Flow:**
1. **Home Page** - See 10 travel places
2. **Register** - Create new account
3. **Login** - Use your credentials
4. **Click any place** - View details with vehicles/rooms
5. **Create Post** - Add your own travel post
6. **Profile** - View your posts

### 4. Verify Database (MongoDB Compass)
- **Connection:** `mongodb://127.0.0.1:27017`
- **Database:** `travel-tutor`
- **Collections:** `places`, `users`, `posts`

## 🔧 Troubleshooting

**If Backend Fails:**
```bash
cd backend
npm run seed  # Populate database
npm run dev   # Start server
```

**If Frontend Fails:**
```bash
npm install   # Install dependencies
npm run dev   # Start frontend
```

## 📱 Features Working

✅ User Registration/Login
✅ Browse Travel Places
✅ Place Details with Recommendations
✅ Create Posts (Logged in users)
✅ User Profile
✅ MongoDB Integration
✅ Responsive Design

## 🎯 Ready to Use!

Your travel planner is now fully functional with:
- 10 pre-loaded travel destinations
- User authentication system
- Post creation and management
- Vehicle and accommodation recommendations
- Complete MongoDB integration
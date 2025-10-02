# TravelTutor Setup Guide

## Features Implemented

### Frontend (React + Vite + Tailwind CSS)
- **Authentication**: Login/Register with JWT tokens
- **Home Page**: Browse posts with search functionality
- **Explore Page**: Search destinations and vehicles
- **Profile Page**: View user profile, posts, and favorites
- **Create Post**: Add new travel posts (accommodation, vehicle, place)
- **Responsive Design**: Mobile-friendly interface

### Backend (Node.js + Express)
- **Authentication API**: Register, login, token verification
- **Posts API**: CRUD operations for travel posts
- **Dummy Data**: Pre-populated sample data
- **CORS Support**: Cross-origin requests enabled

## Quick Start

### 1. Install Dependencies

Frontend:
```bash
npm install
```

Backend:
```bash
cd backend
npm install
```

### 2. Start Development Servers

Frontend (Terminal 1):
```bash
npm run dev
```

Backend (Terminal 2):
```bash
cd backend
npm run dev
```

### 3. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Default Test Account
- Email: john@example.com
- Password: password

## Project Structure

```
travel tutor/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Route components
│   ├── context/       # React context (Auth)
│   └── utils/         # API configuration
├── backend/
│   ├── routes/        # API routes
│   ├── models/        # Data models (future)
│   └── middleware/    # Custom middleware (future)
└── public/           # Static assets
```

## Next Steps for Production

1. **Database Integration**: Replace dummy data with MongoDB/PostgreSQL
2. **Google Maps API**: Add location services and mapping
3. **Image Upload**: Implement file upload for post images
4. **Real-time Features**: Add notifications and messaging
5. **Payment Integration**: Add booking and payment systems
6. **Advanced Search**: Implement filters and sorting
7. **Reviews & Ratings**: Add user feedback system

## Environment Variables

Backend (.env):
```
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
MONGODB_URI=mongodb://localhost:27017/travel-tutor
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
# CareerCompass Backend-Frontend Integration Guide

## Overview
This guide explains how the CareerCompass frontend (React/TypeScript) is now connected to the Django backend with authentication, chatbot, and jobs API functionality.

## What's Been Integrated

### 1. Authentication System
- **Frontend**: Login and Signup components with form validation
- **Backend**: Custom login endpoint that returns user data + JWT tokens
- **Features**:
  - JWT token-based authentication
  - Automatic token refresh
  - Protected routes for authenticated users
  - User context management

### 2. Chat Bot Integration
- **Frontend**: Real-time chat interface with session management
- **Backend**: Enhanced chatbot with career-focused responses
- **Features**:
  - Career guidance responses
  - Job search tips
  - Resume advice
  - Interview preparation
  - Skill development recommendations
  - Chat history storage

### 3. Jobs API
- **Frontend**: Job search interface (already connected)
- **Backend**: RapidAPI integration for job listings
- **Features**:
  - Search jobs by title and location
  - Real-time job data from JSearch API

## API Endpoints

### Authentication
- `POST /api/login` - User login (returns tokens + user data)
- `POST /api/register` - User registration
- `POST /api/refresh` - Token refresh

### Chat
- `POST /api/chat` - Send message to chatbot
- `GET /api/chat/history` - Get user's chat history

### Jobs
- `POST /api/jobs/search` - Search for jobs

## Frontend Components Updated

### 1. Authentication Context (`src/contexts/AuthContext.tsx`)
- Manages user authentication state
- Handles login, logout, and registration
- Automatic token refresh

### 2. API Service (`src/services/api.ts`)
- Centralized API communication
- Automatic token attachment
- Error handling and token refresh

### 3. Protected Routes (`src/components/ProtectedRoute.tsx`)
- Redirects unauthenticated users to login
- Loading states for authentication checks

### 4. Login Component (`src/pages/Login.tsx`)
- Form validation and submission
- Error handling
- Redirect after successful login

### 5. Signup Component (`src/pages/Signup.tsx`)
- Multi-field registration form
- Password confirmation validation
- Success feedback

### 6. Chat Component (`src/pages/Chat.tsx`)
- Real-time messaging with backend
- Session management
- Error handling for API failures

## Backend Enhancements

### 1. Custom Login View (`careeradvisor/views.py`)
- Returns user data along with JWT tokens
- Better error messages

### 2. Enhanced Chatbot (`careeradvisor/views.py`)
- Career-focused responses
- Multiple conversation topics
- Contextual advice

### 3. CORS Configuration (`backend/settings.py`)
- Supports both React and Vite dev servers
- Credential support enabled

## How to Test the Integration

### 1. Start the Backend
```bash
cd backend
python manage.py runserver
```

### 2. Start the Frontend
```bash
cd CareerCompass
npm run dev
```

### 3. Test Authentication
1. Go to `/signup` and create an account
2. Go to `/login` and sign in
3. Verify you can access `/chat` and `/jobs` (protected routes)

### 4. Test Chat Functionality
1. Navigate to `/chat`
2. Try these sample messages:
   - "Hello" - Get a greeting
   - "Career guidance" - Get career advice
   - "Job search tips" - Get job search help
   - "Resume help" - Get resume advice

### 5. Test Jobs API
1. Navigate to `/jobs`
2. Search for jobs (e.g., "Software Engineer" in "India")
3. Verify job listings are displayed

## Security Features
- JWT token authentication
- Automatic token refresh
- Protected API endpoints
- CORS configuration
- Input validation on both frontend and backend

## Next Steps for Production
1. Replace the simple chatbot with an actual AI model
2. Add user profile management
3. Implement Google OAuth integration
4. Add more sophisticated job filtering
5. Add email verification for registration
6. Set up proper environment variables
7. Configure production CORS settings

## Troubleshooting
- Ensure both servers are running on correct ports (Django: 8000, Vite: 5173)
- Check browser console for any CORS errors
- Verify JWT tokens are being stored in localStorage
- Check Django logs for API errors

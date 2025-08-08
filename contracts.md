# The One - Social Platform Contracts

## Overview
"The One" is an Orkut-inspired social networking platform with modern features including multiple authentication methods, biometric verification, communities, friend connections, and invitation system.

## API Contracts

### Authentication Endpoints
```
POST /api/auth/register
- Body: { firstName, lastName, email?, phone?, password }
- Returns: { user, token }

POST /api/auth/login
- Body: { email/phone, password }
- Returns: { user, token }

POST /api/auth/google
- Body: { googleToken }
- Returns: { user, token }

POST /api/auth/biometric
- Body: { userId, biometricData }
- Returns: { verified: boolean }

POST /api/auth/logout
- Headers: Authorization
- Returns: { message }
```

### User Management
```
GET /api/users/profile
- Headers: Authorization
- Returns: { user }

PUT /api/users/profile
- Headers: Authorization
- Body: { bio, location, interests }
- Returns: { user }

GET /api/users/search?q={query}
- Headers: Authorization
- Returns: { users[] }

GET /api/users/suggestions
- Headers: Authorization
- Returns: { users[] }
```

### Friends System
```
POST /api/friends/request
- Headers: Authorization
- Body: { userId }
- Returns: { message }

GET /api/friends
- Headers: Authorization
- Returns: { friends[] }

GET /api/friends/requests
- Headers: Authorization
- Returns: { requests[] }

POST /api/friends/accept/{requestId}
- Headers: Authorization
- Returns: { message }
```

### Communities
```
GET /api/communities
- Headers: Authorization
- Query: ?category={category}&search={term}
- Returns: { communities[] }

POST /api/communities
- Headers: Authorization
- Body: { name, description, category, avatar }
- Returns: { community }

POST /api/communities/{id}/join
- Headers: Authorization
- Returns: { message }

GET /api/communities/{id}/members
- Headers: Authorization
- Returns: { members[] }
```

### Posts & Content
```
POST /api/posts
- Headers: Authorization
- Body: { content, communityId?, images? }
- Returns: { post }

GET /api/posts/feed
- Headers: Authorization
- Returns: { posts[] }

POST /api/posts/{id}/like
- Headers: Authorization
- Returns: { message }

POST /api/posts/{id}/comment
- Headers: Authorization
- Body: { content }
- Returns: { comment }
```

### Scraps (Profile Messages)
```
POST /api/scraps
- Headers: Authorization
- Body: { toUserId, content }
- Returns: { scrap }

GET /api/scraps/{userId}
- Headers: Authorization
- Returns: { scraps[] }
```

### Testimonials
```
POST /api/testimonials
- Headers: Authorization
- Body: { toUserId, content }
- Returns: { testimonial }

GET /api/testimonials/{userId}
- Headers: Authorization
- Returns: { testimonials[] }
```

### Invitations
```
POST /api/invitations/send
- Headers: Authorization
- Body: { method: "email"|"whatsapp"|"sms", recipient, message }
- Returns: { invitation }

GET /api/invitations/sent
- Headers: Authorization
- Returns: { invitations[] }
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String (unique),
  password: String (hashed),
  avatar: String (URL),
  bio: String,
  location: String,
  interests: [String],
  verified: Boolean,
  biometricEnabled: Boolean,
  loginMethod: ["email", "phone", "google"],
  joinDate: Date,
  lastLogin: Date,
  isActive: Boolean
}
```

### Communities Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  category: String,
  avatar: String,
  createdBy: ObjectId (ref: User),
  moderators: [ObjectId] (ref: User),
  members: [ObjectId] (ref: User),
  memberCount: Number,
  postCount: Number,
  isPublic: Boolean,
  trending: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Posts Collection
```javascript
{
  _id: ObjectId,
  author: ObjectId (ref: User),
  content: String,
  images: [String],
  community: ObjectId (ref: Community),
  likes: [ObjectId] (ref: User),
  likesCount: Number,
  comments: [{
    user: ObjectId (ref: User),
    content: String,
    createdAt: Date
  }],
  commentsCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Friends Collection
```javascript
{
  _id: ObjectId,
  requester: ObjectId (ref: User),
  recipient: ObjectId (ref: User),
  status: String, // "pending", "accepted", "declined"
  createdAt: Date,
  acceptedAt: Date
}
```

### Scraps Collection
```javascript
{
  _id: ObjectId,
  from: ObjectId (ref: User),
  to: ObjectId (ref: User),
  content: String,
  public: Boolean,
  createdAt: Date
}
```

### Testimonials Collection
```javascript
{
  _id: ObjectId,
  from: ObjectId (ref: User),
  to: ObjectId (ref: User),
  content: String,
  createdAt: Date
}
```

### Invitations Collection
```javascript
{
  _id: ObjectId,
  inviter: ObjectId (ref: User),
  method: String, // "email", "whatsapp", "sms"
  recipient: String, // email or phone
  message: String,
  status: String, // "pending", "sent", "joined"
  sentAt: Date,
  joinedAt: Date
}
```

## Mock Data to Replace

### Frontend Mock Data Files
1. `/app/frontend/src/data/mockData.js`
   - mockUsers → Replace with API calls to /api/users/*
   - mockCommunities → Replace with API calls to /api/communities
   - mockPosts → Replace with API calls to /api/posts/feed
   - mockTestimonials → Replace with API calls to /api/testimonials/{userId}
   - mockScraps → Replace with API calls to /api/scraps/{userId}
   - mockInvitations → Replace with API calls to /api/invitations/sent

### Frontend Components to Update
1. **Authentication Context** (`/app/frontend/src/contexts/AuthContext.js`)
   - Replace localStorage mock with actual JWT token management
   - Add API calls to login/register/logout endpoints

2. **Dashboard Page** (`/app/frontend/src/pages/DashboardPage.js`)
   - Replace mock posts with API calls to `/api/posts/feed`
   - Replace mock stats with real user data
   - Add real post creation functionality

3. **Communities Page** (`/app/frontend/src/pages/CommunitiesPage.js`)
   - Replace mock communities with API calls to `/api/communities`
   - Implement real join/leave functionality
   - Add search and filtering via API

4. **Friends Page** (`/app/frontend/src/pages/FriendsPage.js`)
   - Replace mock friends with API calls to `/api/friends`
   - Implement real friend requests system
   - Connect invitation system to backend

5. **Profile Page** (`/app/frontend/src/pages/ProfilePage.js`)
   - Replace mock scraps and testimonials with real API data
   - Implement profile editing functionality
   - Add photo upload capability

## Backend Implementation Plan

### Phase 1: Core Infrastructure
1. Set up MongoDB models and connections
2. Implement JWT authentication middleware
3. Create user registration and login endpoints
4. Add password hashing and validation

### Phase 2: User Management
1. User profile CRUD operations
2. User search and suggestions
3. Profile photo upload handling
4. Account verification system

### Phase 3: Social Features
1. Friend request system
2. Communities creation and management
3. Posts creation and feed generation
4. Likes and comments functionality

### Phase 4: Legacy Orkut Features
1. Scraps system (profile messages)
2. Testimonials system
3. Community discussions
4. Member management

### Phase 5: Modern Features
1. Invitation system (email, SMS, WhatsApp)
2. Biometric authentication endpoints
3. Real-time notifications
4. Search and discovery algorithms

## Frontend-Backend Integration

### Authentication Flow
1. Replace mock login in AuthContext with real API calls
2. Store JWT token in localStorage/httpOnly cookies
3. Add token refresh mechanism
4. Implement protected route middleware

### Data Fetching Pattern
1. Replace all mock data imports with API service calls
2. Implement loading states and error handling
3. Add data caching strategies
4. Use React Query or SWR for server state management

### Real-time Features
1. WebSocket integration for real-time notifications
2. Live updates for new posts, messages, and friend requests
3. Online status indicators
4. Real-time community activity

## Testing Strategy
1. Unit tests for all API endpoints
2. Integration tests for authentication flow
3. End-to-end tests for critical user journeys
4. Performance testing for feed generation and search

## Security Considerations
1. Input validation and sanitization
2. Rate limiting for API endpoints
3. SQL injection prevention
4. XSS protection
5. Secure file upload handling
6. Biometric data encryption
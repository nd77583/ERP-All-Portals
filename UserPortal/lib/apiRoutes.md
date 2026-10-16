// Example API routes structure
// This is a reference for implementing your API endpoints

/*
API Routes Available:
- GET    /api/students           - Get all students
- POST   /api/students           - Create new student
- GET    /api/students/:id       - Get student by ID
- PUT    /api/students/:id       - Update student
- DELETE /api/students/:id       - Delete student

- GET    /api/sports             - Get all sports
- POST   /api/sports             - Create new sport
- GET    /api/sports/:id         - Get sport by ID
- PUT    /api/sports/:id         - Update sport
- DELETE /api/sports/:id         - Delete sport

- GET    /api/events             - Get all events
- POST   /api/events             - Create new event
- GET    /api/events/:id         - Get event by ID
- PUT    /api/events/:id         - Update event
- DELETE /api/events/:id         - Delete event

- GET    /api/teams              - Get all teams
- POST   /api/teams              - Create new team
- GET    /api/teams/:id          - Get team by ID
- PUT    /api/teams/:id          - Update team
- DELETE /api/teams/:id          - Delete team

- GET    /api/users              - Get all users
- POST   /api/users              - Create new user
- GET    /api/users/:id          - Get user by ID
- PUT    /api/users/:id          - Update user
- DELETE /api/users/:id          - Delete user

- GET    /api/dashboard          - Get dashboard statistics

To implement these routes:
1. Create app/api/ directory structure
2. Create route.ts files for each endpoint
3. Use Next.js route handlers (app/api/[resource]/route.ts)
4. Connect to your database (MongoDB, PostgreSQL, etc.)
5. Return proper error handling and validation

Example structure:
app/api/
  ├── students/
  │   ├── route.ts              (GET all, POST create)
  │   └── [id]/
  │       └── route.ts          (GET, PUT, DELETE)
  ├── sports/
  │   ├── route.ts
  │   └── [id]/
  │       └── route.ts
  ├── events/
  │   ├── route.ts
  │   └── [id]/
  │       └── route.ts
  └── dashboard/
      └── route.ts
*/

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

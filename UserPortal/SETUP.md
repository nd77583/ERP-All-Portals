# State Sports Portal - Setup Guide

## Overview
A comprehensive Next.js application for managing school sports activities, teams, students, and events.

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
state-sports-portal/
├── app/
│   ├── (dashboard)/           # Dashboard layout group
│   │   ├── layout.tsx         # Dashboard layout with sidebar
│   │   └── page.tsx           # Dashboard home page
│   ├── sports/                # Sports management routes
│   │   └── page.tsx
│   ├── students/              # Student management routes
│   │   └── page.tsx
│   ├── events/                # Event management routes
│   │   └── page.tsx
│   ├── reports/               # Reports and analytics
│   │   └── page.tsx
│   ├── settings/              # Application settings
│   │   └── page.tsx
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page (redirects to dashboard)
│   ├── globals.css            # Global styles
│   └── Components/            # Reusable components
│       ├── Dashboard.tsx
│       └── ui/
├── lib/
│   ├── types.ts               # TypeScript type definitions
│   ├── constants.ts           # Application constants
│   ├── utils.ts               # Utility functions
│   ├── mockData.ts            # Mock data for development
│   └── apiRoutes.md           # API endpoints documentation
├── public/                    # Static assets
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript configuration
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── README.md                  # This file
```

## 📋 Available Pages

### Dashboard (`/dashboard`)
- Overview statistics
- Recent activity feed
- Quick action buttons
- Key metrics display

### Sports & Teams (`/sports`)
- Browse all sports categories
- Team listings by sport
- Add/edit sport information
- Student count per team

### Students (`/students`)
- Student roster management
- Sports participation tracking
- Grade and contact information
- Add/remove students

### Events (`/events`)
- Upcoming events calendar
- Event details and location
- Event status tracking
- Schedule new events

### Reports (`/reports`)
- Participation analytics
- Performance metrics
- Attendance reports
- Equipment inventory

### Settings (`/settings`)
- General application configuration
- Notification preferences
- User management
- System administration

## 🎨 Technology Stack

- **Framework**: Next.js 16.3.5
- **UI Framework**: React 19.2.8
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Linting**: ESLint 9

## 📦 Key Dependencies

```json
{
  "next": "16.3.5",
  "react": "19.2.8",
  "react-dom": "19.2.8",
  "tailwindcss": "^4"
}
```

## 🔧 Development Guidelines

### Adding New Routes
1. Create a new folder in `app/` with the route name
2. Add `page.tsx` for the page content
3. Add `layout.tsx` if you need a custom layout
4. Use the sidebar navigation automatically

### Adding New Components
1. Create components in `app/Components/`
2. Create a subdirectory for component groups
3. Export components from index files for easy imports

### Adding API Routes
1. Create `app/api/` directory structure
2. Create `route.ts` files following Next.js conventions
3. Use proper HTTP methods (GET, POST, PUT, DELETE)
4. Return JSON responses with proper status codes

### Styling
- Use Tailwind CSS classes directly in JSX
- Follow the existing design system
- Use consistent spacing and colors
- Refer to `globals.css` for global styles

## 📝 Type Definitions

All TypeScript types are defined in `lib/types.ts`:

```typescript
- Student
- Sport
- Team
- SportsEvent
- Report
- User
- Dashboard
- Activity
```

## 📊 Mock Data

Mock data is available in `lib/mockData.ts` for development:

```typescript
mockStudents
mockSports
mockEvents
mockUsers
```

## 🔌 API Integration

See `lib/apiRoutes.md` for complete API endpoint documentation.

To connect your API:
1. Replace mock data with actual API calls
2. Use the `fetchApi` utility in `lib/utils.ts`
3. Handle loading and error states
4. Implement proper error boundaries

## 🎯 Next Steps

1. **Database Setup**: Configure your preferred database
2. **API Implementation**: Create API routes following the documentation
3. **Authentication**: Add user authentication
4. **Testing**: Add unit and integration tests
5. **Deployment**: Deploy to Vercel or your preferred hosting

## 🤝 Contributing

Follow these guidelines:
- Use TypeScript for type safety
- Follow the existing code style
- Keep components small and reusable
- Use proper naming conventions
- Add comments for complex logic

## 📄 License

Project License Information

## 📧 Support

For issues or questions, contact: admin@sportportal.com

---

**Last Updated**: September 14, 2024

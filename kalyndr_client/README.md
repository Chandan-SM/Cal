# Kalyndr - Frontend

Next.js frontend for the Kalyndr calendar application.

## Features

- **Interactive Calendar Interface** - Dynamic calendar with daily, weekly and monthly views
- **Animated Components** - Smooth transitions and interactions
- **Event Management** - Create, edit, and delete events with modal interfaces
- **Responsive Design** - Works seamlessly across desktop and mobile devices
- **Custom UI Components** - Tailored design system for calendar functionality

## Directory Structure

- `/src/app` - Page layouts and routing
  - `layout.tsx` - Main application layout
  - `page.tsx` - Main page component
- `/src/components` - Reusable components
  - `/ui` - Base UI elements
    - `avatar.tsx` - User avatars
    - `dropdown-menu.tsx` - Dropdown navigation
  - `AnimatedCalendar.tsx` - Calendar with animations
  - `Calendar.tsx` - Base calendar component
  - `CalendarGrid.tsx` - Grid layout for calendar
  - `CalendarHeader.tsx` - Header navigation for calendar
  - `DayCell.tsx` - Individual day cell component
  - `EventItem.tsx` - Event display component
  - `EventModal.tsx` - Modal for creating/editing events
  - `EventSideBar.tsx` - Sidebar for event details
  - `nav-user.tsx` - User navigation component
- `/src/lib` - Utility functions
  - `calendarUtils.ts` - Calendar-specific helper functions
  - `utils.ts` - General utility functions
- `/src/services` - API communication
  - `CalendarService.ts` - Service for calendar operations
  - `middleware.ts` - Request handling middleware

## Development Setup

### Prerequisites
- Node.js (v14.0+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
# or
yarn install

# Create local environment file
cp .env.example .env.local
```

### Environment Variables

Configure the following variables in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
# Add any other required environment variables
```

### Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Testing

```bash
npm run test
# or
yarn test
```

## Linting

```bash
npm run lint
# or
yarn lint
```

## Contributing

Please ensure all new components follow the existing patterns and include appropriate tests.

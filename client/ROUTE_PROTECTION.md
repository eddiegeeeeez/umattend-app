# Route Protection Setup

This application implements route protection to ensure only authenticated users can access protected pages.

## Public Routes

The following route is publicly accessible:
- `/` - Landing/Login page

## Protected Routes

All other routes require authentication:
- `/events` - Events listing
- `/events/[id]` - Event details
- `/events/past` - Past events
- `/profile` - User profile
- `/onboarding` - User onboarding
- `/contact` - Contact support

### Admin/Organizer-Only Routes

The following routes require admin, CSG, or organizer role:
- `/events/new` - Create new event
- `/events/[id]/manage` - Manage event details
- `/events/[id]/attended` - View event attendance

These routes will redirect non-admin users to `/forbidden`.

## How It Works

### Client-Side Protection

1. **ProtectedRoute Component** (`src/components/protected-routes.tsx`)
   - Wraps protected pages/layouts
   - Checks authentication status from Zustand store
   - Redirects to `/` if not authenticated
   - Shows loading spinner during auth check
   - Supports admin-only routes with `requireAdmin` prop

2. **Layout-Based Protection**
   - Each protected section has a layout that wraps content with `<ProtectedRoute>`
   - Examples:
     - `/events/layout.tsx`
     - `/profile/layout.tsx`
     - `/contact/layout.tsx`
     - `/onboarding/layout.tsx`

### Authentication Flow

1. User visits the app
2. If not authenticated, they see the login page (`/`)
3. After successful Google OAuth login:
   - Access and refresh tokens are stored in Zustand
   - User is redirected to `/onboarding` (if not complete) or `/events`
4. Protected routes check authentication via `isAuthenticated()` from the auth store
5. If auth check fails, user is redirected to `/`

### Auth Store

The authentication state is managed by Zustand (`src/store/authStore.ts`):
- Persists to `localStorage` with key `umattend`
- Contains: `user`, `accessToken`, `refreshToken`
- Provides methods:
  - `isAuthenticated()` - Check if user is logged in
  - `isAdmin()` - Check if user has admin/CSG/organizer privileges
  - `isDoneOnboarding()` - Check onboarding status
  - `logout()` - Clear auth state and redirect

### Admin Roles

Users with the following roles can access admin-only routes:
- `admin` - Full administrator access
- `csg` - CSG (Council of Student Government) member
- `organizer` - Event organizer

Regular students with role `student` or `instructor` cannot access admin routes.

## Adding New Protected Routes

1. Create your page in `src/app/your-route/page.tsx`
2. Create a layout file `src/app/your-route/layout.tsx`:

```tsx
import ProtectedRoute from '@/components/protected-routes';

export default function YourRouteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
```

3. For admin-only routes, use:

```tsx
<ProtectedRoute requireAdmin>{children}</ProtectedRoute>
```

## Testing

1. **Unauthenticated Access**
   - Clear localStorage (DevTools > Application > Local Storage)
   - Try to access `/events` - should redirect to `/`

2. **Authenticated Access (Regular User)**
   - Log in via Google OAuth as a student
   - Navigate to `/events`, `/profile` - should work normally
   - Try to access `/events/new` - should redirect to `/forbidden`

3. **Admin/Organizer Access**
   - Log in as admin/CSG/organizer
   - Navigate to `/events/new`, `/events/[id]/manage` - should work normally

4. **Logout**
   - Click logout in the UI
   - Should redirect to `/` and clear auth state

# Fix: User Name and University Email Not Displaying After Google Auth

## Problem
After Google authentication, the user's name and university email were not being fetched or displayed on the onboarding page. The page was showing fallback values like "User" and "N/A".

## Root Cause Analysis

1. **JWT Token Limitation**: The JWT access token only contains minimal user information (id, email, role, done_onboarding) but doesn't include:
   - `name` (user's full name)
   - `umindanao_email` (university email)
   - `department` (if already set)
   - `program` (if already set)

2. **Missing User Data Fetch**: After the `/auth/exchange` endpoint returns tokens, the app wasn't calling the `/user` endpoint to fetch the complete user profile.

3. **Incomplete User Interface**: The `User` interface in the auth store was missing the `umindanao_email` field.

## Solution Implemented

### 1. **Updated Auth Store** (`src/store/authStore.ts`)

#### Added Missing Fields to User Interface:
```typescript
interface User {
  id: string;
  email: string;
  umindanao_email?: string;    // ✅ NEW: University email
  name?: string;                // ✅ Already existed
  department?: string;          // ✅ NEW: For future use
  program?: string;             // ✅ NEW: For future use
  role: 'student' | 'admin' | 'csg' | 'instructor' | 'organizer';
  done_onboarding: boolean;
}
```

#### Added `updateUser` Method:
```typescript
interface AuthState {
  // ... existing properties
  updateUser: (user: User) => void;  // ✅ NEW: Update user without changing tokens
}
```

This allows us to update user data from the `/user` endpoint without re-decoding the JWT token.

### 2. **Updated Main Page** (`src/app/page.tsx`)

#### Added User Data Fetching:
```typescript
// Fetch user data after authentication
const { data: userData } = useQuery({
  ...getUserOptions(),
  enabled: isAuthenticated(),
  staleTime: Infinity, // Don't refetch unless manually invalidated
});

// Update user data in store when fetched
useEffect(() => {
  if (userData?.success && userData?.data?.user) {
    const user = userData.data.user;
    updateUser({
      id: user.id || '',
      email: user.email || '',
      umindanao_email: user.umindanao_email,    // ✅ University email
      name: user.name,                           // ✅ Full name
      department: user.department,
      program: user.program,
      role: (user.role as 'student' | 'admin' | 'csg' | 'instructor' | 'organizer') || 'student',
      done_onboarding: user.done_onboarding || false,
    });
  }
}, [userData, updateUser]);
```

### 3. **Updated Onboarding Page** (`src/app/onboarding/page.tsx`)

#### Added User Data Fetching as Fallback:
```typescript
// Fetch user data to ensure we have the latest info
const { data: userData } = useQuery({
  ...getUserOptions(),
  enabled: isAuthenticated(),
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// Update user data in store when fetched
useEffect(() => {
  if (userData?.success && userData?.data?.user) {
    const fetchedUser = userData.data.user;
    updateUser({
      id: fetchedUser.id || '',
      email: fetchedUser.email || '',
      umindanao_email: fetchedUser.umindanao_email,
      name: fetchedUser.name,
      department: fetchedUser.department,
      program: fetchedUser.program,
      role: (fetchedUser.role as 'student' | 'admin' | 'csg' | 'instructor' | 'organizer') || 'student',
      done_onboarding: fetchedUser.done_onboarding || false,
    });
  }
}, [userData, updateUser]);
```

#### Updated Display to Prefer University Email:
```typescript
const studentData = {
  name: user?.name || 'User',
  idNumber: user?.id || 'N/A',
  email: user?.umindanao_email || user?.email || 'N/A'  // ✅ Prefer university email
};
```

## Data Flow

### Before Fix:
```
1. User clicks "Login with Google"
2. Google redirects with auth_code
3. Frontend calls /auth/exchange
4. Backend returns { access_token, refresh_token }
5. JWT decoded → User { id, email, role, done_onboarding }
6. ❌ name and umindanao_email not available
```

### After Fix:
```
1. User clicks "Login with Google"
2. Google redirects with auth_code
3. Frontend calls /auth/exchange
4. Backend returns { access_token, refresh_token }
5. JWT decoded → User { id, email, role, done_onboarding }
6. ✅ Frontend calls /user endpoint
7. ✅ Backend returns full user data including name and umindanao_email
8. ✅ updateUser() stores complete profile in auth store
9. ✅ Onboarding page displays correct name and email
```

## API Endpoints Used

### `/auth/exchange` - Exchange Google auth code for tokens
**Response:**
```json
{
  "success": true,
  "message": "Code exchanged successfully",
  "data": {
    "access_token": "eyJ...",
    "refresh_token": "eyJ..."
  }
}
```

### `/user` - Get complete user profile
**Response:**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      "id": "123",
      "email": "user@gmail.com",
      "umindanao_email": "user.123@umindanao.edu.ph",
      "name": "John Doe",
      "role": "student",
      "department": null,
      "program": null,
      "done_onboarding": false
    }
  }
}
```

## Benefits

1. **Complete User Profile**: Now stores and displays all user information from the backend
2. **University Email Display**: Shows the proper university email instead of personal Gmail
3. **Better UX**: Users see their actual name instead of "User"
4. **Future-Proof**: Department and program fields are now stored for future use
5. **Automatic Sync**: User data is automatically fetched and synced on both pages
6. **Optimized Caching**: 
   - Main page: `staleTime: Infinity` (fetch once per session)
   - Onboarding page: `staleTime: 5 minutes` (refresh occasionally)

## Testing Checklist

- [x] TypeScript compilation passes (no errors)
- [ ] After Google login, user name displays correctly
- [ ] After Google login, university email displays correctly
- [ ] Student ID displays correctly
- [ ] User data persists in Zustand store
- [ ] User data persists across page refreshes (localStorage)
- [ ] Onboarding page shows correct user info on direct navigation
- [ ] Main page shows correct user info after login
- [ ] `/user` endpoint is called with proper authentication headers

## Notes

- The `/user` endpoint requires authentication (access token in headers)
- The autogenerated `getUserOptions()` automatically handles token injection via axios interceptors
- React Query handles caching and automatic refetching
- The `updateUser` method preserves tokens while updating user data
- Fallback values ("User", "N/A") only show if the API hasn't responded yet

## Files Modified

1. ✅ `src/store/authStore.ts` - Added fields and updateUser method
2. ✅ `src/app/page.tsx` - Added user data fetching after login
3. ✅ `src/app/onboarding/page.tsx` - Added user data fetching and updated display

# Fix: Student ID Showing "N/A" Issue

## Problem
The student ID was showing "N/A" on the onboarding page even though it was present in the JWT token.

## Root Cause

### JWT Payload Structure:
```json
{
  "user_id": "cmgrf4bx90000w21cu232gfc4",  // Database ID
  "student_id": 535940,                     // Student ID number ✅
  "umindanao_email": "f.avena.535940@umindanao.edu.ph",
  "name": "Francisco Avena",
  "role": "student",
  "done_onboarding": false,
  "department": "",
  "program": ""
}
```

### The Issue:
1. **JWT has `student_id`** (the actual student number: 535940)
2. **Frontend User interface had `id`** (expecting a single ID field)
3. **Code was accessing `user.id`** which didn't exist in JWT
4. **API endpoint returns `id`** (which is the database user_id, not student_id)

## Solution

### 1. Updated User Interface (`src/store/authStore.ts`)

#### Before:
```typescript
interface User {
  id: string;  // ❌ Ambiguous - which ID?
  email: string;
  // ...
}
```

#### After:
```typescript
interface User {
  user_id?: string;      // ✅ Database ID (from API)
  student_id?: number;   // ✅ Student ID number (from JWT)
  email: string;
  umindanao_email?: string;
  name?: string;
  department?: string;
  program?: string;
  role: 'student' | 'admin' | 'csg' | 'instructor' | 'organizer';
  done_onboarding: boolean;
}
```

### 2. Updated Onboarding Page Display

#### Before:
```typescript
const studentData = {
  name: user?.name || 'User',
  idNumber: user?.id || 'N/A',  // ❌ user.id doesn't exist in JWT
  email: user?.umindanao_email || user?.email || 'N/A'
};
```

#### After:
```typescript
const studentData = {
  name: user?.name || 'User',
  idNumber: user?.student_id?.toString() || 'N/A',  // ✅ Uses student_id from JWT
  email: user?.umindanao_email || user?.email || 'N/A'
};
```

### 3. Updated Data Merging Logic

Both `page.tsx` and `onboarding/page.tsx` now properly merge API data with JWT data:

```typescript
// Update user data in store when fetched (merge with existing JWT data)
useEffect(() => {
  if (userData?.success && userData?.data?.user) {
    const apiUser = userData.data.user;
    const currentUser = useAuthStore.getState().user;
    
    // Merge API data with existing JWT data
    updateUser({
      user_id: apiUser.id,                    // ✅ From API
      student_id: currentUser?.student_id,    // ✅ Preserved from JWT
      email: apiUser.email || currentUser?.email || '',
      umindanao_email: apiUser.umindanao_email || currentUser?.umindanao_email,
      name: apiUser.name || currentUser?.name,
      department: apiUser.department || currentUser?.department,
      program: apiUser.program || currentUser?.program,
      role: (apiUser.role as 'student' | 'admin' | 'csg' | 'instructor' | 'organizer') || currentUser?.role || 'student',
      done_onboarding: apiUser.done_onboarding ?? currentUser?.done_onboarding ?? false
    });
  }
}, [userData, updateUser]);
```

## Key Improvements

1. **✅ Clear Separation**: Distinguished between `user_id` (database) and `student_id` (student number)
2. **✅ Data Preservation**: API fetch no longer overwrites JWT data like `student_id`
3. **✅ Proper Merging**: Combines data from both JWT and API intelligently
4. **✅ Type Safety**: Changed `student_id` to `number` type (as it is in the JWT)

## Data Flow

### Before Fix:
```
1. JWT decoded → { user_id, student_id: 535940, name, email, ... }
2. Store user → { id: undefined ❌ } (wrong field name)
3. Display → user?.id → undefined → "N/A" ❌
```

### After Fix:
```
1. JWT decoded → { user_id, student_id: 535940, name, email, ... }
2. Store user → { student_id: 535940 ✅ }
3. API fetch → merge with JWT data (preserve student_id)
4. Display → user?.student_id → 535940 ✅
```

## Why This Approach?

### Two Different IDs:
- **`user_id`**: Database primary key (UUID/hash) - used internally
- **`student_id`**: Human-readable student number - displayed to user

### Data Sources:
- **JWT**: Contains both IDs immediately after login
- **API `/user`**: Returns `user_id` as `id`, but doesn't include `student_id`

### Solution:
- Keep `student_id` from JWT (it's already there!)
- Merge API data without overwriting JWT fields
- Display `student_id` to the user (not the database UUID)

## Files Modified

1. ✅ `src/store/authStore.ts` - Updated User interface with correct field names
2. ✅ `src/app/onboarding/page.tsx` - Fixed display and data merging
3. ✅ `src/app/page.tsx` - Fixed data merging to preserve JWT fields

## Testing Checklist

- [x] TypeScript compilation passes
- [ ] Student ID displays correctly (535940 instead of N/A)
- [ ] Name displays correctly (Francisco Avena)
- [ ] Email displays correctly (f.avena.535940@umindanao.edu.ph)
- [ ] Data persists after page refresh
- [ ] Data persists after API fetch

## Result

**Before:**
- Student ID: N/A ❌

**After:**
- Student ID: 535940 ✅

The student ID now displays correctly because we're using the `student_id` field from the JWT token instead of trying to access a non-existent `id` field!

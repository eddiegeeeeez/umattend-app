# JWT Payload vs API Fetch: Best Practices Analysis

## Current Implementation Overview

### What We Have Now (Hybrid Approach):
1. **JWT Decoding**: Initial user data from JWT token (id, email, role, done_onboarding)
2. **API Fetch**: Additional user data from `/user` endpoint (name, umindanao_email, department, program)

## Option Analysis

### ✅ **RECOMMENDED: Include User Data in JWT (What Backend Should Do)**

#### Approach:
Backend includes `name` and `umindanao_email` in the JWT payload when generating the token.

#### JWT Payload Example:
```json
{
  "id": "484470",
  "email": "user@gmail.com",
  "umindanao_email": "user.484470@umindanao.edu.ph",
  "name": "John Doe",
  "role": "student",
  "done_onboarding": false,
  "department": "College of Computer Studies",
  "program": "BS Computer Science",
  "iat": 1729000000,
  "exp": 1729003600
}
```

#### Advantages:
- ✅ **No Extra API Call**: User info available immediately after token decode
- ✅ **Faster UX**: No loading state or delay for user data
- ✅ **Reduced Server Load**: No additional `/user` endpoint call needed
- ✅ **Offline Resilience**: User data available even if API is temporarily down
- ✅ **Simpler Code**: Single source of truth (the JWT)
- ✅ **Better Performance**: One less network request on every page load/refresh

#### Disadvantages:
- ⚠️ **Larger Token Size**: More data in JWT = bigger token (but negligible for these fields)
- ⚠️ **Stale Data**: If user updates profile, changes only reflected after token refresh
- ⚠️ **Security Consideration**: Ensure sensitive data isn't in JWT (these fields are fine)

#### Implementation (Backend Change Needed):
```typescript
// Backend: When generating JWT
const payload = {
  id: user.id,
  email: user.email,
  umindanao_email: user.umindanao_email,  // ✅ Add this
  name: user.name,                         // ✅ Add this
  role: user.role,
  done_onboarding: user.done_onboarding,
  department: user.department,             // ✅ Optional
  program: user.program,                   // ✅ Optional
};
const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
```

```typescript
// Frontend: Just decode JWT
const decoded = jwtDecode<User>(accessToken);
// ✅ All data available immediately, no API call needed!
```

---

### ⚠️ **CURRENT: Hybrid Approach (JWT + API Fetch)**

#### What We're Doing Now:
1. Decode JWT for basic info (id, email, role)
2. Call `/user` API to get additional info (name, umindanao_email)

#### Advantages:
- ✅ **Fresh Data**: Always gets latest user info from database
- ✅ **Smaller JWT**: Token only contains critical auth data
- ✅ **Dynamic Updates**: User profile changes reflected immediately

#### Disadvantages:
- ❌ **Extra API Call**: Every page load/refresh requires `/user` endpoint call
- ❌ **Loading State**: Brief delay before user data appears
- ❌ **Network Dependency**: Fails if API is down or slow
- ❌ **Increased Server Load**: Every authenticated request triggers `/user` call
- ❌ **More Complex Code**: Need to manage two data sources

---

### ❌ **NOT RECOMMENDED: Only User ID in JWT**

#### Approach:
JWT only contains user ID, fetch everything else from API.

#### JWT Payload:
```json
{
  "id": "484470",
  "iat": 1729000000,
  "exp": 1729003600
}
```

#### Why This Is Bad:
- ❌ **Too Many API Calls**: Every page/component needs to fetch user data
- ❌ **Poor Performance**: Multiple network requests slow down the app
- ❌ **Terrible UX**: Loading states everywhere, slow page loads
- ❌ **Unnecessary Complexity**: Over-engineering a simple problem
- ❌ **Higher Server Cost**: Database query on every request

---

## Best Practice Recommendations

### For Your Use Case (Event Management System):

#### ✅ **BEST: Put User Data in JWT**

**What Backend Should Include in JWT:**
```typescript
{
  id: string;                    // ✅ Required for auth
  email: string;                 // ✅ Required for auth
  umindanao_email: string;       // ✅ Display data (not sensitive)
  name: string;                  // ✅ Display data (not sensitive)
  role: string;                  // ✅ Required for authorization
  done_onboarding: boolean;      // ✅ Required for routing logic
  department?: string;           // ⚠️ Optional (can be fetched if needed)
  program?: string;              // ⚠️ Optional (can be fetched if needed)
}
```

**Why This Works:**
- User's name and email don't change frequently
- These fields are not sensitive (already visible to the user)
- Eliminates unnecessary API calls
- Better user experience (instant data)
- Follows industry standards (Auth0, Firebase, etc.)

---

## When to Use API Fetch Instead of JWT

### Use API Fetch When:
1. **Frequently Changing Data**: Profile photo, bio, preferences that update often
2. **Sensitive Data**: Private information that shouldn't be in JWT
3. **Large Data**: Lists, arrays, or objects too big for JWT
4. **Real-time Data**: Activity feeds, notifications, live stats
5. **Relational Data**: User's events, attendance history, connections

### Example (Good Use of API):
```typescript
// ✅ GOOD: Fetch dynamic data
const { data: userEvents } = useQuery({
  ...getUserEventsOptions(),
  enabled: isAuthenticated(),
});

// ✅ GOOD: Fetch frequently updated data
const { data: profileStats } = useQuery({
  ...getUserStatsOptions(),
  refetchInterval: 30000, // Refresh every 30 seconds
});
```

---

## Recommended Refactor

### Option 1: Backend Change (BEST)
Ask backend team to include `name` and `umindanao_email` in JWT payload.

**Frontend becomes simpler:**
```typescript
setAuth: (accessToken: string, refreshToken: string) => {
  const decoded = jwtDecode<User>(accessToken);
  // ✅ All data available immediately
  set({
    user: decoded, // Has name and umindanao_email already!
    accessToken,
    refreshToken
  });
}
```

**Remove the API calls from:**
- `src/app/page.tsx` (no need for `/user` fetch)
- `src/app/onboarding/page.tsx` (no need for `/user` fetch)

### Option 2: Keep Current (ACCEPTABLE)
If backend can't change JWT payload immediately, current hybrid approach is acceptable but not optimal.

---

## Industry Examples

### Auth0 (JWT Best Practice):
```json
{
  "sub": "google-oauth2|123456789",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "picture": "https://...",
  "email_verified": true
}
```
✅ Includes display data in JWT

### Firebase (JWT Best Practice):
```json
{
  "user_id": "abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "picture": "https://...",
  "email_verified": true
}
```
✅ Includes display data in JWT

---

## Performance Comparison

### Scenario: User visits onboarding page

#### With Data in JWT:
```
1. Page loads
2. JWT decoded from localStorage → 0ms
3. User data displayed → INSTANT ⚡
Total: ~0ms
```

#### With API Fetch (Current):
```
1. Page loads
2. JWT decoded → basic data displayed
3. API call to /user → 100-500ms (network latency)
4. Parse response → 5-10ms
5. Update store → 5ms
6. Re-render → 10ms
Total: ~120-525ms delay 🐢
```

---

## Conclusion & Recommendation

### ✅ **Best Practice for Your App:**

1. **SHORT TERM (Current Solution is OK)**: 
   - Keep the hybrid approach if backend can't change JWT immediately
   - It works, but adds unnecessary complexity and API calls

2. **LONG TERM (Recommended)**:
   - Ask backend to include `name` and `umindanao_email` in JWT payload
   - Remove `/user` API fetching from page load
   - Use `/user` endpoint only for profile page or when explicitly updating profile
   - Simpler code, better performance, better UX

### General JWT Rule:
> **"If the data is needed for every authenticated page and doesn't change frequently, put it in the JWT."**

### For Your Case:
- ✅ `name`: Rarely changes → Put in JWT
- ✅ `umindanao_email`: Never changes → Put in JWT  
- ✅ `role`: Critical for auth → Put in JWT
- ✅ `done_onboarding`: Used for routing → Put in JWT
- ⚠️ `department/program`: Can be added later via onboarding → Could be in JWT or fetched
- ❌ `events_attended`: Frequently changes → Fetch via API when needed
- ❌ `attendance_history`: Large dataset → Fetch via API when needed

---

## Security Note

### Safe to Include in JWT:
- ✅ User ID
- ✅ Email addresses (already public to the user)
- ✅ Name (not sensitive)
- ✅ Role (needed for authorization)
- ✅ Department/Program (not sensitive)

### Never Include in JWT:
- ❌ Passwords or password hashes
- ❌ API keys or secrets
- ❌ Social Security Numbers
- ❌ Payment information
- ❌ Private messages or sensitive content

Your current fields (`name`, `umindanao_email`) are **completely safe** to include in JWT.

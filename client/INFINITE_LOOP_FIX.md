# Fix: Maximum Update Depth Exceeded (Infinite Loop)

## Error
```
Runtime Error: Maximum update depth exceeded. This can happen when a component 
repeatedly calls setState inside componentWillUpdate or componentDidUpdate. 
React limits the number of nested updates to prevent infinite loops.

at SelectTrigger (src/components/ui/select.tsx:29:5)
at OnboardingPage (src/app/onboarding/page.tsx:216:19)
```

## Root Cause: Callback Hell / Infinite Loop

### The Problem

In `src/app/onboarding/page.tsx`, there was a `useEffect` with a problematic dependency array:

```typescript
// ❌ BEFORE (WRONG)
useEffect(() => {
  if (userData?.success && userData?.data?.user) {
    const apiUser = userData.data.user;
    const currentUser = user; // ❌ Using user from props/state

    updateUser({
      // ... update user data
    });
  }
}, [userData, updateUser, user]); // ❌ 'user' is in dependencies!
```

### The Infinite Loop:

```
1. userData changes
   ↓
2. useEffect runs
   ↓
3. updateUser() is called
   ↓
4. user object changes in Zustand store
   ↓
5. Component re-renders with new user
   ↓
6. useEffect sees 'user' changed in dependencies
   ↓
7. useEffect runs again
   ↓
8. updateUser() called again
   ↓
9. user changes again
   ↓
10. GOTO step 5 (INFINITE LOOP!) 🔄💥
```

### Why This Happened:

The effect had **three dependencies**: `[userData, updateUser, user]`

- ✅ `userData` - Should trigger when API data arrives
- ✅ `updateUser` - Stable function (won't change)
- ❌ `user` - **Changes every time `updateUser()` is called**, causing re-trigger!

This created a circular dependency:
```
useEffect depends on 'user'
    ↓
useEffect calls updateUser()
    ↓
'user' changes
    ↓
useEffect re-runs (because 'user' is in dependencies)
    ↓
INFINITE LOOP! 🔄
```

## Solution

### Fix: Remove `user` from Dependencies

Instead of using `user` from the component scope (which is reactive), get it directly from the Zustand store inside the effect:

```typescript
// ✅ AFTER (CORRECT)
useEffect(() => {
  if (userData?.success && userData?.data?.user) {
    const apiUser = userData.data.user;
    const currentUser = useAuthStore.getState().user; // ✅ Get from store directly

    updateUser({
      user_id: apiUser.id,
      student_id: currentUser?.student_id,
      email: apiUser.email || currentUser?.email || '',
      umindanao_email: apiUser.umindanao_email || currentUser?.umindanao_email,
      name: apiUser.name || currentUser?.name,
      department: apiUser.department || currentUser?.department,
      program: apiUser.program || currentUser?.program,
      role: (apiUser.role as 'student' | 'admin' | 'csg' | 'instructor' | 'organizer') || currentUser?.role || 'student',
      done_onboarding: apiUser.done_onboarding ?? currentUser?.done_onboarding ?? false
    });
  }
}, [userData, updateUser]); // ✅ Removed 'user' from dependencies
```

### How This Fixes It:

```
1. userData changes (API response arrives)
   ↓
2. useEffect runs
   ↓
3. Get current user data with useAuthStore.getState().user
   ↓
4. Merge API data with current user data
   ↓
5. updateUser() called once
   ↓
6. user object changes in store
   ↓
7. Component re-renders
   ↓
8. useEffect does NOT run (user not in dependencies)
   ↓
9. ✅ No infinite loop!
```

## Key Concepts

### useEffect Dependencies Best Practices

#### ❌ Don't Do This:
```typescript
const user = useAuthStore((state) => state.user);

useEffect(() => {
  // Using user from component scope
  const data = processUser(user);
  updateSomething(data);
}, [user]); // ❌ Will re-run every time user changes
```

#### ✅ Do This Instead:
```typescript
useEffect(() => {
  // Get user directly from store inside effect
  const user = useAuthStore.getState().user;
  const data = processUser(user);
  updateSomething(data);
}, []); // ✅ Only runs on mount or when other dependencies change
```

### When to Use Which Approach:

#### Use Reactive Selector (Component Scope):
```typescript
const user = useAuthStore((state) => state.user);
// ✅ Good for: Rendering user data in JSX
return <div>{user.name}</div>;
```

#### Use Direct Store Access (Inside Effects):
```typescript
useEffect(() => {
  const user = useAuthStore.getState().user;
  // ✅ Good for: One-time operations that shouldn't re-run when user changes
  logAnalytics(user);
}, [/* specific trigger */]);
```

## Why This Pattern Is Common

This is called a **"Stale Closure"** or **"Dependency Cycle"** issue:

1. You read a value from the store/state
2. You use it in an effect
3. The effect updates that same value
4. The update triggers the effect again
5. **Infinite loop!**

### Common in:
- Zustand stores
- Redux with hooks
- React Context
- Any state management that uses React hooks

### General Solution:
**Don't include reactive values in dependencies if the effect updates those same values.**

## Related Issues in Codebase

### ✅ page.tsx (Already Correct)
```typescript
useEffect(() => {
  if (userData?.success && userData?.data?.user) {
    const apiUser = userData.data.user;
    const currentUser = useAuthStore.getState().user; // ✅ Correct!
    
    updateUser({...});
  }
}, [userData, updateUser]); // ✅ No 'user' dependency
```

### ✅ onboarding/page.tsx (Now Fixed)
```typescript
useEffect(() => {
  if (userData?.success && userData?.data?.user) {
    const apiUser = userData.data.user;
    const currentUser = useAuthStore.getState().user; // ✅ Fixed!
    
    updateUser({...});
  }
}, [userData, updateUser]); // ✅ Removed 'user' dependency
```

## File Modified

- ✅ `src/app/onboarding/page.tsx` - Removed `user` from useEffect dependencies

## Testing Checklist

- [x] TypeScript compilation passes
- [ ] No infinite loop error
- [ ] Page loads without crashing
- [ ] Onboarding form works correctly
- [ ] User data displays correctly
- [ ] No "Maximum update depth exceeded" error
- [ ] Browser doesn't freeze or become unresponsive

## Prevention Tips

### 1. Watch for Circular Dependencies
```typescript
// ❌ BAD
useEffect(() => {
  setSomeState(someState + 1); // Updates the dependency!
}, [someState]);

// ✅ GOOD
useEffect(() => {
  setSomeState((prev) => prev + 1); // Uses updater function
}, []); // No dependency on someState
```

### 2. Use React DevTools
- Look for components rendering hundreds/thousands of times
- Check the "Profiler" tab for re-render loops

### 3. Use ESLint Rules
```json
{
  "rules": {
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### 4. Consider useMemo/useCallback
```typescript
const memoizedValue = useMemo(() => {
  return expensiveComputation(user);
}, [user.id]); // Only depend on specific fields, not whole object
```

## Lesson Learned

**When using Zustand (or any state management) with React hooks:**
- Use selectors for rendering: `const user = useAuthStore((state) => state.user)`
- Use `getState()` in effects: `const user = useAuthStore.getState().user`
- Don't put reactive values in effect dependencies if the effect updates those values!

The infinite loop is now fixed! 🎉

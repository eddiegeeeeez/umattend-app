# Attendee Count Logic Update

## Summary
Updated the attendee count logic to correctly display the number of attendees based on whether checkout is required for the event.

## Changes Made

### 1. `client/src/types/events.ts`
**Added new fields to EventCardData interface:**
```typescript
export interface EventCardData {
  // ... existing fields
  check_out_required?: boolean;
  checkin_count?: number;
  checkout_count?: number;
}
```

### 2. `client/src/utils/events-utils.ts`
**Updated `transformEventData` function:**

**Before:**
```typescript
attendees: 0, // Static placeholder
```

**After:**
```typescript
// Calculate attendees based on checkout requirement
const attendees = apiEvent.check_out_required 
  ? (apiEvent.checkout_count || 0) 
  : (apiEvent.checkin_count || 0);

return {
  // ... other fields
  attendees: attendees,
  check_out_required: apiEvent.check_out_required,
  checkin_count: apiEvent.checkin_count,
  checkout_count: apiEvent.checkout_count
};
```

## Logic Explanation

### Attendee Calculation
The attendee count now follows this logic (matching the backend logic):

```typescript
attendees = check_out_required ? checkout_count : checkin_count
```

**Why this matters:**
- **Checkout Required**: Only users who have both checked in AND checked out are counted as attendees
- **Checkout Not Required**: All users who have checked in are counted as attendees

### Example Scenarios

#### Scenario 1: Event with checkout required
- Check-in count: 100 people
- Check-out count: 85 people
- **Displayed attendees: 85** ✅ (only those who completed both check-in and check-out)

#### Scenario 2: Event without checkout requirement
- Check-in count: 100 people
- Check-out count: 0 (not applicable)
- **Displayed attendees: 100** ✅ (all who checked in)

## Components Affected

### ✅ Event List Pages
- `client/src/app/events/page.tsx` (Upcoming events)
- `client/src/app/events/past/page.tsx` (Past events)

### ✅ Event Components
- `client/src/components/event/event-content.tsx` (Event cards)
- `client/src/components/event/event-details.tsx` (Event detail sheet)

### ✅ Event Detail Page
- `client/src/app/events/[id]/page.tsx`

## Data Flow

```
API Response
  ↓
ApiEventData (includes checkin_count, checkout_count, check_out_required)
  ↓
transformEventData() (applies logic)
  ↓
ExtendedEventCardData (calculated attendees field)
  ↓
EventContent / EventDetails (displays attendees)
```

## Benefits

1. **Accurate Counts**: Attendee numbers now reflect actual attendance based on event requirements
2. **Consistency**: Same logic used across all event displays
3. **Backend Aligned**: Matches the backend's attendance counting logic
4. **Type Safe**: All fields properly typed and documented

## Testing Checklist

- [x] Events with checkout required show checkout_count
- [x] Events without checkout show checkin_count
- [x] Event cards display correct attendee numbers
- [x] Event details sheet shows correct attendee numbers
- [x] Event detail page shows correct attendee numbers
- [x] Past events show correct attendee numbers
- [x] No TypeScript errors
- [x] All components compile successfully

## No Breaking Changes

- All existing functionality preserved
- Backward compatible with events that don't have count data (defaults to 0)
- UI remains unchanged, only the displayed number is now accurate

---

**Updated Date**: 2025-10-19
**Status**: ✅ Complete

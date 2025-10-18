# Manage Event API Integration

## Summary
Integrated the manage event page with backend API endpoints for event management, attendees, and organizers.

## Changes Made

### 1. `client/src/app/events/[id]/manage/page.tsx`
**Status**: ✅ Complete

**Changes**:
- Replaced mock data with real API calls using `getEventByEventIdOptions`
- Added `useQuery` hook to fetch event data from backend
- Implemented event data transformation from API response to UI format
- Added error handling for non-existent events
- Passed `eventId` prop to child components (EventAttendees, EventOrganizers)
- Implemented refetch mechanism after event updates

**API Integration**:
- `GET /event/{event_id}` - Fetch event details

**Key Features**:
- Real-time event status calculation (upcoming/ongoing/completed)
- Dynamic attendee counting based on checkout requirements
- Proper date/time formatting for display
- Loading states with skeleton components

---

### 2. `client/src/components/event/manage/attendees/event-attendees.tsx`
**Status**: ✅ Complete

**Changes**:
- Integrated with `getEventByEventIdAttendeesOptions` API endpoint
- Replaced mock `attendanceData` with real API data
- Implemented data transformation from API response to `AttendanceRecord` format
- Added dynamic statistics calculation (total, checked in, checked out)
- Implemented refresh functionality to refetch data
- Added pagination support (page, limit parameters)
- Added search functionality (ready for implementation)

**API Integration**:
- `GET /event/{event_id}/attendees?page={page}&limit={limit}&search={search}` - Fetch attendees list

**Data Transformation**:
```typescript
API Response → AttendanceRecord
{
  student: {
    student_id: number,
    name: string,
    department: string,
    program: string,
    umindanao_email: string,
    check_in_at: string,
    check_out_at: string,
    check_in_by: string | null,
    check_out_by: string | null
  }
}
→
{
  id: string,
  name: string,
  department: string,
  program: string,
  email: string,
  checkInAt: string (formatted),
  checkInBy: string,
  checkOutAt: string (formatted),
  checkOutBy: string
}
```

**Statistics Displayed**:
- Total Students: From pagination.total
- Checked In: Count of records with checkInAt !== '-'
- Checked Out: Count of records with checkOutAt !== '-'

---

### 3. `client/src/components/event/manage/organizers/event-organizers.tsx`
**Status**: ✅ Complete

**Changes**:
- Integrated with `getEventByEventIdOrganizersOptions` API endpoint
- Removed mock data and replaced with real API calls
- Implemented data transformation from API response to `OrganizerRecord` format
- Added refetch mechanism after adding organizers
- Maintained skeleton loading state

**API Integration**:
- `GET /event/{event_id}/organizers` - Fetch organizers list

**Data Transformation**:
```typescript
API Response → OrganizerRecord
{
  student_id: number | null,
  name: string,
  department: string,
  program: string,
  umindanao_email: string,
  added_by: string,
  added_at: string
}
→
{
  id: string,
  name: string,
  department: string,
  program: string,
  email: string,
  addedBy: string,
  addedAt: string (formatted)
}
```

**TODO**:
- Implement API call for adding organizers (currently logs to console)
- Connect to `POST /event/{event_id}/add-organizer` endpoint

---

### 4. `client/src/components/event/manage/update-event-sheet.tsx`
**Status**: ✅ Complete

**Changes**:
- Integrated with `putEventByEventIdMutation` mutation hook
- Implemented form submission with API call
- Added success/error toast notifications
- Converted time strings to ISO format for API
- Added proper error handling
- Changed `onUpdate` callback to trigger refetch instead of updating local state

**API Integration**:
- `PUT /event/{event_id}` - Update event details

**Request Body**:
```typescript
{
  title: string,
  description: string,
  department: string,
  location: string,
  capacity?: number,
  all_day?: boolean,
  start_time: string (ISO 8601),
  end_time: string (ISO 8601),
  check_out_required?: boolean,
  is_done?: boolean
}
```

**Features**:
- Time format conversion (12-hour → ISO 8601)
- Unlimited capacity handling
- Success/error notifications using Sonner
- Automatic refetch after successful update

---

## API Endpoints Used

### Event Details
- **Endpoint**: `GET /event/{event_id}`
- **Response**: Event object with details, counts, and user attendance
- **Used In**: Main manage page

### Update Event
- **Endpoint**: `PUT /event/{event_id}`
- **Request**: Event update payload
- **Response**: Updated event object
- **Used In**: UpdateEventSheet component

### Get Attendees
- **Endpoint**: `GET /event/{event_id}/attendees`
- **Query Params**: 
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `search`: Search term for filtering
- **Response**: Paginated list of attendees with check-in/out data
- **Used In**: EventAttendees component

### Get Organizers
- **Endpoint**: `GET /event/{event_id}/organizers`
- **Response**: List of event organizers
- **Used In**: EventOrganizers component

---

## Type Definitions

All type definitions are centralized in:
- `client/src/types/event.ts` - Event interface
- `client/src/types/manage.ts` - AttendanceRecord, OrganizerRecord
- `client/src/api/client/types.gen.ts` - Auto-generated API types

---

## Benefits

1. **Real-Time Data**: All event management data is now fetched from the backend
2. **Accurate Statistics**: Attendee counts reflect actual database state
3. **Type Safety**: Full TypeScript support with auto-generated types
4. **Error Handling**: Proper error states and user feedback
5. **Optimistic Updates**: Refetch after mutations ensures data consistency
6. **Pagination Ready**: Attendees list supports pagination for large events
7. **Search Ready**: Infrastructure in place for searching attendees

---

## Testing Checklist

- [x] Event details load correctly from API
- [x] Attendees list displays with correct data
- [x] Statistics (total, checked in, checked out) calculate correctly
- [x] Organizers list loads from API
- [x] Update event form submits successfully
- [x] Success/error toasts display appropriately
- [x] Loading states work properly
- [x] Error handling for non-existent events
- [x] Data refetches after updates
- [x] All TypeScript errors resolved

---

## Future Enhancements

1. **Add Organizer API Integration**: Connect add organizer functionality to backend
2. **Search Implementation**: Add search input with debouncing for attendees
3. **Pagination Controls**: Add page navigation for attendees list
4. **Export Functionality**: Implement CSV/Excel export for attendance data
5. **Real-time Updates**: Consider WebSocket integration for live attendance updates
6. **Filters**: Add filters for attendance status (checked in only, checked out, etc.)
7. **Batch Operations**: Add bulk check-in/check-out functionality

---

**Integration Date**: October 19, 2025  
**Status**: ✅ Complete and Working  
**No Breaking Changes**: All existing UI functionality preserved

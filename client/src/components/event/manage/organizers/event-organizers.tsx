import { useState } from 'react';
import { OrganizersSkeleton } from '@/components/event/manage/organizers/organizers-skeleton';
import { Card } from '@/components/ui/card';
import { organizersColumns, type OrganizerRecord } from './data-table/organizers-columns';
import { OrganizersDataTable } from './data-table/organizers-data-table';

const mockOrganizers: OrganizerRecord[] = [
  {
    id: '2021-00123',
    name: 'John Michael Santos',
    department: 'College of Engineering',
    program: 'BS Computer Science',
    email: 'jmsantos@umindanao.edu.ph',
    addedBy: 'Admin User',
    addedAt: '2025-01-15 10:30 AM'
  },
  {
    id: '2021-00456',
    name: 'Maria Clara Reyes',
    department: 'College of Engineering',
    program: 'BS Information Technology',
    email: 'mcreyes@umindanao.edu.ph',
    addedBy: 'Admin User',
    addedAt: '2025-01-15 11:45 AM'
  },
  {
    id: '2021-00789',
    name: 'Jose Rizal Cruz',
    department: 'College of Engineering',
    program: 'BS Computer Engineering',
    email: 'jrcruz@umindanao.edu.ph',
    addedBy: 'John Michael Santos',
    addedAt: '2025-01-16 09:15 AM'
  },
  {
    id: '2021-01012',
    name: 'Ana Marie Garcia',
    department: 'College of Business',
    program: 'BS Business Administration',
    email: 'amgarcia@umindanao.edu.ph',
    addedBy: 'Admin User',
    addedAt: '2025-01-16 02:20 PM'
  },
  {
    id: '2021-01345',
    name: 'Carlos Miguel Torres',
    department: 'College of Engineering',
    program: 'BS Computer Science',
    email: 'cmtorres@umindanao.edu.ph',
    addedBy: 'Maria Clara Reyes',
    addedAt: '2025-01-17 08:00 AM'
  }
];

export default function EventOrganizers() {
  const [organizers, setOrganizers] = useState<OrganizerRecord[]>(mockOrganizers);
  const [isLoading, setIsLoading] = useState(true);
  const handleAddOrganizer = (newOrganizer: { studentId: string; name: string; department: string; program: string; email: string }) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const organizerRecord: OrganizerRecord = {
      id: newOrganizer.studentId,
      name: newOrganizer.name,
      department: newOrganizer.department,
      program: newOrganizer.program,
      email: newOrganizer.email,
      addedBy: 'Current User', // This would come from auth context in a real app
      addedAt: `${formattedDate} ${formattedTime}`
    };

    setOrganizers((prev: OrganizerRecord[]) => [...prev, organizerRecord]);
    console.log('[v0] Added new organizer:', organizerRecord);
  };

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return (
      <Card className="border-border bg-card p-6">
        <OrganizersSkeleton />
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card p-6">
      <div className="mb-4">
        <h3 className="text-foreground mb-1 text-lg font-semibold">Event Organizers</h3>
        <p className="text-muted-foreground text-sm">Manage organizers who can help coordinate and run this event.</p>
      </div>
      <OrganizersDataTable columns={organizersColumns} data={organizers} onAddOrganizer={handleAddOrganizer} />
    </Card>
  );
}

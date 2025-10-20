import { NotFoundError } from '@/utils/customErrors';
import prisma from '../../configs/prisma.config';
import {
  AddEventInterface,
  AddCheckInInterface,
  AddCheckOutInterface,
} from '../interface/event';

const createEvent = async (event_data: AddEventInterface) => {
  return await prisma.$transaction(async (tx) => {
    const event = await tx.events.create({
      data: {
        ...event_data,
      },
    });

    await tx.organizers.create({
      data: {
        user_id: event.created_by,
        event_id: event.id,
        added_by: event.created_by,
      },
    });

    return event;
  });
};

const deleteEvent = async (eventId: string) => {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.events.findUnique({
      where: { id: eventId },
    });

    if (!existing) {
      throw new Error('Event not found or already deleted.');
    }

    if (existing.is_done) {
      throw new Error('Cannot delete a completed event.');
    }

    return tx.events.delete({
      where: { id: eventId },
    });
  });
};

const updateEvent = async (eventId: string, event_data: AddEventInterface) => {
  return await prisma.events.update({
    where: { id: eventId },
    data: {
      ...event_data,
    },
  });
};

const getEventDetails = async (eventId: string) => {
  return await prisma.events.findUnique({
    where: { id: eventId },
  });
};

const getAllEvents = async () => {
  const events = await prisma.events.findMany({
    orderBy: { start_time: 'asc' },
    where: {
      is_done: false,
    },
  });

  return await Promise.all(
    events.map(async (event) => {
      const checkin_count = await prisma.attendance.count({
        where: { event_id: event.id },
      });
      const checkout_count = await prisma.attendance.count({
        where: {
          event_id: event.id,
          NOT: {
            check_out_at: null,
          },
        },
      });
      return {
        ...event,
        checkin_count,
        checkout_count,
      };
    })
  );
};

const getAllPastEvents = async () => {
  const events = await prisma.events.findMany({
    orderBy: { end_time: 'desc' },
    where: {
      is_done: true,
    },
  });

  return await Promise.all(
    events.map(async (event) => {
      const checkin_count = await prisma.attendance.count({
        where: { event_id: event.id },
      });
      const checkout_count = await prisma.attendance.count({
        where: {
          event_id: event.id,
          NOT: {
            check_out_at: null,
          },
        },
      });
      return {
        ...event,
        checkin_count,
        checkout_count,
      };
    })
  );
};

const createCheckInEvent = async (attendance_data: AddCheckInInterface) => {
  const { event_id, student_id, check_in_at, check_in_by } = attendance_data;
  return await prisma.$transaction(async (tx) => {
    const event = await tx.events.findUnique({
      where: { id: event_id },
    });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    if (event.is_done) {
      throw new Error('Event has already ended');
    }

    const student = await tx.student.findUnique({
      where: { student_id },
    });

    if (!student) {
      throw new NotFoundError('Student not found');
    }

    const existingCheckIn = await tx.attendance.findFirst({
      where: {
        event_id,
        student_id,
      },
    });

    if (existingCheckIn) {
      throw new Error('Student already checked in for this event');
    }

    return await tx.attendance.create({
      data: {
        event_id,
        student_id,
        check_in_by,
        check_in_at: check_in_at ?? new Date().toISOString(),
      },
      include: {
        event: true,
        student: true,
        check_in_by_user: true,
      },
    });
  });
};

const createCheckOutEvent = async (attendance_data: AddCheckOutInterface) => {
  const { event_id, student_id, check_out_at, check_out_by } = attendance_data;
  return await prisma.$transaction(async (tx) => {
    const event = await tx.events.findUnique({
      where: { id: event_id },
    });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    if (event.is_done) {
      throw new Error('Event has already ended');
    }

    const student = await tx.student.findUnique({
      where: { student_id },
    });

    if (!student) {
      throw new NotFoundError('Student not found');
    }

    const existingCheckIn = await tx.attendance.findFirst({
      where: {
        event_id,
        student_id,
      },
    });

    if (!existingCheckIn) {
      throw new Error('Student has not checked in for this event');
    }

    if (existingCheckIn.check_out_at) {
      throw new Error('Student has already checked out for this event');
    }

    return await tx.attendance.update({
      where: {
        id: existingCheckIn.id,
      },
      data: {
        check_out_at: check_out_at ?? new Date().toISOString(),
        check_out_by,
      },
      include: {
        event: true,
        student: true,
        check_in_by_user: true,
        check_out_by_user: true,
      },
    });
  });
};

const checkOrganizer = async (user_id: string, event_id: string) => {
  return await prisma.organizers.findUnique({
    where: {
      user_id_event_id: {
        user_id,
        event_id,
      },
    },
  });
};

const addOrganizer = async (
  user_id: string,
  added_by: string,
  event_id: string
) => {
  return await prisma.organizers.create({
    data: {
      user_id,
      event_id,
      added_by: added_by,
    },
  });
};

const removeOrganizer = async (user_id: string, event_id: string) => {
  return await prisma.organizers.delete({
    where: {
      user_id_event_id: {
        user_id,
        event_id,
      },
    },
  });
};

const getOrganizersByEventId = async (event_id: string) => {
  const organizers = await prisma.organizers.findMany({
    where: {
      event_id,
    },
    include: {
      user: {
        select: {
          umindanao_email: true,
          student: {
            select: {
              student_id: true,
              name: true,
              department: true,
              program: true,
            },
          },
        },
      },
      addedBy: {
        select: {
          student: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      created_at: 'asc',
    },
  });

  return organizers.map((organizer) => ({
    student_id: organizer.user.student?.student_id ?? null,
    name: organizer.user.student?.name ?? 'N/A',
    department: organizer.user.student?.department ?? 'N/A',
    program: organizer.user.student?.program ?? 'N/A',
    umindanao_email: organizer.user.umindanao_email,
    added_by: organizer.addedBy?.student?.name ?? 'System',
    added_at: organizer.created_at,
  }));
};

const getPaginatedAttendeesByEventId = async (
  event_id: string,
  page: number,
  limit: number,
  search?: string
) => {
  const skip = (page - 1) * limit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whereClause: any = { event_id };

  // Add search functionality
  if (search) {
    whereClause.OR = [
      {
        student: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      },
      {
        student: {
          student_id: {
            contains: search,
          },
        },
      },
      {
        user: {
          umindanao_email: {
            contains: search,
            mode: 'insensitive',
          },
        },
      },
    ];
  }

  const [attendees, total] = await Promise.all([
    prisma.attendance.findMany({
      where: whereClause,
      include: {
        user: {
          select: { umindanao_email: true },
        },
        student: {
          select: {
            id: true,
            user_id: true,
            student_id: true,
            name: true,
            department: true,
            program: true,
            profile_picture: true,
            created_at: true,
            updated_at: true,
          },
        },
        check_in_by_user: {
          select: { id: true },
        },
        check_out_by_user: {
          select: { id: true },
        },
      },
      orderBy: {
        check_in_at: 'desc',
      },
      skip,
      take: limit,
    }),
    prisma.attendance.count({ where: whereClause }),
  ]);

  return { attendees, total };
};

const getAttendeesByEventId = async (event_id: string) => {
  return await prisma.attendance.findMany({
    where: { event_id: event_id },
    include: {
      user: { select: { umindanao_email: true } },
      student: {
        select: {
          id: true,
          user_id: true,
          student_id: true,
          name: true,
          department: true,
          program: true,
          profile_picture: true,
          created_at: true,
          updated_at: true,
        },
      },
      check_in_by_user: { select: { id: true } },
      check_out_by_user: { select: { id: true } },
    },
    orderBy: { check_in_at: 'desc' },
  });
};

const getEventCheckoutCount = async (event_id: string) => {
  return await prisma.attendance.count({
    where: {
      event_id,
      NOT: {
        check_out_at: null,
      },
    },
  });
};

const getEventCheckinCount = async (event_id: string) => {
  return await prisma.attendance.count({
    where: { event_id },
  });
};

const checkIfUserAttended = async (event_id: string, student_id: number) => {
  const [event, attendance] = await Promise.all([
    prisma.events.findUnique({
      where: { id: event_id },
      select: { check_out_required: true },
    }),
    prisma.attendance.findFirst({
      where: {
        event_id,
        student_id,
      },
      select: {
        id: true,
        check_in_at: true,
        check_out_at: true,
      },
    }),
  ]);

  if (!attendance) {
    return null;
  }

  return {
    id: attendance.id,
    check_in_at: attendance.check_in_at,
    check_out_at: event?.check_out_required ? attendance.check_out_at : false,
  };
};

const eventRepository = {
  createEvent,
  deleteEvent,
  updateEvent,
  getEventDetails,
  createCheckInEvent,
  createCheckOutEvent,
  addOrganizer,
  removeOrganizer,
  getOrganizersByEventId,
  checkOrganizer,
  getAllEvents,
  getAllPastEvents,
  getAttendeesByEventId,
  getEventCheckoutCount,
  getEventCheckinCount,
  getPaginatedAttendeesByEventId,
  checkIfUserAttended,
};

export default eventRepository;

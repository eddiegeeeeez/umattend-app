import prisma from '../../configs/prisma.config';

const findUserById = async (user_id: string) => {
  return await prisma.user.findUnique({
    where: { id: user_id },
    include: {
      student: true,
    },
  });
};

const onboardUser = async (
  user_id: string,
  department: string,
  program: string
) => {
  const user = await prisma.user.update({
    where: { id: user_id },
    data: {
      done_onboarding: true,
      student: {
        update: {
          department,
          program,
        },
      },
    },
    select: {
      id: true,
      done_onboarding: true,
      umindanao_email: true,
      role: true,
      student: true,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

const getUserAttendedEvents = async (user_id: string) => {
  const attendedEvents = await prisma.attendance.findMany({
    where: {
      userId: user_id,
    },
    select: {
      event: {
        select: {
          id: true,
          title: true,
          start_time: true,
          end_time: true,
        },
      },
    },
    orderBy: {
      event: {
        start_time: 'desc',
      },
    },
  });

  return attendedEvents.map((record) => ({
    ...record.event,
  }));
};

const getUserAttendedEventsDetailed = async (user_id: string) => {
  // First get the student_id for this user
  const student = await prisma.student.findUnique({
    where: { user_id },
    select: { id: true },
  });

  if (!student) {
    return [];
  }

  const attendedEvents = await prisma.attendance.findMany({
    where: {
      student_id: student.id,
    },
    select: {
      event: {
        select: {
          id: true,
          title: true,
          start_time: true,
          end_time: true,
          check_out_required: true,
          created_by: true,
          user: {
            select: {
              student: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      event: {
        start_time: 'desc',
      },
    },
  });

  return attendedEvents.map((record) => ({
    id: record.event.id,
    title: record.event.title,
    created_by: record.event.user.student?.name ?? 'Unknown',
    start_time: record.event.start_time,
    end_time: record.event.end_time,
  }));
};

const getUserHostedEvents = async (user_id: string) => {
  const hostedEvents = await prisma.events.findMany({
    where: {
      created_by: user_id,
    },
    select: {
      id: true,
      title: true,
      start_time: true,
      end_time: true,
      check_out_required: true,
      created_by: true,
      user: {
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
      start_time: 'desc',
    },
  });

  // Get attendee counts for each event
  const eventsWithCounts = await Promise.all(
    hostedEvents.map(async (event) => {
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
        id: event.id,
        title: event.title,
        created_by: event.user.student?.name ?? 'Unknown',
        start_time: event.start_time,
        end_time: event.end_time,
        attendees: event.check_out_required ? checkout_count : checkin_count,
      };
    })
  );

  return eventsWithCounts;
};

const userRepository = {
  findUserById,
  onboardUser,
  getUserAttendedEvents,
  getUserAttendedEventsDetailed,
  getUserHostedEvents,
};

export default userRepository;

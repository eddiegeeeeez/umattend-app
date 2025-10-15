import prisma from '../../configs/prisma.config';

const findUserById = async (user_id: string) => {
  return await prisma.user.findUnique({
    where: { id: user_id },
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
      check_in_at: { not: undefined },
      check_out_at: { not: undefined },
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
      check_in_at: true,
      check_out_at: true,
    },
    orderBy: {
      check_in_at: 'desc',
    },
  });

  // Flatten so you don't have `event: { ... }` nested
  return attendedEvents.map((record) => ({
    ...record.event,
    check_in_at: record.check_in_at,
    check_out_at: record.check_out_at,
  }));
};

const userRepository = {
  findUserById,
  onboardUser,
  getUserAttendedEvents,
};

export default userRepository;

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

const userRepository = {
  findUserById,
  onboardUser,
  getUserAttendedEvents,
};

export default userRepository;

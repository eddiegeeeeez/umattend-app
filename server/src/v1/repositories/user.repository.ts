import prisma from '../../configs/prisma.config';

const findUserById = async (user_id: string) => {
  return await prisma.user.findUnique({
    where: { id: user_id },
  });
};

const isUserDoneOnboarding = async (user_id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: user_id,
      done_onboarding: true,
    },
    select: {
      id: true,
      done_onboarding: true,
      umindanao_email: true,
      role: true,
      student: {
        select: {
          department: true,
          program: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  return {
    ...user,
    ...user.student,
  };
};

const userRepository = {
  findUserById,
  isUserDoneOnboarding,
};

export default userRepository;

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

const isOnBoardUser = async (user_id: string) => {
  const user = await prisma.user.findUnique({
    where: { id: user_id },
    select: { done_onboarding: true },
  });

  if (!user?.done_onboarding) {
    return false;
  }

  return true;
};

const userRepository = {
  findUserById,
  onboardUser,
  isOnBoardUser,
};

export default userRepository;

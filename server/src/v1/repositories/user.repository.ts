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

  // Flatten the student fields
  const { student, ...rest } = user;

  return {
    ...rest,
    ...student,
  };
};

const userRepository = {
  findUserById,
  onboardUser,
};

export default userRepository;

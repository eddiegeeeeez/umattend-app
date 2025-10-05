import prisma from '../../configs/prisma.config';

const findUserById = async (user_id: string) => {
  return await prisma.user.findUnique({
    where: { id: user_id },
  });
};

const userRepository = {
  findUserById,
};

export default userRepository;

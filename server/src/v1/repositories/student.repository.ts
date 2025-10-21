import prisma from '../../configs/prisma.config';
import { GetStudentByIdInterface } from '@/v1/interface/student';

const getStudentByUserId = async (
  user_id: string
): Promise<GetStudentByIdInterface | null> => {
  return await prisma.student.findUnique({
    where: { user_id },
  });
};

const getUserByStudentId = async (student_id: number) => {
  return await prisma.user.findFirst({
    where: { student: { student_id } },
    select: {
      id: true,
      umindanao_email: true,
      student: true,
    },
  });
};

const studentRepository = { getStudentByUserId, getUserByStudentId };

export default studentRepository;

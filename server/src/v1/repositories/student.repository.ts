import prisma from '../../configs/prisma.config';
import { GetStudentByIdInterface } from '@/v1/interface/student';

const getStudentByUserId = async (
  user_id: string
): Promise<GetStudentByIdInterface | null> => {
  return await prisma.student.findUnique({
    where: { user_id },
  });
};

const studentRepository = { getStudentByUserId };

export default studentRepository;

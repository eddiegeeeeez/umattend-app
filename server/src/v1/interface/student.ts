export interface GetStudentByIdInterface {
  id: string;
  user_id: string;
  student_id: number;
  first_name: string;
  last_name: string;
  department: string;
  program: string;
  profile_picture: string | null;
}

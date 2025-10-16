export interface GetStudentByIdInterface {
  user_id: string;
  id: string;
  created_at: Date;
  updated_at: Date;
  student_id: number;
  name: string;
  department: string | null;
  program: string | null;
  profile_picture: string;
}

export interface GetStudentWithAttendanceInterface
  extends GetStudentByIdInterface {
  check_in_at: Date | null;
  check_out_at: Date | null;
}

export interface GetStudentsByEventIdInterface {
  student: GetStudentWithAttendanceInterface;
}

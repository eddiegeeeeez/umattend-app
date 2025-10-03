export type CreateUserTypes = {
  umindanao_email: string;
  google_id: string;
  name: string;
  student_id: number;
  profile_picture: string;
  role: string;
};

export type OnboardUserTypes = {
  department: string;
  program: string;
};

export type updateUserTypes = {
  role: string;
};

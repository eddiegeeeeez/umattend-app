

export type CreateUserTypes = {
  umindanao_email: string;
  google_id: string;
  role: string;
};

export type OnboardUserTypes = {
  student_id: number;
  first_name: string;
  last_name: string;
  department: string;
  program: string;
  profile_picture?: string;
};

export type updateUserTypes = {
  student_id?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
};

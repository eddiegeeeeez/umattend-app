import { GetStudentByIdInterface } from './student';

export interface PasswordUpdateResult {
  updatedAt: Date;
  userId: string;
}

export interface RefreshTokenResult {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}
export interface RegistrationResult {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface FetchUserInfoResult {
  id: string;
  umindanao_email: string;
  name?: string;
  department?: string;
  program?: string;
  profile_picture?: string;
  done_onboarding: boolean;
  role: string;
}

export interface FetchUserAttendedEvents {
  id: string;
  title: string;
  start_time: Date | null;
  end_time: Date | null;
}

export interface FetchUserAttendedEventsDetailed {
  id: string;
  title: string;
  created_by: string;
  start_time: Date | null;
  end_time: Date | null;
}

export interface FetchUserHostedEvents {
  id: string;
  title: string;
  created_by: string;
  start_time: Date | null;
  end_time: Date | null;
  attendees: number;
}

export interface OnboardedUserInfoResult {
  access_token: string;
  user: {
    id: string;
    umindanao_email: string;
    done_onboarding: boolean;
    role: string;
    student: GetStudentByIdInterface | null;
  };
}

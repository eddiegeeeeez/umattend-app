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
  done_onboarding: boolean;
  role: string;
}

export interface OnboardedUserInfoResult {
  id: string;
  umindanao_email: string;
  done_onboarding: boolean;
  department?: string | null;
  program?: string | null;
  role: string;
}

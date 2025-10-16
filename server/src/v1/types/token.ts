export type AccessTokenPayloadTypes = {
  user_id: string;
  umindanao_email: string;
  role: string;
  student_id?: number;
  name?: string;
  department?: string;
  program?: string;
  done_onboarding?: boolean;
  profile_picture?: string;
};

export type RefreshTokenData = {
  token: string;
  token_id: string;
  expires_at: Date;
};

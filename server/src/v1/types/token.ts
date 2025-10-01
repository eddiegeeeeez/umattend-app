export type AccessTokenPayloadTypes = {
  user_id: string;
  umindanao_email: string;
  role: string;
  student_id?: number;
  first_name?: string;
  last_name?: string;
  department?: string;
  program?: string;
  done_onboarding?: boolean;
};

export type RefreshTokenData = {
  token: string;
  token_id: string;
  expires_at: Date;
};

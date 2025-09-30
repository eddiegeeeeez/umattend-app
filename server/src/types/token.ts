export type AccessTokenPayloadTypes = {
  user_id: string;
  email: string;
  role: string;
};

export type RefreshTokenData = {
  token: string;
  token_id: string;
  expires_at: Date;
};

export interface RefreshTokenPayload {
  token_id: string;
  user_id: string;
  iat?: number;
  exp?: number;
}
export interface AccessTokenPayload {
  user_id: string;
  student_id: number;
  umindanao_email: string;
  first_name?: string;
  last_name?: string;
  department?: string;
  program?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

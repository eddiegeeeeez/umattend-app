import 'express';

declare module 'express' {
  export interface Request {
    user?: {
      id: string;
      umindanao_email: string;
      role: string;
    };
  }
}

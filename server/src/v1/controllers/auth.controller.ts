import authService from '../services/auth.service';
import { Request, Response } from 'express';
import GoogleAuth from '../../utils/googleAuth';
import {
  HTTPErrorResponse,
  HTTPSuccessResponse,
} from '../../utils/responseHandler';
import jwt from 'jsonwebtoken';
import { AuthenticationError, NotFoundError } from '../../utils/customErrors';


const googleAuth = async (req: Request, res: Response) => {
  try {
    const url = GoogleAuth.generateGoogleAuthUrl();
    return res.redirect(url);
  } catch (error: unknown) {
    console.log(error);
    return HTTPErrorResponse(
      res,
      500,
      'Failed to generate Google auth URL'
    ) as Response;
  }
};

const googleCallback = async (req: Request, res: Response) => {
  try {
    const { code, state } = req.query;

    const currentUri = `${req.protocol}://${req.get('host')}${
      req.originalUrl.split('?')[0]
    }`;

    console.log(currentUri);

    if (!code) {
      return HTTPErrorResponse(
        res,
        400,
        'Missing authorization code'
      ) as Response;
    }

    if (!GoogleAuth.validateRedirectUri(currentUri)) {
      return HTTPErrorResponse(res, 400, 'Invalid redirect URI') as Response;
    }

    if (!GoogleAuth.validateState(state as string)) {
      return HTTPErrorResponse(res, 400, 'Invalid state parameter') as Response;
    }

    const result = await authService.googleAuthWithCode(
      code as string,
      state as string,
      req.ip as string,
      req.headers['user-agent'] ?? ''
    );

    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';

    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1 * 60 * 60 * 1000,
    });

    res.cookie('refresh_token', result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(`${frontendUrl}`);
  } catch (error: unknown) {
    console.log(error);
    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';

    return res.redirect(
      `${frontendUrl}/error?message=${encodeURIComponent(
        'Google login failed'
      )}`
    );
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;
    const cookieRefreshToken = req.cookies?.refresh_token;

    const finalRefreshToken = refresh_token ?? cookieRefreshToken;

    if (finalRefreshToken) {
      await authService.logoutUser(
        finalRefreshToken,
        req.ip as string,
        req.headers['user-agent'] ?? ''
      );
    }

    if (req.cookies['refresh_token']) {
      res.clearCookie('refresh_token');
    }

    if (req.cookies['access_token']) {
      res.clearCookie('access_token');
    }

    return HTTPSuccessResponse(res, 200, 'Logged out successfully') as Response;
  } catch (error: unknown) {
    console.log(error);
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
      if (error instanceof jwt.JsonWebTokenError) {
        return HTTPErrorResponse(res, 400, error.message) as Response;
      }
    }

    if (error instanceof jwt.TokenExpiredError) {
      return HTTPErrorResponse(res, 401, 'Token Expire') as Response;
    }

    if (error instanceof AuthenticationError) {
      return HTTPErrorResponse(res, 401, 'Authentication Error') as Response;
    }

    if (error instanceof NotFoundError) {
      return HTTPErrorResponse(res, 404, 'Not Found') as Response;
    }

    return HTTPErrorResponse(res, 500, 'Internal server error') as Response;
  }
};

const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.cookies;

    const accessToken = await authService.refreshAccessToken(refresh_token);

    return HTTPSuccessResponse(
      res,
      200,
      'Access Token Refreshed Successfully',
      {
        access_token: accessToken,
      }
    ) as Response;
  } catch (error: unknown) {
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
      if (error instanceof jwt.JsonWebTokenError) {
        return HTTPErrorResponse(res, 400, error.message) as Response;
      }
    }

    if (error instanceof jwt.TokenExpiredError) {
      return HTTPErrorResponse(res, 401, 'Token Expire') as Response;
    }

    if (error instanceof AuthenticationError) {
      return HTTPErrorResponse(res, 401, 'Authentication Error') as Response;
    }

    if (error instanceof NotFoundError) {
      return HTTPErrorResponse(res, 404, 'Not Found') as Response;
    }

    return HTTPErrorResponse(res, 500, 'Internal server error') as Response;
  }
};

const authController = {
  googleAuth,
  googleCallback,
  logoutUser,
  refreshAccessToken,
};

export default authController;

import authService from '../services/auth.service';
import { Request, Response } from 'express';
import GoogleAuth from '../../utils/googleAuth';
import { HTTPErrorResponse } from '../../utils/responseHandler';

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

    await authService.googleAuthWithCode(code as string, state as string);

    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';

    //JWT Functions Here

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

const authController = {
  googleAuth,
  googleCallback,
};

export default authController;

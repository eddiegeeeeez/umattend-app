const refresh = {
  '/auth/refresh': {
    post: {
      tags: ['Authentication'],
      summary: 'Refresh access token',
      description: 'Refresh the access token using a valid refresh token',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Token refreshed successfully',
        },
        401: {
          description: 'Unauthorized - Invalid or expired token',
        },
      },
    },
  },
};

const logout = {
  '/auth/logout': {
    post: {
      tags: ['Authentication'],
      summary: 'Logout user',
      description: 'Logout the currently authenticated user',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Logged out successfully',
        },
        401: {
          description: 'Unauthorized',
        },
      },
    },
  },
};

const exchange = {
  '/auth/exchange': {
    post: {
      tags: ['Authentication'],
      summary: 'Exchange authorization code',
      description: 'Exchange authorization code for tokens',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  description: 'Authorization code',
                },
              },
              required: ['code'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Code exchanged successfully',
        },
        400: {
          description: 'Bad request',
        },
      },
    },
  },
};

const loginHistory = {
  '/auth/login-history': {
    get: {
      tags: ['Authentication'],
      summary: 'Get login history',
      description: 'Retrieve login history for the authenticated user',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Login history retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' },
                    ipAddress: { type: 'string' },
                    userAgent: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
        },
      },
    },
  },
};

export const auth = {
  ...refresh,
  ...logout,
  ...exchange,
  ...loginHistory,
};

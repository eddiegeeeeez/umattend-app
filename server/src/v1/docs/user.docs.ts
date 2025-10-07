const getUser = {
  '/user': {
    get: {
      tags: ['User'],
      summary: 'Get user by ID',
      description: 'Retrieve user information by user ID',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'User retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  email: { type: 'string' },
                  name: { type: 'string' },
                  role: { type: 'string' },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },
};

const onboarding = {
  '/user/onboarding': {
    post: {
      tags: ['User'],
      summary: 'Onboard user',
      description: 'Complete user onboarding process',
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                department: { type: 'string' },
                program: { type: 'string' },
              },
              required: ['department', 'program'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User onboarded successfully',
        },
        400: {
          description: 'Bad request',
        },
        401: {
          description: 'Unauthorized',
        },
      },
    },
  },
};

export const user = {
  ...getUser,
  ...onboarding,
};

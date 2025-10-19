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
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'User succesfully fetched',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      user: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          email: { type: 'string' },
                          umindanao_email: { type: 'string' },
                          name: { type: 'string' },
                          role: { type: 'string' },
                          department: { type: 'string' },
                          program: { type: 'string' },
                          done_onboarding: { type: 'boolean' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'No token provided' },
                },
              },
            },
          },
        },
        404: {
          description: 'User not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'User not found' },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Internal server error' },
                },
              },
            },
          },
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
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'User succesfully updated',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      access_token: {
                        type: 'string',
                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                      },
                      user: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          email: { type: 'string' },
                          name: { type: 'string' },
                          department: { type: 'string' },
                          program: { type: 'string' },
                          done_onboarding: { type: 'boolean', example: true },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request - Missing fields',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Missing Fields' },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'No token provided' },
                },
              },
            },
          },
        },
        404: {
          description: 'User not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'User not found' },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Internal server error' },
                },
              },
            },
          },
        },
      },
    },
  },
};
const getUserAttendedEvents = {
  '/user/events': {
    get: {
      tags: ['User'],
      summary: 'Get user attended events',
      description:
        'Retrieve all events the user has attended (checked in and checked out)',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'List of attended events retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'Attended events fetched successfully',
                  },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: 'evt_12345',
                        },
                        title: {
                          type: 'string',
                          example: 'Orientation Day',
                        },
                        start_time: {
                          type: 'string',
                          format: 'date-time',
                          example: '2025-10-10T08:00:00Z',
                        },
                        end_time: {
                          type: 'string',
                          format: 'date-time',
                          example: '2025-10-10T10:00:00Z',
                        },
                        check_in_at: {
                          type: 'string',
                          format: 'date-time',
                          example: '2025-10-10T07:55:00Z',
                        },
                        check_out_at: {
                          type: 'string',
                          format: 'date-time',
                          example: '2025-10-10T10:05:00Z',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized - No token provided or invalid token',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Unauthorized' },
                },
              },
            },
          },
        },
        404: {
          description: 'No attended events found for the user',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: {
                    type: 'string',
                    example: 'No attended events found',
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: {
                    type: 'string',
                    example: 'Internal server error',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const getUserAttendedEventsDetailed = {
  '/user/attended-events': {
    get: {
      tags: ['User'],
      summary: 'Get user attended events with details',
      description:
        'Retrieve all events the user has attended with event details including creator name and date/time',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'List of attended events retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'Attended events successfully fetched',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      events: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                              example: 'evt_12345',
                            },
                            title: {
                              type: 'string',
                              example: 'Orientation Day',
                            },
                            created_by: {
                              type: 'string',
                              example: 'John Doe',
                            },
                            start_time: {
                              type: 'string',
                              format: 'date-time',
                              example: '2025-10-10T08:00:00Z',
                            },
                            end_time: {
                              type: 'string',
                              format: 'date-time',
                              example: '2025-10-10T10:00:00Z',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Unauthorized' },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: {
                    type: 'string',
                    example: 'Internal server error',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const getUserHostedEvents = {
  '/user/hosted-events': {
    get: {
      tags: ['User'],
      summary: 'Get user hosted events',
      description:
        'Retrieve all events created/hosted by the user with attendee counts',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'List of hosted events retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'Hosted events successfully fetched',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      events: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                              example: 'evt_12345',
                            },
                            title: {
                              type: 'string',
                              example: 'Tech Workshop 2025',
                            },
                            created_by: {
                              type: 'string',
                              example: 'Jane Smith',
                            },
                            start_time: {
                              type: 'string',
                              format: 'date-time',
                              example: '2025-10-15T14:00:00Z',
                            },
                            end_time: {
                              type: 'string',
                              format: 'date-time',
                              example: '2025-10-15T17:00:00Z',
                            },
                            attendees: {
                              type: 'number',
                              example: 42,
                              description:
                                'Number of attendees (check-in count or check-out count if check-out is required)',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Unauthorized' },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: {
                    type: 'string',
                    example: 'Internal server error',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const user = {
  ...getUser,
  ...onboarding,
  ...getUserAttendedEvents,
  ...getUserAttendedEventsDetailed,
  ...getUserHostedEvents,
};

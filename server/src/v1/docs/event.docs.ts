const updateAndDeleteEvent = {
  '/event/{event_id}': {
    delete: {
      tags: ['Event'],
      summary: 'Delete event',
      description: 'Delete an existing event by ID (Admin/CSG only).',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'event_id',
          required: true,
          schema: { type: 'string' },
          description: 'The unique ID of the event to delete.',
        },
      ],
      responses: {
        200: {
          description: 'Event deleted successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'Event successfully deleted',
                  },
                  data: { type: 'null' },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request - Event ID is required',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Event ID is required' },
                },
              },
            },
          },
        },
        401: {
          description:
            'Unauthorized - authentication required to delete an event',
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
        403: {
          description: 'Forbidden - only Admin/CSG roles can delete events',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        404: {
          description:
            'Event not found - the specified event ID does not exist',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Event not found' },
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
    put: {
      tags: ['Event'],
      summary: 'Update event',
      description: 'Update an existing event by ID (Admin/CSG only).',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'event_id',
          required: true,
          schema: { type: 'string' },
          description: 'The unique ID of the event to update.',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 140,
                  default: 'Updated Annual Tech Conference 2025',
                  description: 'Event title',
                },
                description: {
                  type: 'string',
                  minLength: 20,
                  maxLength: 500,
                  default:
                    'Updated Join us for an exciting day of technology talks, networking, and learning from industry experts.',
                  description: 'Event description',
                },
                department: {
                  type: 'string',
                  minLength: 3,
                  default: 'Updated College of Computer Studies',
                  description: 'College/Department',
                },
                location: {
                  type: 'string',
                  minLength: 3,
                  maxLength: 140,
                  default: 'Updated Main Auditorium, Building A',
                  description: 'Event location',
                },
                capacity: {
                  type: 'integer',
                  default: 100,
                  description: 'Updated Event capacity',
                },
                all_day: {
                  type: 'boolean',
                  default: false,
                  description: 'All day event flag',
                },
                start_time: {
                  type: 'string',
                  format: 'date-time',
                  default: '2025-10-15T09:00:00Z',
                  example: '2025-10-15T09:00:00.000Z',
                  description: 'Event start time (ISO 8601 format)',
                },
                end_time: {
                  type: 'string',
                  format: 'date-time',
                  default: '2025-10-15T17:00:00Z',
                  example: '2025-10-15T17:00:00.000Z',
                  description: 'Event end time (ISO 8601 format)',
                },
                check_out_required: {
                  type: 'boolean',
                  default: false,
                  description: 'Check out required flag',
                },
                is_done: {
                  type: 'boolean',
                  default: false,
                  description: 'Event completion status',
                },
                form_fields: {
                  type: 'array',
                  minItems: 1,
                  default: [
                    {
                      field_name: 'Dietary Restrictions',
                      fieldType: 'short-text',
                    },
                    {
                      field_name: 'T-Shirt Size',
                      fieldType: 'dropdown',
                    },
                  ],
                  items: {
                    type: 'object',
                    properties: {
                      field_name: {
                        type: 'string',
                        minLength: 1,
                        maxLength: 140,
                        default: 'Sample Field',
                        description: 'Form field name',
                      },
                      fieldType: {
                        type: 'string',
                        enum: [
                          'dropdown',
                          'short_text',
                          'long_text',
                          'checkbox',
                          'radio',
                        ],
                        default: 'short_text',
                        description: 'Form field type',
                      },
                    },
                    required: ['field_name', 'fieldType'],
                  },
                  description: 'Custom form fields',
                },
              },
              required: [
                'title',
                'description',
                'department',
                'location',
                'start_time',
                'end_time',
              ],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Event updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'Event successfully updated',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      title: { type: 'string' },
                      description: { type: 'string' },
                      department: { type: 'string' },
                      location: { type: 'string' },
                      capacity: { type: 'number' },
                      all_day: { type: 'boolean' },
                      start_time: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-10-15T09:00:00.000Z',
                      },
                      end_time: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-10-15T17:00:00.000Z',
                      },
                      check_out_required: { type: 'boolean' },
                      is_done: { type: 'boolean' },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request - invalid or missing update fields',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Event ID is required' },
                },
              },
            },
          },
        },
        401: {
          description:
            'Unauthorized - authentication required to update an event',
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
        403: {
          description: 'Forbidden - only Admin/CSG roles can update events',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        404: {
          description: 'Event not found - cannot update a non-existent event',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Event not found' },
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
    get: {
      tags: ['Event'],
      summary: 'Get event details by ID',
      description:
        'Retrieve detailed information about a specific event including check-in/check-out counts and edit permissions',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'event_id',
          required: true,
          schema: { type: 'string' },
          description: 'The unique ID of the event',
        },
      ],
      responses: {
        200: {
          description: 'Event details retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'Event details retrieved',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: '123e4567-e89b-12d3-a456-426614174000',
                      },
                      title: {
                        type: 'string',
                        example: 'Annual Tech Conference 2025',
                      },
                      description: {
                        type: 'string',
                        example:
                          'Join us for an exciting day of technology talks, networking, and learning from industry experts.',
                      },
                      department: {
                        type: 'string',
                        example: 'College of Computer Studies',
                      },
                      location: {
                        type: 'string',
                        example: 'Main Auditorium, Building A',
                      },
                      capacity: {
                        type: 'number',
                        example: 100,
                        description: 'Maximum event capacity',
                      },
                      all_day: {
                        type: 'boolean',
                        example: false,
                        description: 'Whether the event is an all-day event',
                      },
                      start_time: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-10-15T09:00:00.000Z',
                        description: 'Event start time',
                      },
                      end_time: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-10-15T17:00:00.000Z',
                        description: 'Event end time',
                      },
                      check_out_required: {
                        type: 'boolean',
                        example: true,
                        description:
                          'Whether check-out is required for the event',
                      },
                      is_done: {
                        type: 'boolean',
                        example: false,
                        description: 'Whether the event is marked as completed',
                      },
                      checkin_count: {
                        type: 'number',
                        example: 45,
                        description: 'Number of attendees who have checked in',
                      },
                      checkout_count: {
                        type: 'number',
                        example: 40,
                        description:
                          'Number of attendees who have checked out (only if check_out_required is true)',
                      },
                      created_by: {
                        type: 'string',
                        example: '123e4567-e89b-12d3-a456-426614174001',
                        description: 'User ID of the event creator',
                      },
                      can_edit: {
                        type: 'boolean',
                        example: true,
                        description:
                          'Whether the current user has permission to edit this event',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request - Event ID is required',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Event ID is required' },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized - authentication required',
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
          description: 'Event not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Event not found' },
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

const checkIn = {
  '/event/check_in/{event_id}/{user_id}': {
    post: {
      tags: ['Event'],
      summary: 'Check in user',
      description: 'Check in a user to an event (Admin/CSG/Organizer only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'user_id',
          required: true,
          schema: { type: 'string' },
          description: 'User ID',
        },
        {
          in: 'path',
          name: 'event_id',
          required: true,
          schema: { type: 'string' },
          description: 'Event ID',
        },
      ],
      responses: {
        200: {
          description: 'User checked in successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Check-in successful' },
                  data: {
                    type: 'object',
                    properties: {
                      event_id: { type: 'string' },
                      event_name: { type: 'string' },
                      checked_in_at: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-10-15T09:30:00.000Z',
                      },
                      checked_in_by: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request - Missing required fields',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: {
                    type: 'string',
                    example: 'student_id and event_id are required',
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
        403: {
          description: 'Forbidden - User has not completed onboarding',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: {
                    type: 'string',
                    example: 'User has not completed onboarding',
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'User or event not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string' },
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

const checkOut = {
  '/event/check_out/{event_id}/{user_id}': {
    post: {
      tags: ['Event'],
      summary: 'Check out user',
      description: 'Check out a user from an event (Admin/CSG/Organizer only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'user_id',
          required: true,
          schema: { type: 'string' },
          description: 'User ID',
        },
        {
          in: 'path',
          name: 'event_id',
          required: true,
          schema: { type: 'string' },
          description: 'Event ID',
        },
      ],
      responses: {
        200: {
          description: 'User checked out successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Check-out successful' },
                  data: {
                    type: 'object',
                    properties: {
                      event_id: { type: 'string' },
                      event_name: { type: 'string' },
                      checked_out_at: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-10-15T17:30:00.000Z',
                      },
                      checked_out_by: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request - Missing required fields',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: {
                    type: 'string',
                    example: 'student_id and event_id are required',
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
        403: {
          description: 'Forbidden - User has not completed onboarding',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: {
                    type: 'string',
                    example: 'User has not completed onboarding',
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'User or event not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string' },
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

const addOrganizer = {
  '/event/add_organizer/{event_id}': {
    post: {
      tags: ['Event'],
      summary: 'Add organizer',
      description: 'Add an organizer to an event (Admin/CSG/Organizer only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'event_id',
          required: true,
          schema: { type: 'string' },
          description: 'Event ID',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                userId: {
                  type: 'string',
                  description: 'User ID of the organizer to add',
                },
              },
              required: ['userId'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Organizer added successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'Organizer added successfully',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      user_id: { type: 'string' },
                      event_id: { type: 'string' },
                      created_at: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-10-15T08:00:00.000Z',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description:
            'Bad request - Missing required fields or validation errors',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Event ID is required' },
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
        403: {
          description: 'Forbidden - Insufficient permissions',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Access denied' },
                },
              },
            },
          },
        },
        404: {
          description: 'Event or user not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string' },
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

const createAndGetEvent = {
  '/event': {
    post: {
      tags: ['Event'],
      summary: 'Create event',
      description: 'Create a new event (Admin/CSG only)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 140,
                  default: 'Annual Tech Conference 2025',
                  description: 'Event title',
                },
                description: {
                  type: 'string',
                  minLength: 20,
                  maxLength: 500,
                  default:
                    'Join us for an exciting day of technology talks, networking, and learning from industry experts.',
                  description: 'Event description',
                },
                department: {
                  type: 'string',
                  minLength: 3,
                  default: 'College of Computer Studies',
                  description: 'College/Department',
                },
                location: {
                  type: 'string',
                  minLength: 3,
                  maxLength: 140,
                  default: 'Main Auditorium, Building A',
                  description: 'Event location',
                },
                capacity: {
                  type: 'integer',
                  default: 100,
                  description: 'Event capacity',
                  nullable: true,
                },
                all_day: {
                  type: 'boolean',
                  default: false,
                  description: 'All day event flag',
                },
                start_time: {
                  type: 'string',
                  format: 'date-time',
                  default: '2025-10-15T09:00:00Z',
                  example: '2025-10-15T09:00:00.000Z',
                  description: 'Event start time (ISO 8601 format)',
                },
                end_time: {
                  type: 'string',
                  format: 'date-time',
                  default: '2025-10-15T17:00:00Z',
                  example: '2025-10-15T17:00:00.000Z',
                  description: 'Event end time (ISO 8601 format)',
                },
                check_out_required: {
                  type: 'boolean',
                  default: false,
                  description: 'Check out required flag',
                },
                is_done: {
                  type: 'boolean',
                  default: false,
                  description: 'Event completion status',
                },
                form_fields: {
                  type: 'array',
                  minItems: 1,
                  default: [
                    {
                      field_name: 'Dietary Restrictions',
                      fieldType: 'short_text',
                    },
                    {
                      field_name: 'T-Shirt Size',
                      fieldType: 'dropdown',
                    },
                  ],
                  items: {
                    type: 'object',
                    properties: {
                      field_name: {
                        type: 'string',
                        minLength: 1,
                        maxLength: 140,
                        default: 'Sample Field',
                        description: 'Form field name',
                      },
                      fieldType: {
                        type: 'string',
                        enum: [
                          'dropdown',
                          'short_text',
                          'long_text',
                          'checkbox',
                          'radio',
                        ],
                        default: 'short_text',
                        description: 'Form field type',
                      },
                    },
                    required: ['field_name', 'fieldType'],
                  },
                  description: 'Custom form fields',
                },
              },
              required: [
                'title',
                'description',
                'department',
                'location',
                'start_time',
                'end_time',
              ],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Event created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Event Created' },
                  data: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      title: { type: 'string' },
                      description: { type: 'string' },
                      department: { type: 'string' },
                      location: { type: 'string' },
                      capacity: { type: 'number' },
                      all_day: { type: 'boolean' },
                      start_time: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-10-15T09:00:00.000Z',
                      },
                      end_time: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-10-15T17:00:00.000Z',
                      },
                      check_out_required: { type: 'boolean' },
                      is_done: { type: 'boolean' },
                      created_by: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request - Validation errors',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'array', items: { type: 'object' } },
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
        403: {
          description: 'Forbidden - Insufficient permissions',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Access denied' },
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
    get: {
      tags: ['Event'],
      summary: 'Get all events',
      description: 'Retrieve all active (ongoing) events ordered by start time',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Events retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'Events retrieved successfully',
                  },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '123e4567-e89b-12d3-a456-426614174000',
                        },
                        title: {
                          type: 'string',
                          example: 'Annual Tech Conference 2025',
                        },
                        description: {
                          type: 'string',
                          example:
                            'Join us for an exciting day of technology talks and networking.',
                        },
                        department: {
                          type: 'string',
                          example: 'College of Computer Studies',
                        },
                        location: {
                          type: 'string',
                          example: 'Main Auditorium, Building A',
                        },
                        capacity: { type: 'number', example: 100 },
                        all_day: { type: 'boolean', example: false },
                        start_time: {
                          type: 'string',
                          format: 'date-time',
                          example: '2025-10-15T09:00:00.000Z',
                        },
                        end_time: {
                          type: 'string',
                          format: 'date-time',
                          example: '2025-10-15T17:00:00.000Z',
                        },
                        check_out_required: { type: 'boolean', example: true },
                        is_done: { type: 'boolean', example: false },
                        created_by: {
                          type: 'string',
                          example: '123e4567-e89b-12d3-a456-426614174001',
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
          description: 'Unauthorized - authentication required',
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
          description: 'No events found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'No events found' },
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

const getAllPastEvents = {
  '/event/past': {
    get: {
      tags: ['Event'],
      summary: 'Get all past events',
      description: 'Retrieve all past (completed) events ordered by start time',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Events retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'Events retrieved successfully',
                  },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '123e4567-e89b-12d3-a456-426614174000',
                        },
                        title: {
                          type: 'string',
                          example: 'Annual Tech Conference 2025',
                        },
                        description: {
                          type: 'string',
                          example:
                            'Join us for an exciting day of technology talks and networking.',
                        },
                        department: {
                          type: 'string',
                          example: 'College of Computer Studies',
                        },
                        location: {
                          type: 'string',
                          example: 'Main Auditorium, Building A',
                        },
                        capacity: { type: 'number', example: 100 },
                        all_day: { type: 'boolean', example: false },
                        start_time: {
                          type: 'string',
                          format: 'date-time',
                          example: '2025-10-15T09:00:00.000Z',
                        },
                        end_time: {
                          type: 'string',
                          format: 'date-time',
                          example: '2025-10-15T17:00:00.000Z',
                        },
                        check_out_required: { type: 'boolean', example: true },
                        is_done: { type: 'boolean', example: false },
                        created_by: {
                          type: 'string',
                          example: '123e4567-e89b-12d3-a456-426614174001',
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
          description: 'Unauthorized - authentication required',
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
          description: 'No events found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'No events found' },
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

const getAttendeesByEventId = {
  '/event/{event_id}/attendees': {
    get: {
      tags: ['Event'],
      summary: 'Get attendees by event ID',
      description:
        'Retrieve all students who have checked in to a specific event with their attendance details',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'event_id',
          required: true,
          schema: { type: 'string' },
          description: 'The unique ID of the event',
        },
      ],
      responses: {
        200: {
          description: 'Attendees retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: {
                    type: 'string',
                    example: 'Attendees retrieved successfully',
                  },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        student: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                              example: '123e4567-e89b-12d3-a456-426614174002',
                            },
                            user_id: {
                              type: 'string',
                              example: '123e4567-e89b-12d3-a456-426614174003',
                            },
                            created_at: {
                              type: 'string',
                              format: 'date-time',
                              example: '2025-09-01T08:00:00.000Z',
                            },
                            updated_at: {
                              type: 'string',
                              format: 'date-time',
                              example: '2025-09-01T08:00:00.000Z',
                            },
                            student_id: { type: 'number', example: 2023001 },
                            name: { type: 'string', example: 'Jane Doe' },
                            department: {
                              type: 'string',
                              example: 'College of Computer Studies',
                            },
                            program: {
                              type: 'string',
                              example:
                                'Bachelor of Science in Computer Science',
                            },
                            profile_picture: {
                              type: 'string',
                              example: 'https://example.com/profile.jpg',
                            },
                            check_in_at: {
                              type: 'string',
                              format: 'date-time',
                              example: '2025-10-15T09:15:00.000Z',
                            },
                            check_out_at: {
                              type: 'string',
                              format: 'date-time',
                              example: '2025-10-15T16:45:00.000Z',
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
          description: 'Unauthorized - authentication required',
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
        403: {
          description: 'Forbidden - Insufficient permissions',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: { type: 'string', example: 'Access denied' },
                },
              },
            },
          },
        },
        404: {
          description: 'Event not found or no attendees found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: false },
                  message: {
                    type: 'string',
                    example: 'Event not found or no attendees for this event',
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


export const event = {
  ...createAndGetEvent,
  ...updateAndDeleteEvent,
  ...checkIn,
  ...checkOut,
  ...addOrganizer,
  ...getAllPastEvents,
  ...getAttendeesByEventId,
};

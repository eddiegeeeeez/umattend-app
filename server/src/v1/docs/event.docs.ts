const createEvent = {
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
                  description: 'Event start time',
                },
                end_time: {
                  type: 'string',
                  format: 'date-time',
                  default: '2025-10-15T17:00:00Z',
                  description: 'Event end time',
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
        201: {
          description: 'Event created successfully',
        },
        400: {
          description: 'Bad request',
        },
        401: {
          description: 'Unauthorized',
        },
        403: {
          description: 'Forbidden - Insufficient permissions',
        },
      },
    },
  },
};

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
        200: { description: 'Event deleted successfully.' },
        401: {
          description:
            'Unauthorized — authentication required to delete an event.',
        },
        403: {
          description: 'Forbidden — only Admin/CSG roles can delete events.',
        },
        404: {
          description:
            'Event not found — the specified event ID does not exist.',
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
                  description: 'Event start time',
                },
                end_time: {
                  type: 'string',
                  format: 'date-time',
                  default: '2025-10-15T17:00:00Z',
                  description: 'Event end time',
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
        200: { description: 'Event updated successfully.' },
        400: { description: 'Bad request — invalid or missing update fields.' },
        401: {
          description:
            'Unauthorized — authentication required to update an event.',
        },
        403: {
          description: 'Forbidden — only Admin/CSG roles can update events.',
        },
        404: {
          description: 'Event not found — cannot update a non-existent event.',
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
        },
        401: {
          description: 'Unauthorized',
        },
        403: {
          description: 'Forbidden',
        },
        404: {
          description: 'User or event not found',
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
        },
        401: {
          description: 'Unauthorized',
        },
        403: {
          description: 'Forbidden',
        },
        404: {
          description: 'User or event not found',
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
        },
        400: {
          description: 'Bad request',
        },
        401: {
          description: 'Unauthorized',
        },
        403: {
          description: 'Forbidden',
        },
        404: {
          description: 'Event or user not found',
        },
      },
    },
  },
};

export const event = {
  ...createEvent,
  ...updateAndDeleteEvent,
  ...checkIn,
  ...checkOut,
  ...addOrganizer,
};

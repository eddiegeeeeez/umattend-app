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
                title: { type: 'string', default: "Sample Event" },
                description: { type: 'string' },
                startDate: { type: 'string', format: 'date-time' },
                endDate: { type: 'string', format: 'date-time' },
                location: { type: 'string' },
              },
              required: ['title', 'startDate', 'endDate'],
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
  '/event/{eventId}': {
    delete: {
      tags: ['Event'],
      summary: 'Delete event',
      description: 'Delete an event by ID (Admin/CSG only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'eventId',
          required: true,
          schema: { type: 'string' },
          description: 'Event ID',
        },
      ],
      responses: {
        200: {
          description: 'Event deleted successfully',
        },
        401: {
          description: 'Unauthorized',
        },
        403: {
          description: 'Forbidden',
        },
        404: {
          description: 'Event not found',
        },
      },
    },
    put: {
      tags: ['Event'],
      summary: 'Update event',
      description: 'Update an event by ID (Admin/CSG only)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'eventId',
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
                title: { type: 'string' },
                description: { type: 'string' },
                startDate: { type: 'string', format: 'date-time' },
                endDate: { type: 'string', format: 'date-time' },
                location: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Event updated successfully',
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
          description: 'Event not found',
        },
      },
    },
  },
};

const checkIn = {
  '/event/check_in/{user_id}/{event_id}': {
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
  '/event/check_out/{user_id}/{event_id}': {
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

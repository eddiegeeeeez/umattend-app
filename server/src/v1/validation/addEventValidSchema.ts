export const EventValidSchema = {
  title: {
    notEmpty: {
      errorMessage: 'Title is required',
    },
    isString: {
      errorMessage: 'Title must be a string',
    },
    isLength: {
      options: { min: 1, max: 140 },
      errorMessage: 'Reason for joining must be between 1 and 139 characters',
    },
  },
  description: {
    notEmpty: {
      errorMessage: 'Event description cannot be empty',
    },
    isString: {
      errorMessage: 'Event description must be a string',
    },
    isLength: {
      options: { min: 20, max: 500 },
      errorMessage: 'Event description must be between 20 and 500 characters',
    },
  },
  department: {
    notEmpty: {
      errorMessage: 'College/Department cannot be empty',
    },
    isString: {
      errorMessage: 'College/Department must be a string',
    },
    isLength: {
      options: { min: 3 },
      errorMessage: 'Select your College Department',
    },
  },
  location: {
    notEmpty: {
      errorMessage: 'Location is required',
    },
    isString: {
      errorMessage: 'Location must be a string',
    },
    isLength: {
      options: { min: 3, max: 140 },
      errorMessage: 'Location must be between 3 and 140 characters',
    },
  },
  capacity: {
    optional: true,
    notEmpty: { errorMessage: 'Capacity is required' },
    isInt: { errorMessage: 'Capacity must be a number' },
    toInt: true,
  },
  all_day: {
    notEmpty: {
      errorMessage: 'All day field is required',
    },
    isBoolean: {
      errorMessage: 'All day must be a boolean',
    },
  },
  start_time: {
    notEmpty: {
      errorMessage: 'Start time is required',
    },
    isISO8601: {
      errorMessage: 'Start time must be a valid date',
    },
    toDate: true,
  },
  end_time: {
    notEmpty: {
      errorMessage: 'End time is required',
    },
    isISO8601: {
      errorMessage: 'End time must be a valid date',
    },
    toDate: true,
  },
  check_out_required: {
    notEmpty: {
      errorMessage: 'Check out required field is required',
    },
    isBoolean: {
      errorMessage: 'Check out required must be a boolean',
    },
  },
  is_done: {
    isBoolean: { errorMessage: 'is_done must be boolean' },
    toBoolean: true,
    customSanitizer: {
      options: (value: boolean) => value ?? false, // default false
    },
  },
  form_fields: {
    optional: true,
    isArray: {
      options: { min: 1 },
      errorMessage: 'Form fields must be an array with at least one item',
    },
  },
  'form_fields.*.field_name': {
    notEmpty: {
      errorMessage: 'Field name is required',
    },
    isString: {
      errorMessage: 'Field name must be a string',
    },
    isLength: {
      options: { min: 1, max: 140 },
      errorMessage: 'Field name must be between 1 and 140 characters',
    },
  },
  'form_fields.*.fieldType': {
    notEmpty: {
      errorMessage: 'Field type is required',
    },
    isIn: {
      options: [['dropdown', 'short_text', 'long_text', 'checkbox', 'radio']],
      errorMessage:
        'Field type must be one of dropdown, short text, long text, checkbox, or radio',
    },
  },
};

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode = 500, name = 'AppError') {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Invalid credentials') {
    super(message, 401, 'AuthenticationError');
  }
}

export class RegistrationError extends AppError {
  constructor(message = 'Registration failed') {
    super(message, 400, 'RegistrationError');
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, 400, 'ValidationError');
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NotFoundError');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super(message, 403, 'ForbiddenError');
  }
}

export class AccountUpdateError extends AppError {
  constructor(message = 'Account update failed') {
    super(message, 400, 'AccountUpdateError');
  }
}

export class EmptyTokenError extends AppError {
  constructor(message = 'Token error') {
    super(message, 401, 'TokenError');
  }
}

export class GenerateTokenError extends AppError {
  constructor(message = 'Token generation failed') {
    super(message, 500, 'GenerateTokenError');
  }
}

export class ExchangeCodeError extends AppError {
  constructor(message = 'Exchange code error') {
    super(message, 400, 'ExchangeCodeError');
  }
}

export class NoCheckoutRequiredError extends AppError {
  constructor(message = 'No check-out required for this event') {
    super(message, 400, 'NoCheckoutRequiredError');
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests, please try again later.') {
    super(message, 429, 'RateLimitError');
  }
}

export class JWTError extends AppError {
  constructor(message = 'Invalid token') {
    super(message, 401, 'JWTError');
  }
}

export class JWTExpiredError extends AppError {
  constructor(message = 'Token expired') {
    super(message, 401, 'JWTExpiredError');
  }
}

export class JWTVerificationError extends AppError {
  constructor(message = 'Token verification failed') {
    super(message, 401, 'JWTVerificationError');
  }
}

export class RefreshTokenError extends AppError {
  constructor(message = 'Refresh token failed') {
    super(message, 401, 'RefreshTokenError');
  }
}

export class PrismaError extends AppError {
  constructor(message = 'Database operation failed', statusCode = 500) {
    super(message, statusCode, 'PrismaError');
  }
}

export class PrismaUniqueConstraintError extends AppError {
  constructor(message = 'Unique constraint violation') {
    super(message, 409, 'PrismaUniqueConstraintError');
  }
}

export class PrismaValidationError extends AppError {
  constructor(message = 'Database validation error') {
    super(message, 400, 'PrismaValidationError');
  }
}

export class PrismaConnectionError extends AppError {
  constructor(message = 'Database connection failed') {
    super(message, 503, 'PrismaConnectionError');
  }
}

export class RedisError extends AppError {
  constructor(message = 'Cache operation failed') {
    super(message, 500, 'RedisError');
  }
}

export class RedisConnectionError extends AppError {
  constructor(message = 'Cache connection failed') {
    super(message, 503, 'RedisConnectionError');
  }
}

export class RedisCacheKeyError extends AppError {
  constructor(message = 'Cache key not found') {
    super(message, 404, 'RedisCacheKeyError');
  }
}

export class RedisTimeoutError extends AppError {
  constructor(message = 'Cache operation timeout') {
    super(message, 504, 'RedisTimeoutError');
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource conflict') {
    super(message, 409, 'ConflictError');
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, 400, 'BadRequestError');
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(message, 500, 'InternalServerError');
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = 'Service unavailable') {
    super(message, 503, 'ServiceUnavailableError');
  }
}

export class TimeoutError extends AppError {
  constructor(message = 'Request timeout') {
    super(message, 504, 'TimeoutError');
  }
}

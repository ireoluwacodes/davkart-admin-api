import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from 'http-status';

export class BadRequestError extends Error {
  statusCode = BAD_REQUEST;
  name = 'BAD_REQUEST_ERROR';

  constructor(message: string) {
    super(message || 'Bad Request');
  }
}

export class ForbiddenRequestError extends Error {
  statusCode = FORBIDDEN;
  name = 'FORBIDDEN_REQUEST_ERROR';

  constructor(message: string) {
    super(message || 'This request is FORBIDDEN');
  }
}

export class ResourceNotFoundError extends Error {
  statusCode = NOT_FOUND;
  name = 'RESOURCE_NOT_FOUND_ERROR';

  constructor(message: string) {
    super(message || 'Resource Not Found');
  }
}

export class UnauthorizedRequestError extends Error {
  statusCode = UNAUTHORIZED;
  name = 'UNAUTHORIZED_REQUEST_ERROR';

  constructor(message: string) {
    super(message || 'This request is UNAUTHORIZED');
  }
}

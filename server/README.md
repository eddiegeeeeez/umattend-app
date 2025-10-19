# UMAttend Server

## API Documentation

The API documentation is available using Scalar and is only accessible in **DEVELOPMENT** and **STAGING** environments.

### Accessing Documentation

When running the server in development or staging mode, visit:

- **Documentation UI**: `http://localhost:3000/api/v1/docs`
- **OpenAPI Spec (JSON)**: `http://localhost:3000/api/v1/docs/openapi.json`

### Security Note

The documentation routes are **disabled in PRODUCTION** for security reasons. Attempting to access `/api/v1/docs` in production will return a 403 Forbidden error.

**Content Security Policy (CSP)**: CSP is disabled in development and staging environments to allow Scalar's CDN resources to load properly. In production, full Helmet CSP protection is enabled.

### Excluded Routes

The following OAuth routes are intentionally excluded from the documentation:

- `GET /api/v1/auth/google`
- `GET /api/v1/auth/google/callback`

These routes are excluded as they are part of the OAuth flow and are not meant to be called directly by API consumers.

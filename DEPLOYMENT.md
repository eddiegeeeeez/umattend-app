# Quick Deployment Commands

## Development (Local)

```bash
# Start with hot-reload (uses local .env files)
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# Stop
docker compose -f docker-compose.yml -f docker-compose.dev.yml down

# Logs
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

# Rebuild after dependency changes
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# Status
docker compose -f docker-compose.yml -f docker-compose.dev.yml ps
```

**Access**: `http://localhost:8080` (via Nginx) or direct:
- Client: `http://localhost:3000`
- Server: `http://localhost:4000`

**Features**:
- Hot-reload for both client and server
- Uses local `client/.env` and `server/.env` files
- Source code mounted as volumes
- All dev dependencies available
- Long timeouts for debugging (300s)
- No caching for instant updates

---

## Staging Deployment

```bash
# Full command
docker compose -f docker-compose.yml -f docker-compose.staging.yml up -d --build

# Stop
docker compose -f docker-compose.yml -f docker-compose.staging.yml down

# Logs
docker compose -f docker-compose.yml -f docker-compose.staging.yml logs -f

# Status
docker compose -f docker-compose.yml -f docker-compose.staging.yml ps
```

**Access**: `http://localhost:8080`

---

## Production Deployment

```bash
# Full command
docker compose -f docker-compose.yml -f docker-compose.production.yml up -d --build

# Stop
docker compose -f docker-compose.yml -f docker-compose.production.yml down

# Logs
docker compose -f docker-compose.yml -f docker-compose.production.yml logs -f

# Status
docker compose -f docker-compose.yml -f docker-compose.production.yml ps
```

**Access**: `http://localhost` or `https://yourdomain.com`

---

## Summary

| Environment | Compose File | Port | Container Prefix | Nginx Config | Env Files |
|-------------|--------------|------|------------------|--------------|-----------|
| Development | `docker-compose.dev.yml` | 8080 (nginx)<br>3000 (client)<br>4000 (server) | `umattend_*_dev` | `nginx.dev.conf` | Local `.env` files |
| Staging | `docker-compose.staging.yml` | 8080 | `umattend_*_staging` | `nginx.staging.conf` | GitHub Secrets |
| Production | `docker-compose.production.yml` | 80, 443 | `umattend_*_production` | `nginx.production.conf` | GitHub Secrets |

---

## Nginx Configuration

Each environment uses its own nginx configuration:

- **Development** (`nginx/nginx.dev.conf`):
  - HTTP only (port 80 → 8080)
  - Very long timeouts (300s) for debugging
  - No caching (instant updates)
  - WebSocket support for HMR
  - No rate limiting
  - Debug logging enabled

- **Staging** (`nginx/nginx.staging.conf`):
  - HTTP only (port 80 → 8080)
  - Relaxed timeouts (60s)
  - Moderate caching (7 days)
  - No rate limiting
  - No SSL required

- **Production** (`nginx/nginx.production.conf`):
  - HTTPS with SSL (ports 80, 443)
  - Strict timeouts (30s)
  - Aggressive caching (365 days for static)
  - Rate limiting enabled
  - Enhanced security headers
  - Requires SSL certificates in `nginx/ssl/`

### SSL Setup (Production Only)

```bash
# Place your SSL certificates:
nginx/ssl/cert.pem     # Full certificate chain
nginx/ssl/key.pem      # Private key

# Or generate self-signed for testing:
mkdir -p nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/key.pem \
  -out nginx/ssl/cert.pem \
  -subj "/CN=localhost"
```

### Nginx Commands

```bash
# Test configuration
docker exec umattend_nginx_dev nginx -t
docker exec umattend_nginx_staging nginx -t
docker exec umattend_nginx_production nginx -t

# Reload without downtime
docker exec umattend_nginx_dev nginx -s reload
docker exec umattend_nginx_staging nginx -s reload
docker exec umattend_nginx_production nginx -s reload

# View logs
docker logs -f umattend_nginx_dev
docker logs -f umattend_nginx_staging
docker logs -f umattend_nginx_production
```

---

## GitHub Actions

- **Staging**: Push to `staging` branch → Auto-deploy
- **Production**: Push to `main` branch → Auto-deploy

---

## Additional Documentation

- [DOCKER.md](./DOCKER.md) - Detailed Docker configuration
- [nginx/NGINX.md](./nginx/NGINX.md) - Nginx configuration details

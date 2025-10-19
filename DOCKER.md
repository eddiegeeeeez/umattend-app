# Docker Configuration Guide

This project uses Docker Compose with environment-specific configurations for staging and production deployments.

## File Structure

```plaintext
.
├── docker-compose.yml              # Base configuration (shared)
├── docker-compose.staging.yml      # Staging overrides
├── docker-compose.production.yml   # Production overrides
├── server/
│   ├── Dockerfile                  # Server container build
│   ├── .dockerignore
│   └── .env                        # Server environment variables
├── client/
│   ├── Dockerfile                  # Client container build
│   ├── .dockerignore
│   └── .env                        # Client environment variables
└── nginx/
    └── nginx.conf                  # Nginx configuration
```

## Quick Start


### Development Environment

```bash
# Start staging environment
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

# View logs
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

# Stop staging
docker compose -f docker-compose.yml -f docker-compose.dev.yml down
``


### Staging Environment

```bash
# Start staging environment
docker compose -f docker-compose.yml -f docker-compose.staging.yml up -d --build

# View logs
docker compose -f docker-compose.yml -f docker-compose.staging.yml logs -f

# Stop staging
docker compose -f docker-compose.yml -f docker-compose.staging.yml down
```

### Production Environment

```bash
# Start production environment
docker compose -f docker-compose.yml -f docker-compose.production.yml up -d --build

# View logs
docker compose -f docker-compose.yml -f docker-compose.production.yml logs -f

# Stop production
docker compose -f docker-compose.yml -f docker-compose.production.yml down
```

## Configuration Differences

### Staging (`docker-compose.staging.yml`)

- **Port**: 8080 (HTTP)
- **Container names**: `umattend_*_staging`
- **Restart policy**: `unless-stopped`
- **Resources**: No limits (development flexibility)
- **Logging**: Standard Docker logging
- **Health checks**: Enabled
- **NODE_ENV**: `staging`

### Production (`docker-compose.production.yml`)

- **Port**: 80 (HTTP), 443 (HTTPS)
- **Container names**: `umattend_*_production`
- **Restart policy**: `always`
- **Resources**: CPU and memory limits defined
  - Server: 2GB max, 1GB reserved
  - Client: 1GB max, 512MB reserved
- **Logging**: Rotation enabled (10MB max, 3-5 files)
- **Health checks**: Enabled with retries
- **NODE_ENV**: `production`

## Environment Variables

### Server (.env in server/)

```env
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret
FRONTEND_URL=https://yourdomain.com
# ... other variables
```

### Client (.env in client/)

```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
NEXT_PUBLIC_FRONTEND_URL=https://yourdomain.com
# ... other variables
```

## Services

### 1. Server (Node.js/Express)

- **Port**: 4000 (internal)
- **Health Check**: HTTP GET `/api/v1/health`
- **Build**: Multi-stage Dockerfile
  - Stage 1: Install dependencies
  - Stage 2: Build application
  - Stage 3: Production runtime
- **Database migrations**: Runs on startup via Prisma

### 2. Client (Next.js)

- **Port**: 3000 (internal)
- **Build**: Standalone Next.js build
- **Features**: 
  - Static file optimization
  - Telemetry disabled
  - Health check endpoint

### 3. Nginx (Reverse Proxy)

- **Staging**: Port 8080
- **Production**: Ports 80, 443
- **Features**:
  - Load balancing
  - SSL termination (production)
  - Static file serving
  - Request routing

## Monitoring & Debugging

### View Container Status

```bash
# Staging
docker compose -f docker-compose.yml -f docker-compose.staging.yml ps

# Production
docker compose -f docker-compose.yml -f docker-compose.production.yml ps
```

### View Logs

```bash
# All services
docker compose -f docker-compose.yml -f docker-compose.staging.yml logs -f

# Specific service
docker compose -f docker-compose.yml -f docker-compose.staging.yml logs -f server
docker compose -f docker-compose.yml -f docker-compose.staging.yml logs -f client
docker compose -f docker-compose.yml -f docker-compose.staging.yml logs -f nginx
```

### Execute Commands in Container

```bash
# Server shell
docker exec -it umattend_server_staging sh

# Client shell
docker exec -it umattend_client_staging sh

# Run Prisma migrations
docker exec -it umattend_server_staging npx prisma migrate deploy
```

### Health Checks

```bash
# Check server health
curl http://localhost:8080/api/v1/health

# Check nginx
curl http://localhost:8080/health
```

## Maintenance

### Rebuild Without Cache

```bash
docker compose -f docker-compose.yml -f docker-compose.staging.yml build --no-cache
docker compose -f docker-compose.yml -f docker-compose.staging.yml up -d
```

### Remove All Containers and Volumes

```bash
docker compose -f docker-compose.yml -f docker-compose.staging.yml down -v
```

### Prune Unused Docker Resources

```bash
docker system prune -a --volumes
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows

# Kill the process or change port in compose file
```

### Container Won't Start

```bash
# Check logs
docker compose -f docker-compose.yml -f docker-compose.staging.yml logs server

# Check environment variables
docker compose -f docker-compose.yml -f docker-compose.staging.yml config
```

### Database Connection Issues

```bash
# Ensure database is accessible
docker exec -it umattend_server_staging npx prisma db pull

# Reset database (WARNING: deletes all data)
docker exec -it umattend_server_staging npx prisma migrate reset --force
```

## CI/CD Integration

The project includes GitHub Actions workflows:

- `.github/workflows/deploy-staging.yml` - Auto-deploys to staging
- `.github/workflows/deploy-production.yml` - Auto-deploys to production

Both workflows:

1. Create `.env` files from GitHub Secrets
2. Build Docker images
3. Deploy with appropriate compose files
4. Run health checks

## Security Best Practices

1. **Never commit `.env` files** - Use `.gitignore`
2. **Use secrets for sensitive data** - GitHub Secrets for CI/CD
3. **Enable HTTPS in production** - Configure SSL certificates
4. **Rotate credentials regularly** - Update JWT_SECRET, database passwords
5. **Keep images updated** - Run `docker compose pull` periodically
6. **Limit container resources** - Production limits prevent resource exhaustion
7. **Monitor logs** - Set up log aggregation (e.g., ELK, CloudWatch)

## Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Nginx Docker Hub](https://hub.docker.com/_/nginx)
- [Prisma Docker Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-docker)

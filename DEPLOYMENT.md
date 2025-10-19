# Deployment Guide

This guide covers deploying the UMAttend application using Docker, Nginx, and Let's Encrypt SSL.

## Architecture

- **Client**: Next.js (Port 3000)
- **Server**: Express.js with TypeScript (Port 4000)
- **Reverse Proxy**: Nginx (Ports 80, 443)
- **SSL**: Let's Encrypt (Certbot)

## Prerequisites

### Server Requirements
- Ubuntu 20.04+ or similar Linux distribution
- Docker and Docker Compose installed
- Domain name pointing to your server
- Ports 80 and 443 open

### GitHub Secrets Setup

Configure the following secrets in your GitHub repository (Settings > Secrets and variables > Actions):

#### Required Secrets:

1. **SSH_PRIVATE_KEY**: Your SSH private key for server access
2. **SSH_PRIVATE_KEY_PASSPHRASE**: Passphrase for SSH key (if applicable)
3. **DEPLOY_HOST**: Server IP address or hostname
4. **DEPLOY_PORT**: SSH port (usually 22)
5. **DEPLOY_USER**: SSH username

#### Environment Paths:
6. **STAGING_APP_PATH**: `/home/[user]/umattend-staging`
7. **PRODUCTION_APP_PATH**: `/home/[user]/umattend-production`

#### Domain Configuration:
8. **STAGING_DOMAIN**: `umattend-env-staging.vintasystem.com`
9. **PRODUCTION_DOMAIN**: Your production domain
10. **LETSENCRYPT_EMAIL**: Email for SSL certificate notifications

#### Environment Files:
11. **CLIENT_STAGING_ENV_FILE**: Staging client environment variables
12. **CLIENT_PRODUCTION_ENV_FILE**: Production client environment variables
13. **SERVER_STAGING_ENV_FILE**: Staging server environment variables
14. **SERVER_PRODUCTION_ENV_FILE**: Production server environment variables

### Environment File Templates

#### Client .env.production
```env
NEXT_PUBLIC_API_URL=https://umattend-env-staging.vintasystem.com/api/v1
NEXT_PUBLIC_FRONTEND_URL=https://umattend-env-staging.vintasystem.com
```

#### Server .env
```env
NODE_ENV=production
PORT=4000

DATABASE_URL="your_database_url"
DIRECT_URL="your_direct_database_url"

ALLOWED_ORIGINS="https://umattend-env-staging.vintasystem.com"

API_URL="https://umattend-env-staging.vintasystem.com/api/v1"
FRONTEND_URL="https://umattend-env-staging.vintasystem.com"

JWT_ACCESS_TOKEN_SECRET="your_secret"
JWT_ACCESS_TOKEN_TTL="3600"
JWT_REFRESH_TOKEN_SECRET="your_secret"
JWT_REFRESH_TOKEN_TTL="604800"
JWT_GOOGLE_STATE_SECRET="your_secret"

GOOGLE_CLIENT_ID="your_client_id"
GOOGLE_CLIENT_SECRET="your_client_secret"
GOOGLE_REDIRECT_URI="https://umattend-env-staging.vintasystem.com/api/v1/auth/google/callback"

REDIS_HOST="your_redis_host"
REDIS_USERNAME="default"
REDIS_PASSWORD="your_redis_password"
REDIS_PORT="your_redis_port"

MAIL_HOST="smtp.gmail.com"
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USER="your_email"
MAIL_PASS="your_app_password"
```

## Deployment Workflows

### Staging Deployment
- **Trigger**: Push to `staging` branch
- **Workflow File**: `.github/workflows/deploy-staging.yml`
- **Domain**: umattend-env-staging.vintasystem.com

### Production Deployment
- **Trigger**: Push to `main` or `master` branch
- **Workflow File**: `.github/workflows/deploy-production.yml`
- **Domain**: Your production domain

## Local Development

### Using Docker Compose

```bash
# Start all services
docker compose -f docker-compose.local.yml up -d

# View logs
docker compose -f docker-compose.local.yml logs -f

# Stop services
docker compose -f docker-compose.local.yml down

# Rebuild containers
docker compose -f docker-compose.local.yml up -d --build
```

### Without Docker

#### Client
```bash
cd client
npm install
npm run dev
```

#### Server
```bash
cd server
npm install
npm run prisma:generate
npm run dev
```

## Manual Deployment

### First Time Setup

1. **SSH into your server**:
```bash
ssh user@your-server
```

2. **Install Docker and Docker Compose**:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

3. **Clone repository**:
```bash
git clone https://github.com/riomar0001/umattend-app.git
cd umattend-app
```

4. **Create environment files**:
```bash
# Create client env
nano client/.env.production

# Create server env
nano server/.env
```

5. **Deploy staging**:
```bash
docker compose -f docker-compose.staging.yml up -d --build
```

6. **Setup SSL**:
```bash
# First time - obtain certificate
docker compose -f docker-compose.staging.yml run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email \
  -d umattend-env-staging.vintasystem.com

# Reload Nginx
docker compose -f docker-compose.staging.yml exec nginx nginx -s reload
```

## Updating Deployments

### Via GitHub Actions (Recommended)
Simply push to the respective branch:
```bash
# For staging
git push origin staging

# For production
git push origin main
```

### Manual Update
```bash
# SSH to server
ssh user@your-server

# Navigate to app directory
cd /path/to/app

# Pull latest changes
git pull

# Rebuild and restart
docker compose -f docker-compose.staging.yml up -d --build

# Run migrations
docker compose -f docker-compose.staging.yml exec -T server npm run prisma:migrate:deploy
```

## Monitoring and Maintenance

### View Logs
```bash
# All services
docker compose -f docker-compose.staging.yml logs -f

# Specific service
docker compose -f docker-compose.staging.yml logs -f client
docker compose -f docker-compose.staging.yml logs -f server
docker compose -f docker-compose.staging.yml logs -f nginx
```

### Check Container Status
```bash
docker compose -f docker-compose.staging.yml ps
```

### SSL Certificate Renewal
Certbot automatically renews certificates. Check renewal:
```bash
docker compose -f docker-compose.staging.yml exec certbot certbot renew --dry-run
```

### Database Migrations
```bash
# Run migrations
docker compose -f docker-compose.staging.yml exec server npm run prisma:migrate:deploy

# Generate Prisma Client
docker compose -f docker-compose.staging.yml exec server npm run prisma:generate

# Open Prisma Studio
docker compose -f docker-compose.staging.yml exec server npm run prisma:studio
```

### Cleanup
```bash
# Remove unused images
docker image prune -f

# Remove unused volumes
docker volume prune -f

# Remove all stopped containers
docker container prune -f
```

## Troubleshooting

### SSL Certificate Issues
If SSL certificate fails to obtain:
1. Ensure domain DNS is pointing to your server
2. Check ports 80 and 443 are open
3. Verify Nginx is running: `docker compose ps`
4. Check certbot logs: `docker compose logs certbot`

### Container Won't Start
```bash
# Check logs
docker compose -f docker-compose.staging.yml logs [service-name]

# Restart specific service
docker compose -f docker-compose.staging.yml restart [service-name]

# Rebuild from scratch
docker compose -f docker-compose.staging.yml down
docker compose -f docker-compose.staging.yml up -d --build
```

### Database Connection Issues
1. Verify DATABASE_URL in server/.env
2. Check if database is accessible from server
3. Ensure Prisma Client is generated: `npm run prisma:generate`

### Nginx Configuration
Test Nginx configuration:
```bash
docker compose -f docker-compose.staging.yml exec nginx nginx -t
```

## Security Considerations

1. **Environment Variables**: Never commit .env files
2. **SSH Keys**: Use strong SSH keys with passphrases
3. **Firewall**: Configure UFW or iptables
4. **Updates**: Regularly update Docker images and dependencies
5. **Backups**: Implement regular database backups
6. **Monitoring**: Set up monitoring for uptime and errors

## Rollback Procedure

If deployment fails:

1. **Via GitHub**:
   - Revert the problematic commit
   - Push to trigger re-deployment

2. **Manual**:
```bash
# SSH to server
ssh user@your-server

# Navigate to app directory
cd /path/to/app

# Checkout previous commit
git checkout <previous-commit-hash>

# Rebuild
docker compose -f docker-compose.staging.yml up -d --build
```

## Support

For issues or questions:
- Check GitHub Issues
- Review application logs
- Contact DevOps team

## License

[Your License Here]

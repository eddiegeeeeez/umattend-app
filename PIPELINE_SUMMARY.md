# GitHub Actions Deployment Pipeline - Setup Complete

## 🎉 What's Been Created

This deployment pipeline provides automated CI/CD for your UMAttend application with Docker, Nginx, and Let's Encrypt SSL.

## 📁 Files Created

### GitHub Actions Workflows
- `.github/workflows/deploy-staging.yml` - Automated staging deployment
- `.github/workflows/deploy-production.yml` - Automated production deployment
- `.github/workflows/ci.yml` - Continuous integration testing
- `.github/secrets.template` - GitHub secrets reference

### Docker Configuration
- `docker-compose.staging.yml` - Staging environment setup
- `docker-compose.production.yml` - Production environment setup
- `docker-compose.local.yml` - Local development environment
- `client/Dockerfile` - Next.js production build
- `client/Dockerfile.dev` - Next.js development
- `server/Dockerfile` - Express.js production build
- `server/Dockerfile.dev` - Express.js development
- `.dockerignore` - Docker ignore rules
- `client/.dockerignore` - Client-specific ignore rules
- `server/.dockerignore` - Server-specific ignore rules

### Nginx Configuration
- `nginx/staging.conf` - Staging Nginx config with SSL
- `nginx/production.conf` - Production Nginx config with SSL

### Scripts
- `scripts/server-setup.sh` - Initial server setup script
- `scripts/deploy.sh` - Deployment helper script
- `scripts/maintenance.sh` - Server maintenance script

### Documentation
- `DEPLOYMENT.md` - Comprehensive deployment guide
- `QUICKSTART.md` - 30-minute setup guide
- `README.md` - This summary

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                        │
│                                                              │
│  Push to:                                                    │
│  • staging branch  → Triggers Staging Deployment            │
│  • main/master     → Triggers Production Deployment         │
│  • PR to any       → Triggers CI Tests                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Actions                            │
│                                                              │
│  1. SSH to server                                           │
│  2. Copy files via rsync                                    │
│  3. Create environment files                                │
│  4. Build Docker images                                     │
│  5. Start containers                                        │
│  6. Run migrations                                          │
│  7. Setup SSL with Let's Encrypt                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Deployment Server                         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    Nginx (Port 80, 443)              │  │
│  │  • SSL/TLS Termination                               │  │
│  │  • Reverse Proxy                                     │  │
│  │  • Rate Limiting                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                  │                      │                    │
│                  ▼                      ▼                    │
│  ┌─────────────────────────┐  ┌──────────────────────────┐ │
│  │  Next.js Client         │  │  Express.js Server       │ │
│  │  (Container: 3000)      │  │  (Container: 4000)       │ │
│  │  • Static Files         │  │  • REST API              │ │
│  │  • SSR                  │  │  • Business Logic        │ │
│  └─────────────────────────┘  └──────────────────────────┘ │
│                                          │                   │
│                                          ▼                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    Certbot                           │  │
│  │  • Auto-renew SSL certificates every 12 hours       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    External Services
              (Database, Redis, Email, etc.)
```

## 🚀 Quick Start

### 1. Server Setup (5 minutes)
```bash
# On your server
sudo bash scripts/server-setup.sh
```

### 2. Configure GitHub Secrets (10 minutes)
See `.github/secrets.template` for all required secrets.

Key secrets:
- `SSH_PRIVATE_KEY` - Your SSH private key
- `DEPLOY_HOST` - Server IP/hostname
- `STAGING_DOMAIN` - umattend-env-staging.vintasystem.com
- `CLIENT_STAGING_ENV_FILE` - Client environment variables
- `SERVER_STAGING_ENV_FILE` - Server environment variables

### 3. Deploy (2 minutes)
```bash
git push origin staging
```

## 📋 Environments

### Local Development
- **File:** `docker-compose.local.yml`
- **Ports:** Client (3000), Server (4000)
- **Usage:** `docker compose -f docker-compose.local.yml up`

### Staging
- **File:** `docker-compose.staging.yml`
- **Domain:** umattend-env-staging.vintasystem.com
- **Branch:** staging
- **Deploy:** Auto-deploy on push

### Production
- **File:** `docker-compose.production.yml`
- **Domain:** (Configure in secrets)
- **Branch:** main/master
- **Deploy:** Auto-deploy on push

## 🔑 Required GitHub Secrets

### Essential Secrets (Must Configure)
1. **SSH_PRIVATE_KEY** - SSH key for server access
2. **SSH_PRIVATE_KEY_PASSPHRASE** - Passphrase for the SSH key (required)
3. **DEPLOY_HOST** - Server IP or hostname
4. **DEPLOY_PORT** - SSH port (usually 22)
5. **DEPLOY_USER** - SSH username
6. **STAGING_APP_PATH** - /var/www/umattend/staging
7. **PRODUCTION_APP_PATH** - /var/www/umattend/production
8. **STAGING_DOMAIN** - umattend-env-staging.vintasystem.com
9. **LETSENCRYPT_EMAIL** - Email for SSL certificates
10. **CLIENT_STAGING_ENV_FILE** - Client environment variables
11. **SERVER_STAGING_ENV_FILE** - Server environment variables

### For Production (When Ready)
11. **PRODUCTION_DOMAIN** - Production domain
12. **CLIENT_PRODUCTION_ENV_FILE** - Production client env
13. **SERVER_PRODUCTION_ENV_FILE** - Production server env

**Important:** The `SSH_PRIVATE_KEY_PASSPHRASE` is required to decrypt your SSH private key. Make sure to use a strong passphrase when generating your SSH key for security.

## 🛠️ Helper Scripts

### Deploy Script
```bash
# Local development
./scripts/deploy.sh local up

# Staging
./scripts/deploy.sh staging up

# View logs
./scripts/deploy.sh staging logs

# Restart
./scripts/deploy.sh staging restart
```

### Maintenance Script (On Server)
```bash
sudo bash scripts/maintenance.sh
```

## 📝 Common Commands

### Local Development
```bash
# Start services
docker compose -f docker-compose.local.yml up -d

# View logs
docker compose -f docker-compose.local.yml logs -f

# Stop services
docker compose -f docker-compose.local.yml down
```

### On Server (Staging)
```bash
# View status
cd /var/www/umattend/staging
docker compose -f docker-compose.staging.yml ps

# View logs
docker compose -f docker-compose.staging.yml logs -f

# Restart
docker compose -f docker-compose.staging.yml restart

# Run migrations
docker compose -f docker-compose.staging.yml exec server npm run prisma:migrate:deploy
```

## 🔍 Monitoring & Debugging

### Check Deployment Status
1. Go to GitHub Actions tab
2. Click on latest workflow run
3. Check each step for errors

### Check Server
```bash
# SSH to server
ssh user@your-server

# Check containers
docker ps

# Check logs
docker logs <container-name>

# Check Nginx
docker logs umattend-nginx-staging
```

### Verify SSL
```bash
curl -I https://umattend-env-staging.vintasystem.com
```

## 🔐 Security Features

- ✅ SSL/TLS encryption with Let's Encrypt
- ✅ Auto-renewal of SSL certificates
- ✅ Rate limiting on API endpoints
- ✅ Security headers (HSTS, CSP, X-Frame-Options, etc.)
- ✅ Firewall configuration (UFW)
- ✅ Docker log rotation
- ✅ Separated staging and production environments
- ✅ Environment variable encryption via GitHub Secrets

## 📚 Documentation

- **Quick Start:** [QUICKSTART.md](QUICKSTART.md) - 30-minute setup guide
- **Full Guide:** [DEPLOYMENT.md](DEPLOYMENT.md) - Comprehensive documentation
- **Secrets Template:** [.github/secrets.template](.github/secrets.template)

## 🎯 Next Steps

### Immediate
- [ ] Configure all GitHub secrets
- [ ] Update domain DNS settings
- [ ] Run initial deployment
- [ ] Verify SSL certificate

### Soon
- [ ] Set up monitoring (Uptime Robot, Pingdom)
- [ ] Configure database backups
- [ ] Set up error tracking (Sentry)
- [ ] Configure log aggregation
- [ ] Set up staging → production promotion workflow

### Future
- [ ] Add automated testing in CI pipeline
- [ ] Implement blue-green deployments
- [ ] Add performance monitoring
- [ ] Set up automated backups
- [ ] Configure CDN for static assets

## 🆘 Troubleshooting

### Deployment Fails
1. Check GitHub Actions logs
2. Verify all secrets are configured correctly
3. SSH to server and check Docker logs
4. Ensure domain DNS is properly configured

### SSL Certificate Issues
1. Verify domain points to correct IP
2. Check ports 80 and 443 are open
3. Wait for DNS propagation (up to 48 hours)
4. Check Certbot logs

### Container Issues
```bash
# Restart containers
docker compose -f docker-compose.staging.yml restart

# Rebuild from scratch
docker compose -f docker-compose.staging.yml down
docker compose -f docker-compose.staging.yml up -d --build
```

## 📞 Support

For issues:
1. Check the troubleshooting sections in documentation
2. Review GitHub Actions logs
3. Check container logs on server
4. Verify all configurations

## ✅ Checklist

Before first deployment:
- [ ] Server setup completed
- [ ] Docker and Docker Compose installed
- [ ] Domain DNS configured
- [ ] SSH key generated and added to server
- [ ] All GitHub secrets configured
- [ ] Environment files prepared
- [ ] Database accessible from server

## 🎓 Learning Resources

- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Created:** 2025
**Version:** 1.0.0
**Maintainer:** DevOps Team

**Status:** ✅ Ready for deployment

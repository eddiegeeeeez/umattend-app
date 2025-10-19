# Deployment Setup Checklist

Use this checklist to ensure you've completed all steps for successful deployment.

## 📋 Pre-Deployment Checklist

### Server Preparation
- [ ] Ubuntu 20.04+ server provisioned
- [ ] Server has public IP address
- [ ] SSH access to server working
- [ ] Ports 22, 80, 443 open in firewall/security groups
- [ ] Server has at least 2GB RAM and 20GB storage

### Domain Configuration
- [ ] Domain purchased (umattend-env-staging.vintasystem.com)
- [ ] DNS A record created pointing to server IP
- [ ] DNS propagation verified (can take up to 48 hours)
  ```bash
  nslookup umattend-env-staging.vintasystem.com
  dig umattend-env-staging.vintasystem.com
  ```

### Local Environment
- [ ] Git installed locally
- [ ] SSH key generated for deployment
- [ ] Repository cloned locally
- [ ] All deployment files present in repository

## 🔧 Server Setup Checklist

### Initial Setup
- [ ] Run server-setup script
  ```bash
  sudo bash scripts/server-setup.sh
  ```
- [ ] Docker installed and running
  ```bash
  docker --version
  docker compose version
  ```
- [ ] User added to docker group
- [ ] Logged out and back in for group changes
- [ ] Firewall configured (UFW)
  ```bash
  sudo ufw status
  ```

### Directory Structure
- [ ] `/var/www/umattend/staging` directory created
- [ ] `/var/www/umattend/production` directory created
- [ ] Correct ownership set for directories
  ```bash
  ls -la /var/www/umattend/
  ```

### SSH Key Setup
- [ ] Deployment SSH key generated
  ```bash
  ssh-keygen -t ed25519 -C "github-actions"
  # When prompted, enter a strong passphrase (REQUIRED)
  ```
- [ ] Passphrase saved securely (you'll need this for GitHub Secrets)
- [ ] Public key added to server's authorized_keys
  ```bash
  ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server
  ```
- [ ] SSH connection tested
  ```bash
  ssh -i ~/.ssh/id_ed25519 user@server "echo 'Success'"
  ```

## 🔐 GitHub Secrets Checklist

### Required Secrets (All Environments)
- [ ] `SSH_PRIVATE_KEY` configured
- [ ] `SSH_PRIVATE_KEY_PASSPHRASE` configured (the passphrase for your SSH key)
- [ ] `DEPLOY_HOST` configured
- [ ] `DEPLOY_PORT` configured (usually 22)
- [ ] `DEPLOY_USER` configured
- [ ] `LETSENCRYPT_EMAIL` configured

### Staging Environment
- [ ] `STAGING_APP_PATH` = `/var/www/umattend/staging`
- [ ] `STAGING_DOMAIN` = `umattend-env-staging.vintasystem.com`
- [ ] `CLIENT_STAGING_ENV_FILE` configured with:
  - [ ] `NEXT_PUBLIC_API_URL`
  - [ ] `NEXT_PUBLIC_FRONTEND_URL`
- [ ] `SERVER_STAGING_ENV_FILE` configured with:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=4000`
  - [ ] `DATABASE_URL`
  - [ ] `DIRECT_URL`
  - [ ] `ALLOWED_ORIGINS`
  - [ ] `API_URL`
  - [ ] `FRONTEND_URL`
  - [ ] `JWT_ACCESS_TOKEN_SECRET` (generated)
  - [ ] `JWT_ACCESS_TOKEN_TTL`
  - [ ] `JWT_REFRESH_TOKEN_SECRET` (generated)
  - [ ] `JWT_REFRESH_TOKEN_TTL`
  - [ ] `JWT_GOOGLE_STATE_SECRET` (generated)
  - [ ] `GOOGLE_CLIENT_ID`
  - [ ] `GOOGLE_CLIENT_SECRET`
  - [ ] `GOOGLE_REDIRECT_URI`
  - [ ] `REDIS_HOST`
  - [ ] `REDIS_USERNAME`
  - [ ] `REDIS_PASSWORD`
  - [ ] `REDIS_PORT`
  - [ ] `MAIL_HOST`
  - [ ] `MAIL_PORT`
  - [ ] `MAIL_SECURE`
  - [ ] `MAIL_USER`
  - [ ] `MAIL_PASS`

### Production Environment (When Ready)
- [ ] `PRODUCTION_APP_PATH` configured
- [ ] `PRODUCTION_DOMAIN` configured
- [ ] `CLIENT_PRODUCTION_ENV_FILE` configured
- [ ] `SERVER_PRODUCTION_ENV_FILE` configured

## 🗃️ Database Checklist

### Database Setup
- [ ] Database created (PostgreSQL)
- [ ] Database accessible from deployment server
- [ ] Connection string tested
  ```bash
  psql "your_connection_string"
  ```
- [ ] Database credentials secured
- [ ] Database backups configured

### Prisma Configuration
- [ ] `schema.prisma` file up to date
- [ ] Migrations created locally
  ```bash
  cd server
  npm run prisma:migrate:dev
  ```
- [ ] Migration files committed to repository

## 🔴 Redis Checklist

### Redis Setup
- [ ] Redis instance provisioned
- [ ] Redis accessible from deployment server
- [ ] Redis credentials secured
- [ ] Redis connection tested
  ```bash
  redis-cli -h your-host -p your-port -a your-password ping
  ```

## 📧 Email Configuration Checklist

### SMTP Setup
- [ ] Gmail App Password generated (if using Gmail)
- [ ] SMTP credentials tested
- [ ] Email sending verified

### Google OAuth (If Used)
- [ ] Google Cloud project created
- [ ] OAuth 2.0 credentials created
- [ ] Authorized redirect URIs configured
- [ ] Client ID and Secret obtained

## 📦 Repository Checklist

### Files Present
- [ ] `.github/workflows/deploy-staging.yml`
- [ ] `.github/workflows/deploy-production.yml`
- [ ] `.github/workflows/ci.yml`
- [ ] `docker-compose.staging.yml`
- [ ] `docker-compose.production.yml`
- [ ] `docker-compose.local.yml`
- [ ] `client/Dockerfile`
- [ ] `server/Dockerfile`
- [ ] `nginx/staging.conf`
- [ ] `nginx/production.conf`
- [ ] `.dockerignore`
- [ ] `DEPLOYMENT.md`
- [ ] `QUICKSTART.md`

### Code Ready
- [ ] Client builds successfully locally
  ```bash
  cd client && npm run build
  ```
- [ ] Server builds successfully locally
  ```bash
  cd server && npm run build
  ```
- [ ] No TypeScript errors
- [ ] All tests passing (if applicable)

### Git Configuration
- [ ] Staging branch created
- [ ] Main/master branch exists
- [ ] All files committed
- [ ] `.gitignore` properly configured
- [ ] No sensitive data in repository

## 🚀 First Deployment Checklist

### Pre-Deployment
- [ ] All above checklists completed
- [ ] GitHub secrets verified
- [ ] DNS propagation confirmed
- [ ] Server accessible via SSH
- [ ] Docker running on server

### Deployment
- [ ] Push to staging branch
  ```bash
  git checkout staging
  git push origin staging
  ```
- [ ] Monitor GitHub Actions
  - [ ] Go to Actions tab
  - [ ] Watch workflow progress
  - [ ] Check for errors

### Post-Deployment Verification
- [ ] GitHub Actions workflow completed successfully
- [ ] SSH to server and check containers
  ```bash
  ssh user@server
  cd /var/www/umattend/staging
  docker compose -f docker-compose.staging.yml ps
  ```
- [ ] All containers running
  - [ ] `umattend-client-staging` (Up)
  - [ ] `umattend-server-staging` (Up)
  - [ ] `umattend-nginx-staging` (Up)
  - [ ] `umattend-certbot-staging` (Up)

### SSL Verification
- [ ] SSL certificate obtained
  ```bash
  docker compose -f docker-compose.staging.yml exec certbot certbot certificates
  ```
- [ ] HTTPS accessible
  ```bash
  curl -I https://umattend-env-staging.vintasystem.com
  ```
- [ ] Certificate valid (check browser)

### Application Testing
- [ ] Website loads: `https://umattend-env-staging.vintasystem.com`
- [ ] API accessible: `https://umattend-env-staging.vintasystem.com/api/v1`
- [ ] Client-server communication working
- [ ] Database connections working
- [ ] Redis connections working
- [ ] Email sending working
- [ ] Google OAuth working (if applicable)

### Log Verification
- [ ] No errors in client logs
  ```bash
  docker logs umattend-client-staging
  ```
- [ ] No errors in server logs
  ```bash
  docker logs umattend-server-staging
  ```
- [ ] No errors in nginx logs
  ```bash
  docker logs umattend-nginx-staging
  ```

## 🔄 Ongoing Maintenance Checklist

### Daily
- [ ] Check application is accessible
- [ ] Monitor error logs

### Weekly
- [ ] Review GitHub Actions runs
- [ ] Check container status
- [ ] Review server logs
- [ ] Check disk space
  ```bash
  df -h
  ```

### Monthly
- [ ] Run maintenance script
  ```bash
  sudo bash scripts/maintenance.sh
  ```
- [ ] Review SSL certificate expiration
- [ ] Update system packages
- [ ] Clean up Docker resources
- [ ] Review and rotate logs
- [ ] Test backup restoration
- [ ] Security audit

### Before Each Deployment
- [ ] Test changes locally
- [ ] Review code changes
- [ ] Check for breaking changes
- [ ] Ensure migrations are tested
- [ ] Notify team of deployment

### After Each Deployment
- [ ] Verify deployment succeeded
- [ ] Check application functionality
- [ ] Monitor error logs
- [ ] Verify database migrations
- [ ] Test critical features

## 🆘 Troubleshooting Checklist

### If Deployment Fails
- [ ] Check GitHub Actions logs
- [ ] Verify all secrets are correct
- [ ] SSH to server manually
- [ ] Check server disk space
- [ ] Review Docker logs
- [ ] Check DNS configuration
- [ ] Verify firewall rules

### If SSL Fails
- [ ] Verify DNS points to server
- [ ] Check ports 80 and 443 are open
- [ ] Wait for DNS propagation
- [ ] Check certbot logs
- [ ] Verify domain spelling in config
- [ ] Try manual certificate request

### If Containers Won't Start
- [ ] Check Docker logs
- [ ] Verify environment variables
- [ ] Check database connectivity
- [ ] Review nginx configuration
- [ ] Check port conflicts
- [ ] Verify image build succeeded

## ✅ Production Readiness Checklist

Before deploying to production:
- [ ] Staging thoroughly tested
- [ ] All features working as expected
- [ ] Performance tested
- [ ] Security reviewed
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Error tracking configured
- [ ] Production secrets configured
- [ ] Production domain ready
- [ ] Rollback plan documented
- [ ] Team notified of production deployment

---

## 📝 Notes Section

Use this space to track your progress:

### Server Details
- Server IP: ___________________________
- SSH User: ___________________________
- SSH Port: ___________________________

### Deployment Dates
- First staging deployment: ___________________________
- First production deployment: ___________________________
- Last deployment: ___________________________

### Issues Encountered
1. ___________________________
2. ___________________________
3. ___________________________

### Team Contacts
- DevOps Lead: ___________________________
- Database Admin: ___________________________
- Security Contact: ___________________________

---

**Last Updated:** [Date]
**Completed By:** [Name]
**Status:** [ ] Not Started [ ] In Progress [ ] Completed

# Quick Start Guide - Deployment Setup

This guide will help you set up automated deployment for the UMAttend application in under 30 minutes.

## 📋 Prerequisites Checklist

- [ ] Ubuntu 20.04+ server with root/sudo access
- [ ] Domain name configured (umattend-env-staging.vintasystem.com)
- [ ] GitHub repository access
- [ ] SSH access to deployment server

## 🚀 Setup Steps

### Step 1: Prepare Your Server (5 minutes)

1. **SSH into your server:**
```bash
ssh user@your-server-ip
```

2. **Download and run setup script:**
```bash
# Copy the server-setup.sh script to your server
wget https://raw.githubusercontent.com/riomar0001/umattend-app/staging/scripts/server-setup.sh

# Make it executable
chmod +x server-setup.sh

# Run it with sudo
sudo bash server-setup.sh
```

3. **Log out and back in** for Docker group changes to take effect.

### Step 2: Configure DNS (5 minutes)

Point your domain to your server:
- **Domain:** umattend-env-staging.vintasystem.com
- **Type:** A Record
- **Value:** Your server IP address
- **TTL:** 300 (or default)

**Verify DNS propagation:**
```bash
nslookup umattend-env-staging.vintasystem.com
# or
dig umattend-env-staging.vintasystem.com
```

### Step 3: Generate SSH Key for GitHub Actions (3 minutes)

**On your local machine:**

```bash
# Generate SSH key with passphrase (recommended for security)
ssh-keygen -t ed25519 -C "github-actions-umattend" -f ~/.ssh/umattend_deploy

# When prompted, enter a strong passphrase and remember it!
# You'll need this passphrase for the SSH_PRIVATE_KEY_PASSPHRASE secret

# Copy public key to server
ssh-copy-id -i ~/.ssh/umattend_deploy.pub user@your-server

# Test connection
ssh -i ~/.ssh/umattend_deploy user@your-server "echo 'Success!'"

# Copy private key (you'll need this for GitHub)
cat ~/.ssh/umattend_deploy
```

### Step 4: Configure GitHub Secrets (10 minutes)

Go to: **Your Repository > Settings > Secrets and variables > Actions > New repository secret**

Add these secrets one by one:

#### SSH Configuration
```text
SSH_PRIVATE_KEY
Copy content from: cat ~/.ssh/umattend_deploy
(Include -----BEGIN and -----END lines)

SSH_PRIVATE_KEY_PASSPHRASE
The passphrase you entered when creating the SSH key
(REQUIRED - this is used to decrypt your SSH key)

DEPLOY_HOST
Your server IP or hostname

DEPLOY_PORT
22

DEPLOY_USER
Your SSH username (e.g., ubuntu)
```

#### Paths
```
STAGING_APP_PATH
/var/www/umattend/staging

PRODUCTION_APP_PATH
/var/www/umattend/production
```

#### Domains
```
STAGING_DOMAIN
umattend-env-staging.vintasystem.com

LETSENCRYPT_EMAIL
your-email@example.com
```

#### Client Staging Environment
```
CLIENT_STAGING_ENV_FILE
Paste this content:

NEXT_PUBLIC_API_URL=https://umattend-env-staging.vintasystem.com/api/v1
NEXT_PUBLIC_FRONTEND_URL=https://umattend-env-staging.vintasystem.com
```

#### Server Staging Environment
```
SERVER_STAGING_ENV_FILE
Paste your server .env content (update URLs and secrets):

NODE_ENV=production
PORT=4000

DATABASE_URL="your_database_url"
DIRECT_URL="your_direct_database_url"

ALLOWED_ORIGINS="https://umattend-env-staging.vintasystem.com"

API_URL="https://umattend-env-staging.vintasystem.com/api/v1"
FRONTEND_URL="https://umattend-env-staging.vintasystem.com"

JWT_ACCESS_TOKEN_SECRET="generate_a_random_secret"
JWT_ACCESS_TOKEN_TTL="3600"
JWT_REFRESH_TOKEN_SECRET="generate_another_random_secret"
JWT_REFRESH_TOKEN_TTL="604800"
JWT_GOOGLE_STATE_SECRET="generate_one_more_random_secret"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GOOGLE_REDIRECT_URI="https://umattend-env-staging.vintasystem.com/api/v1/auth/google/callback"

REDIS_HOST="your_redis_host"
REDIS_USERNAME="default"
REDIS_PASSWORD="your_redis_password"
REDIS_PORT="12181"

MAIL_HOST="smtp.gmail.com"
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USER="your_email@gmail.com"
MAIL_PASS="your_gmail_app_password"
```

**Generate random secrets:**
```bash
# Generate secrets on your local machine
openssl rand -hex 32  # For JWT secrets
```

### Step 5: Deploy! (5 minutes)

#### Option A: Automatic (via Git Push)

```bash
# Make sure you're on staging branch
git checkout staging

# Push to trigger deployment
git push origin staging
```

#### Option B: Manual Trigger

1. Go to: **Your Repository > Actions**
2. Select "Deploy to Staging" workflow
3. Click "Run workflow"
4. Select branch: staging
5. Click "Run workflow"

### Step 6: Verify Deployment (2 minutes)

1. **Check GitHub Actions:**
   - Go to Actions tab in your repository
   - Wait for green checkmark ✓

2. **Verify SSL:**
   ```bash
   curl -I https://umattend-env-staging.vintasystem.com
   ```

3. **Check the application:**
   - Open: https://umattend-env-staging.vintasystem.com
   - API: https://umattend-env-staging.vintasystem.com/api/v1

4. **Check containers on server:**
   ```bash
   ssh user@your-server
   cd /var/www/umattend/staging
   docker compose -f docker-compose.staging.yml ps
   ```

## 🔍 Troubleshooting

### Deployment Failed?

**Check GitHub Actions logs:**
1. Go to Actions tab
2. Click on failed workflow
3. Expand failed step
4. Read error message

**Common issues:**

1. **SSH Connection Failed**
   - Verify SSH key is correct
   - Check DEPLOY_HOST and DEPLOY_PORT
   - Ensure SSH key is added to server

2. **SSL Certificate Failed**
   - Verify DNS is pointing to server
   - Check domain spelling
   - Ensure ports 80 and 443 are open
   - Wait for DNS propagation (can take up to 48 hours)

3. **Container Build Failed**
   - Check environment variables
   - Verify DATABASE_URL is correct
   - Ensure server has enough resources

4. **Database Connection Failed**
   - Verify DATABASE_URL and DIRECT_URL
   - Check if database is accessible from server
   - Test connection: `psql "your_database_url"`

### Quick Fixes

**Restart deployment:**
```bash
ssh user@your-server
cd /var/www/umattend/staging
docker compose -f docker-compose.staging.yml down
docker compose -f docker-compose.staging.yml up -d --build
```

**View logs:**
```bash
# All services
docker compose -f docker-compose.staging.yml logs -f

# Specific service
docker compose -f docker-compose.staging.yml logs -f server
```

**Check SSL certificate:**
```bash
docker compose -f docker-compose.staging.yml exec certbot certbot certificates
```

## 🎯 Next Steps

- [ ] Set up production deployment (similar to staging)
- [ ] Configure monitoring (e.g., Uptime Robot, Pingdom)
- [ ] Set up database backups
- [ ] Configure error tracking (e.g., Sentry)
- [ ] Set up log aggregation (e.g., Papertrail)

## 📚 Helpful Resources

- **Full Documentation:** See [DEPLOYMENT.md](DEPLOYMENT.md)
- **GitHub Secrets Template:** See [.github/secrets.template](.github/secrets.template)
- **Docker Compose Files:** 
  - [docker-compose.staging.yml](docker-compose.staging.yml)
  - [docker-compose.production.yml](docker-compose.production.yml)
- **Nginx Config:** 
  - [nginx/staging.conf](nginx/staging.conf)

## 💡 Pro Tips

1. **Test locally first:** Use `docker-compose.local.yml` to test changes
2. **Check before pushing:** Run `npm run build` locally to catch errors
3. **Monitor deployments:** Watch GitHub Actions logs during deployment
4. **Keep secrets safe:** Never commit .env files or private keys
5. **Regular backups:** Set up automated database backups

## 🆘 Need Help?

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review GitHub Actions logs
3. Check server logs: `docker compose logs`
4. Verify all secrets are correctly configured
5. Contact DevOps team

---

**Estimated Total Time:** 30 minutes

**Congratulations! 🎉** Your automated deployment pipeline is now set up!

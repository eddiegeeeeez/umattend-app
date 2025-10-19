# Let's Encrypt SSL Setup Guide

## Prerequisites (CRITICAL - Check These First!)

### 1. DNS Configuration
Your domain MUST point to your server's public IP:
```bash
# Test DNS resolution
nslookup umattend-env-staging.vintasystem.com
# Should return your server's public IP
```

### 2. Firewall/Ports
Ports 80 and 443 MUST be open to the internet:
```bash
# On your server, check if ports are listening
sudo netstat -tlnp | grep ':80\|:443'

# Test from outside (use a different machine or online tool)
curl -I http://your-domain.com/health
```

### 3. GitHub Secrets Required
Set these in your repository secrets:
- `STAGING_DOMAIN`: e.g., `umattend-env-staging.vintasystem.com`
- `PRODUCTION_DOMAIN`: e.g., `umattend.vintasystem.com`
- `LETSENCRYPT_EMAIL`: Your email for Let's Encrypt notifications

## How It Works

1. **Webroot Challenge Method**
   - Certbot writes challenge files to `/var/www/certbot/.well-known/acme-challenge/`
   - Nginx serves these files over HTTP (port 80)
   - Let's Encrypt validates by fetching `http://your-domain/.well-known/acme-challenge/TOKEN`

2. **Volume Sharing**
   - Docker volume `certbot-www` is mounted to:
     - `/var/www/certbot` in nginx container
     - `/var/www/certbot` in certbot container
   - Docker volume `letsencrypt` is mounted to:
     - `/etc/letsencrypt` in both containers

3. **Certificate Paths**
   - Nginx reads certs from: `/etc/letsencrypt/live/YOUR-DOMAIN/fullchain.pem`
   - Private key: `/etc/letsencrypt/live/YOUR-DOMAIN/privkey.pem`

## Common Issues & Fixes

### Issue: "Connection refused" during ACME challenge

**Cause:** Nginx can't serve the challenge file or port 80 is blocked.

**Fix:**
1. Verify nginx is running: `docker compose -f docker-compose.staging.yml ps`
2. Check nginx can serve files:
   ```bash
   # SSH to server
   cd /path/to/umattend-app
   
   # Create test file
   docker compose -f docker-compose.staging.yml exec nginx sh -c "mkdir -p /var/www/certbot/.well-known/acme-challenge && echo 'test' > /var/www/certbot/.well-known/acme-challenge/test.txt"
   
   # Test from outside
   curl http://your-domain.com/.well-known/acme-challenge/test.txt
   # Should return: test
   ```

3. Check port 80 is accessible:
   ```bash
   # From outside your network
   telnet your-domain.com 80
   ```

### Issue: "Certificate already exists" but nginx still shows connection error

**Cause:** Nginx hasn't been reloaded after cert issuance.

**Fix:**
```bash
docker compose -f docker-compose.staging.yml exec nginx nginx -s reload
# Or restart
docker compose -f docker-compose.staging.yml restart nginx
```

### Issue: Docker compose warnings about "version" attribute

**Cause:** Docker Compose v2 doesn't need version field.

**Fix:** Already removed from all compose files in this repo.

## Manual Certificate Issuance (for testing)

If the automated workflow fails, test manually:

```bash
# SSH to your server
cd /path/to/umattend-app

# Ensure services are up
docker compose -f docker-compose.staging.yml up -d nginx certbot

# Test nginx serves the challenge path
docker compose -f docker-compose.staging.yml exec nginx sh -c "mkdir -p /var/www/certbot/.well-known/acme-challenge && echo 'nginx-working' > /var/www/certbot/.well-known/acme-challenge/test"

# Verify from outside (use curl from your local machine)
curl http://umattend-env-staging.vintasystem.com/.well-known/acme-challenge/test
# Should return: nginx-working

# If that works, request cert manually
docker compose -f docker-compose.staging.yml run --rm certbot \
  certonly --webroot -w /var/www/certbot \
  -d umattend-env-staging.vintasystem.com \
  --email your@email.com \
  --agree-tos --no-eff-email

# Reload nginx
docker compose -f docker-compose.staging.yml exec nginx nginx -s reload
```

## Verifying Certificate

```bash
# Check cert was created
docker compose -f docker-compose.staging.yml run --rm certbot certificates

# Check nginx config
docker compose -f docker-compose.staging.yml exec nginx nginx -t

# Test HTTPS from outside
curl -I https://umattend-env-staging.vintasystem.com/health
```

## Renewal

Certificates auto-renew via:
- GitHub Actions workflow: `.github/workflows/ssl-renew.yml` (daily at 03:00 UTC)
- OR via crontab on the server (see DEPLOYMENT.md for cron setup)

Manual renewal:
```bash
docker compose -f docker-compose.staging.yml run --rm certbot \
  renew --webroot -w /var/www/certbot

docker compose -f docker-compose.staging.yml exec nginx nginx -s reload
```

## Troubleshooting Checklist

Before opening an issue, verify:

- [ ] DNS A record points to server public IP
- [ ] Port 80 and 443 are open in firewall/security groups
- [ ] Nginx container is running
- [ ] Nginx can write to `/var/www/certbot`
- [ ] Can access `http://your-domain/.well-known/acme-challenge/test` from internet
- [ ] GitHub secrets are set correctly
- [ ] Domain in nginx config matches STAGING_DOMAIN/PRODUCTION_DOMAIN secret

## Debug Logs

View certbot logs:
```bash
docker compose -f docker-compose.staging.yml run --rm certbot \
  sh -c "cat /var/log/letsencrypt/letsencrypt.log"
```

View nginx logs:
```bash
docker compose -f docker-compose.staging.yml logs nginx
```

Test nginx config syntax:
```bash
docker compose -f docker-compose.staging.yml exec nginx nginx -t
```

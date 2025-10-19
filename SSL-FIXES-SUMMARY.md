# SSL Setup - What Was Fixed

## Root Cause of "Connection Refused" Error

The Let's Encrypt ACME challenge was failing because nginx wasn't correctly serving files from `/var/www/certbot/.well-known/acme-challenge/`.

### The Problem

**Incorrect nginx config:**
```nginx
location ^~ /.well-known/acme-challenge/ {
  alias /var/www/certbot/.well-known/acme-challenge/;  # WRONG - doubles the path
}
```

When certbot writes: `/var/www/certbot/.well-known/acme-challenge/TOKEN`

And Let's Encrypt requests: `http://domain/.well-known/acme-challenge/TOKEN`

Nginx was looking for: `/var/www/certbot/.well-known/acme-challenge/.well-known/acme-challenge/TOKEN` ❌

### The Fix

**Correct nginx config:**
```nginx
location ^~ /.well-known/acme-challenge/ {
  root /var/www/certbot;  # CORRECT - root appends the location path
  default_type "text/plain";
  try_files $uri =404;
}
```

Now nginx correctly looks for: `/var/www/certbot/.well-known/acme-challenge/TOKEN` ✅

## All Changes Made

### 1. Fixed nginx configs (staging & production)
- Changed `alias` to `root` for ACME challenge locations
- Removed path duplication
- Added `try_files $uri =404` for better error handling

### 2. Fixed docker compose files
- Removed obsolete `version: "3.9"` field (eliminates warnings)
- Simplified certbot service (no unnecessary entrypoint/command)

### 3. Fixed GitHub Actions workflows
- Removed double "certbot" command (was `certbot certbot`, now just `certbot`)
- Corrected all three workflows:
  - `deploy-staging.yml`
  - `deploy-production.yml`
  - `ssl-renew.yml`

### 4. Added comprehensive documentation
- `LETSENCRYPT-SETUP.md` - Complete troubleshooting guide
- This summary document

## How to Verify the Fix

### Before next deploy, check prerequisites:

1. **DNS is correct:**
   ```bash
   nslookup umattend-env-staging.vintasystem.com
   # Should show your server's public IP
   ```

2. **Port 80 is open:**
   ```bash
   # From your local machine
   curl -I http://umattend-env-staging.vintasystem.com/health
   # Should return HTTP 200
   ```

3. **GitHub secrets are set:**
   - `STAGING_DOMAIN`
   - `LETSENCRYPT_EMAIL`

### After deploy (if still issues):

SSH to server and test manually:
```bash
cd /path/to/umattend-app

# Create test challenge file
docker compose -f docker-compose.staging.yml exec nginx sh -c \
  "mkdir -p /var/www/certbot/.well-known/acme-challenge && \
   echo 'nginx-test' > /var/www/certbot/.well-known/acme-challenge/test"

# From your local machine, verify it's accessible
curl http://umattend-env-staging.vintasystem.com/.well-known/acme-challenge/test
# Should return: nginx-test
```

If that works, the ACME challenge will succeed.

## What Happens on Next Deploy

1. ✅ Nginx starts with correct config
2. ✅ Certbot service is available
3. ✅ Deploy workflow runs `certbot certonly --webroot`
4. ✅ Certbot writes challenge file to `/var/www/certbot/.well-known/acme-challenge/TOKEN`
5. ✅ Nginx serves it correctly from that path
6. ✅ Let's Encrypt validates and issues certificate
7. ✅ Nginx reloads and uses new certificate
8. ✅ Site is accessible via HTTPS

## If It Still Fails

Check in this order:

1. **Can you reach the domain?**
   - `ping umattend-env-staging.vintasystem.com`

2. **Is port 80 open?**
   - `telnet umattend-env-staging.vintasystem.com 80`

3. **Is nginx running?**
   - `docker compose -f docker-compose.staging.yml ps nginx`

4. **Can nginx serve static files?**
   - Run the manual test above

5. **Check logs:**
   ```bash
   # Nginx logs
   docker compose -f docker-compose.staging.yml logs nginx
   
   # Certbot logs
   docker compose -f docker-compose.staging.yml run --rm certbot \
     sh -c "cat /var/log/letsencrypt/letsencrypt.log"
   ```

## Summary

The fix was simple but critical:
- **Before:** `alias /var/www/certbot/.well-known/acme-challenge/` (path doubled)
- **After:** `root /var/www/certbot;` (path correct)

This is a common Let's Encrypt + nginx pitfall. The `root` directive tells nginx "append the location path to this root", while `alias` replaces the location path entirely.

Push these changes and your next deploy should succeed! 🎉

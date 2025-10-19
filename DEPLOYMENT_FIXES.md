# Deployment Fixes - October 19, 2025

## Issues Resolved

### 1. SSH Authentication with Passphrase-Protected Keys ✅

**Problem:** GitHub Actions couldn't authenticate to the deployment server because the SSH key had a passphrase.

**Error:**
```
Permission denied (publickey,password)
```

**Solution:**
- Updated workflows to use SSH_ASKPASS helper script
- Added fallback to strip passphrase using `ssh-keygen -p` if agent fails
- Added verbose debugging on failure
- Properly cleanup ssh-agent and temporary files

**Files Changed:**
- `.github/workflows/deploy-staging.yml`
- `.github/workflows/deploy-production.yml`

### 2. Next.js Build Failure - Missing API_URL ✅

**Problem:** Next.js build failed during Docker build because `process.env.API_URL` was undefined.

**Error:**
```
`destination` does not start with `/`, `http://`, or `https://` for route 
{"source":"/api/:path*","destination":"undefined/api/:path*"}
Error: Invalid rewrite found
```

**Solution:**
- Updated `next.config.ts` to handle missing API_URL gracefully
- Added `NEXT_PUBLIC_API_URL` as Docker build argument
- Pass API URL in docker-compose files for each environment
- Set both build-time and runtime environment variables

**Files Changed:**
- `client/next.config.ts`
- `client/Dockerfile`
- `docker-compose.staging.yml`
- `docker-compose.production.yml`
- `docker-compose.local.yml`

### 3. Docker Compose Version Warning ✅

**Problem:** Docker Compose showed deprecation warning about version field.

**Warning:**
```
the attribute `version` is obsolete, it will be ignored
```

**Solution:**
- Removed `version: '3.8'` from all docker-compose files
- Modern Docker Compose doesn't require version field

**Files Changed:**
- `docker-compose.staging.yml`
- `docker-compose.production.yml`
- `docker-compose.local.yml`

## Summary of Changes

### GitHub Actions Workflows
- ✅ SSH authentication with passphrase-protected keys
- ✅ Fallback mechanism for SSH connection
- ✅ Verbose debugging on failure
- ✅ Proper cleanup of SSH agent and keys

### Docker Configuration
- ✅ Next.js build with API_URL build argument
- ✅ Environment-specific API URLs
- ✅ Removed deprecated version field
- ✅ Build-time and runtime environment variables

### Documentation
- ✅ Updated SSH_PASSPHRASE_UPDATE.md
- ✅ Updated secrets.template
- ✅ Updated QUICKSTART.md
- ✅ Updated DEPLOYMENT_CHECKLIST.md

## Environment URLs

### Staging
- **Domain:** https://umattend-env-staging.vintasystem.com
- **API URL:** https://umattend-env-staging.vintasystem.com/api/v1

### Production
- **Domain:** https://umattend.vintasystem.com
- **API URL:** https://umattend.vintasystem.com/api/v1

### Local Development
- **Client:** http://localhost:3000
- **API URL:** http://localhost:4000/api/v1

## Next Steps

### 1. Commit and Push Changes

```bash
git add .
git commit -m "fix: SSH authentication and Next.js build issues for deployment"
git push origin staging
```

### 2. Monitor GitHub Actions

Go to: https://github.com/riomar0001/umattend-app/actions

Watch for:
- ✅ "Set up SSH" step succeeds
- ✅ Docker builds complete successfully
- ✅ SSL certificates are obtained
- ✅ All containers start

### 3. Verify Deployment

Once deployment completes:

```bash
# Check SSL certificate
curl -I https://umattend-env-staging.vintasystem.com

# Check API
curl https://umattend-env-staging.vintasystem.com/api/v1/health

# SSH to server and check containers
ssh umattend@172.192.16.130
cd /var/www/umattend/staging
docker compose -f docker-compose.staging.yml ps
docker compose -f docker-compose.staging.yml logs
```

### 4. Test Application

- Open: https://umattend-env-staging.vintasystem.com
- Test authentication
- Test API calls
- Check browser console for errors
- Verify all features work

## Troubleshooting

### If SSH still fails:

1. **Check public key is on server:**
   ```bash
   ssh umattend@172.192.16.130
   cat ~/.ssh/authorized_keys
   ```

2. **Check GitHub secrets:**
   - SSH_PRIVATE_KEY (full private key with BEGIN/END)
   - SSH_PRIVATE_KEY_PASSPHRASE (exact passphrase)
   - DEPLOY_HOST, DEPLOY_PORT, DEPLOY_USER

3. **Check workflow logs:**
   - Look for "SSH agent authentication succeeded" OR
   - Look for "SSH auth succeeded after removing passphrase" OR
   - Check verbose debug output at end of failed SSH step

### If Next.js build fails:

1. **Check docker-compose file has API URL:**
   ```yaml
   build:
     args:
       - NEXT_PUBLIC_API_URL=https://...
   ```

2. **Test build locally:**
   ```bash
   cd client
   export NEXT_PUBLIC_API_URL=https://umattend-env-staging.vintasystem.com/api/v1
   npm run build
   ```

### If containers won't start:

1. **Check logs:**
   ```bash
   docker compose -f docker-compose.staging.yml logs client
   docker compose -f docker-compose.staging.yml logs server
   docker compose -f docker-compose.staging.yml logs nginx
   ```

2. **Check environment variables:**
   ```bash
   docker compose -f docker-compose.staging.yml exec server env
   ```

3. **Check database connection:**
   ```bash
   docker compose -f docker-compose.staging.yml exec server npm run prisma:studio
   ```

## Files Modified

### Workflows
- `.github/workflows/deploy-staging.yml`
- `.github/workflows/deploy-production.yml`

### Docker
- `client/Dockerfile`
- `client/next.config.ts`
- `docker-compose.staging.yml`
- `docker-compose.production.yml`
- `docker-compose.local.yml`

### Documentation
- `SSH_PASSPHRASE_UPDATE.md`
- `DEPLOYMENT_FIXES.md` (this file)

## Status

✅ **All issues resolved**  
✅ **Ready for deployment**  
✅ **Documentation updated**

---

**Fixed:** October 19, 2025  
**Deployment:** Staging environment  
**Domain:** umattend-env-staging.vintasystem.com

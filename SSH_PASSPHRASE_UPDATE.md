# SSH Key Passphrase Configuration - Update Summary

## Changes Made

The deployment workflows have been updated to support SSH keys with passphrases for enhanced security.

## What Changed

### 1. GitHub Actions Workflows Updated
- **`.github/workflows/deploy-staging.yml`**
- **`.github/workflows/deploy-production.yml`**

Both workflows now:
- Use `ssh-agent` to handle SSH key authentication
- Accept `SSH_PRIVATE_KEY_PASSPHRASE` secret to decrypt the SSH key
- Properly cleanup the SSH agent after deployment

### 2. Documentation Updated
- **`.github/secrets.template`** - Added passphrase documentation
- **`QUICKSTART.md`** - Updated SSH key generation instructions
- **`DEPLOYMENT_CHECKLIST.md`** - Added passphrase requirements
- **`PIPELINE_SUMMARY.md`** - Listed passphrase as required secret

## Required GitHub Secret

You **MUST** add this secret to your GitHub repository:

### SSH_PRIVATE_KEY_PASSPHRASE

**Location:** Repository → Settings → Secrets and variables → Actions → New repository secret

**Name:** `SSH_PRIVATE_KEY_PASSPHRASE`

**Value:** The passphrase you used when creating your SSH key

**Important Notes:**
- This is the passphrase you entered when running `ssh-keygen`
- If you don't remember it, you'll need to generate a new SSH key
- For security, always use a strong passphrase for deployment SSH keys
- The passphrase is never exposed in logs or outputs

## How It Works

```yaml
# In GitHub Actions workflow:

1. Load SSH private key from SSH_PRIVATE_KEY secret
2. Start ssh-agent
3. Use SSH_PRIVATE_KEY_PASSPHRASE to unlock the key
4. Add unlocked key to ssh-agent
5. SSH connections now work without prompting for passphrase
6. After deployment, kill ssh-agent and remove key file
```

## Migration Steps

If you already have the pipeline set up:

1. **Add the new secret:**
   ```
   Go to: Repository → Settings → Secrets and variables → Actions
   Click: New repository secret
   Name: SSH_PRIVATE_KEY_PASSPHRASE
   Value: Your SSH key passphrase
   ```

2. **Test the deployment:**
   ```bash
   git push origin staging
   ```

3. **Verify in GitHub Actions:**
   - Go to Actions tab
   - Check that "Set up SSH" step completes successfully
   - Look for: "Identity added" message in logs

## Generating a New SSH Key with Passphrase

If you need to create a new SSH key:

```bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "github-actions-umattend" -f ~/.ssh/umattend_deploy

# When prompted:
# Enter passphrase (empty for no passphrase): [Enter a strong passphrase]
# Enter same passphrase again: [Repeat the passphrase]

# Copy public key to server
ssh-copy-id -i ~/.ssh/umattend_deploy.pub user@your-server

# Test connection (will prompt for passphrase)
ssh -i ~/.ssh/umattend_deploy user@your-server

# Get private key for GitHub secret (SSH_PRIVATE_KEY)
cat ~/.ssh/umattend_deploy

# Remember your passphrase for GitHub secret (SSH_PRIVATE_KEY_PASSPHRASE)
```

## Security Benefits

✅ **Enhanced Security:** SSH key is encrypted at rest  
✅ **Two-Factor Protection:** Need both key file AND passphrase  
✅ **Best Practice:** Industry standard for production deployments  
✅ **Audit Trail:** GitHub Actions logs show authentication without exposing secrets  

## Troubleshooting

### "Could not open a connection to your authentication agent"
- This error shouldn't occur in GitHub Actions
- If you see it, check that `eval "$(ssh-agent -s)"` is running

### "Bad passphrase, try again"
- The `SSH_PRIVATE_KEY_PASSPHRASE` secret is incorrect
- Update the secret with the correct passphrase

### "Permission denied (publickey)"
- The SSH public key may not be on the server
- Run: `ssh-copy-id -i ~/.ssh/umattend_deploy.pub user@server`

### How to recover if you forgot your passphrase
You cannot recover a forgotten SSH key passphrase. You must:
1. Generate a new SSH key pair
2. Copy the new public key to your server
3. Update both `SSH_PRIVATE_KEY` and `SSH_PRIVATE_KEY_PASSPHRASE` secrets

## Verification

After adding the secret, check these in GitHub Actions logs:

```
✓ Set up SSH
  - Agent pid XXXXX
  - Identity added: /home/runner/.ssh/id_rsa
  - # your-server SSH-2.0-OpenSSH_8.x

✓ All SSH operations complete successfully

✓ Cleanup
  - Agent pid XXXXX killed
```

## Backward Compatibility

⚠️ **Breaking Change:** If you previously had SSH keys without passphrases, you MUST:

1. Add the `SSH_PRIVATE_KEY_PASSPHRASE` secret (can be empty if no passphrase)
2. Or regenerate your SSH key with a passphrase (recommended)

## Questions?

- Check the [QUICKSTART.md](./QUICKSTART.md) for complete setup guide
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed documentation
- Review [.github/secrets.template](./.github/secrets.template) for all secrets

---

**Updated:** October 19, 2025  
**Status:** ✅ Required for all deployments  
**Security Level:** Enhanced 🔐

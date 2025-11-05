# Rollback & Recovery Guide

## Overview

This guide provides procedures for rolling back deployments and recovering from issues in the VaultFootage repository.

## Quick Rollback Commands

### Rollback to Stable Release (v1.0.0-stable)

```bash
# Check out the stable tag
git checkout v1.0.0-stable

# Create a new branch from stable
git checkout -b hotfix/rollback-to-stable

# Force push to main (requires admin privileges)
git push origin hotfix/rollback-to-stable --force

# Or create a PR for review
git push -u origin hotfix/rollback-to-stable
# Then open PR on GitHub
```

### Rollback Specific Files

```bash
# Rollback a specific file to last known good state
git checkout HEAD~1 -- path/to/file

# Rollback to a specific commit
git checkout <commit-hash> -- path/to/file

# Commit the rollback
git add path/to/file
git commit -m "fix: rollback <file> to last known good state"
```

## Vercel Deployment Rollback

### Via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select the VaultFootage project
3. Click "Deployments" tab
4. Find the last known good deployment
5. Click "..." menu → "Promote to Production"
6. Confirm promotion

### Via Vercel CLI

```bash
# Install Vercel CLI if needed
npm i -g vercel

# List recent deployments
vercel ls

# Promote a specific deployment to production
vercel promote <deployment-url>
```

## Common Rollback Scenarios

### Scenario 1: Broken JavaScript

**Symptoms:**
- Console errors on homepage
- Gallery not loading
- Gumroad integration failing

**Recovery:**

```bash
# Rollback gallery.js and pricing.js
git checkout v1.0.0-stable -- vaultfootage-v3/scripts/gallery.js
git checkout v1.0.0-stable -- vaultfootage-v3/scripts/pricing.js

# Test locally
npm run serve
# Visit http://localhost:8080

# If working, commit and push
git add vaultfootage-v3/scripts/
git commit -m "fix: rollback gallery/pricing scripts to v1.0.0-stable"
git push origin main
```

### Scenario 2: Broken CSS/Layout

**Symptoms:**
- Thumbnails not visible
- Layout broken on mobile
- Particles causing performance issues

**Recovery:**

```bash
# Rollback CSS files
git checkout v1.0.0-stable -- vaultfootage-v3/styles/main.css
git checkout v1.0.0-stable -- vaultfootage-v3/scripts/particles.js

# Test locally
npm run serve

# If working, commit and push
git add vaultfootage-v3/styles/ vaultfootage-v3/scripts/
git commit -m "fix: rollback styles to v1.0.0-stable"
git push origin main
```

### Scenario 3: Bad videos.json Data

**Symptoms:**
- No thumbnails loading
- Gallery showing broken images
- Console 404 errors for media

**Recovery:**

```bash
# Regenerate videos.json from media files
npm run media:generate

# Or rollback to last known good version
git checkout v1.0.0-stable -- vaultfootage-v3/data/videos.json

# Test locally
npm run smoke:serve

# If working, commit and push
git add vaultfootage-v3/data/videos.json
git commit -m "fix: regenerate/rollback videos.json"
git push origin main
```

### Scenario 4: CI/CD Pipeline Breaking Builds

**Symptoms:**
- GitHub Actions failing on all PRs
- Smoke tests failing
- Link checker reporting false positives

**Recovery:**

```bash
# Temporarily disable problematic workflow
# Option 1: Delete the workflow file
git rm .github/workflows/problematic-workflow.yml

# Option 2: Rename to .bak to preserve it
git mv .github/workflows/problematic-workflow.yml \
       .github/workflows/problematic-workflow.yml.bak

# Commit and push
git add .github/workflows/
git commit -m "fix: temporarily disable failing CI workflow"
git push origin main

# Fix the workflow on a separate branch
git checkout -b fix/ci-workflow
# Make fixes...
git push -u origin fix/ci-workflow
# Open PR for review
```

## Emergency Procedures

### Complete Site Down

**Immediate Actions:**

1. **Check Vercel Status**: Visit https://vercel.com/status
2. **Check Deployment Logs**: Vercel Dashboard → Project → Deployments → Click latest → View Logs
3. **Quick Rollback**: Promote last known good deployment (see Vercel Rollback above)

**If Rollback Doesn't Work:**

```bash
# Create emergency branch from stable tag
git checkout v1.0.0-stable
git checkout -b emergency/restore-production
git push -u origin emergency/restore-production

# Vercel will auto-deploy this branch
# Or manually deploy:
vercel --prod
```

### Database/Data Corruption (videos.json)

**Backup Restoration:**

```bash
# If you have a backup
cp backups/videos.json.backup vaultfootage-v3/data/videos.json

# Or regenerate from media files
npm run media:generate

# Verify format
cat vaultfootage-v3/data/videos.json | jq '.collections | length'

# Should return >= 8

# Commit and deploy
git add vaultfootage-v3/data/videos.json
git commit -m "fix: restore videos.json from backup"
git push origin main
```

## Rollback Verification Checklist

After any rollback, verify these critical paths:

```bash
# Run smoke tests
npm run smoke:serve

# Manual verification
- [ ] Homepage loads (https://vaultfootage.com)
- [ ] Hero section visible
- [ ] Gallery grid shows >= 8 collections
- [ ] Thumbnails visible (not blank strips)
- [ ] Collection cards clickable
- [ ] Pricing page loads (https://vaultfootage.com/pricing.html)
- [ ] Gumroad buttons work
- [ ] Mobile responsive (test at 768px, 520px)
- [ ] Console has no critical errors
- [ ] Lighthouse score >= 90 performance
```

## Git Tag Recovery

### List Available Tags

```bash
git tag -l
# Should show:
# v1.0.0-stable
# v0.9.0
```

### Recover from Tag

```bash
# Create a new branch from tag
git checkout -b recovery/from-stable v1.0.0-stable

# Verify it works locally
npm run smoke:serve

# Push to origin
git push -u origin recovery/from-stable

# Create PR to main
# Or force push to main (admin only)
git checkout main
git reset --hard v1.0.0-stable
git push origin main --force
```

## Prevention & Best Practices

### Before Making Changes

1. **Always create a feature branch**
   ```bash
   git checkout -b feature/my-change
   ```

2. **Test locally first**
   ```bash
   npm run smoke:serve
   ```

3. **Run link checks**
   ```bash
   npm run link:check
   ```

4. **Create PR for review** (don't push directly to main)

### After Deployment

1. **Monitor Vercel dashboard** for first 5 minutes
2. **Check production site** manually
3. **Review error logs** in Vercel console
4. **Run smoke tests against production**
   ```bash
   bash scripts/smoke.sh https://vaultfootage.com
   ```

### Maintaining Backups

```bash
# Manual backup of critical files
mkdir -p backups/$(date +%Y-%m-%d)
cp vaultfootage-v3/data/videos.json backups/$(date +%Y-%m-%d)/
cp -r vaultfootage-v3/scripts/*.js backups/$(date +%Y-%m-%d)/
cp -r vaultfootage-v3/styles/*.css backups/$(date +%Y-%m-%d)/

# Compress backup
tar -czf backups/backup-$(date +%Y-%m-%d).tar.gz backups/$(date +%Y-%m-%d)/
```

## Contact & Escalation

- **Repository Owner**: @InnovateSN
- **Primary Contact**: Check CODEOWNERS file
- **Vercel Support**: https://vercel.com/support
- **GitHub Support**: https://support.github.com

## Related Documentation

- [CONTRIBUTING.md](../CONTRIBUTING.md) - Development workflow
- [CHANGELOG.md](../CHANGELOG.md) - Version history
- [RELEASE_NOTES.md](../RELEASE_NOTES.md) - Release details
- [README.md](../vaultfootage-v3/README.md) - Project overview

---

**Last Updated**: 2025-11-05  
**Stable Tag**: v1.0.0-stable  
**Repository**: https://github.com/InnovateSN/VaultFootage

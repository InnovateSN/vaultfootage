# GitHub Actions Workflows - Manual Setup Guide

## Overview

Three GitHub Actions workflows were created but could not be pushed automatically due to token permission restrictions. This guide explains how to add them manually.

## Workflow Files Location

The workflow files are available in the `codex/ci-and-media-kit` branch at:
- `.github/workflows/ci-smoke.yml`
- `.github/workflows/link-check.yml`
- `.github/workflows/lighthouse.yml`

They are also archived in `github-workflows.tar.gz` at the repository root.

## Option 1: Add via GitHub Web UI

### Step-by-Step Instructions

1. **Navigate to Repository**
   - Go to https://github.com/InnovateSN/vaultfootage

2. **Switch to CI Branch**
   - Click branch dropdown → Select `codex/ci-and-media-kit`

3. **Navigate to Workflows**
   - Browse to `.github/workflows/` directory

4. **Copy Each Workflow File**
   - Open `ci-smoke.yml` in the branch
   - Switch back to `main` branch
   - Navigate to `.github/workflows/` (create directory if needed)
   - Click "Add file" → "Create new file"
   - Name it `ci-smoke.yml`
   - Paste content from the CI branch
   - Commit directly to main or create a new PR

5. **Repeat for Other Workflows**
   - `link-check.yml`
   - `lighthouse.yml`

## Option 2: Add via Git Command Line

### If You Have Workflow Permissions

```bash
# Checkout the CI branch
git checkout codex/ci-and-media-kit

# Create a new branch for workflows only
git checkout -b chore/add-workflows main

# Copy workflow files from CI branch
git checkout codex/ci-and-media-kit -- .github/workflows/

# Commit and push
git add .github/workflows/
git commit -m "chore(ci): add GitHub Actions workflows (ci-smoke, link-check, lighthouse)"
git push -u origin chore/add-workflows

# Create PR
gh pr create --base main --head chore/add-workflows \
  --title "chore(ci): add GitHub Actions workflows" \
  --body "Adds CI/CD workflows that couldn't be pushed with token restrictions."
```

## Option 3: Extract from Archive

### Using the Archived Workflows

```bash
# Extract the archive
tar -xzf github-workflows.tar.gz

# This creates .github/workflows/ with all three files
# Then follow Option 2 to commit and push
```

## Workflow Descriptions

### 1. ci-smoke.yml
**Purpose**: Automated smoke testing on pull requests

**Triggers**:
- Pull requests to main branch
- Manual workflow dispatch

**What It Does**:
- Checks out repository
- Installs Node.js and dependencies
- Serves static site on port 8080
- Runs smoke tests against localhost
- Validates 5 critical endpoints
- Checks content probes (hero text, grid, videos.json)

**Execution Time**: ~2 minutes

### 2. link-check.yml
**Purpose**: Validate all links in HTML files and sitemap

**Triggers**:
- Pull requests to main branch
- Manual workflow dispatch
- Weekly schedule (Mondays at 9 AM UTC)

**What It Does**:
- Checks out repository
- Runs Lychee link checker
- Scans all .html files and sitemap.xml
- Reports broken links, 404s, timeouts
- Accepts 429 (rate limit) as warnings

**Execution Time**: ~1-3 minutes

### 3. lighthouse.yml
**Purpose**: Performance, accessibility, SEO scoring

**Triggers**:
- Pull requests to main branch
- Manual workflow dispatch

**What It Does**:
- Checks out repository
- Installs Node.js and dependencies
- Serves static site on port 8080
- Runs Lighthouse CI against localhost
- Measures performance, accessibility, best practices, SEO
- Uploads results as artifacts

**Execution Time**: ~3-5 minutes

## Testing Workflows

### After Adding Workflows

1. **Test with Workflow Dispatch**
   - Go to Actions tab on GitHub
   - Select a workflow (e.g., "Smoke Tests")
   - Click "Run workflow" dropdown
   - Select branch `main`
   - Click "Run workflow"

2. **Verify Execution**
   - Watch the workflow run in real-time
   - Check for green checkmarks
   - Review logs for any issues

3. **Test on Next PR**
   - Create a new branch
   - Make a small change (e.g., update README)
   - Open PR to main
   - Verify all three workflows trigger automatically

## Common Issues & Solutions

### Issue: Workflow Not Triggering

**Solution**: Check workflow file syntax
```bash
# Validate YAML syntax locally
yamllint .github/workflows/*.yml
```

### Issue: Workflow Fails on First Run

**Solution**: Check if Node.js version matches (20.x)
- Edit workflow file if needed
- Ensure package.json scripts are correct

### Issue: Link Checker Too Strict

**Solution**: Adjust Lychee configuration in `link-check.yml`
```yaml
# Add more accepted status codes or exclude domains
args: --accept 200,204,429 --exclude example.com
```

### Issue: Lighthouse Scores Too Low

**Solution**: Adjust thresholds in `lighthouse.yml`
```yaml
# Lower assertion thresholds if needed
assertions:
  categories:performance: ['error', {minScore: 0.8}]  # Was 0.9
```

## Rollback Procedure

If workflows cause issues:

```bash
# Remove workflows via Git
git checkout main
git rm .github/workflows/ci-smoke.yml
git rm .github/workflows/link-check.yml
git rm .github/workflows/lighthouse.yml
git commit -m "chore(ci): temporarily remove workflows"
git push origin main
```

Or disable via GitHub UI:
- Go to Actions tab
- Select workflow
- Click "..." menu → "Disable workflow"

## Support

For issues or questions:
- See `CONTRIBUTING.md` for development workflow
- See `docs/ROLLBACK.md` for recovery procedures
- Contact @InnovateSN (repository owner)

---

**Last Updated**: 2025-11-05  
**Related PR**: #10  
**Branch**: codex/ci-and-media-kit

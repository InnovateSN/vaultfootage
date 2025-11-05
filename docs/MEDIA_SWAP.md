# Media Swap — How To

## Overview

This guide explains how to swap media assets (thumbnails and video clips) in VaultFootage and automatically regenerate the `videos.json` data file.

## Quick Start

### 1. Add Media Files

Place your files in the appropriate directories:

**Thumbnails** (required):
```
vaultfootage-v3/thumbs/
  ├── supercar-01.jpg
  ├── yacht-02.jpg
  └── mansion-03.png
```

**Video Clips** (optional):
```
vaultfootage-v3/clips/
  ├── supercar-01.mp4
  ├── yacht-02.mp4
  └── mansion-03.mp4
```

**File Requirements**:
- **Thumbnails**: `.jpg`, `.jpeg`, `.png`, `.webp` (16:9 aspect ratio recommended)
- **Clips**: `.mp4`, `.webm` (16:9 aspect ratio recommended)
- **Pairing**: Files are paired by basename (e.g., `supercar-01.jpg` ↔ `supercar-01.mp4`)
- Items without clips will still be displayed (thumbnail only)

### 2. (Optional) Customize Metadata

Edit `vaultfootage-v3/media.config.json` to customize titles, categories, and other metadata:

```json
{
  "byId": {
    "supercar-01": {
      "title": "Supercar — Sunset Road",
      "category": "Supercar",
      "count": "15+ clips • 4K",
      "resolution": "4K"
    }
  },
  "byPrefix": {
    "supercar": {
      "category": "Supercar",
      "count": "15+ clips • 4K",
      "resolution": "4K"
    },
    "yacht": {
      "category": "Yacht",
      "count": "12+ clips • 4K",
      "resolution": "4K"
    }
  }
}
```

**Configuration Options**:
- **`byId`**: Override metadata for specific items by exact ID
- **`byPrefix`**: Apply metadata to all items with a matching prefix
- **Priority**: `byId` takes precedence over `byPrefix`
- **Auto-generation**: If not specified, title/category are derived from filename

### 3. Generate and Validate

Run the automated build process:

```bash
npm run media:build
```

This command:
1. Scans `thumbs/` and `clips/` directories
2. Generates `vaultfootage-v3/data/videos.json`
3. Validates all file paths exist
4. Exits with error if validation fails

**Individual Commands**:
```bash
# Generate videos.json only
npm run media:generate

# Validate videos.json only
npm run media:validate
```

### 4. Test Locally

Serve the site locally to preview changes:

```bash
npm run serve
```

Then visit: http://localhost:8080

Verify:
- Gallery grid shows all collections
- Thumbnails display correctly
- Collection cards are clickable
- Preview clips load (if present)

### 5. Deploy via PR

Once satisfied with local testing:

```bash
git add vaultfootage-v3/data/videos.json vaultfootage-v3/thumbs/ vaultfootage-v3/clips/
git commit -m "feat(media): swap media assets for [collection name]"
git push origin feature/media-swap
```

Create a pull request and verify in the Vercel preview deployment.

## Technical Details

### File Path Format

**CRITICAL**: All paths in `videos.json` must be **relative without leading slash**:

✅ **Correct**: `thumbs/supercar-01.jpg`, `clips/supercar-01.mp4`  
❌ **Wrong**: `/thumbs/supercar-01.jpg`, `/clips/supercar-01.mp4`

The generator script automatically uses the correct format.

### Output Format

`videos.json` is a flat array (not nested):

```json
[
  {
    "id": "supercar-01",
    "title": "Supercar 01",
    "category": "Supercar",
    "thumb": "thumbs/supercar-01.jpg",
    "preview": "clips/supercar-01.mp4",
    "count": "15+ clips • 4K",
    "resolution": "4K"
  },
  {
    "id": "yacht-02",
    "title": "Yacht 02",
    "category": "Yacht",
    "thumb": "thumbs/yacht-02.jpg",
    "count": "12+ clips • 4K",
    "resolution": "4K"
  }
]
```

**Notes**:
- `preview` field is optional (omitted if no matching clip exists)
- Items are sorted by `category` (ascending), then by `id` (ascending)

### Metadata Generation Rules

1. **ID**: Derived from filename (without extension)
2. **Title**: 
   - Check `media.config.json` → `byId[id].title`
   - Else check `byPrefix[prefix].title`
   - Else auto-generate from ID (title case, replace `-`/`_` with spaces)
3. **Category**:
   - Check `media.config.json` → `byId[id].category`
   - Else check `byPrefix[prefix].category`
   - Else use first part before `-` (e.g., `supercar-01` → `Supercar`)
4. **Count/Resolution**: Similar precedence rules

## Workflow Examples

### Scenario 1: Add New Collection

```bash
# 1. Add files
cp ~/Downloads/ferrari-01.jpg vaultfootage-v3/thumbs/
cp ~/Downloads/ferrari-01.mp4 vaultfootage-v3/clips/

# 2. (Optional) Add metadata
# Edit vaultfootage-v3/media.config.json:
# "byPrefix": {
#   "ferrari": { "category": "Ferrari", "count": "20+ clips • 4K" }
# }

# 3. Generate
npm run media:build

# 4. Verify
npm run serve
# Check http://localhost:8080

# 5. Commit
git add vaultfootage-v3/
git commit -m "feat(media): add Ferrari collection"
git push
```

### Scenario 2: Replace Existing Thumbnails

```bash
# 1. Replace files (keep same filename)
cp ~/Downloads/new-supercar-01.jpg vaultfootage-v3/thumbs/supercar-01.jpg

# 2. Regenerate (paths unchanged, but validation confirms file exists)
npm run media:build

# 3. Commit
git add vaultfootage-v3/thumbs/
git commit -m "chore(media): update supercar-01 thumbnail"
git push
```

### Scenario 3: Remove Collection

```bash
# 1. Remove files
rm vaultfootage-v3/thumbs/old-yacht-03.jpg
rm vaultfootage-v3/clips/old-yacht-03.mp4

# 2. Regenerate (item will be automatically excluded)
npm run media:build

# 3. Commit
git add vaultfootage-v3/
git commit -m "chore(media): remove old-yacht-03 collection"
git push
```

## Validation Rules

The validator checks:
- `videos.json` is valid JSON
- `videos.json` is a non-empty array
- Every item has a `thumb` field
- Every `thumb` file exists on disk
- Every `preview` file exists on disk (if specified)

**Exit Codes**:
- `0` = All validations passed
- `1` = Validation failed (see console errors)

## Troubleshooting

### Issue: "Missing thumb" error

**Cause**: `videos.json` references a file that doesn't exist.

**Solution**:
```bash
# Regenerate from current files
npm run media:generate

# Or fix the file reference
# Ensure the thumbnail file exists in vaultfootage-v3/thumbs/
```

### Issue: Gallery not showing new items

**Cause**: Browser cache or `videos.json` not regenerated.

**Solution**:
```bash
# 1. Regenerate
npm run media:build

# 2. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)

# 3. Check network tab to confirm videos.json was fetched
```

### Issue: Paths with leading slash (`/thumbs/...`)

**Cause**: Manual editing of `videos.json`.

**Solution**: Always use `npm run media:generate` to regenerate (never edit manually).

### Issue: Items not sorted correctly

**Cause**: Manual editing or old generator version.

**Solution**:
```bash
# Regenerate with current script
npm run media:generate

# Items will be sorted by category, then ID
```

## Best Practices

1. **Always use the generator**: Don't manually edit `videos.json`
2. **Test locally first**: Use `npm run serve` before pushing
3. **Validate before commit**: Run `npm run media:build` to catch issues early
4. **Use consistent naming**: `category-number.ext` (e.g., `supercar-01.jpg`)
5. **Optimize images**: Compress thumbnails for faster loading
6. **Match aspect ratios**: Use 16:9 for both thumbs and clips
7. **Update media.config.json**: For better titles and categorization

## CI/CD Integration

The Media Swap toolchain integrates with existing CI/CD:

```bash
# In GitHub Actions or pre-commit hooks
npm run media:build

# Fails CI if validation fails (exit code 1)
```

## Related Documentation

- [CONTRIBUTING.md](../CONTRIBUTING.md) - Development workflow
- [ROLLBACK.md](./ROLLBACK.md) - Recovery procedures
- [README.md](../vaultfootage-v3/README.md) - Project overview

---

**Last Updated**: 2025-11-05  
**Script Version**: 2.0 (robust, idempotent)  
**Compatibility**: Node 18+

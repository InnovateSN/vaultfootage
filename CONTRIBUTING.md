# Contributing to VaultFootage

Thank you for your interest in contributing to VaultFootage!

## Development Setup

### Prerequisites
- Node.js 18+
- Git
- Basic understanding of static site deployment

### Clone & Install
```bash
git clone https://github.com/InnovateSN/vaultfootage.git
cd vaultfootage
npm install
```

### Local Development
```bash
# Serve the site locally
npm run serve

# Run smoke tests
npm run smoke:serve

# Generate videos.json from media files
npm run media:generate
```

## Project Structure
```
vaultfootage/
├── vaultfootage-v3/          # Main site (Vercel root)
│   ├── data/                 # JSON data files
│   ├── scripts/              # Frontend JS
│   ├── styles/               # CSS files
│   ├── thumbs/               # Thumbnail images
│   ├── clips/                # Video preview clips
│   └── index.html            # Main entry
├── scripts/                  # Build/test scripts
│   ├── smoke.sh             # Smoke tests
│   └── generate_videos_json.js  # Media generator
└── .github/workflows/        # CI/CD
```

## Making Changes

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Your Changes
- Follow existing code style
- Test locally before committing
- Don't break the Vercel deployment (root = `vaultfootage-v3/`)

### 3. Test Your Changes
```bash
# Run smoke tests
npm run smoke:serve

# Manual browser testing
npm run serve
# Visit http://localhost:8080
```

### 4. Commit Your Changes
```bash
git add .
git commit -m "type(scope): description"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: CSS/formatting changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### 5. Push and Create PR
```bash
git push origin your-branch-name
```

Then open a Pull Request on GitHub.

## Code Guidelines

### CSS
- Follow existing naming conventions (`vf-*` prefix)
- Use CSS custom properties for colors
- Mobile-first responsive design
- Test on multiple browsers

### JavaScript
- Use modern ES6+ syntax
- Keep it vanilla (no frameworks in main site)
- Comment complex logic
- Handle errors gracefully

### HTML
- Semantic HTML5
- Accessibility attributes (ARIA)
- SEO meta tags
- Valid markup

## Media Files

### Adding New Collections

1. **Add thumbnail image** to `vaultfootage-v3/thumbs/`
   - Format: `category-01.jpg` (e.g., `yacht-01.jpg`)
   - Size: 1280px wide recommended
   - Optimized for web

2. **Add preview video** to `vaultfootage-v3/clips/`
   - Format: `category-01.mp4` (match thumbnail basename)
   - Codec: H.264
   - Resolution: 1080p or higher
   - Duration: 5-10 seconds

3. **Regenerate data file**
   ```bash
   npm run media:generate
   ```

4. **Test and commit**
   ```bash
   npm run smoke:serve
   git add vaultfootage-v3/thumbs/ vaultfootage-v3/clips/ vaultfootage-v3/data/videos.json
   git commit -m "feat(media): add [category] collection"
   ```

## Testing

### Automated Tests (CI)
- Smoke tests (page loads, content validation)
- Link checking (no broken links)
- Lighthouse performance checks

### Manual Testing Checklist
- [ ] Homepage loads correctly
- [ ] Collection cards display properly
- [ ] Collection cards are clickable
- [ ] Gumroad links work
- [ ] Mobile responsive (test on actual device)
- [ ] No console errors
- [ ] Background gradient animates
- [ ] Video previews play on hover

## Deployment

### Vercel Auto-Deploy
- Main branch → Production (vaultfootage-v3.vercel.app)
- PR branches → Preview deployments
- No manual deployment needed

### Important Notes
- **Do not change** `vercel.json` without testing
- **Do not move** `vaultfootage-v3/` directory
- **Do not break** existing Gumroad integration
- Test on preview deploy before merging

## Git Tags & Releases

### Creating a Release
```bash
# Tag with version and message
git tag -a v1.0.1 -m "Release: description"
git push origin v1.0.1
```

### Rollback to Previous Version
```bash
# See available tags
git tag -l

# Checkout specific version
git checkout v1.0.0-stable

# Or create rollback branch
git checkout -b rollback-to-v1.0.0 v1.0.0-stable
```

## Questions?

- Open an issue for bugs or features
- Check existing issues before creating new ones
- Be respectful and constructive

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

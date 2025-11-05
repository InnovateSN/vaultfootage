# Changelog

All notable changes to VaultFootage will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- CI/CD workflows (smoke tests, link checking, Lighthouse)
- Media generator script for automatic videos.json creation
- Repository hygiene files (CONTRIBUTING, CODEOWNERS, templates)
- Automated testing infrastructure

## [1.0.0-stable] - 2025-11-05

### Added
- Collection cards with clickable links to Gumroad
- Large visible thumbnails (320px height)
- Animated gradient mesh background (cyan/blue/teal orbs)
- Responsive layout optimized for desktop/tablet/mobile
- Gumroad integration with UTM tracking
- Interactive hover states with gold accent colors
- Professional glassmorphism UI effects

### Fixed
- Collection cards now clickable (resolved UX issue from Vy report)
- Thumbnails display at full size (not compressed strips)
- CSS specificity conflicts resolved with !important declarations
- Z-index layers corrected for particle background visibility
- Thumbnail images load from Pexels CDN correctly
- Mobile navigation spacing improved

### Changed
- Grid layout: 400px minimum width cards with 32px gap
- Container max-width increased to 1400px
- Thumbnail aspect ratio fixed to 320px height
- Card hover effects enhanced with cyan glow
- Section backgrounds made semi-transparent to show particles

### Technical
- Applied Codex Neural Brain v5.0 CSS specificity fix
- Implemented position absolute for thumbnail images
- Added min-height and max-height constraints
- Responsive breakpoints: 320px (desktop), 280px (tablet), 240px (mobile)

## [0.9.0] - 2025-11-04

### Added
- Initial VaultFootage v3 implementation
- Basic collection grid with 8 categories
- Hero section with video background
- FAQ section
- Pricing page structure
- Basic Gumroad integration

### Known Issues
- Thumbnails displayed as thin horizontal strips
- Collection cards not interactive
- Some navigation links broken
- Mobile navigation truncated

---

## Version History Quick Reference

- **v1.0.0-stable** - Production ready, all UX issues resolved
- **v0.9.0** - Initial implementation with known issues

## Migration Guides

### From 0.9.0 to 1.0.0
No breaking changes. All existing URLs and functionality preserved.
New features are additive only.

---

## Upcoming Features (Roadmap)

### v1.1.0 (Planned)
- [ ] User dashboard for subscribers
- [ ] Search functionality
- [ ] Collection filtering by category
- [ ] Download manager
- [ ] Favorites/bookmarks

### v1.2.0 (Planned)
- [ ] Video player modal
- [ ] Preview trimming
- [ ] Batch download
- [ ] Usage analytics for creators

### Future
- [ ] AI-powered search
- [ ] Custom collections
- [ ] Collaboration features
- [ ] API access for enterprise

---

For detailed commit history, see: https://github.com/InnovateSN/vaultfootage/commits/main

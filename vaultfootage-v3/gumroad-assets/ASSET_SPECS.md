# VaultFootage Gumroad Assets - Specifications

## 🎨 Brand Guidelines

### Color Palette
- **Primary Background**: `#0b0b0f` (Dark charcoal)
- **Card Background**: `#1a1a1e` (Lighter charcoal)
- **Primary Gold**: `#e6c567` (Warm gold)
- **Secondary Gold**: `#d9b652` (Deeper gold)
- **Text Primary**: `#eaeaea` (Off-white)
- **Text Muted**: `#9b978c` (Gray-beige)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Weights Used**:
  - Bold (700-800): Titles, prices, badges
  - SemiBold (600): Subtitles
  - Regular (400-500): Body text

### Logo
- **Design**: "VF" text in circular badge
- **Background**: Linear gradient from Primary Gold to Secondary Gold
- **Text Color**: `#111` (Dark)

---

## 📦 Asset Inventory

### 1. TRIAL10 (Free 10 Clips/Month)

#### Cover Image (1280×720px)
- **File**: `VF-Cover-trial10.png`
- **Title**: "Free Trial 10 Clips/Month"
- **Subtitle**: "Try VaultFootage Risk-Free"
- **Price**: "FREE"
- **Badge**: "Free Trial" (Green accent: `#4ade80`)
- **Features**: 10 clips/month, 4K resolution, Commercial rights

#### Thumbnail (600×600px)
- **File**: `VF-Thumb-trial10.png`
- **Simplified Title**: "Free Trial"
- **Price**: "FREE"
- **Badge**: "Free Trial" (Green)

#### Banner (1920×600px)
- **File**: `VF-Banner-trial10.png`
- **Full branding with features list**

---

### 2. MONTHLY (£29/month)

#### Cover Image (1280×720px)
- **File**: `VF-Cover-monthly.png`
- **Title**: "Unlimited 4K Access"
- **Subtitle**: "Monthly Subscription"
- **Price**: "£29/mo"
- **Badge**: None
- **Features**: Unlimited downloads, 4K resolution, Commercial rights, Priority support

#### Thumbnail (600×600px)
- **File**: `VF-Thumb-monthly.png`
- **Simplified Title**: "Monthly Plan"
- **Price**: "£29/mo"

#### Banner (1920×600px)
- **File**: `VF-Banner-monthly.png`

---

### 3. YEARLY (£279/year) ⭐ MOST POPULAR

#### Cover Image (1280×720px)
- **File**: `VF-Cover-yearly.png`
- **Title**: "Unlimited 4K Access"
- **Subtitle**: "Annual Plan — Save 20%"
- **Price**: "£279/yr"
- **Badge**: "Most Popular" (Gold: `#e6c567`)
- **Features**: All monthly features + 2 months free

#### Thumbnail (600×600px)
- **File**: `VF-Thumb-yearly.png`
- **Simplified Title**: "Yearly Plan"
- **Price**: "£279/yr"
- **Badge**: "Most Popular"

#### Banner (1920×600px)
- **File**: `VF-Banner-yearly.png`

---

### 4. LIFETIME (£699 one-time)

#### Cover Image (1280×720px)
- **File**: `VF-Cover-lifetime.png`
- **Title**: "Lifetime Licence & Future Updates"
- **Subtitle**: "One-Time Payment — Never Pay Again"
- **Price**: "£699"
- **Badge**: "Best Value" (Purple accent: `#a855f7`)
- **Features**: All features + Future updates included + One-time payment

#### Thumbnail (600×600px)
- **File**: `VF-Thumb-lifetime.png`
- **Simplified Title**: "Lifetime Access"
- **Price**: "£699"
- **Badge**: "Best Value"

#### Banner (1920×600px)
- **File**: `VF-Banner-lifetime.png`

---

## 🎭 Design Elements

### Glow Effects
- **Gold Glow**: Radial gradient from center-top
  - Inner: `rgba(230, 197, 103, 0.15)`
  - Outer: `rgba(230, 197, 103, 0)` at 100%
- **Badge Shadow**: Matching badge color with 20px blur

### Layout Principles
- **Safe Zone**: All critical elements centered
- **Padding**: Minimum 80px from edges (covers), 60px (thumbnails), 100px (banners)
- **Text Hierarchy**:
  - Title: 64px (covers), 40px (thumbs), 56px (banners)
  - Subtitle: 28px (covers), 20px (thumbs), 32px (banners)
  - Price: 72px (covers), 64px (thumbs), 80px (banners)

### Badge Specifications
- **Shape**: Pill (fully rounded corners)
- **Padding**: 12px horizontal, 8px vertical
- **Font**: Bold 16px Inter
- **Shadow**: 20px blur matching badge color
- **Text**: Dark (`#111`)

---

## 📐 Export Specifications

### Image Format
- **Format**: PNG
- **DPI**: 72 (web-optimized)
- **Color Space**: sRGB
- **Compression**: Standard PNG (lossless)

### Optional JPG Export
For faster loading times, you can also export as:
- **Format**: JPEG
- **Quality**: 80-85%
- **Use Case**: Email marketing, faster page loads

---

## 🔧 Technical Notes

### Generation Method
- **Tool**: Node.js + Canvas library
- **Generator Script**: `generate-assets.js`
- **Regeneration**: Run `node generate-assets.js` to regenerate all assets

### Font Installation
If regenerating assets:
```bash
# Install Inter font system-wide or ensure Google Fonts is accessible
# The script uses Inter font family
```

### Customization
To modify designs:
1. Edit `generate-assets.js`
2. Update the `PLANS` array for content changes
3. Modify drawing functions for layout changes
4. Run `node generate-assets.js` to regenerate

---

## 📤 Gumroad Upload Guidelines

### Cover Image (Product Page)
- **Required Size**: 1280×720px minimum
- **Recommended**: Use the cover images (`VF-Cover-*.png`)
- **Format**: PNG or JPG
- **Max File Size**: 5MB

### Thumbnail (Product Grid)
- **Required Size**: 600×600px (square)
- **Recommended**: Use the thumbnail images (`VF-Thumb-*.png`)
- **Format**: PNG or JPG
- **Important**: Thumbnails may be cropped on mobile - keep text centered

### Additional Images (Gallery)
- **Recommended**: Use banner images (`VF-Banner-*.png`) as additional gallery images
- **Benefit**: Shows features and value proposition

---

## 🌐 Website Integration

### Hero Banner
Use banner images for promotional sections:
```html
<div class="hero-promo">
  <img src="gumroad-assets/banners/VF-Banner-yearly.png" alt="Yearly Plan">
</div>
```

### Popup/Modal
Use cover images for popups:
```html
<div class="promo-modal">
  <img src="gumroad-assets/covers/VF-Cover-monthly.png" alt="Monthly Plan">
</div>
```

### Email Marketing
- **Covers**: Good for email headers
- **Thumbnails**: Good for email CTAs (smaller file size)

---

## ✅ Quality Checklist

Before uploading to Gumroad:
- [ ] All text is readable and centered
- [ ] Colors match brand guidelines
- [ ] Logo is crisp and clear
- [ ] Badge (if applicable) is visible and legible
- [ ] Price is prominent
- [ ] Safe zone respected (no edge clipping)
- [ ] File size under 5MB
- [ ] Format is PNG (preferred) or high-quality JPG

---

## 📊 Performance Notes

### File Sizes (Approximate)
- **Covers (1280×720)**: ~200-300KB each
- **Thumbnails (600×600)**: ~100-150KB each
- **Banners (1920×600)**: ~250-350KB each

### Loading Optimization
For web use, consider:
- Lazy loading for banners
- Responsive srcset for different screen sizes
- WebP format with PNG fallback

---

## 🎯 Recommendations

### Gumroad Product Setup
1. **Trial10**: Use "Free Trial" badge prominently
2. **Monthly**: Keep clean, no badge (standard tier)
3. **Yearly**: Highlight "Most Popular" badge - drives conversions
4. **Lifetime**: Emphasize "Best Value" and one-time payment

### A/B Testing Ideas
- Test badge colors (current vs. brand gold)
- Test price prominence (larger vs. smaller)
- Test subtitle messaging (features vs. benefits)

---

## 📞 Support

For regeneration or customization:
1. Edit `generate-assets.js`
2. Run `node generate-assets.js`
3. Assets will be regenerated in `gumroad-assets/` directory

---

**Generated**: 2025-11-04
**Version**: 1.0
**Tool**: VaultFootage Asset Generator

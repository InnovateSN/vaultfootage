# 🎬 VaultFootage Gumroad Assets Package

Complete design asset package for VaultFootage Gumroad products and promotional materials.

---

## 📦 What's Inside

```
gumroad-assets/
├── covers/              # Cover images (1280×720px)
│   ├── VF-Cover-trial10.png
│   ├── VF-Cover-monthly.png
│   ├── VF-Cover-yearly.png
│   └── VF-Cover-lifetime.png
│
├── thumbnails/          # Thumbnail images (600×600px)
│   ├── VF-Thumb-trial10.png
│   ├── VF-Thumb-monthly.png
│   ├── VF-Thumb-yearly.png
│   └── VF-Thumb-lifetime.png
│
├── banners/             # Banner images (1920×600px)
│   ├── VF-Banner-trial10.png
│   ├── VF-Banner-monthly.png
│   ├── VF-Banner-yearly.png
│   └── VF-Banner-lifetime.png
│
├── ASSET_SPECS.md       # Complete design specifications
├── GUMROAD_UPLOAD_GUIDE.md  # Step-by-step upload instructions
└── README.md           # This file
```

---

## 🚀 Quick Start

### 1. For Gumroad Upload
👉 **Start here**: Open `GUMROAD_UPLOAD_GUIDE.md`

This guide contains:
- Step-by-step upload instructions
- Product descriptions (copy-paste ready)
- Pricing configuration
- Membership setup
- Website integration code

### 2. For Design Specifications
👉 **Reference**: Open `ASSET_SPECS.md`

This document includes:
- Brand color palette (HEX values)
- Typography specifications
- Badge designs and colors
- Layout principles
- Export settings

---

## 📋 Asset Overview

### 🎨 Plans Covered

1. **TRIAL10** - Free Trial (10 clips/month)
   - Badge: Green "Free Trial"
   - Price: FREE

2. **MONTHLY** - £29/month
   - No badge (standard tier)
   - Price: £29/mo

3. **YEARLY** - £279/year ⭐ MOST POPULAR
   - Badge: Gold "Most Popular"
   - Price: £279/yr
   - Saves 20%

4. **LIFETIME** - £699 one-time 💎 BEST VALUE
   - Badge: Purple "Best Value"
   - Price: £699

### 📐 Image Sizes

| Type | Dimensions | Use Case |
|------|------------|----------|
| **Cover** | 1280×720px | Gumroad product page hero |
| **Thumbnail** | 600×600px | Product grid, social media |
| **Banner** | 1920×600px | Website hero, email headers |

---

## 🎨 Brand Guidelines

### Colors
- **Background**: `#0b0b0f` (Dark charcoal)
- **Gold Accent**: `#e6c567` (Primary gold)
- **Gold 2**: `#d9b652` (Deeper gold)
- **Text**: `#eaeaea` (Off-white)
- **Muted**: `#9b978c` (Gray-beige)

### Fonts
- **Primary**: Inter (Google Fonts)
- **Weights**: 400, 600, 700, 800

### Logo
- **Design**: "VF" in gold gradient circle
- **Gradient**: `#e6c567` → `#d9b652`

---

## 💻 Regeneration

Need to regenerate or customize assets?

### Prerequisites
```bash
npm install canvas
```

### Run Generator
```bash
node generate-assets.js
```

All assets will be regenerated in this folder.

### Customization
Edit `generate-assets.js` to modify:
- Colors
- Text content
- Layout
- Badge designs
- Font sizes

---

## 📤 Upload Checklist

Before uploading to Gumroad:
- [ ] Review all images in their respective folders
- [ ] Verify text is readable and centered
- [ ] Check file sizes (should be under 1MB each)
- [ ] Read `GUMROAD_UPLOAD_GUIDE.md`
- [ ] Prepare product descriptions (included in guide)
- [ ] Have welcome page URLs ready
- [ ] Configure pricing in GBP

---

## 🔗 Website Integration

### Hero Section
```html
<a href="https://gumroad.com/l/vaultfootage-monthly">
  Start with £29/mo
</a>
```

### Banner Promotion
```html
<img src="gumroad-assets/banners/VF-Banner-yearly.png"
     alt="VaultFootage Yearly Plan">
```

### Pricing Cards
Link each pricing card to its respective Gumroad product page.

---

## 📊 File Sizes

All images are web-optimized PNG files:
- **Covers**: ~200-300KB each
- **Thumbnails**: ~100-150KB each
- **Banners**: ~250-350KB each

**Total package size**: ~2.5MB

---

## 🎯 Usage Tips

### Gumroad
- Use **covers** as main product images
- Use **thumbnails** for product grid display
- Add **banners** to product gallery (optional)

### Social Media
- Twitter/X: Use banners (1920×600)
- Instagram: Use thumbnails (600×600)
- Facebook: Use covers (1280×720)
- LinkedIn: Use banners (1920×600)

### Email Marketing
- Headers: Use banners
- CTAs: Use thumbnails
- Hero sections: Use covers

### Website
- Hero sections: Use banners
- Popups/Modals: Use covers
- Pricing cards: Link to Gumroad with thumbnails

---

## 📞 Support

### Questions?
- **Design Specs**: See `ASSET_SPECS.md`
- **Upload Help**: See `GUMROAD_UPLOAD_GUIDE.md`
- **Regeneration**: Run `node generate-assets.js`

### Issues?
If images don't look right:
1. Check file format (should be PNG)
2. Verify dimensions match specifications
3. Ensure colors match brand guidelines
4. Regenerate if needed

---

## 🎬 Next Steps

1. **Review Assets** - Open each folder and preview images
2. **Read Upload Guide** - Follow `GUMROAD_UPLOAD_GUIDE.md`
3. **Create Products** - Set up 4 products on Gumroad
4. **Upload Images** - Use covers and thumbnails
5. **Configure Pricing** - Set prices in GBP
6. **Test Flow** - Complete test purchase
7. **Go Live** - Launch on VaultFootage website

---

## ✨ Credits

- **Generated**: 2025-11-04
- **Tool**: Node.js + Canvas
- **Brand**: VaultFootage
- **Designer**: Automated Asset Generator

---

**Ready to launch?** 🚀

Open `GUMROAD_UPLOAD_GUIDE.md` and follow the step-by-step instructions!

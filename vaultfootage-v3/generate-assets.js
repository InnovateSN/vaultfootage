const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Brand colors
const COLORS = {
  bg: '#0b0b0f',
  card: '#1a1a1e',
  gold: '#e6c567',
  gold2: '#d9b652',
  text: '#eaeaea',
  muted: '#9b978c',
};

// Plan configurations
const PLANS = [
  {
    id: 'trial10',
    title: 'Free Trial 10 Clips/Month',
    subtitle: 'Try VaultFootage Risk-Free',
    price: 'FREE',
    badge: 'Free Trial',
    badge_color: '#4ade80',
    features: ['10 clips per month', '4K resolution', 'Commercial rights']
  },
  {
    id: 'monthly',
    title: 'Unlimited 4K Access',
    subtitle: 'Monthly Subscription',
    price: '£29/mo',
    badge: null,
    features: ['Unlimited downloads', '4K resolution', 'Commercial rights', 'Priority support']
  },
  {
    id: 'yearly',
    title: 'Unlimited 4K Access',
    subtitle: 'Annual Plan — Save 20%',
    price: '£279/yr',
    badge: 'Most Popular',
    badge_color: COLORS.gold,
    features: ['Unlimited downloads', '4K resolution', 'Commercial rights', 'Priority support', '2 months free']
  },
  {
    id: 'lifetime',
    title: 'Lifetime Licence & Future Updates',
    subtitle: 'One-Time Payment — Never Pay Again',
    price: '£699',
    badge: 'Best Value',
    badge_color: '#a855f7',
    features: ['Unlimited downloads', '4K resolution', 'Commercial rights', 'Priority support', 'Future updates included', 'One-time payment']
  }
];

// Helper: Draw rounded rectangle
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

// Helper: Draw VF logo
function drawLogo(ctx, x, y, size) {
  // Create gradient for logo
  const gradient = ctx.createLinearGradient(x, y, x + size, y + size);
  gradient.addColorStop(0, COLORS.gold);
  gradient.addColorStop(1, COLORS.gold2);

  // Draw circle
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
  ctx.fill();

  // Draw VF text
  ctx.fillStyle = '#111';
  ctx.font = `bold ${size * 0.4}px Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('VF', x + size/2, y + size/2);
}

// Helper: Draw badge
function drawBadge(ctx, text, x, y, color) {
  ctx.font = 'bold 16px Inter, sans-serif';
  const metrics = ctx.measureText(text);
  const padding = 12;
  const width = metrics.width + padding * 2;
  const height = 32;

  // Background with glow
  ctx.shadowColor = color;
  ctx.shadowBlur = 20;
  roundRect(ctx, x - width/2, y, width, height, height/2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Text
  ctx.fillStyle = '#111';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y + height/2);
}

// Helper: Add subtle gradient overlay
function addGoldGlow(ctx, width, height) {
  const gradient = ctx.createRadialGradient(width/2, height/3, 0, width/2, height/3, width * 0.8);
  gradient.addColorStop(0, 'rgba(230, 197, 103, 0.15)');
  gradient.addColorStop(0.6, 'rgba(230, 197, 103, 0.05)');
  gradient.addColorStop(1, 'rgba(230, 197, 103, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

// Generate Cover Image (1280×720)
function generateCover(plan) {
  const width = 1280;
  const height = 720;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, width, height);

  // Add subtle texture/noise
  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.02})`;
    ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
  }

  // Gold glow overlay
  addGoldGlow(ctx, width, height);

  // Draw VF logo
  drawLogo(ctx, 80, 60, 80);

  // VaultFootage text next to logo
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 32px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('VaultFootage', 180, 100);

  // Badge (if applicable)
  if (plan.badge) {
    drawBadge(ctx, plan.badge, width/2, 200, plan.badge_color);
  }

  // Main title
  ctx.font = 'bold 64px Inter, sans-serif';
  ctx.fillStyle = COLORS.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Wrap title if too long
  const maxWidth = width - 160;
  const words = plan.title.split(' ');
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + ' ' + words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);

  // Draw title lines
  const lineHeight = 70;
  const startY = height/2 - (lines.length - 1) * lineHeight/2 - 20;
  lines.forEach((line, i) => {
    ctx.fillText(line, width/2, startY + i * lineHeight);
  });

  // Subtitle
  ctx.font = '28px Inter, sans-serif';
  ctx.fillStyle = COLORS.muted;
  ctx.fillText(plan.subtitle, width/2, startY + lines.length * lineHeight + 20);

  // Price
  ctx.font = 'bold 72px Inter, sans-serif';
  const gradient = ctx.createLinearGradient(width/2 - 200, 0, width/2 + 200, 0);
  gradient.addColorStop(0, COLORS.gold);
  gradient.addColorStop(1, COLORS.gold2);
  ctx.fillStyle = gradient;
  ctx.fillText(plan.price, width/2, height - 140);

  // Decorative elements
  ctx.strokeStyle = COLORS.gold + '40';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width/2 - 100, height - 80);
  ctx.lineTo(width/2 + 100, height - 80);
  ctx.stroke();

  return canvas;
}

// Generate Thumbnail (600×600)
function generateThumbnail(plan) {
  const size = 600;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, size, size);

  // Subtle texture
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.02})`;
    ctx.fillRect(Math.random() * size, Math.random() * size, 1, 1);
  }

  // Gold glow
  addGoldGlow(ctx, size, size);

  // Large VF logo
  drawLogo(ctx, size/2 - 80, 80, 160);

  // Badge (if applicable)
  if (plan.badge) {
    drawBadge(ctx, plan.badge, size/2, 270, plan.badge_color);
  }

  // Title (shortened for square format)
  ctx.font = 'bold 40px Inter, sans-serif';
  ctx.fillStyle = COLORS.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Simplify title for thumbnail
  let thumbTitle = plan.title;
  if (plan.id === 'trial10') thumbTitle = 'Free Trial';
  else if (plan.id === 'monthly') thumbTitle = 'Monthly Plan';
  else if (plan.id === 'yearly') thumbTitle = 'Yearly Plan';
  else if (plan.id === 'lifetime') thumbTitle = 'Lifetime Access';

  ctx.fillText(thumbTitle, size/2, 330);

  // Price
  ctx.font = 'bold 64px Inter, sans-serif';
  const gradient = ctx.createLinearGradient(size/2 - 100, 0, size/2 + 100, 0);
  gradient.addColorStop(0, COLORS.gold);
  gradient.addColorStop(1, COLORS.gold2);
  ctx.fillStyle = gradient;
  ctx.fillText(plan.price, size/2, 420);

  // Bottom text
  ctx.font = '20px Inter, sans-serif';
  ctx.fillStyle = COLORS.muted;
  ctx.fillText('VaultFootage', size/2, size - 60);

  return canvas;
}

// Generate Banner (1920×600)
function generateBanner(plan) {
  const width = 1920;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, width, height);

  // Texture
  for (let i = 0; i < 150; i++) {
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.02})`;
    ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
  }

  // Gold glow
  addGoldGlow(ctx, width, height);

  // VF logo on left
  drawLogo(ctx, 100, 60, 80);

  // VaultFootage text
  ctx.fillStyle = COLORS.text;
  ctx.font = 'bold 28px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('VaultFootage', 200, 100);

  // Main content centered
  ctx.textAlign = 'center';

  // Badge
  if (plan.badge) {
    drawBadge(ctx, plan.badge, width/2, 120, plan.badge_color);
  }

  // Title
  ctx.font = 'bold 56px Inter, sans-serif';
  ctx.fillStyle = COLORS.text;
  ctx.fillText(plan.title, width/2, plan.badge ? 220 : 180);

  // Subtitle
  ctx.font = '32px Inter, sans-serif';
  ctx.fillStyle = COLORS.muted;
  ctx.fillText(plan.subtitle, width/2, plan.badge ? 290 : 250);

  // Price
  ctx.font = 'bold 80px Inter, sans-serif';
  const gradient = ctx.createLinearGradient(width/2 - 200, 0, width/2 + 200, 0);
  gradient.addColorStop(0, COLORS.gold);
  gradient.addColorStop(1, COLORS.gold2);
  ctx.fillStyle = gradient;
  ctx.fillText(plan.price, width/2, plan.badge ? 420 : 380);

  // Features on right (if space)
  ctx.font = '20px Inter, sans-serif';
  ctx.fillStyle = COLORS.muted;
  ctx.textAlign = 'right';
  const featuresY = 200;
  plan.features.slice(0, 3).forEach((feature, i) => {
    ctx.fillText(`✓ ${feature}`, width - 120, featuresY + i * 40);
  });

  return canvas;
}

// Generate all assets
async function generateAllAssets() {
  console.log('🎨 Generating VaultFootage Gumroad assets...\n');

  const outputDir = path.join(__dirname, 'gumroad-assets');

  for (const plan of PLANS) {
    console.log(`📦 Generating assets for: ${plan.id.toUpperCase()}`);

    // Cover
    const cover = generateCover(plan);
    const coverPath = path.join(outputDir, 'covers', `VF-Cover-${plan.id}.png`);
    fs.writeFileSync(coverPath, cover.toBuffer('image/png'));
    console.log(`  ✓ Cover: ${coverPath}`);

    // Thumbnail
    const thumb = generateThumbnail(plan);
    const thumbPath = path.join(outputDir, 'thumbnails', `VF-Thumb-${plan.id}.png`);
    fs.writeFileSync(thumbPath, thumb.toBuffer('image/png'));
    console.log(`  ✓ Thumbnail: ${thumbPath}`);

    // Banner
    const banner = generateBanner(plan);
    const bannerPath = path.join(outputDir, 'banners', `VF-Banner-${plan.id}.png`);
    fs.writeFileSync(bannerPath, banner.toBuffer('image/png'));
    console.log(`  ✓ Banner: ${bannerPath}`);

    console.log('');
  }

  console.log('✨ All assets generated successfully!');
  console.log(`📁 Output directory: ${outputDir}`);
}

// Run
generateAllAssets().catch(console.error);

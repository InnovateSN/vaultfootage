/**
 * VaultFootage - Minimal Elegant Background
 * Subtle animated gradient mesh with smooth movements
 * Professional and refined aesthetic
 */

(() => {
  const canvas = document.getElementById('vf-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let gradientPoints = [];
  let animationId;
  let time = 0;

  // Configuration - Minimal and elegant
  const config = {
    pointCount: 4, // Just a few points for smooth gradients
    baseColor: { r: 0, g: 180, b: 180 }, // Subtle cyan
    speed: 0.0003, // Very slow movement
    amplitude: 100, // Gentle movement range
    gridOpacity: 0.03, // Very subtle grid
    gridSpacing: 60,
    showGrid: true,
    showGradients: true
  };

  // Gradient point class
  class GradientPoint {
    constructor(index) {
      this.index = index;
      this.baseX = (canvas.width / (config.pointCount + 1)) * (index + 1);
      this.baseY = (canvas.height / (config.pointCount + 1)) * (index + 1);
      this.offsetX = 0;
      this.offsetY = 0;
      this.angleX = Math.random() * Math.PI * 2;
      this.angleY = Math.random() * Math.PI * 2;
      this.speedX = 0.3 + Math.random() * 0.3;
      this.speedY = 0.3 + Math.random() * 0.3;
    }

    update() {
      this.angleX += config.speed * this.speedX;
      this.angleY += config.speed * this.speedY;
      
      this.offsetX = Math.sin(this.angleX) * config.amplitude;
      this.offsetY = Math.cos(this.angleY) * config.amplitude;
      
      this.x = this.baseX + this.offsetX;
      this.y = this.baseY + this.offsetY;
    }
  }

  // Initialize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initPoints();
  }

  // Create gradient points
  function initPoints() {
    gradientPoints = [];
    for (let i = 0; i < config.pointCount; i++) {
      gradientPoints.push(new GradientPoint(i));
    }
  }

  // Draw subtle grid
  function drawGrid() {
    if (!config.showGrid) return;

    ctx.strokeStyle = `rgba(${config.baseColor.r}, ${config.baseColor.g}, ${config.baseColor.b}, ${config.gridOpacity})`;
    ctx.lineWidth = 0.5;

    // Vertical lines
    for (let x = 0; x < canvas.width; x += config.gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y < canvas.height; y += config.gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  // Draw animated gradients
  function drawGradients() {
    if (!config.showGradients || gradientPoints.length === 0) return;

    gradientPoints.forEach((point, i) => {
      // Create radial gradient for each point
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, 300
      );

      const alpha = 0.15 + Math.sin(time * 0.001 + i) * 0.05;
      
      gradient.addColorStop(0, `rgba(${config.baseColor.r}, ${config.baseColor.g}, ${config.baseColor.b}, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(${config.baseColor.r}, ${config.baseColor.g}, ${config.baseColor.b}, ${alpha * 0.3})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
  }

  // Draw subtle connecting lines between points
  function drawConnections() {
    ctx.strokeStyle = `rgba(${config.baseColor.r}, ${config.baseColor.g}, ${config.baseColor.b}, 0.05)`;
    ctx.lineWidth = 1;

    for (let i = 0; i < gradientPoints.length; i++) {
      for (let j = i + 1; j < gradientPoints.length; j++) {
        ctx.beginPath();
        ctx.moveTo(gradientPoints[i].x, gradientPoints[i].y);
        ctx.lineTo(gradientPoints[j].x, gradientPoints[j].y);
        ctx.stroke();
      }
    }
  }

  // Animation loop
  function animate() {
    time++;

    // Clear canvas - no trail effect for clean look
    ctx.fillStyle = '#0b0b0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw elements in order
    drawGrid();
    drawGradients();
    drawConnections();

    // Update gradient points
    gradientPoints.forEach(point => point.update());

    animationId = requestAnimationFrame(animate);
  }

  // Window resize
  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  // Initialize
  resizeCanvas();
  animate();

  console.log('✅ VaultFootage minimal background initialized');
})();

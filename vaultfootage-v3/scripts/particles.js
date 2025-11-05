/**
 * VaultFootage - Elegant Animated Gradient Background
 * Subtle mesh gradient with smooth color transitions
 * Professional and modern aesthetic
 */

(() => {
  const canvas = document.getElementById('vf-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let gradientOrbs = [];
  let animationId;

  // Configuration
  const config = {
    orbCount: 3,
    colors: [
      { r: 0, g: 180, b: 180, name: 'cyan' },      // Cyan
      { r: 100, g: 100, b: 200, name: 'blue' },    // Soft blue
      { r: 0, g: 150, b: 150, name: 'teal' }       // Teal
    ],
    speed: 0.2,
    baseRadius: 400,
    opacity: 0.25
  };

  class GradientOrb {
    constructor(index) {
      this.color = config.colors[index % config.colors.length];
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * config.speed;
      this.vy = (Math.random() - 0.5) * config.speed;
      this.radius = config.baseRadius + Math.random() * 200;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x < -this.radius || this.x > canvas.width + this.radius) {
        this.vx *= -1;
      }
      if (this.y < -this.radius || this.y > canvas.height + this.radius) {
        this.vy *= -1;
      }

      // Keep in bounds
      this.x = Math.max(-this.radius / 2, Math.min(canvas.width + this.radius / 2, this.x));
      this.y = Math.max(-this.radius / 2, Math.min(canvas.height + this.radius / 2, this.y));
    }

    draw() {
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius
      );

      gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${config.opacity})`);
      gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${config.opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function init() {
    gradientOrbs = [];
    for (let i = 0; i < config.orbCount; i++) {
      gradientOrbs.push(new GradientOrb(i));
    }
  }

  function animate() {
    // Clear with dark background
    ctx.fillStyle = '#0b0b0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw and update orbs with blend mode
    ctx.globalCompositeOperation = 'screen';
    
    gradientOrbs.forEach(orb => {
      orb.update();
      orb.draw();
    });

    ctx.globalCompositeOperation = 'source-over';

    animationId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    init();
  });

  resizeCanvas();
  init();
  animate();

  console.log('✅ VaultFootage gradient background initialized');
})();

/**
 * VaultFootage - Advanced Network Particles Background
 * Creates animated network of connected particles with cyan/teal theme
 * Similar to digital network visualization
 */

(() => {
  const canvas = document.getElementById('vf-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let mouse = { x: null, y: null, radius: 150 };

  // Configuration
  const config = {
    particleCount: 100,
    particleColor: 'rgba(0, 255, 255, 0.8)', // Cyan
    lineColor: 'rgba(0, 200, 200, 0.15)',
    particleSize: 2,
    lineWidth: 0.5,
    maxDistance: 150,
    speed: 0.3,
    mouseInteraction: true,
    glowEffect: true
  };

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * config.speed;
      this.vy = (Math.random() - 0.5) * config.speed;
      this.radius = Math.random() * config.particleSize + 1;
      this.opacity = Math.random() * 0.5 + 0.5;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
      // Movement
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Keep within bounds
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));

      // Pulse effect
      this.pulsePhase += this.pulseSpeed;
      this.currentRadius = this.radius + Math.sin(this.pulsePhase) * 0.5;

      // Mouse interaction
      if (config.mouseInteraction && mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 0.05;
          this.vy -= Math.sin(angle) * force * 0.05;
        }
      }

      // Velocity damping
      this.vx *= 0.99;
      this.vy *= 0.99;
    }

    draw() {
      ctx.beginPath();
      
      if (config.glowEffect) {
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.5)';
      }

      ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
      ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
    }
  }

  // Initialize canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Create particles
  function initParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Connect particles with lines
  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.maxDistance) {
          const opacity = 1 - (distance / config.maxDistance);
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 200, 200, ${opacity * 0.15})`;
          ctx.lineWidth = config.lineWidth;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    // Clear canvas with fade effect for trails
    ctx.fillStyle = 'rgba(11, 11, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Connect particles
    connectParticles();

    animationId = requestAnimationFrame(animate);
  }

  // Mouse events
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Touch events for mobile
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  });

  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Window resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  // Initialize
  resizeCanvas();
  initParticles();
  animate();

  console.log('✅ VaultFootage particles network initialized');
})();

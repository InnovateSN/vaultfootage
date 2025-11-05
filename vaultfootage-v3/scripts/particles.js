/**
 * VaultFootage - Advanced Cinematic Scanner Background
 * Creates a scanning grid with blob detection and HUD-like elements
 * Inspired by TouchDesigner blob tracking and facial recognition interfaces
 */

(() => {
  const canvas = document.getElementById('vf-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let scanLines = [];
  let blobs = [];
  let gridPoints = [];
  let scannerAngle = 0;
  let animationId;
  let mouse = { x: null, y: null };
  let time = 0;

  // Configuration
  const config = {
    // Grid settings
    gridSpacing: 80,
    gridOpacity: 0.08,
    gridColor: 'rgba(0, 200, 200, 0.15)',
    
    // Blob settings
    blobCount: 5,
    blobSize: { min: 40, max: 120 },
    blobSpeed: 0.2,
    blobColor: 'rgba(0, 255, 255, 0.3)',
    blobBorderColor: 'rgba(0, 255, 255, 0.6)',
    
    // Scanner settings
    scanLineSpeed: 0.005,
    scanLineWidth: 2,
    scanLineGlow: 15,
    
    // Detection boxes
    detectionBoxes: 3,
    boxAnimSpeed: 0.02,
    
    // HUD elements
    hudColor: 'rgba(0, 255, 255, 0.5)',
    cornerSize: 20,
    
    // Mouse interaction (reduced)
    mouseRadius: 100,
    mouseForce: 0.02
  };

  // Blob class with organic movement
  class Blob {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * (config.blobSize.max - config.blobSize.min) + config.blobSize.min;
      this.vx = (Math.random() - 0.5) * config.blobSpeed;
      this.vy = (Math.random() - 0.5) * config.blobSpeed;
      this.detected = Math.random() > 0.5;
      this.detectionProgress = 0;
      this.scanProgress = 0;
      this.points = this.generateBlobPoints();
    }

    generateBlobPoints() {
      const points = [];
      const segments = 8;
      for (let i = 0; i < segments; i++) {
        const angle = (Math.PI * 2 * i) / segments;
        const variation = 0.7 + Math.random() * 0.3;
        points.push({
          angle,
          distance: this.size * variation,
          speed: 0.01 + Math.random() * 0.02
        });
      }
      return points;
    }

    update() {
      // Organic movement
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges with padding
      const padding = this.size;
      if (this.x < padding || this.x > canvas.width - padding) {
        this.vx *= -1;
        this.x = Math.max(padding, Math.min(canvas.width - padding, this.x));
      }
      if (this.y < padding || this.y > canvas.height - padding) {
        this.vy *= -1;
        this.y = Math.max(padding, Math.min(canvas.height - padding, this.y));
      }

      // Subtle mouse repulsion (reduced)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < config.mouseRadius && dist > 0) {
          const force = ((config.mouseRadius - dist) / config.mouseRadius) * config.mouseForce;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }
      }

      // Velocity damping
      this.vx *= 0.995;
      this.vy *= 0.995;

      // Animate blob points for organic shape
      this.points.forEach(point => {
        point.angle += point.speed;
        const wobble = Math.sin(point.angle) * 0.1;
        point.currentDistance = point.distance * (1 + wobble);
      });

      // Detection animation
      if (this.detected) {
        this.detectionProgress = Math.min(1, this.detectionProgress + 0.02);
        this.scanProgress += 0.03;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);

      // Draw organic blob shape
      ctx.beginPath();
      this.points.forEach((point, i) => {
        const angle = (Math.PI * 2 * i) / this.points.length;
        const x = Math.cos(angle) * point.currentDistance;
        const y = Math.sin(angle) * point.currentDistance;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();

      // Filled blob with gradient
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0.02)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Blob border
      ctx.strokeStyle = config.blobBorderColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Detection box if detected
      if (this.detected && this.detectionProgress > 0) {
        this.drawDetectionBox();
      }

      ctx.restore();
    }

    drawDetectionBox() {
      const boxSize = this.size * 1.5;
      const cornerLen = config.cornerSize;
      const progress = this.detectionProgress;

      ctx.strokeStyle = `rgba(0, 255, 255, ${0.8 * progress})`;
      ctx.lineWidth = 2;

      // Animated corners
      const drawCorner = (x1, y1, x2, y2, x3, y3) => {
        ctx.beginPath();
        ctx.moveTo(x1 * progress, y1 * progress);
        ctx.lineTo(x2 * progress, y2 * progress);
        ctx.lineTo(x3 * progress, y3 * progress);
        ctx.stroke();
      };

      // Top-left
      drawCorner(-boxSize, -boxSize, -boxSize + cornerLen, -boxSize, -boxSize, -boxSize + cornerLen);
      // Top-right
      drawCorner(boxSize, -boxSize, boxSize - cornerLen, -boxSize, boxSize, -boxSize + cornerLen);
      // Bottom-left
      drawCorner(-boxSize, boxSize, -boxSize + cornerLen, boxSize, -boxSize, boxSize - cornerLen);
      // Bottom-right
      drawCorner(boxSize, boxSize, boxSize - cornerLen, boxSize, boxSize, boxSize - cornerLen);

      // Scanning line
      const scanY = -boxSize + (boxSize * 2 * (this.scanProgress % 1));
      ctx.beginPath();
      ctx.moveTo(-boxSize, scanY);
      ctx.lineTo(boxSize, scanY);
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.4 * progress})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // ID label
      if (progress > 0.7) {
        ctx.fillStyle = `rgba(0, 255, 255, ${progress})`;
        ctx.font = '10px monospace';
        ctx.fillText(`ID:${Math.floor(this.x + this.y)}`, -boxSize, -boxSize - 5);
      }
    }
  }

  // Initialize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initGrid();
  }

  // Create background grid
  function initGrid() {
    gridPoints = [];
    for (let x = 0; x < canvas.width; x += config.gridSpacing) {
      for (let y = 0; y < canvas.height; y += config.gridSpacing) {
        gridPoints.push({ x, y });
      }
    }
  }

  // Initialize blobs
  function initBlobs() {
    blobs = [];
    for (let i = 0; i < config.blobCount; i++) {
      blobs.push(new Blob());
    }
  }

  // Draw scanning grid
  function drawGrid() {
    ctx.strokeStyle = config.gridColor;
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

    // Grid points with pulse
    gridPoints.forEach((point, i) => {
      const pulse = Math.sin(time * 0.001 + i * 0.1) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(0, 200, 200, ${config.gridOpacity * pulse})`;
      ctx.fillRect(point.x - 1, point.y - 1, 2, 2);
    });
  }

  // Draw radial scanner
  function drawScanner() {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(scannerAngle);

    // Scanner line with glow
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
    gradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = config.scanLineWidth;
    ctx.shadowBlur = config.scanLineGlow;
    ctx.shadowColor = 'rgba(0, 255, 255, 0.5)';

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();

    ctx.restore();

    scannerAngle += config.scanLineSpeed;
  }

  // Draw HUD corners
  function drawHUDCorners() {
    const margin = 30;
    const length = 40;
    
    ctx.strokeStyle = config.hudColor;
    ctx.lineWidth = 2;

    // Top-left
    ctx.beginPath();
    ctx.moveTo(margin, margin + length);
    ctx.lineTo(margin, margin);
    ctx.lineTo(margin + length, margin);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(canvas.width - margin - length, margin);
    ctx.lineTo(canvas.width - margin, margin);
    ctx.lineTo(canvas.width - margin, margin + length);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(margin, canvas.height - margin - length);
    ctx.lineTo(margin, canvas.height - margin);
    ctx.lineTo(margin + length, canvas.height - margin);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(canvas.width - margin - length, canvas.height - margin);
    ctx.lineTo(canvas.width - margin, canvas.height - margin);
    ctx.lineTo(canvas.width - margin, canvas.height - margin - length);
    ctx.stroke();
  }

  // Animation loop
  function animate() {
    time++;

    // Clear with minimal fade (less trail effect)
    ctx.fillStyle = 'rgba(11, 11, 15, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    drawGrid();
    drawScanner();
    
    // Update and draw blobs
    blobs.forEach(blob => {
      blob.update();
      blob.draw();
    });

    drawHUDCorners();

    animationId = requestAnimationFrame(animate);
  }

  // Mouse events (reduced sensitivity)
  let mouseTimeout;
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
      mouse.x = null;
      mouse.y = null;
    }, 2000);
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Resize handler
  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  // Initialize
  resizeCanvas();
  initBlobs();
  animate();

  console.log('✅ VaultFootage cinematic scanner initialized');
})();

// vaultfootage-v3/scripts/gallery.js
(function () {
  const GRID_ID = 'vf-collections-grid';
  const DATA_URL = 'data/videos.json';

  const $grid = document.getElementById(GRID_ID);
  if (!$grid) {
    console.error('[VF] Collections grid container not found:', GRID_ID);
    return;
  }

  const fallbackData = [
    { id: 'supercar', title: 'Supercar', count: 15, thumb: 'thumbs/supercar-01.jpg', preview: 'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4' },
    { id: 'yacht', title: 'Yacht', count: 12, thumb: 'thumbs/yacht-01.jpg', preview: 'https://videos.pexels.com/video-files/3191157/3191157-uhd_2560_1440_25fps.mp4' },
    { id: 'interiors', title: 'Interiors', count: 20, thumb: 'thumbs/interiors-01.jpg', preview: 'https://videos.pexels.com/video-files/6985195/6985195-uhd_2560_1440_25fps.mp4' },
    { id: 'fashion', title: 'Fashion', count: 18, thumb: 'thumbs/fashion-01.jpg', preview: 'https://videos.pexels.com/video-files/3141207/3141207-uhd_2560_1440_30fps.mp4' },
    { id: 'dining', title: 'Dining', count: 10, thumb: 'thumbs/dining-01.jpg', preview: 'https://videos.pexels.com/video-files/3130182/3130182-uhd_2560_1440_30fps.mp4' },
    { id: 'city', title: 'City', count: 14, thumb: 'thumbs/city-01.jpg', preview: 'https://videos.pexels.com/video-files/6985181/6985181-uhd_2560_1440_25fps.mp4' },
    { id: 'nature', title: 'Nature', count: 16, thumb: 'thumbs/nature-01.jpg', preview: 'https://videos.pexels.com/video-files/6985181/6985181-uhd_2560_1440_25fps.mp4' },
    { id: 'tech', title: 'Tech', count: 11, thumb: 'thumbs/tech-01.jpg', preview: 'https://videos.pexels.com/video-files/3191157/3191157-uhd_2560_1440_25fps.mp4' }
  ];

  function cardTemplate(item) {
    return `
      <div class="vf-card vf-card-3d vf-card-glow" data-id="${item.id}">
        <div class="vf-card-thumb">
          <img class="vf-thumb" src="${item.thumb}" alt="${item.title}" loading="lazy" />
          <span class="vf-card-category">${item.title}</span>
        </div>
        <div class="vf-card-content">
          <h3 class="vf-card-title">${item.title} Collection</h3>
          <p class="vf-card-meta">${item.count}+ clips • 4K</p>
        </div>
      </div>
    `;
  }

  function attachHoverVideo(card, previewUrl) {
    let video;
    const thumbWrap = card.querySelector('.vf-card-thumb');

    function createVideo() {
      if (video) return;
      video = document.createElement('video');
      video.src = previewUrl;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = true;
      video.preload = 'metadata';
      video.style.position = 'absolute';
      video.style.inset = '0';
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';
      video.style.opacity = '0';
      video.style.transition = 'opacity .25s ease';
      thumbWrap.style.position = 'relative';
      thumbWrap.appendChild(video);
      requestAnimationFrame(() => (video.style.opacity = '1'));
    }

    card.addEventListener('mouseenter', () => {
      createVideo();
      video && video.play().catch(() => {});
    });

    card.addEventListener('mouseleave', () => {
      if (video) {
        video.pause();
        video.style.opacity = '0';
        setTimeout(() => {
          if (video && video.parentNode) {
            video.parentNode.removeChild(video);
            video = null;
          }
        }, 200);
      }
    });
  }

  function render(data) {
    $grid.innerHTML = data.map(cardTemplate).join('');
    // Bind hovers
    const cards = $grid.querySelectorAll('.vf-card');
    cards.forEach((card, idx) => {
      const item = data[idx];
      if (item && item.preview) attachHoverVideo(card, item.preview);
    });
    console.log('✅ Collections grid rendered:', data.length);
  }

  async function load() {
    try {
      const res = await fetch(DATA_URL, { cache: 'no-cache' });
      if (!res.ok) throw new Error('Bad status ' + res.status);
      const payload = await res.json();
      const list = Array.isArray(payload?.collections) ? payload.collections : payload;
      if (!Array.isArray(list) || !list.length) throw new Error('Empty list');
      render(list.slice(0, 8));
    } catch (e) {
      console.warn('[VF] Failed to load data/videos.json → using fallback:', e);
      render(fallbackData);
    }
  }

  // Start once DOM is ready (defer ensures this usually runs after parse)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();

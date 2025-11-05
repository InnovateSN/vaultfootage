// vaultfootage-v3/scripts/gallery.js
(async () => {
  const GRID_ID = 'vf-collections-grid';
  const DATA_URL = 'data/videos.json';
  const grid = document.getElementById(GRID_ID);
  if (!grid) return;

  // Fetch dataset with graceful fallback
  let list = [];
  try {
    const res = await fetch(DATA_URL, { cache: 'no-store' });
    const payload = await res.json();
    list = Array.isArray(payload?.collections) ? payload.collections : payload;
    if (!Array.isArray(list) || !list.length) throw new Error('Empty list');
  } catch (e) {
    console.warn('[VF] videos.json unavailable, using fallback:', e);
    list = [
      { id:'supercar-01', title:'Supercar Collection', count:'15+ clips • 4K',
        thumb:'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1280',
        preview:'https://videos.pexels.com/video-files/1994429/1994429-uhd_2560_1440_25fps.mp4' },
      { id:'yacht-01', title:'Yacht Collection', count:'12+ clips • 4K',
        thumb:'https://images.pexels.com/photos/122244/pexels-photo-122244.jpeg?auto=compress&cs=tinysrgb&w=1280',
        preview:'https://videos.pexels.com/video-files/854227/854227-uhd_2560_1440_30fps.mp4' },
      { id:'interiors-01', title:'Luxury Interiors Collection', count:'18+ clips • 4K',
        thumb:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1280',
        preview:'https://videos.pexels.com/video-files/3182833/3182833-uhd_2560_1440_25fps.mp4' },
      { id:'fashion-01', title:'Fashion & Beauty Collection', count:'20+ clips • 4K',
        thumb:'https://images.pexels.com/photos/631161/pexels-photo-631161.jpeg?auto=compress&cs=tinysrgb&w=1280',
        preview:'https://videos.pexels.com/video-files/3047297/3047297-uhd_2560_1440_30fps.mp4' },
      { id:'dining-01', title:'Fine Dining Collection', count:'14+ clips • 4K',
        thumb:'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1280',
        preview:'https://videos.pexels.com/video-files/4067501/4067501-uhd_2560_1440_25fps.mp4' },
      { id:'city-01', title:'Urban Lifestyle Collection', count:'22+ clips • 4K',
        thumb:'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1280',
        preview:'https://videos.pexels.com/video-files/854381/854381-uhd_2560_1440_30fps.mp4' },
      { id:'nature-01', title:'Nature & Landscapes Collection', count:'16+ clips • 4K',
        thumb:'https://images.pexels.com/photos/531972/pexels-photo-531972.jpeg?auto=compress&cs=tinysrgb&w=1280',
        preview:'https://videos.pexels.com/video-files/2860861/2860861-uhd_2560_1440_25fps.mp4' },
      { id:'tech-01', title:'Tech & Innovation Collection', count:'19+ clips • 4K',
        thumb:'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1280',
        preview:'https://videos.pexels.com/video-files/2795767/2795767-uhd_2560_1440_25fps.mp4' }
    ];
  }

  // Render cards
  const frag = document.createDocumentFragment();
  list.slice(0, 8).forEach(item => {
    const card = document.createElement('div');
    card.className = 'vf-card vf-card-3d vf-card-glow';

    const thumbWrap = document.createElement('div');
    thumbWrap.className = 'vf-card-thumb';

    const img = document.createElement('img');
    img.className = 'vf-thumb';
    img.alt = item.title || 'Collection';
    img.src = item.thumb;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 1280; img.height = 720;
    img.sizes = '(max-width:520px) 100vw, (max-width:900px) 50vw, 33vw';
    thumbWrap.appendChild(img);

    const badge = document.createElement('span');
    badge.className = 'vf-card-category';
    badge.textContent = (item.category || item.title || 'Clip');
    thumbWrap.appendChild(badge);

    // Lazy hover video
    let videoEl = null;
    const attachVideo = () => {
      if (videoEl || !item.preview) return;
      videoEl = document.createElement('video');
      videoEl.className = 'vf-thumb-video';
      videoEl.src = item.preview;
      videoEl.muted = true; videoEl.playsInline = true; videoEl.autoplay = true; videoEl.loop = true;
      videoEl.oncanplay = () => (videoEl.style.opacity = '1');
      thumbWrap.appendChild(videoEl);
      videoEl.play().catch(() => {});
    };
    thumbWrap.addEventListener('mouseenter', attachVideo);
    thumbWrap.addEventListener('mouseleave', () => { if (videoEl) { videoEl.remove(); videoEl = null; } });

    const content = document.createElement('div');
    content.className = 'vf-card-content';

    const h3 = document.createElement('h3');
    h3.className = 'vf-card-title';
    h3.textContent = item.title;

    const meta = document.createElement('p');
    meta.className = 'vf-card-meta';
    meta.textContent = item.count || '';

    content.append(h3, meta);
    card.append(thumbWrap, content);
    frag.appendChild(card);
  });

  grid.innerHTML = '';
  grid.appendChild(frag);
  console.log('✅ Collections grid rendered:', Math.min(list.length, 8));
})();

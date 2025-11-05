(() => {
  const GRID_ID = 'vf-collections-grid';
  const DATA_URL = 'data/videos.json';

  async function loadData() {
    try {
      const res = await fetch(DATA_URL, { cache: 'no-store' });
      const json = await res.json();
      return Array.isArray(json?.collections) ? json.collections : json;
    } catch (e) {
      console.warn('[VF] videos.json not available, using fallback', e);
      return [
        { id:'supercar', title:'Supercar Collection', count:'15+ clips • 4K',
          thumb:'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/1994429/1994429-uhd_2560_1440_25fps.mp4' },
        { id:'yacht', title:'Yacht Collection', count:'12+ clips • 4K',
          thumb:'https://images.pexels.com/photos/122244/pexels-photo-122244.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/854227/854227-uhd_2560_1440_30fps.mp4' },
        { id:'interiors', title:'Luxury Interiors Collection', count:'18+ clips • 4K',
          thumb:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/3182833/3182833-uhd_2560_1440_25fps.mp4' },
        { id:'fashion', title:'Fashion & Beauty Collection', count:'20+ clips • 4K',
          thumb:'https://images.pexels.com/photos/631161/pexels-photo-631161.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/3047297/3047297-uhd_2560_1440_30fps.mp4' },
        { id:'dining', title:'Fine Dining Collection', count:'14+ clips • 4K',
          thumb:'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/4067501/4067501-uhd_2560_1440_25fps.mp4' },
        { id:'city', title:'Urban Lifestyle Collection', count:'22+ clips • 4K',
          thumb:'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/854381/854381-uhd_2560_1440_30fps.mp4' },
        { id:'nature', title:'Nature & Landscapes Collection', count:'16+ clips • 4K',
          thumb:'https://images.pexels.com/photos/531972/pexels-photo-531972.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/2860861/2860861-uhd_2560_1440_25fps.mp4' },
        { id:'tech', title:'Tech & Innovation Collection', count:'19+ clips • 4K',
          thumb:'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/2795767/2795767-uhd_2560_1440_25fps.mp4' }
      ];
    }
  }

  function makeCard(item) {
    const card = document.createElement('div');
    card.className = 'vf-card vf-card-3d vf-card-glow';

    const thumb = document.createElement('div');
    thumb.className = 'vf-card-thumb';

    const img = document.createElement('img');
    img.className = 'vf-thumb';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = item.title || 'Preview';
    img.src = item.thumb;
    thumb.appendChild(img);

    const badge = document.createElement('span');
    badge.className = 'vf-card-category';
    badge.textContent = item.category || (item.title?.split(' ')[0] ?? 'Clip');
    thumb.appendChild(badge);

    // Hover video overlay
    let videoEl = null;
    function attachVideo(){
      if (videoEl || !item.preview) return;
      videoEl = document.createElement('video');
      videoEl.className = 'vf-thumb-video';
      videoEl.src = item.preview;
      videoEl.muted = true;
      videoEl.playsInline = true;
      videoEl.autoplay = true;
      videoEl.loop = true;
      videoEl.oncanplay = () => (videoEl.style.opacity = '1');
      thumb.appendChild(videoEl);
      videoEl.play().catch(()=>{});
    }
    thumb.addEventListener('mouseenter', attachVideo);
    thumb.addEventListener('mouseleave', () => { if (videoEl) { videoEl.remove(); videoEl = null; } });

    const content = document.createElement('div');
    content.className = 'vf-card-content';

    const h3 = document.createElement('h3');
    h3.className = 'vf-card-title';
    h3.textContent = item.title || 'Collection';

    const meta = document.createElement('p');
    meta.className = 'vf-card-meta';
    meta.textContent = item.count || '4K clips';

    content.append(h3, meta);
    card.append(thumb, content);
    return card;
  }

  async function render() {
    const grid = document.getElementById(GRID_ID);
    if (!grid) return;
    const data = await loadData();
    const list = Array.isArray(data) ? data.slice(0,8) : [];
    const frag = document.createDocumentFragment();
    list.forEach(item => frag.appendChild(makeCard(item)));
    grid.innerHTML = '';
    grid.appendChild(frag);
    console.log('✅ Collections grid rendered:', list.length);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();

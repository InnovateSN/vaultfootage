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
      // Fallback con URL funzionanti - Novembre 2025
      return [
        { id:'supercar', title:'Supercar Collection', count:'15+ clips • 4K',
          thumb:'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/5308443/5308443-uhd_2560_1440_30fps.mp4' },
        { id:'yacht', title:'Yacht Collection', count:'12+ clips • 4K',
          thumb:'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/4624974/4624974-uhd_2560_1440_25fps.mp4' },
        { id:'interiors', title:'Luxury Interiors Collection', count:'18+ clips • 4K',
          thumb:'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/3209537/3209537-uhd_2560_1440_25fps.mp4' },
        { id:'fashion', title:'Fashion & Beauty Collection', count:'20+ clips • 4K',
          thumb:'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/4623495/4623495-uhd_2560_1440_30fps.mp4' },
        { id:'dining', title:'Fine Dining Collection', count:'14+ clips • 4K',
          thumb:'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/3195440/3195440-uhd_2560_1440_25fps.mp4' },
        { id:'city', title:'Urban Lifestyle Collection', count:'22+ clips • 4K',
          thumb:'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/3129784/3129784-uhd_2560_1440_30fps.mp4' },
        { id:'nature', title:'Nature & Landscapes Collection', count:'16+ clips • 4K',
          thumb:'https://images.pexels.com/photos/1662770/pexels-photo-1662770.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/2098989/2098989-uhd_2560_1440_24fps.mp4' },
        { id:'tech', title:'Tech & Innovation Collection', count:'19+ clips • 4K',
          thumb:'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1280',
          preview:'https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4' }
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

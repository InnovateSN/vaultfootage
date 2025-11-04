(async()=>{
  const grid=document.getElementById('vf-grid'); if(!grid) return;
  const res=await fetch('data/videos.json'); const data=await res.json();
  grid.innerHTML=data.map(item=>`
    <a class="vf-card" href="pricing.html" data-id="${item.id}">
      <div class="vf-card-thumb">
        <img src="${item.thumb}" alt="${item.title}" loading="lazy"/>
        <span class="vf-card-category">${item.category}</span>
        <video class="vf-card-preview" muted playsinline preload="none" src="${item.preview}"></video>
      </div>
      <div class="vf-card-content">
        <h3 class="vf-card-title">${item.title}</h3>
        <p class="vf-card-meta">${item.meta}</p>
      </div>
    </a>
  `).join('');
  grid.querySelectorAll('.vf-card').forEach(card=>{
    const video=card.querySelector('.vf-card-preview');
    card.addEventListener('mouseenter',()=>{ if(video){ video.currentTime=0; video.play().catch(()=>{});} });
    card.addEventListener('mouseleave',()=>{ if(video){ video.pause(); } });
  });
})();

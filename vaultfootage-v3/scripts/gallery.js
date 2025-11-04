(async()=>{
  const grid=document.getElementById('vf-grid'); if(!grid) return;
  const res=await fetch('data/videos.json'); const data=await res.json();
  grid.innerHTML=data.map(item=>`
    <article class="vf-card vf-card-3d vf-card-glow">
      <div class="vf-card-thumb">
        <div class="vf-thumb-wrap">
          <img class="vf-thumb" src="${item.thumb}" alt="${item.title}" loading="lazy"/>
          <video class="vf-preview" muted playsinline preload="none" data-src="${item.preview}"></video>
        </div>
        <span class="vf-card-category">${item.category}</span>
      </div>
      <div class="vf-card-content">
        <h3 class="vf-card-title">${item.title}</h3>
        <p class="vf-card-meta">${item.count}+ clips • ${item.resolution}</p>
      </div>
    </article>
  `).join('');
  grid.querySelectorAll('.vf-card').forEach(card=>{
    const video=card.querySelector('.vf-preview');
    let loaded=false;
    card.addEventListener('mouseenter',()=>{
      if(video){
        if(!loaded){
          video.src=video.getAttribute('data-src');
          loaded=true;
        }
        video.currentTime=0;
        video.play().catch(()=>{});
      }
    });
    card.addEventListener('mouseleave',()=>{
      if(video){
        video.pause();
        video.currentTime=0;
      }
    });
  });
})();

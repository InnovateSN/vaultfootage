(()=>{
  const vids=[
    "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",
    "https://videos.pexels.com/video-files/3191157/3191157-uhd_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/6985195/6985195-uhd_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/3141207/3141207-uhd_2560_1440_30fps.mp4",
    "https://videos.pexels.com/video-files/3130182/3130182-uhd_2560_1440_30fps.mp4",
    "https://videos.pexels.com/video-files/6985181/6985181-uhd_2560_1440_25fps.mp4"
  ];
  const v=document.getElementById('hero-video'); if(v){ v.src=vids[Math.floor(Math.random()*vids.length)]; }
  if(window.gsap&&window.ScrollTrigger){
    gsap.from('.vf-hero-title',{y:30,opacity:0,duration:.8,delay:.1});
    gsap.from('.vf-hero-subtitle',{y:20,opacity:0,duration:.8,delay:.2});
    gsap.from('.vf-hero-ctas',{y:10,opacity:0,duration:.8,delay:.3});
    gsap.utils.toArray('.vf-section-header, .vf-card').forEach(el=>{ gsap.from(el,{scrollTrigger:el,y:40,opacity:0,duration:.6});});
  }
})();

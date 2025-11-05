(()=>{
  // Video hero funzionanti e verificati - Novembre 2025
  const vids=[
    "https://videos.pexels.com/video-files/5308443/5308443-uhd_2560_1440_30fps.mp4", // Supercar
    "https://videos.pexels.com/video-files/4624974/4624974-uhd_2560_1440_25fps.mp4", // Yacht
    "https://videos.pexels.com/video-files/3209537/3209537-uhd_2560_1440_25fps.mp4", // Luxury Interior
    "https://videos.pexels.com/video-files/3129784/3129784-uhd_2560_1440_30fps.mp4", // City
    "https://videos.pexels.com/video-files/2098989/2098989-uhd_2560_1440_24fps.mp4", // Nature
    "https://videos.pexels.com/video-files/3195440/3195440-uhd_2560_1440_25fps.mp4"  // Fine Dining
  ];
  
  const v=document.getElementById('hero-video'); 
  if(v){ 
    // Seleziona un video random
    const selectedVideo = vids[Math.floor(Math.random()*vids.length)];
    v.src = selectedVideo;
    
    // Aggiungi error handling nel caso un video non si carichi
    v.onerror = () => {
      console.warn('[VF] Video failed to load:', selectedVideo);
      // Prova con un video di backup
      const backupIndex = (vids.indexOf(selectedVideo) + 1) % vids.length;
      v.src = vids[backupIndex];
    };
  }
  
  // Animazioni GSAP
  if(window.gsap&&window.ScrollTrigger){
    gsap.from('.vf-hero-title',{y:30,opacity:0,duration:.8,delay:.1});
    gsap.from('.vf-hero-subtitle',{y:20,opacity:0,duration:.8,delay:.2});
    gsap.from('.vf-hero-ctas',{y:10,opacity:0,duration:.8,delay:.3});
    gsap.utils.toArray('.vf-section-header, .vf-card').forEach(el=>{ gsap.from(el,{scrollTrigger:el,y:40,opacity:0,duration:.6});});
  }
})();

(()=> {
  const SLUGS={ trial10:'mpgblc', monthly:'yzbjnq', yearly:'nfqwgu', lifetime:'udlsih' };
  const store='https://innovatesol.gumroad.com/l/';
  const utm='utm_source=site&utm_medium=cta&utm_campaign=v3_launch';
  const origin=()=>window.location.origin;
  const returns={
    trial10:'/welcome/trial.html?via=gumroad',
    monthly:'/welcome/full.html?via=gumroad',
    yearly:'/welcome/full.html?via=gumroad',
    lifetime:'/welcome/lifetime.html?via=gumroad'
  };
  const hrefFor=p=>`${store}${SLUGS[p]}?${utm}&return_url=${encodeURIComponent(origin()+returns[p])}`;
  document.querySelectorAll('[data-plan]').forEach(a=>{
    const plan=a.getAttribute('data-plan'); if(!plan||!SLUGS[plan]) return;
    a.href=hrefFor(plan); a.target='_blank'; a.rel='noopener';
  });
})();

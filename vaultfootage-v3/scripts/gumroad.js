(()=> {
  const SLUGS={ trial10:'mpgblc', monthly:'yzbjnq', yearly:'nfqwgu', lifetime:'udlsih' };
  const store='https://innovatesol.gumroad.com/l/';
  const returns={
    trial10:'/welcome/trial.html?via=gumroad',
    monthly:'/welcome/full.html?via=gumroad',
    yearly:'/welcome/full.html?via=gumroad',
    lifetime:'/welcome/lifetime.html?via=gumroad'
  };
  const buildReturn=(path)=>new URL(path,window.location.origin).toString();
  const gumroadUrl=(plan,utmSource='site',utmCampaign='pricing')=>{
    const base=`${store}${SLUGS[plan]}`;
    const returnUrl=buildReturn(returns[plan]);
    const utm=`utm_source=${utmSource}&utm_medium=cta&utm_campaign=${utmCampaign}`;
    return `${base}?${utm}&return_url=${encodeURIComponent(returnUrl)}`;
  };
  document.querySelectorAll('[data-plan]').forEach(a=>{
    const plan=a.getAttribute('data-plan'); if(!plan||!SLUGS[plan]) return;
    const utmSource=a.getAttribute('data-utm-source')||'site';
    const utmCampaign=a.getAttribute('data-utm-campaign')||'pricing';
    a.href=gumroadUrl(plan,utmSource,utmCampaign);
    a.target='_blank';
    a.rel='noopener';
  });
})();

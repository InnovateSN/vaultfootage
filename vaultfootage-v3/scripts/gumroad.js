// vaultfootage-v3/scripts/gumroad.js
(() => {
  const SLUGS = {
    trial: 'mpgblc',
    monthly: 'yzbjnq',
    yearly: 'nfqwgu',
    lifetime: 'udlsih',
    trial10: 'mpgblc' // alias se usi data-plan="trial10"
  };

  const PLAN_RETURN = {
    trial: '/welcome/trial.html',
    trial10: '/welcome/trial.html',
    monthly: '/welcome/full.html',
    yearly: '/welcome/full.html',
    lifetime: '/welcome/lifetime.html'
  };

  function buildReturn(path) {
    try {
      return new URL(path, window.location.origin).toString();
    } catch {
      // fallback ultra-sicuro
      return `${window.location.origin}${path.startsWith('/') ? '' : '/'}${path}`;
    }
  }

  function withParam(u, key, val) {
    if (val == null || val === '') return u;
    u.searchParams.set(key, String(val));
    return u;
  }

  function gumroadUrl(plan, opts = {}) {
    const slug = SLUGS[plan];
    if (!slug) return null;

    const base = new URL(`https://innovatesol.gumroad.com/l/${slug}`);

    // return_url dinamico
    const returnPath = PLAN_RETURN[plan] || '/welcome/success.html';
    const returnURL = new URL(buildReturn(returnPath));
    returnURL.searchParams.set('via', 'gumroad');

    // UTM (defaults + override)
    const utm = {
      utm_source: opts.utm_source || 'site',
      utm_medium: opts.utm_medium || 'cta',
      utm_campaign: opts.utm_campaign || 'pricing',
      utm_content: opts.utm_content || undefined
    };

    // applica parametri alla checkout URL
    withParam(base, 'return_url', returnURL.toString());
    Object.entries(utm).forEach(([k, v]) => withParam(base, k, v));

    // opzionale: passa anche "plan" per analytics lato Gumroad
    withParam(base, 'plan', plan);

    return base.toString();
  }

  function normalizeButtons() {
    const ctas = document.querySelectorAll('a[data-plan]');
    ctas.forEach(a => {
      const planRaw = a.getAttribute('data-plan')?.trim().toLowerCase();
      const plan = (planRaw === 'trial10') ? 'trial10' : planRaw;

      if (!plan || !SLUGS[plan]) return;

      // utm dai data-attr (se presenti)
      const opts = {
        utm_source: a.dataset.utmSource,
        utm_medium: a.dataset.utmMedium,
        utm_campaign: a.dataset.utmCampaign,
        utm_content: a.dataset.utmContent
      };

      const url = gumroadUrl(plan, opts);
      if (!url) return;

      a.setAttribute('href', url);
      // garantisci comportamento sicuro
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');

      // classi VF standardizzate (se vuoi)
      a.classList.add('vf-btn', 'vf-btn-primary');
    });
  }

  // esponi per test manuale in console se serve
  window.__vfGumroad = { gumroadUrl, normalizeButtons };

  // init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', normalizeButtons);
  } else {
    normalizeButtons();
  }
})();

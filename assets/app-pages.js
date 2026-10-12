(() => {
  const id = document.body.dataset.app || document.body.dataset.policyApp;
  const entry = appPages.apps[id];
  if (!entry) throw new Error(`Missing extended app content: ${id}`);
  function render(lang) {
    const text = entry.copy[lang];
    const labels = appPages.labels[lang];
    if (!text || !labels) throw new Error(`Missing extended translation: ${id}/${lang}`);
    document.querySelectorAll('[data-detail-label]').forEach(e => { e.textContent = labels[e.dataset.detailLabel]; });
    document.querySelectorAll('[data-detail]').forEach(e => { e.textContent = text[e.dataset.detail]; });
    document.querySelectorAll('[data-policy-shared]').forEach(e => { e.textContent = labels[e.dataset.policyShared]; });
    const app = apps.find(a => a.id === id);
    const notice = entry.planned ? labels.plannedNotice : labels[id === 'unit-converter' ? 'internal' : 'soon'];
    document.querySelectorAll('[data-detail-notice]').forEach(e => { e.textContent = notice; });
    document.querySelectorAll('[data-detail-offline]').forEach(e => { e.textContent = text.offline || labels.offline; });
    document.querySelectorAll('[data-detail-android]').forEach(e => { e.textContent = labels.android; });
    document.querySelectorAll('[data-detail-money]').forEach(e => { e.textContent = entry.planned || id === 'ott-e' ? labels[entry.monetization] : text.money; });
    document.querySelectorAll('[data-detail-version]').forEach(e => { e.textContent = entry.planned ? labels.version : text.version; });
    if (!entry.planned && app.status !== 'released') document.querySelectorAll('[data-app-availability]').forEach(e => { e.textContent = notice; });
    if (document.body.dataset.policyApp) document.title = `${app.name} — ${labels.privacyTitle} — JN86`;
  }
  document.addEventListener('jn86-language', e => render(e.detail));
  render(document.documentElement.lang);
})();

/* App descriptions only. Privacy pages keep their own content and renderer. */
(() => {
  const id = document.body.dataset.app;
  const entry = appDetails.apps[id];
  if (!entry) throw new Error(`Missing app description: ${id}`);
  const app = apps.find(a => a.id === id);
  function render(lang) {
    const labels = appDetails.labels[lang];
    if (!labels) throw new Error(`Missing description language: ${lang}`);
    document.querySelector('[data-content-heading]').textContent = labels.heading;
    document.querySelector('[data-content-notice]').textContent = labels[app.productStage === 'planned' ? 'planned' : 'testing'];
    for (const section of entry.sections) {
      const node = document.querySelector(`[data-content-section="${section.id}"]`);
      node.querySelector('[data-content-section-title]').textContent = section.title[lang];
      if (section.intro) node.querySelector('[data-content-intro]').textContent = section.intro[lang];
      for (const item of section.items) {
        const article = node.querySelector(`[data-content-item="${item.id}"]`);
        article.querySelector('[data-content-item-title]').textContent = item.title[lang];
        article.querySelector('[data-content-item-text]').textContent = item.text[lang];
        if (item.units) article.querySelector('[data-content-units-label]').textContent = labels.units;
      }
    }
    if (app.productStage !== 'planned' && app.status !== 'released') {
      document.querySelector('[data-app-availability]').textContent = appPages.labels[lang][id === 'unit-converter' ? 'internal' : 'soon'];
    }
  }
  document.addEventListener('jn86-language', event => render(event.detail));
  render(document.documentElement.lang);
})();

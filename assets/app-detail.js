(() => {
  const app = apps.find(a => a.id === document.body.dataset.app);
  if (!app) throw new Error('Unknown app detail page');
  function render(lang) {
    const copy = app.copy[lang];
    document.querySelector('[data-app-summary]').textContent = copy.summary;
    document.querySelector('[data-app-overview]').textContent = copy.overview;
    document.querySelector('[data-app-status]').textContent = tr(lang, 'status_' + app.status);
    document.querySelector('[data-app-availability]').textContent = tr(lang, app.status === 'soon' ? 'availability_soon' : 'availability_text');
    const list = document.querySelector('[data-app-features]');
    list.replaceChildren(...copy.features.map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    const title = `${app.name} — ${tr(lang, 'detail_title')} — JN86`;
    document.title = title;
    document.querySelector('meta[name="description"]').content = copy.summary;
    document.querySelector('meta[property="og:description"]').content = copy.summary;
    document.querySelector('meta[property="og:title"]').content = title;
  }
  document.addEventListener('jn86-language', e => render(e.detail));
  render(document.documentElement.lang);
})();

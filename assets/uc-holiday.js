/* The Unit Converter notice shares the same schedule and copy on both pages. */
(() => {
  const notice = document.getElementById('uc-holiday');
  if (!notice) return;
  const app = apps.find(item => item.id === 'unit-converter');
  const playUrl = app && getPlayUrl(app);
  if (!playUrl) return;
  const starts = Date.parse('2026-11-15T00:00:00Z');
  const expires = Date.parse('2027-01-05T00:00:00Z');
  const copy = {
    en: ['Holiday offer', 'Look for a limited-time discount on one-time ad removal in Unit Converter, from {start} at 00:00 UTC until {end} at 00:00 UTC. Google Play shows the exact local price, availability and purchase terms.'],
    hu: ['Ünnepi ajánlat', 'A Unit Converter egyszeri reklámmentesítéséhez korlátozott idejű kedvezményes ajánlat tartozik: {start} 00:00 UTC-től {end} 00:00 UTC-ig. A pontos helyi árat, az elérhetőséget és a vásárlási feltételeket a Google Play mutatja.'],
    de: ['Festtagsangebot', 'Entdecke das zeitlich begrenzte Angebot zur einmaligen Werbeentfernung in Unit Converter: vom {start} um 00:00 UTC bis zum {end} um 00:00 UTC. Den genauen lokalen Preis, die Verfügbarkeit und Kaufbedingungen zeigt Google Play.'],
    es: ['Oferta festiva', 'Consulta el descuento temporal para eliminar los anuncios de Unit Converter con un pago único, del {start} a las 00:00 UTC al {end} a las 00:00 UTC. Google Play muestra el precio local exacto, la disponibilidad y las condiciones de compra.'],
    fr: ['Offre des fêtes', 'Découvrez l’offre temporaire sur la suppression des publicités de Unit Converter par achat unique, du {start} à 00:00 UTC au {end} à 00:00 UTC. Google Play indique le prix local exact, la disponibilité et les conditions d’achat.'],
    'pt-BR': ['Oferta de fim de ano', 'Confira o desconto por tempo limitado na remoção de anúncios do Unit Converter por compra única, de {start} às 00:00 UTC até {end} às 00:00 UTC. O Google Play mostra o preço local exato, a disponibilidade e as condições de compra.'],
    pl: ['Oferta świąteczna', 'Sprawdź czasową zniżkę na jednorazowe usunięcie reklam w Unit Converter, od {start} o 00:00 UTC do {end} o 00:00 UTC. Google Play podaje dokładną cenę lokalną, dostępność i warunki zakupu.'],
    it: ['Offerta delle feste', 'Scopri lo sconto a tempo limitato sulla rimozione degli annunci di Unit Converter con acquisto unico, dal {start} alle 00:00 UTC al {end} alle 00:00 UTC. Google Play mostra il prezzo locale esatto, la disponibilità e le condizioni d’acquisto.']
  };
  const home = notice.dataset.ucHoliday === 'home';
  notice.innerHTML = `
    <span class="uc-holiday-icon" aria-hidden="true"><span class="uc-holiday-bow"></span></span>
    <h2 id="uc-holiday-title"></h2>
    <p></p>
    <a class="text-link"></a>`;
  const title = notice.querySelector('h2');
  const description = notice.querySelector('p');
  const link = notice.querySelector('a');
  link.href = home ? 'apps/unit-converter.html#uc-holiday' : playUrl;
  let renderedLanguage;
  let timer;
  function refresh() {
    clearTimeout(timer);
    const remaining = expires - Date.now();
    if (remaining <= 0) {
      notice.hidden = true;
      return;
    }
    const lang = document.documentElement.lang;
    if (renderedLanguage !== lang) {
      const [heading, body] = copy[lang];
      const format = new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : lang, {
        dateStyle: 'long', timeZone: 'UTC'
      });
      title.textContent = heading;
      description.textContent = body.replace('{start}', format.format(starts)).replace('{end}', format.format(expires));
      const cta = tr(lang, home ? 'details' : 'play_cta');
      link.textContent = `${cta} →`;
      link.setAttribute('aria-label', `${cta}: ${app.name}`);
      renderedLanguage = lang;
    }
    notice.hidden = false;
    // Bound long waits (and wall-clock changes), then fire at the exact deadline.
    timer = setTimeout(refresh, Math.min(remaining, 60000));
  }
  document.addEventListener('jn86-language', refresh);
  document.addEventListener('visibilitychange', refresh);
  window.addEventListener('focus', refresh);
  window.addEventListener('pageshow', refresh);
  window.addEventListener('pagehide', () => {
    clearTimeout(timer);
    notice.hidden = true; // A cached page is rechecked on pageshow before reuse.
  });
  refresh();
})();

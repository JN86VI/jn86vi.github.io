/* One UC notice: visible on publication, hidden from this UTC instant onward. */
(() => {
  const notice = document.getElementById('uc-holiday');
  if (!notice) return;
  const expires = Date.parse('2027-01-05T00:00:00Z');
  const copy = {
    en: ['Holiday offer', 'Look for a limited-time discount on one-time ad removal in Unit Converter, from 15 November 2026 at 00:00 UTC until 5 January 2027 at 00:00 UTC. Google Play shows the exact local price, availability and purchase terms.'],
    hu: ['Ünnepi ajánlat', 'A Unit Converter egyszeri reklámmentesítéséhez korlátozott idejű kedvezményes ajánlat tartozik: 2026. november 15. 00:00 UTC-től 2027. január 5. 00:00 UTC-ig. A pontos helyi árat, az elérhetőséget és a vásárlási feltételeket a Google Play mutatja.'],
    de: ['Festtagsangebot', 'Entdecke das zeitlich begrenzte Angebot zur einmaligen Werbeentfernung in Unit Converter: vom 15. November 2026 um 00:00 UTC bis zum 5. Januar 2027 um 00:00 UTC. Den genauen lokalen Preis, die Verfügbarkeit und Kaufbedingungen zeigt Google Play.'],
    es: ['Oferta festiva', 'Consulta el descuento temporal para eliminar los anuncios de Unit Converter con un pago único, del 15 de noviembre de 2026 a las 00:00 UTC al 5 de enero de 2027 a las 00:00 UTC. Google Play muestra el precio local exacto, la disponibilidad y las condiciones de compra.'],
    fr: ['Offre des fêtes', 'Découvrez l’offre temporaire sur la suppression des publicités de Unit Converter par achat unique, du 15 novembre 2026 à 00:00 UTC au 5 janvier 2027 à 00:00 UTC. Google Play indique le prix local exact, la disponibilité et les conditions d’achat.'],
    'pt-BR': ['Oferta de fim de ano', 'Confira o desconto por tempo limitado na remoção de anúncios do Unit Converter por compra única, de 15 de novembro de 2026 às 00:00 UTC até 5 de janeiro de 2027 às 00:00 UTC. O Google Play mostra o preço local exato, a disponibilidade e as condições de compra.'],
    pl: ['Oferta świąteczna', 'Sprawdź czasową zniżkę na jednorazowe usunięcie reklam w Unit Converter, od 15 listopada 2026 o 00:00 UTC do 5 stycznia 2027 o 00:00 UTC. Google Play podaje dokładną cenę lokalną, dostępność i warunki zakupu.'],
    it: ['Offerta delle feste', 'Scopri lo sconto a tempo limitato sulla rimozione degli annunci di Unit Converter con acquisto unico, dal 15 novembre 2026 alle 00:00 UTC al 5 gennaio 2027 alle 00:00 UTC. Google Play mostra il prezzo locale esatto, la disponibilità e le condizioni d’acquisto.']
  };
  let timer;
  function refresh() {
    clearTimeout(timer);
    const remaining = expires - Date.now();
    // Hidden in the HTML, so disabled/failed JavaScript cannot show a stale offer.
    notice.hidden = !(remaining > 0);
    if (notice.hidden) return;
    const lang = document.documentElement.lang;
    const words = copy[lang];
    if (!words) throw new Error(`Missing UC holiday translation: ${lang}`);
    notice.querySelector('h2').textContent = words[0];
    notice.querySelector('p').textContent = words[1];
    notice.querySelector('a').textContent = tr(lang, 'play_cta');
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

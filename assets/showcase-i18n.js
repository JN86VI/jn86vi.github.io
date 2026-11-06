const showcaseText={
 en:{status:"In Development",unit_desc:"Fast everyday and technical conversions",otte_desc:"A touch game for curious paws",portfolio:"JN86 Android portfolio",email:"Email",help:"Help & FAQ",coming_soon:"Coming soon",developer:"Developer / publisher: JN86VI"},
 hu:{status:"Fejlesztés alatt",unit_desc:"Gyors hétköznapi és műszaki átváltások",otte_desc:"Érintős játék kíváncsi mancsoknak",portfolio:"JN86 Android portfólió",email:"E-mail",help:"Súgó és GYIK",coming_soon:"Hamarosan",developer:"Fejlesztő / kiadó: JN86VI"},
 de:{status:"In Entwicklung",unit_desc:"Schnelle Alltags- und technische Umrechnungen",otte_desc:"Ein Touch-Spiel für neugierige Pfoten",portfolio:"JN86 Android-Portfolio",email:"E-Mail",help:"Hilfe & FAQ",coming_soon:"Demnächst",developer:"Entwickler / Herausgeber: JN86VI"},
 es:{status:"En desarrollo",unit_desc:"Conversiones rápidas cotidianas y técnicas",otte_desc:"Un juego táctil para patas curiosas",portfolio:"Portafolio Android de JN86",email:"Correo electrónico",help:"Ayuda y FAQ",coming_soon:"Próximamente",developer:"Desarrollador / editor: JN86VI"},
 fr:{status:"En développement",unit_desc:"Conversions rapides du quotidien et techniques",otte_desc:"Un jeu tactile pour les pattes curieuses",portfolio:"Portfolio Android JN86",email:"E-mail",help:"Aide & FAQ",coming_soon:"Bientôt",developer:"Développeur / éditeur : JN86VI"},
 "pt-BR":{status:"Em desenvolvimento",unit_desc:"Conversões rápidas do dia a dia e técnicas",otte_desc:"Um jogo de toque para patas curiosas",portfolio:"Portfólio Android JN86",email:"E-mail",help:"Ajuda e FAQ",coming_soon:"Em breve",developer:"Desenvolvedor / publicador: JN86VI"},
 pl:{status:"W trakcie tworzenia",unit_desc:"Szybkie codzienne i techniczne przeliczenia",otte_desc:"Gra dotykowa dla ciekawskich łap",portfolio:"Portfolio Android JN86",email:"E-mail",help:"Pomoc i FAQ",coming_soon:"Wkrótce",developer:"Deweloper / wydawca: JN86VI"},
 it:{status:"In sviluppo",unit_desc:"Conversioni rapide quotidiane e tecniche",otte_desc:"Un gioco touch per zampette curiose",portfolio:"Portfolio Android JN86",email:"E-mail",help:"Aiuto e FAQ",coming_soon:"Prossimamente",developer:"Sviluppatore / editore: JN86VI"}
};
function applyShowcaseLanguage(lang){const dict=showcaseText[lang]||showcaseText.en;document.querySelectorAll('[data-showcase]').forEach(el=>{const key=el.dataset.showcase;if(dict[key])el.textContent=dict[key];});}
const showcaseSelect=document.getElementById('languageSelect');
if(showcaseSelect){applyShowcaseLanguage(showcaseSelect.value||localStorage.getItem('jn86-language')||'en');showcaseSelect.addEventListener('change',e=>applyShowcaseLanguage(e.target.value));}

function renderShowcase(lang) {
  const showcase = document.getElementById('homeShowcase');
  if (!showcase) return;
  showcase.replaceChildren();
  const comingSoon = apps.filter(a => a.status === 'soon');
  showcase.hidden = comingSoon.length === 0;
  for (const app of comingSoon) {
    const link = document.createElement('a');
    link.className = 'showcase-card';
    link.dataset.app = app.id;
    link.href = `apps/${app.id}.html`;
    const icon = app.icon ? `<img src="${app.icon}" alt="">` : '';
    link.innerHTML = `${icon}<div><span class="showcase-label">${tr(lang, 'status_soon')}</span>
      <strong>${app.name}</strong><small>${app.copy[lang].summary}</small></div>`;
    showcase.appendChild(link);
  }
  showcase.setAttribute('aria-label', tr(lang, 'status_soon'));
  const counts = {all: apps.length, soon: apps.filter(a => a.status === 'soon').length,
    creating: apps.filter(a => a.status === 'creating').length, released: apps.filter(a => a.status === 'released').length};
  document.querySelectorAll('[data-app-count]').forEach(el => el.textContent = counts[el.dataset.appCount]);
}
document.addEventListener('jn86-language', e => renderShowcase(e.detail));
renderShowcase(document.documentElement.lang);

// Contact uses the same release records and verified Play URLs as the catalog.
function renderContactPlay(lang) {
  const container = document.getElementById('contactPlayApps');
  if (!container) return;
  const released = apps.filter(app => app.status === 'released');
  container.replaceChildren();
  if (!released.length) {
    const empty = document.createElement('p');
    empty.textContent = tr(lang, 'released_empty');
    container.appendChild(empty);
  }
  for (const app of released) {
    const entry = document.createElement('article');
    entry.dataset.app = app.id;
    const title = document.createElement('h3');
    title.textContent = app.name;
    const badge = document.createElement('span');
    badge.className = 'badge released';
    badge.textContent = tr(lang, 'status_released');
    entry.append(title, badge);
    const playUrl = getPlayUrl(app);
    if (playUrl) {
      const paragraph = document.createElement('p');
      const link = document.createElement('a');
      link.className = 'btn secondary play-link';
      link.href = playUrl;
      link.textContent = tr(lang, 'play_cta');
      link.setAttribute('aria-label', `${tr(lang, 'play_cta')}: ${app.name}`);
      paragraph.appendChild(link);
      entry.appendChild(paragraph);
    }
    container.appendChild(entry);
  }
}
document.addEventListener('jn86-language', event => renderContactPlay(event.detail));
renderContactPlay(document.documentElement.lang);

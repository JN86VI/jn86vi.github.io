const L=['en','hu','de','es','fr','pt-BR','pl','it'];
const apps=[];
const ui={en:{nav_apps:'Apps',nav_support:'Support',nav_privacy:'Privacy',nav_contact:'Contact',hero_eyebrow:'Independent Android apps',hero_lead:'Focused Android apps built to solve real everyday problems without unnecessary complexity.',browse_apps:'Browse apps',support_jn86:'Support JN86',approved_apps:'portfolio apps',in_development:'in development',planned:'planned',portfolio:'Portfolio',apps_title:'Apps',apps_intro:'Two apps are in development; 23 are planned. No public release dates have been announced.',status_dev:'In Development',status_plan:'Planned',details:'Details'},hu:{nav_apps:'Appok',nav_support:'Támogatás',nav_privacy:'Adatvédelem',nav_contact:'Kapcsolat',hero_eyebrow:'Független Android alkalmazások',hero_lead:'Célzott Android appok valódi hétköznapi problémák megoldására, felesleges bonyolultság nélkül.',browse_apps:'Appok megtekintése',support_jn86:'JN86 támogatása',approved_apps:'portfólióapp',in_development:'fejlesztés alatt',planned:'tervezett',portfolio:'Portfólió',apps_title:'Appok',apps_intro:'Két alkalmazás fejlesztés alatt áll; 23 tervezett. Nyilvános megjelenési dátum még nincs.',status_dev:'Fejlesztés alatt',status_plan:'Tervezett',details:'Részletek'},de:{nav_apps:'Apps',nav_support:'Unterstützen',nav_privacy:'Datenschutz',nav_contact:'Kontakt',hero_eyebrow:'Unabhängige Android-Apps',hero_lead:'Fokussierte Android-Apps für echte Alltagsprobleme – ohne unnötige Komplexität.',browse_apps:'Apps ansehen',support_jn86:'JN86 unterstützen',approved_apps:'Portfolio-Apps',in_development:'in Entwicklung',planned:'geplant',portfolio:'Portfolio',apps_title:'Apps',apps_intro:'Zwei Apps sind in Entwicklung, 23 sind geplant. Öffentliche Veröffentlichungstermine gibt es noch nicht.',status_dev:'In Entwicklung',status_plan:'Geplant',details:'Details'},es:{nav_apps:'Apps',nav_support:'Apoyar',nav_privacy:'Privacidad',nav_contact:'Contacto',hero_eyebrow:'Apps Android independientes',hero_lead:'Aplicaciones Android enfocadas en resolver problemas cotidianos reales sin complejidad innecesaria.',browse_apps:'Ver apps',support_jn86:'Apoyar JN86',approved_apps:'apps del portafolio',in_development:'en desarrollo',planned:'planificadas',portfolio:'Portafolio',apps_title:'Apps',apps_intro:'Dos apps están en desarrollo y 23 están planificadas. Aún no hay fechas públicas de lanzamiento.',status_dev:'En desarrollo',status_plan:'Planificada',details:'Detalles'},fr:{nav_apps:'Apps',nav_support:'Soutenir',nav_privacy:'Confidentialité',nav_contact:'Contact',hero_eyebrow:'Applications Android indépendantes',hero_lead:'Des applications Android ciblées pour résoudre de vrais problèmes du quotidien, sans complexité inutile.',browse_apps:'Voir les apps',support_jn86:'Soutenir JN86',approved_apps:'apps du portfolio',in_development:'en développement',planned:'prévues',portfolio:'Portfolio',apps_title:'Apps',apps_intro:'Deux applications sont en développement et 23 sont prévues. Aucune date de sortie publique n’est annoncée.',status_dev:'En développement',status_plan:'Prévue',details:'Détails'},'pt-BR':{nav_apps:'Apps',nav_support:'Apoiar',nav_privacy:'Privacidade',nav_contact:'Contato',hero_eyebrow:'Apps Android independentes',hero_lead:'Aplicativos Android focados em resolver problemas reais do dia a dia sem complexidade desnecessária.',browse_apps:'Ver apps',support_jn86:'Apoiar JN86',approved_apps:'apps do portfólio',in_development:'em desenvolvimento',planned:'planejados',portfolio:'Portfólio',apps_title:'Apps',apps_intro:'Dois apps estão em desenvolvimento e 23 estão planejados. Ainda não há datas públicas de lançamento.',status_dev:'Em desenvolvimento',status_plan:'Planejado',details:'Detalhes'},pl:{nav_apps:'Aplikacje',nav_support:'Wsparcie',nav_privacy:'Prywatność',nav_contact:'Kontakt',hero_eyebrow:'Niezależne aplikacje Android',hero_lead:'Skupione aplikacje Android rozwiązujące realne codzienne problemy bez zbędnej złożoności.',browse_apps:'Zobacz aplikacje',support_jn86:'Wesprzyj JN86',approved_apps:'aplikacje w portfolio',in_development:'w trakcie tworzenia',planned:'planowane',portfolio:'Portfolio',apps_title:'Aplikacje',apps_intro:'Dwie aplikacje są w trakcie tworzenia, a 23 są planowane. Nie ogłoszono publicznych dat wydania.',status_dev:'W trakcie tworzenia',status_plan:'Planowana',details:'Szczegóły'},it:{nav_apps:'App',nav_support:'Supporta',nav_privacy:'Privacy',nav_contact:'Contatti',hero_eyebrow:'App Android indipendenti',hero_lead:'App Android mirate a risolvere problemi reali di ogni giorno senza complessità inutile.',browse_apps:'Scopri le app',support_jn86:'Supporta JN86',approved_apps:'app del portfolio',in_development:'in sviluppo',planned:'pianificate',portfolio:'Portfolio',apps_title:'App',apps_intro:'Due app sono in sviluppo e 23 sono pianificate. Non sono state annunciate date pubbliche di rilascio.',status_dev:'In sviluppo',status_plan:'Pianificata',details:'Dettagli'}};
const extra={en:['Support','Support JN86','JN86 apps are built independently. Optional support methods will be published here. Support does not unlock app features or provide in-app benefits.','Support methods','PayPal and Bitcoin details will be added after the accounts and addresses are finalized.','Being prepared','Privacy','Privacy first','The JN86 portfolio prefers offline and local-first operation where practical, with unnecessary accounts, servers and permissions avoided.','App privacy policies','Each released app will have a dedicated privacy policy and data-handling description before publication.','Contact','Contact JN86','Questions, feedback or bug reports about a JN86 app are welcome.'],hu:['Támogatás','Támogasd a JN86-ot','A JN86 alkalmazások függetlenül készülnek. Az opcionális támogatási módok itt jelennek meg. A támogatás nem old fel funkciókat és nem ad alkalmazáson belüli előnyt.','Támogatási módok','A PayPal- és Bitcoin-adatok a fiókok és címek véglegesítése után kerülnek ide.','Előkészítés alatt','Adatvédelem','Adatvédelem az első','A JN86 portfólió ahol ésszerű, az offline és helyi működést részesíti előnyben, és kerüli a szükségtelen fiókokat, szervereket és engedélyeket.','Appok adatvédelmi tájékoztatói','Minden megjelenő app saját adatvédelmi tájékoztatót és adatkezelési leírást kap a publikálás előtt.','Kapcsolat','Kapcsolat a JN86-tal','Kérdéseket, észrevételeket és hibajelzéseket szívesen fogadunk a JN86 alkalmazásokkal kapcsolatban.']};
const keys=['support_eyebrow','support_title','support_text','support_methods','support_pending','being_prepared','privacy_eyebrow','privacy_title','privacy_text','privacy_policies','privacy_pending','contact_eyebrow','contact_title','contact_text'];Object.entries(extra).forEach(([l,a])=>a.forEach((v,i)=>ui[l][keys[i]]=v));

const publicLabels = {
  "en": {
    "status_soon": "Coming soon",
    "status_creating": "In the works",
    "purpose_title": "What it’s for",
    "features_title": "Main features",
    "availability_title": "Availability",
    "apps_intro": "These apps are being created. Explore their planned features below.",
    "availability_text": "This app is being created. The features described here are planned; it is not yet available to download.",
    "back_apps": "← Back to apps",
    "language": "Language",
    "home_label": "JN86 home",
    "nav_label": "Main navigation",
    "mobile_nav_label": "Mobile navigation",
    "open_menu": "Open menu",
    "close_menu": "Close menu",
    "developer": "Developer: JN86VI",
    "detail_title": "App details"
  },
  "hu": {
    "status_soon": "Hamarosan",
    "status_creating": "Készül",
    "purpose_title": "Mire való?",
    "features_title": "Főbb funkciók",
    "availability_title": "Elérhetőség",
    "apps_intro": "Az alkalmazások készülnek. Ismerd meg alább a tervezett funkcióikat.",
    "availability_text": "Az alkalmazás készül. Az itt bemutatott funkciók a tervek részei; az app még nem tölthető le.",
    "back_apps": "← Vissza az appokhoz",
    "language": "Nyelv",
    "home_label": "JN86 főoldal",
    "nav_label": "Fő navigáció",
    "mobile_nav_label": "Mobil navigáció",
    "open_menu": "Menü megnyitása",
    "close_menu": "Menü bezárása",
    "developer": "Fejlesztő: JN86VI",
    "detail_title": "Appbemutató"
  },
  "de": {
    "status_soon": "Demnächst",
    "status_creating": "In Arbeit",
    "purpose_title": "Wofür die App gedacht ist",
    "features_title": "Wichtigste Funktionen",
    "availability_title": "Verfügbarkeit",
    "apps_intro": "Diese Apps entstehen gerade. Entdecke unten ihre geplanten Funktionen.",
    "availability_text": "Diese App entsteht gerade. Die beschriebenen Funktionen sind geplant; sie steht noch nicht zum Download bereit.",
    "back_apps": "← Zurück zu den Apps",
    "language": "Sprache",
    "home_label": "JN86 Startseite",
    "nav_label": "Hauptnavigation",
    "mobile_nav_label": "Mobile Navigation",
    "open_menu": "Menü öffnen",
    "close_menu": "Menü schließen",
    "developer": "Entwickler: JN86VI",
    "detail_title": "App-Details"
  },
  "es": {
    "status_soon": "Próximamente",
    "status_creating": "En desarrollo",
    "purpose_title": "Para qué sirve",
    "features_title": "Funciones principales",
    "availability_title": "Disponibilidad",
    "apps_intro": "Estamos creando estas apps. Descubre sus funciones previstas a continuación.",
    "availability_text": "Esta app está en desarrollo. Las funciones descritas están previstas; aún no se puede descargar.",
    "back_apps": "← Volver a las apps",
    "language": "Idioma",
    "home_label": "Inicio de JN86",
    "nav_label": "Navegación principal",
    "mobile_nav_label": "Navegación móvil",
    "open_menu": "Abrir menú",
    "close_menu": "Cerrar menú",
    "developer": "Desarrollador: JN86VI",
    "detail_title": "Detalles de la app"
  },
  "fr": {
    "status_soon": "Bientôt",
    "status_creating": "En préparation",
    "purpose_title": "À quoi sert l’application",
    "features_title": "Fonctions principales",
    "availability_title": "Disponibilité",
    "apps_intro": "Ces applications sont en préparation. Découvrez leurs fonctions prévues ci-dessous.",
    "availability_text": "Cette application est en préparation. Les fonctions présentées sont prévues ; elle n’est pas encore disponible au téléchargement.",
    "back_apps": "← Retour aux applications",
    "language": "Langue",
    "home_label": "Accueil JN86",
    "nav_label": "Navigation principale",
    "mobile_nav_label": "Navigation mobile",
    "open_menu": "Ouvrir le menu",
    "close_menu": "Fermer le menu",
    "developer": "Développeur : JN86VI",
    "detail_title": "Présentation de l’application"
  },
  "pt-BR": {
    "status_soon": "Em breve",
    "status_creating": "Em desenvolvimento",
    "purpose_title": "Para que serve",
    "features_title": "Principais recursos",
    "availability_title": "Disponibilidade",
    "apps_intro": "Estes apps estão sendo criados. Conheça os recursos planejados abaixo.",
    "availability_text": "Este app está em desenvolvimento. Os recursos apresentados estão planejados; ele ainda não está disponível para baixar.",
    "back_apps": "← Voltar aos apps",
    "language": "Idioma",
    "home_label": "Início da JN86",
    "nav_label": "Navegação principal",
    "mobile_nav_label": "Navegação móvel",
    "open_menu": "Abrir menu",
    "close_menu": "Fechar menu",
    "developer": "Desenvolvedor: JN86VI",
    "detail_title": "Detalhes do app"
  },
  "pl": {
    "status_soon": "Wkrótce",
    "status_creating": "W przygotowaniu",
    "purpose_title": "Do czego służy",
    "features_title": "Główne funkcje",
    "availability_title": "Dostępność",
    "apps_intro": "Te aplikacje są w przygotowaniu. Poznaj poniżej ich planowane funkcje.",
    "availability_text": "Ta aplikacja jest w przygotowaniu. Opisane funkcje są planowane; nie można jej jeszcze pobrać.",
    "back_apps": "← Wróć do aplikacji",
    "language": "Język",
    "home_label": "Strona główna JN86",
    "nav_label": "Nawigacja główna",
    "mobile_nav_label": "Nawigacja mobilna",
    "open_menu": "Otwórz menu",
    "close_menu": "Zamknij menu",
    "developer": "Twórca: JN86VI",
    "detail_title": "Opis aplikacji"
  },
  "it": {
    "status_soon": "In arrivo",
    "status_creating": "In preparazione",
    "purpose_title": "A cosa serve",
    "features_title": "Funzioni principali",
    "availability_title": "Disponibilità",
    "apps_intro": "Queste app sono in preparazione. Scopri qui sotto le funzioni previste.",
    "availability_text": "Questa app è in preparazione. Le funzioni descritte sono previste; non è ancora disponibile per il download.",
    "back_apps": "← Torna alle app",
    "language": "Lingua",
    "home_label": "Home JN86",
    "nav_label": "Navigazione principale",
    "mobile_nav_label": "Navigazione mobile",
    "open_menu": "Apri menu",
    "close_menu": "Chiudi menu",
    "developer": "Sviluppatore: JN86VI",
    "detail_title": "Dettagli dell’app"
  }
};

const appHelp = {en:'App help', hu:'Alkalmazássúgó', de:'App-Hilfe', es:'Ayuda de la app', fr:'Aide de l’application', 'pt-BR':'Ajuda do app', pl:'Pomoc aplikacji', it:'Aiuto dell’app'};
const soonAvailability = {"en": "Coming soon. This app is not yet available to download.", "hu": "Hamarosan megjelenik. Az alkalmazás még nem tölthető le.", "de": "Demnächst verfügbar. Diese App steht noch nicht zum Download bereit.", "es": "Próximamente. Esta app aún no se puede descargar.", "fr": "Bientôt disponible. Cette application ne peut pas encore être téléchargée.", "pt-BR": "Em breve. Este app ainda não está disponível para baixar.", "pl": "Wkrótce. Nie można jeszcze pobrać tej aplikacji.", "it": "In arrivo. Questa app non è ancora disponibile per il download."};
for (const lang of L) Object.assign(ui[lang], publicLabels[lang], {app_help:appHelp[lang], availability_soon:soonAvailability[lang]});
function tr(lang, key) { return ui[lang]?.[key] ?? ui.en[key] ?? key; }

function renderApps(lang) {
  const grid = document.getElementById('appGrid');
  if (!grid) return;
  grid.replaceChildren();
  for (const app of apps) {
    const card = document.createElement('article');
    card.className = 'app-card' + (app.status === 'soon' ? ' featured' : '');
    card.dataset.app = app.id;
    const icon = app.icon ? `<img class="app-icon" src="${app.icon}" alt="">` : '';
    card.innerHTML = `${icon}<span class="badge ${app.status}">${tr(lang, 'status_' + app.status)}</span>
      <h2>${app.name}</h2><p>${app.copy[lang].summary}</p>
      <a class="more" href="apps/${app.id}.html" aria-label="${tr(lang, 'details')}: ${app.name}">${tr(lang, 'details')} →</a>`;
    grid.appendChild(card);
  }
}

function setLanguage(lang) {
  if (!L.includes(lang)) lang = 'en';
  document.documentElement.lang = lang;
  localStorage.setItem('jn86-lang', lang);
  localStorage.setItem('jn86-language', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = tr(lang, el.dataset.i18n));
  document.querySelectorAll('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', tr(lang, el.dataset.i18nAria)));
  renderApps(lang);
  document.dispatchEvent(new CustomEvent('jn86-language', {detail: lang}));
}

const languageSelect = document.getElementById('languageSelect');
const saved = localStorage.getItem('jn86-lang') || localStorage.getItem('jn86-language');
const preferred = navigator.language || 'en';
const initial = L.includes(saved) ? saved : L.includes(preferred) ? preferred : L.find(l => preferred.startsWith(l.split('-')[0])) || 'en';
languageSelect.value = initial;
languageSelect.addEventListener('change', e => setLanguage(e.target.value));
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
setLanguage(initial);

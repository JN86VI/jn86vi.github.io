(()=>{
const copy={
'en':{
status:'Planned',
unit:'Fast, comprehensive unit conversion and related technical calculators for everyday and specialist use, with 11 V1.0 categories and offline core functionality.',
sound:'Environmental sound-level estimates with min/max/average readings, graphing, calibration offset and a sound-pressure ↔ dB SPL calculator, while clearly stating smartphone microphone limits.',
image:'Local image resizing and compression with batch processing and preview, plus image-geometry tools for pixel count, megapixels, aspect ratio and PPI-based physical-size calculations.',
electrical:'A practical electrical and electronics toolkit covering Ohm’s law, power, charge, resistance/conductance, resistivity/conductivity, reactance, LC resonance, resistor networks, voltage dividers and wire/AWG calculations.',
ham:'A practical RF field toolkit for radio amateurs, including wavelength and antenna-length calculations, RF power views, SWR/return loss, S-meter reference, impedance-based RF calculations, Fresnel tools, Maidenhead locator, distance/bearing and Morse.',
inventory:'A fully offline inventory and home-reserve manager with fast local barcode scanning, on-device OCR assistance, minimum-stock tracking, expiry rotation, automatic restock lists and reserve-duration calculations. No online product database, account, cloud service or server-side AI is required for core use.',
lottery:'Create, manage and filter lottery combinations using transparent mathematical and structural rules. Planned for EuroJackpot, Hungarian 5/90 and 6/45 lotteries, and Scandinavian lottery. It does not predict winning numbers or claim to improve the odds of winning.'
},
'hu':{
status:'Tervezett',
unit:'Gyors, átfogó mértékegység-átváltás és kapcsolódó műszaki kalkulátorok hétköznapi és szakmai használatra, 11 V1.0 kategóriával és offline alapműködéssel.',
sound:'Környezeti hangszint becslése minimum/maximum/átlag értékekkel, grafikonnal, kalibrációs offsettel és hangnyomás ↔ dB SPL kalkulátorral, a telefon mikrofonjának korlátait egyértelműen jelezve.',
image:'Képek helyi átméretezése és tömörítése batch feldolgozással és előnézettel, valamint képgeometriai számítások pixelszámhoz, megapixelhez, képarányhoz és PPI-alapú fizikai mérethez.',
electrical:'Gyakorlati villamossági és elektronikai eszköztár Ohm-törvénnyel, teljesítmény-, töltés-, ellenállás/vezetés-, fajlagos ellenállás/vezetőképesség-, reaktancia-, LC rezonancia-, ellenálláshálózat-, feszültségosztó- és vezeték/AWG számításokkal.',
ham:'Gyakorlati RF terepi eszköztár rádióamatőröknek: hullámhossz- és antennahossz-számítások, RF teljesítménynézetek, SWR/return loss, S-meter referencia, impedanciaalapú RF számítások, Fresnel, Maidenhead locator, távolság/irány és Morse.',
inventory:'Teljesen offline készlet- és háztartási tartalékkezelő gyors, helyi vonalkódolvasással, készüléken futó OCR-segítséggel, minimumkészlettel, lejárati rotációval, automatikus utánpótlási listával és „hány napra elegendő?” számítással. Az alapműködéshez nincs online termékadatbázis, fiók, felhő vagy szerveroldali AI.',
lottery:'Lottókombinációk létrehozása, kezelése és átlátható matematikai/szerkezeti szabályok szerinti szűrése. EuroJackpotra, Ötöslottóra, Hatoslottóra és Skandináv lottóra tervezve. Nem jósol nyerőszámot és nem állítja, hogy növeli a nyerési esélyt.'
},
'de':{
status:'Geplant',
unit:'Schnelle, umfassende Einheitenumrechnung und passende technische Rechner für Alltag und Fachanwendungen, mit 11 V1.0-Kategorien und offline nutzbaren Kernfunktionen.',
sound:'Schätzung von Umgebungsgeräuschpegeln mit Minimum, Maximum, Mittelwert, Diagramm, Kalibrierungs-Offset und Schalldruck ↔ dB-SPL-Rechner – mit klaren Hinweisen auf die Grenzen des Smartphone-Mikrofons.',
image:'Lokales Skalieren und Komprimieren von Bildern mit Stapelverarbeitung und Vorschau sowie Bildgeometrie für Pixelzahl, Megapixel, Seitenverhältnis und PPI-basierte physische Größe.',
electrical:'Praktischer Elektro- und Elektronik-Werkzeugkasten mit Ohmschem Gesetz, Leistung, Ladung, Widerstand/Leitwert, spezifischem Widerstand/Leitfähigkeit, Reaktanz, LC-Resonanz, Widerstandsnetzwerken, Spannungsteilern und Leitungs/AWG-Berechnungen.',
ham:'Praktischer HF-Feldwerkzeugkasten für Funkamateure mit Wellenlängen- und Antennenlängenberechnungen, HF-Leistungsansichten, SWR/Return Loss, S-Meter-Referenz, impedanzbasierten HF-Rechnungen, Fresnel, Maidenhead-Locator, Entfernung/Richtung und Morse.',
inventory:'Vollständig offline arbeitende Bestands- und Haushaltsreserveverwaltung mit lokalem Barcode-Scan, OCR auf dem Gerät, Mindestbestand, Ablaufrotation, automatischer Nachkaufliste und Berechnung der Reichweite in Tagen. Für die Kernfunktionen sind keine Online-Produktdatenbank, kein Konto, keine Cloud und keine serverseitige KI erforderlich.',
lottery:'Lotto-Kombinationen mit transparenten mathematischen und strukturellen Regeln erstellen, verwalten und filtern. Geplant für EuroJackpot, ungarisches 5-aus-90 und 6-aus-45 sowie skandinavisches Lotto. Die App sagt keine Gewinnzahlen voraus und verspricht keine höheren Gewinnchancen.'
},
'es':{
status:'Planificada',
unit:'Conversión rápida y completa de unidades y calculadoras técnicas relacionadas para uso cotidiano y especializado, con 11 categorías en V1.0 y funciones básicas offline.',
sound:'Estimación del sonido ambiental con mínimo, máximo, promedio, gráfico, ajuste de calibración y calculadora de presión sonora ↔ dB SPL, indicando claramente las limitaciones del micrófono del teléfono.',
image:'Redimensionado y compresión local de imágenes con procesamiento por lotes y vista previa, además de cálculos de geometría de imagen para píxeles, megapíxeles, relación de aspecto y tamaño físico basado en PPI.',
electrical:'Herramientas prácticas de electricidad y electrónica con ley de Ohm, potencia, carga, resistencia/conductancia, resistividad/conductividad, reactancia, resonancia LC, redes de resistencias, divisores de tensión y cálculos de cable/AWG.',
ham:'Herramientas RF de campo para radioaficionados con cálculos de longitud de onda y antena, potencia RF, SWR/return loss, referencia S-meter, cálculos RF con impedancia, Fresnel, localizador Maidenhead, distancia/rumbo y Morse.',
inventory:'Gestor de inventario y reservas del hogar totalmente offline, con escaneo local de códigos de barras, ayuda OCR en el dispositivo, stock mínimo, rotación por caducidad, lista automática de reposición y cálculo de días de autonomía. Las funciones básicas no requieren base de datos online, cuenta, nube ni IA en servidor.',
lottery:'Crea, gestiona y filtra combinaciones de lotería mediante reglas matemáticas y estructurales transparentes. Previsto para EuroJackpot, loterías húngaras 5/90 y 6/45 y lotería escandinava. No predice números ganadores ni afirma aumentar las probabilidades de ganar.'
},
'fr':{
status:'Prévue',
unit:'Conversion rapide et complète des unités et calculateurs techniques associés pour les usages courants et spécialisés, avec 11 catégories en V1.0 et des fonctions principales hors ligne.',
sound:'Estimation du niveau sonore ambiant avec minimum, maximum, moyenne, graphique, décalage d’étalonnage et calculateur pression acoustique ↔ dB SPL, avec indication claire des limites du microphone du téléphone.',
image:'Redimensionnement et compression locale des images avec traitement par lot et aperçu, plus des calculs de géométrie d’image pour pixels, mégapixels, ratio et taille physique basée sur le PPI.',
electrical:'Boîte à outils pratique d’électricité et d’électronique : loi d’Ohm, puissance, charge, résistance/conductance, résistivité/conductivité, réactance, résonance LC, réseaux de résistances, diviseurs de tension et calculs de câble/AWG.',
ham:'Boîte à outils RF de terrain pour radioamateurs : longueur d’onde et antennes, puissance RF, SWR/return loss, référence S-meter, calculs RF avec impédance, Fresnel, locator Maidenhead, distance/cap et Morse.',
inventory:'Gestion entièrement hors ligne des stocks et réserves du foyer, avec lecture locale des codes-barres, aide OCR sur l’appareil, stock minimum, rotation des dates d’expiration, liste de réapprovisionnement automatique et calcul du nombre de jours de réserve. Aucune base produit en ligne, compte, cloud ou IA serveur n’est nécessaire au fonctionnement principal.',
lottery:'Crée, gère et filtre des combinaisons de loterie selon des règles mathématiques et structurelles transparentes. Prévu pour EuroJackpot, les loteries hongroises 5/90 et 6/45 et la loterie scandinave. L’application ne prédit pas les numéros gagnants et ne prétend pas augmenter les chances de gain.'
},
'pt-BR':{
status:'Planejado',
unit:'Conversão rápida e abrangente de unidades e calculadoras técnicas relacionadas para uso cotidiano e especializado, com 11 categorias na V1.0 e funções principais offline.',
sound:'Estimativa de som ambiente com mínimo, máximo, média, gráfico, ajuste de calibração e calculadora de pressão sonora ↔ dB SPL, deixando claras as limitações do microfone do celular.',
image:'Redimensionamento e compressão local de imagens com processamento em lote e prévia, além de cálculos de geometria para pixels, megapixels, proporção e tamanho físico baseado em PPI.',
electrical:'Kit prático de elétrica e eletrônica com lei de Ohm, potência, carga, resistência/condutância, resistividade/condutividade, reatância, ressonância LC, redes de resistores, divisores de tensão e cálculos de fios/AWG.',
ham:'Kit RF de campo para radioamadores com cálculos de comprimento de onda e antena, potência RF, SWR/return loss, referência S-meter, cálculos RF com impedância, Fresnel, locator Maidenhead, distância/direção e Morse.',
inventory:'Gerenciador de estoque e reserva doméstica totalmente offline, com leitura local de código de barras, OCR no aparelho, estoque mínimo, rotação por validade, lista automática de reposição e cálculo de quantos dias a reserva dura. As funções principais não exigem banco de produtos online, conta, nuvem ou IA no servidor.',
lottery:'Crie, gerencie e filtre combinações de loteria com regras matemáticas e estruturais transparentes. Planejado para EuroJackpot, loterias húngaras 5/90 e 6/45 e loteria escandinava. Não prevê números vencedores nem afirma aumentar as chances de ganhar.'
},
'pl':{
status:'Planowana',
unit:'Szybkie i kompleksowe przeliczanie jednostek oraz powiązane kalkulatory techniczne do codziennych i specjalistycznych zastosowań, z 11 kategoriami V1.0 i podstawowymi funkcjami offline.',
sound:'Szacowanie poziomu dźwięku otoczenia z minimum, maksimum, średnią, wykresem, offsetem kalibracji i kalkulatorem ciśnienie akustyczne ↔ dB SPL, z jasnym wskazaniem ograniczeń mikrofonu telefonu.',
image:'Lokalna zmiana rozmiaru i kompresja obrazów z przetwarzaniem wsadowym i podglądem oraz obliczeniami geometrii obrazu dla pikseli, megapikseli, proporcji i rozmiaru fizycznego na podstawie PPI.',
electrical:'Praktyczny zestaw obliczeń elektrycznych i elektronicznych: prawo Ohma, moc, ładunek, rezystancja/przewodność, rezystywność/przewodnictwo, reaktancja, rezonans LC, sieci rezystorów, dzielniki napięcia i przewody/AWG.',
ham:'Praktyczny zestaw terenowych narzędzi RF dla radioamatorów: długość fali i anteny, moc RF, SWR/return loss, odniesienie S-meter, obliczenia RF z impedancją, Fresnel, locator Maidenhead, odległość/kierunek i Morse.',
inventory:'W pełni offline’owy menedżer zapasów i rezerw domowych z lokalnym skanowaniem kodów kreskowych, OCR na urządzeniu, stanami minimalnymi, rotacją terminów ważności, automatyczną listą uzupełnień i obliczaniem liczby dni zapasu. Podstawowe funkcje nie wymagają internetowej bazy produktów, konta, chmury ani AI po stronie serwera.',
lottery:'Tworzenie, zarządzanie i filtrowanie kombinacji lotto według przejrzystych reguł matematycznych i strukturalnych. Planowane dla EuroJackpot, węgierskich loterii 5/90 i 6/45 oraz loterii skandynawskiej. Aplikacja nie przewiduje zwycięskich liczb ani nie obiecuje zwiększenia szans na wygraną.'
},
'it':{
status:'Pianificata',
unit:'Conversione rapida e completa delle unità e calcolatori tecnici correlati per uso quotidiano e specialistico, con 11 categorie nella V1.0 e funzioni principali offline.',
sound:'Stima del livello sonoro ambientale con minimo, massimo, media, grafico, offset di calibrazione e calcolatore pressione sonora ↔ dB SPL, indicando chiaramente i limiti del microfono del telefono.',
image:'Ridimensionamento e compressione locale delle immagini con elaborazione batch e anteprima, più calcoli di geometria per pixel, megapixel, rapporto d’aspetto e dimensione fisica basata su PPI.',
electrical:'Kit pratico di calcoli elettrici ed elettronici con legge di Ohm, potenza, carica, resistenza/conduttanza, resistività/conducibilità, reattanza, risonanza LC, reti di resistori, divisori di tensione e fili/AWG.',
ham:'Kit RF da campo per radioamatori con calcoli di lunghezza d’onda e antenna, potenza RF, SWR/return loss, riferimento S-meter, calcoli RF con impedenza, Fresnel, locator Maidenhead, distanza/direzione e Morse.',
inventory:'Gestore di inventario e scorte domestiche completamente offline, con scansione locale dei codici a barre, OCR sul dispositivo, scorta minima, rotazione delle scadenze, lista automatica di rifornimento e calcolo dei giorni di autonomia. Le funzioni principali non richiedono database prodotti online, account, cloud o IA lato server.',
lottery:'Crea, gestisce e filtra combinazioni della lotteria con regole matematiche e strutturali trasparenti. Previsto per EuroJackpot, lotterie ungheresi 5/90 e 6/45 e lotteria scandinava. Non predice i numeri vincenti e non afferma di aumentare le probabilità di vincita.'
}
};
function applyPortfolioV12(){
 const grid=document.getElementById('appGrid'); if(!grid)return;
 const lang=document.documentElement.lang||'en'; const t=copy[lang]||copy.en;
 const cards=[...grid.querySelectorAll('.app-card')];
 const set=(name,text)=>{const c=cards.find(x=>x.querySelector('h3')?.textContent===name);if(c){const p=c.querySelector('p');if(p){p.textContent=text;p.dataset.expanded='1';}}};
 set('Unit Converter',t.unit);
 set('Sound Meter',t.sound);
 set('Image Resizer & Compressor',t.image);
 set('Electrical Toolkit',t.electrical);
 set('Ham Tools / Radio RF Toolkit',t.ham);
 let inv=cards.find(c=>c.querySelector('h3')?.textContent==='Inventory'||c.querySelector('h3')?.textContent==='Inventory / ReadyStock');
 if(inv){inv.querySelector('h3').textContent='Inventory / ReadyStock';const p=inv.querySelector('p');if(p){p.textContent=t.inventory;p.dataset.expanded='1';}}
 let lottery=[...grid.querySelectorAll('.app-card')].find(c=>c.querySelector('h3')?.textContent==='Lottery Filter');
 if(!lottery){lottery=document.createElement('article');lottery.className='app-card';grid.appendChild(lottery);}
 lottery.innerHTML=`<span class="badge plan">${t.status}</span><h3>Lottery Filter</h3><p>${t.lottery}</p>`;
}
applyPortfolioV12();
const s=document.getElementById('languageSelect');if(s)s.addEventListener('change',()=>setTimeout(applyPortfolioV12,1));
})();
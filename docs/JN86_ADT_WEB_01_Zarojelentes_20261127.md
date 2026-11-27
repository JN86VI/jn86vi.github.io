# ADT-WEB-01 · Webes zárójelentés

**2026. november 27.** Az Age & Date Toolkit 0.8.1 (17) nyilvános Google Play-megjelenését a tulajdonos visszaigazolta. A változtatás elkészült a webes repó `codex/web-adt-release-20261127` ágán. [Implementációs commit](https://github.com/JN86VI/jn86vi.github.io/commit/12e49f7fb7a2eec9ff1a5ece1cd37d3a75f0283d) · [PR #7](https://github.com/JN86VI/jn86vi.github.io/pull/7)

## Változások

- Az ADT a megjelent katalógusba került. A teljes és a megjelent katalógus, az adatlap és a Kapcsolat oldal a nyilvános áruházi adatlapra hivatkozik. A főoldalon az „Összes alkalmazásunk a Google Playen” gomb nyolc nyelven vezet a JN86VI fejlesztői oldalára.
- Az ADT-adatlapon hét eredeti, 1080 × 1920 pixeles angol kép szerepel a jóváhagyott sorrendben. A képaláírás, az alternatív szöveg és a képek nyelvét jelző mondat mind a nyolc webnyelven elérhető. A képeket teljes méretben is meg lehet nyitni. A hét PNG összesen 1 706 315 bájt. A fájlok SHA-256 értékei egyeznek a forrásjegyzékkel, és bájtszinten egyeznek a JN86 `d0c460a83c199ec2ebb56f38974e6b5b51e3d5d4` main példányával. [Jóváhagyott képsorozat](https://github.com/JN86VI/JN86/tree/c79d555ca3e9884fe0db52ed976102bd8f6cd542/Assets/Store/Age-Date-Toolkit/promotional/en/series-20261127)
- Az adatlap nyolc nyelvű szövegéből kikerültek az elavult tesztverzióra és tervezett offline működésre utaló mondatok. A másik 24 alkalmazás katalógusrekordja, a Unit Converter ajánlata, az Ott e! oldala, az adatvédelmi oldalak és az `app-ads.txt` a kiindulási verzióval egyeztek az összehasonlításban.

| Katalógus | Előtte | Utána |
| --- | ---: | ---: |
| Összes | 25 | 25 |
| Megjelent | 2 | 3 |
| Hamarosan | 4 | 3 |
| Készül | 19 | 19 |

Az érintett oldalak az `index.html`, az `apps.html`, a `released.html`, a `contact.html` és az `apps/age-date-toolkit.html`. Az adatforrás az `assets/portfolio-v2.js`, az `assets/app-details.json` és az `assets/app-pages.json`, az utóbbi kettő a generált JS-párjával. A megjelenítést az `assets/site.js`, az `assets/showcase-i18n.js`, az `assets/app-detail.js`, az `assets/app-details.css` és a `scripts/build-details.py` kezeli. A képek az `assets/screenshots/age-date-toolkit/` alatt vannak. A `README.md`, a `tests/validate-site.cjs` és a `tests/validate-web-20261121.cjs` az új katalógusállapotot követi.

## Ellenőrzés

- **PASS** · A statikus generálás és a sablonellenőrzés 25 adatlapot igazolt. A statikus validátor 1 355 belső hivatkozást, a JavaScript szintaxisát és a katalógusadatokat ellenőrizte.
- **PASS** · A teljes böngészős validátor külön futásokban 1 464 oldal- és nyelvállapotot ellenőrzött 320, 768 és 1440 px-en. Mindhárom méreten 140 előállított belső link adott HTTP 200-at. A 200 katalóguskártya-navigáció, a nyelv megőrzése és a 72 státuszpróba is átment.
- **PASS** · A helyi előnézetben a főoldal és az ADT-adatlap 64 célzott megjelenítése futott 320, 390, 768 és 1440 px-en. A nyolc nyelv az angol, magyar, német, spanyol, francia, brazil portugál, lengyel és olasz. A próbák ellenőrizték a képek betöltését, a feliratok és a gomb elférését, valamint a két Play-cél URL-jét. A magyar mobil- és asztali előnézetet vizuálisan is átnéztem. A JavaScript nélküli angol HTML-ben is megjelent az ADT, a galéria, a Play-linkek és a számlálók.
- **PASS** · Az ADT részletes leírásainak 24 nyelvi és méretállapota, kilenc funkcióleírása, belső linkjei és billentyűzetes működése. A Unit Converter és Mini Games regresszió 96 nyelvi és méretállapoton, valamint 6 lejárati próbán ment át.
- **PASS** · A Play-hivatkozások az elvárt pontos URL-eket használják. Egy külön, bejelentkezés nélküli HTTP-lekérés mindkét oldalt HTTP 200-zal és a várt címmel azonosította. Az első webes lekérő nem tudta megnyitni az oldalakat. [ADT adatlap](https://play.google.com/store/apps/details?id=hu.jn86.agedatetoolkit) · [JN86VI fejlesztői oldal](https://play.google.com/store/apps/dev?id=8533847169571511478)

## Átadás

A szinkronizáláskor a webes helyi `main`, az `origin/main` és a közvetlen távoli `main` azonos commiton állt, `18d02d4880368c7d97c610c180fccdb1c17014df`. A PR a webes `main` ágba mutat és tulajdonosi jóváhagyásra vár.

Az előnézeti szervert leállítottam. A takarítás 33 ideiglenes fájlt és 3 üres könyvtárat távolított el. A fájlok összmérete 6 048 292 bájt volt, a lefoglalt fájlblokkok mérete 6 057 984 bájt. Az aktív webes munkafa a jóváhagyásig megmarad.

A GitHub Pages előző sikeres közzétételei a `main` ágból futottak. Az egyesítés élesíti a változtatást. A jóváhagyott közzététel után következik az éles főoldal, katalógus és ADT-adatlap ellenőrzése mind a nyolc nyelven, valamint mindkét Play-hivatkozás élő ellenőrzése. [A jelenlegi main Pages-futása](https://github.com/JN86VI/jn86vi.github.io/actions/runs/45486507154) · [Éles weboldal](https://jn86vi.github.io/)

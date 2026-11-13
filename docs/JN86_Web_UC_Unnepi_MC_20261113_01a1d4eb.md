# UC ünnepi ajánlat és MC projektleírás — 2026-11-13 / 01a1d4eb

A helyi `Web_Sync_site` webes repó módosítása, kiindulás:
`1e8a4b2f69911d693dc778c68c273e22b91a2b37` (`main`).
Ez a változtatási és helyi ellenőrzési nyugta; a publikált commit, PR,
Pages-futás és élő ellenőrzés végállapota a feladat záró válaszában szerepel.

## Tartalom és forrás

- UC: nyolcnyelvű, ár és százalék nélküli tájékoztató, a meglévő valós Play-linkkel.
  Azonnal látható; a szövegben a Play-időablak kezdete 2026-11-15 00:00 UTC.
  Eltűnés: **2027-01-05T00:00:00Z**, nyitott/visszahozott oldalnál is.
  A statikus HTML rejtett, JavaScript nélkül nincs elavult ajánlat.
- MC: mind a nyolc kalkulátor, két tapétamód, kézi projektmentés, másolás/
  áthelyezés, paraméter-pillanatképek, méretátvétel, egyszeri ráhagyás,
  kompatibilis összesítés, tartós bevásárlólista, PDF, teljes backup/restore.
  A 23 részletes funkciószakasz megőrzi a korábbi horgonyokat és releváns funkciókat.
- MC privacy: 13 kártya, stabil régi horgonyok és felső tartalomjegyzék;
  új fájl/PDF/megosztás fejezet. A reklám-, UMP-, Billing-, Support- és külső
  szolgáltatói szövegek változatlanok. A mentésfájl és PDF eltérő célja egyértelmű.
- Nyelvek: **en, hu, de, es, fr, pt-BR, pl, it — teljes készlet**.
- A fejlesztési jelzések az MC publikus leírásáról/kártyájáról eltűnnek;
  nincs kitalált kiadási státusz vagy Play-link. Más app szövege nem változott.

Irányadó a tulajdonos webes megbízása és az elfogadott
`JN86_MC_UI39-44_FUNC02_Codex_Feladat_20261113.md`, valamint a JN86 repó
`Alapdoksik/appspec/Material_Calculator_Functional_Specification_v0.2.md`
aktuális MC munkafájljának §§6–20 és 2026-11-13-i kiegészítése.
Az olvasott AppSpec SHA-256: `c0cf5a8810b1a56d515a1fc793a49533155c2d82b455c2261fdbe6340f64990c`.
A mezőket és képleteket a tényleges `CalculationInput.kt` és `MaterialEngine.kt`,
az adatfolyamhatárt a manifest, backup-szabályok és platformforrások is alátámasztják.

## Elvégzett ellenőrzések

| Ellenőrzés | Eredmény |
|---|---|
| Python generátor és `--check` | PASS, 25 részletes oldal és generált adatok egyeznek |
| Meglévő statikus webvalidátor | PASS, 25 ikon, 200 fordítás, JS-szintaxis, 1335 helyi hivatkozás |
| Célzott UC/MC böngészőteszt | PASS, 144 állapot: 3 oldal × 8 nyelv × 320/768/1440 px × két rendszer-témapreferencia |
| UTC időzítés | PASS, publikálás napja; lejárat előtt/pontosan/utána; frissítés; nyitott oldal; visszatérés; 4 időzóna, 8 nyelv |
| JavaScript nélküli mód | PASS, UC rejtett, MC teljes angol tartalommal és fejlesztési jelzés nélkül |
| MC meglévő tartalomvalidátora | PASS, 24 böngészőállapot, 23 funkció/horgonylefedés, billentyűzet és nyelvváltás |
| Közös webregresszió | 1464 oldal–nyelv állapot, hivatkozások és 200 kártya/vissza pár PASS; a javított lifecycle-rész külön 72 állapottal PASS |
| Vizuális ellenőrzés | UC mobil; MC mobil/tablet; privacy mobil/desktop képernyőképek megtekintve |
| Hozzáférhetőség | Natív összecsukás, billentyűzetes TOC, címkék és accessibility-fa PASS; vizsgált szövegek kontrasztja legalább 8,14:1 |
| Megőrzés | Más appok adatainak/oldalainak, privacy-linkeknek, sitemapnak, robotsnak és app-ads.txt-nek összevetése PASS |
| UC Play-hivatkozás | HTTP 200, „Unit Converter - Apps on Google Play” cím; meglévő URL megőrizve |

A közös teszt régi 2027-es dátumtilalma és a „requirement” szó téves
szakzsargonbesorolása célzottan pontosítva. Az egyszereplős lifecycle-fixture
nem izolálta a már kiadott UC-t; ezt kizárólag a teszt böngészőmemóriájában
javítottuk. A sikeres 1464 megjelenési és 200 navigációs próbát nem futtattuk
újra; a hibás tesztrész `LIFECYCLE_ONLY=1` kapcsolóval külön PASS.
A meglévő webdesign sötét; a világos rendszerpreferencia nem vezet be új témát.
Manuális képernyőolvasós felolvasást nem futtattunk; szemantikus accessibility-fa
és billentyűzetes ellenőrzés történt.

Új célzott teszt: `tests/validate-web-uc-mc-20261113.cjs`.
Node/Playwright a meglévő helyi runtime-ból; nincs új webes futásidejű függőség.
A nyers helyi nyugták és képernyőképek: `/tmp/jn86-web-01a1d4eb/`.

## Érintett fájlok

- `apps.html`, `apps/unit-converter.html`, `apps/material-calculator.html`,
  `privacy/material-calculator.html`.
- `assets/uc-holiday.js`, `assets/app-details.json`, `assets/app-details-data.js`,
  `assets/privacy-material-calculator.json`, `assets/portfolio-v2.js`.
- `assets/app-detail.js`, `assets/app-details.js`, `assets/app-details.css`,
  `assets/site.js`, `scripts/build-details.py`.
- `tests/validate-site.cjs`, `tests/validate-web-uc-mc-20261113.cjs`,
  `docs/details-restoration-20261012/coverage.json`, `README.md`, ez a nyugta.

## Android és Data Safety utóellenőrzés

Az Android párhuzamos fejlesztésének PDF-, kézi restore- és kiterjesztett
rendszermentési végállapotát ez a webes feladat nem igazolja. A nyilvános szöveg
a kifejezetten elfogadott végleges működést írja le; fájlkiterjesztést,
titkosítási algoritmust vagy szolgáltatói megőrzési időt nem talál ki.
Az Android elkészültekor a tényleges adatfolyamokat célzottan össze kell vetni
ezzel a policyvel és a Play Data Safety nyilatkozattal; a Console nem változott.
A felhasználó által indított export önmagában nem bizonyít új fejlesztői adatgyűjtést.
Ellenőrzött hivatalos háttér: [Android Auto Backup](https://developer.android.com/identity/data/autobackup),
[rendszerfájlválasztó](https://developer.android.com/training/data-storage/shared/documents-files),
[Play Data Safety útmutató](https://support.google.com/googleplay/android-developer/answer/10787469).

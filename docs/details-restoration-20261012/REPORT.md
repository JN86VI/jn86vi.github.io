# JN86 webes alkalmazásrészletek — 2026-10-12

**PASS — 25/25 alkalmazásrészlet elkészült nyolc nyelven, publikálva és az élő weboldalon ellenőrizve.**

A meglévő helyi `Web_Sync_site` munkafában készült a teljes javítás. Az irányadó forrás a `JN86VI/JN86` hivatalos `main` ágából rögzített saját AppSpec, az UC-nál a saját adatleltár és implementált funkciók is. A források tartalma, Git blobja, SHA-256 lenyomata és rögzített GitHub-hivatkozása a `sources.json` fájlban található. Az induló forráspont `f571bd9da1e52097894049341e18b1e503be9594`; a publikáció előtti ellenőrzési pont `e277661b99686c72aa03536cd1e9bded5b07ea29`. A 25 AppSpec és az UC-adatleltár változatlan. A Master Index közben csak a Meal Planner kutatási belépési navigációját kapta meg; a követelményeket és ezt a webfeladatot nem változtatta meg.

A **COMPLETE kizárólag a webes leírás helyreállítását jelenti**, nem alkalmazásimplementációs, kézi elfogadási vagy Google Play-megjelenési minősítést. A két fejlesztett appnál megvalósított működés szerepel; a többi 23 oldal világosan tervezett, még nem letölthető alkalmazást mutat be. A publikált részletoldalakból kikerültek a belső verzió-, munkafázis- és későbbi ötletblokkok.

## Alkalmazásonkénti lezárás

| Alkalmazás | Leírás | Nyelvek | Magyarázott funkciószakaszok | Webstátusz |
|---|---|---:|---:|---|
| [Unit Converter](https://jn86vi.github.io/apps/unit-converter.html) | COMPLETE | 8/8 | 87 | Hamarosan |
| [Ott e!](https://jn86vi.github.io/apps/ott-e.html) | COMPLETE | 8/8 | 10 | Hamarosan |
| [Age & Date Toolkit](https://jn86vi.github.io/apps/age-date-toolkit.html) | COMPLETE | 8/8 | 10 | Készül |
| [Stopwatch & Multi Timer](https://jn86vi.github.io/apps/stopwatch-multi-timer.html) | COMPLETE | 8/8 | 8 | Készül |
| [Fraction Calculator](https://jn86vi.github.io/apps/fraction-calculator.html) | COMPLETE | 8/8 | 10 | Készül |
| [Last Done](https://jn86vi.github.io/apps/last-done.html) | COMPLETE | 8/8 | 8 | Készül |
| [Material Calculator](https://jn86vi.github.io/apps/material-calculator.html) | COMPLETE | 8/8 | 12 | Készül |
| [Bubble Level & Inclinometer](https://jn86vi.github.io/apps/bubble-level-inclinometer.html) | COMPLETE | 8/8 | 9 | Készül |
| [Ruler & Protractor](https://jn86vi.github.io/apps/ruler-protractor.html) | COMPLETE | 8/8 | 9 | Készül |
| [Sound Meter](https://jn86vi.github.io/apps/sound-meter.html) | COMPLETE | 8/8 | 9 | Készül |
| [Compass & Altimeter](https://jn86vi.github.io/apps/compass-altimeter.html) | COMPLETE | 8/8 | 9 | Készül |
| [GPS Speedometer](https://jn86vi.github.io/apps/gps-speedometer.html) | COMPLETE | 8/8 | 9 | Készül |
| [Device Info & Diagnostics](https://jn86vi.github.io/apps/device-info-diagnostics.html) | COMPLETE | 8/8 | 12 | Készül |
| [Image Resizer & Compressor](https://jn86vi.github.io/apps/image-resizer-compressor.html) | COMPLETE | 8/8 | 9 | Készül |
| [Voice Recorder](https://jn86vi.github.io/apps/voice-recorder.html) | COMPLETE | 8/8 | 9 | Készül |
| [Tuner & Metronome](https://jn86vi.github.io/apps/tuner-metronome.html) | COMPLETE | 8/8 | 9 | Készül |
| [Electrical Toolkit](https://jn86vi.github.io/apps/electrical-toolkit.html) | COMPLETE | 8/8 | 16 | Készül |
| [Ham Tools / Radio RF Toolkit](https://jn86vi.github.io/apps/ham-tools.html) | COMPLETE | 8/8 | 12 | Készül |
| [Mini Games](https://jn86vi.github.io/apps/mini-games.html) | COMPLETE | 8/8 | 16 | Készül |
| [Inventory / ReadyStock](https://jn86vi.github.io/apps/readystock.html) | COMPLETE | 8/8 | 13 | Készül |
| [Workout / Training](https://jn86vi.github.io/apps/workout-training.html) | COMPLETE | 8/8 | 10 | Készül |
| [Meal Planner — „Mit főzzek?”](https://jn86vi.github.io/apps/meal-planner.html) | COMPLETE | 8/8 | 13 | Készül |
| [Work Manager](https://jn86vi.github.io/apps/work-manager.html) | COMPLETE | 8/8 | 10 | Készül |
| [Lottery Filter](https://jn86vi.github.io/apps/lottery-filter.html) | COMPLETE | 8/8 | 27 | Készül |
| [Dialer](https://jn86vi.github.io/apps/dialer.html) | COMPLETE | 8/8 | 16 | Készül |

Nyelvek: English, Magyar, Deutsch, Español, Français, Português (Brasil), Polski, Italiano. Összesen **362 önálló, nyolcnyelvű funkciómagyarázat**, cím és érdemi használati szöveg. A forráshely → funkció → tényleges webes horgonypont részletes megfeleltetése a `coverage.md` és `coverage.json` fájlban található. Az egyes alkalmazások állapota és bizonyítékfájlja a `checkpoint.json` része.

## Ellenőrzés

- UC: 77 adathoz kötött funkció, 399 rekord teljes megfeleltetése; mind a 70 egységlistát tartalmazó szakasz pontos szimbólumlistával. A számoló és számrendszer-funkciók külön bemeneti/eredmény/korlát magyarázatot kaptak. Bizonyíték: `uc-feature-coverage-validation.json`.
- Alkalmazásrészletek: 600 aktuális böngészőállapot (25 × 8 × 320/390/1440 px), teljes cím/szöveg/egységlista, betöltés és hivatkozások, vízszintes túlcsordulás, billentyűzetes szakasznyitás és nyelvváltásnál megőrzött nyitott/zárt állapot. Alkalmazásonként `<app>-validation.json`. Magyar 390 px-es képek szerzői vizuális ellenőrzése megtörtént.
- Teljes webhely: 1464 oldal/nyelv/méret állapot, 72 böngészőmemóriában szimulált státusz-/Play-link állapot, 200 kártya–részlet–vissza pár, menü, nyelvmegőrzés, ikonok, 1325 helyi és 60 külön megjelenített hivatkozás. Bizonyíték: `local-site-validation.json`.
- Generált HTML/adatok, JavaScript-szintaxis és Python-compile: PASS. A generátor mind a 25 részletes leírást megköveteli; hiányzó alkalmazásnál nem állít elő általános helyettesítő oldalt.
- Megőrzés: a 81 védett korábbi útvonalból 76 byte-ra változatlan. Az öt célzott kivétel: UC-státuszadat és megjegyzés; főoldali 2/23 statikus számláló és adatcache-frissítés; portfólióoldali adatcache-frissítés; karbantartási README; több Hamarosan appot kezelő tesztelvárás. Mind a 25 privacy oldal, support/help, navigációs kód, közös vizuális fájl és ikon változatlan. Bizonyíték: `preservation-validation.json`.

A 320 px-en előkerült hosszú diagnosztikai felsorolás túlcsordulását a kizárólag új funkciószövegeket érintő szókitördelés javította. A státuszteszt korábbi egyetlen-Hamarosan-app feltételezését tényleges adatból számított elvárás váltotta fel; külön megmaradt az üres főoldali ajánló tesztje. A böngésző a telepített Chrome-ot használta, új függőség vagy böngészőtelepítés nélkül.

## UC kiegészítő feladat

Kizárólag a Unit Converter státusza változott `creating` → `soon` értékre. A nyolc meglévő fordításból a magyar címke **Hamarosan**. A főoldal meglévő `status === soon` feltétele automatikusan megjeleníti; a főoldalon UC és Ott e! látható, 2 Hamarosan és 23 Készül alkalmazással. Nincs Megjelent app, az UC `playUrl` értéke `null`, és nincs nyilvános Play-letöltési gomb. A többi app teljes portfólióadata változatlan. Bizonyíték: `uc-status-validation.json` (24 nyelv/méret állapot).

## Nyitott kérdések

**Webes blokkoló: nincs.** A leírások az alábbi termékkapukat pontosan tervezettként/korlátozottként kezelik, nem pótolják kitalált kész tartalommal:

- Workout / Training: induló szakértői programok, kategóriák, ingyenes/fizetős modulkínálat és szakmai ellenőrzés.
- Meal Planner: a felismerés konkrét támogatott alapanyagai/modellje és a szakmailag/jogilag jóváhagyott appba kerülő receptadatok. Nem ígér végleges felismerési listát, automatikus készétel-felismerést vagy allergénfunkciót. A saját rejtett jelenethez szükséges portréforrás külön termék-/assetkapu.
- Work Manager: a legutóbbi hívás javaslat csak engedélyezett hozzáféréssel; nem állít Google Play-jogosultsági jóváhagyást. A kézi út önálló, a rendszer beszédfelismerése internetet is igényelhet. A saját AppSpec feltételes működése az aktuális [Google Play Call Log szabállyal](https://support.google.com/googleplay/android-developer/answer/10208820?hl=en) és [Android SpeechRecognizer dokumentációval](https://developer.android.com/reference/android/speech/SpeechRecognizer) összevetett.
- Lottery Filter: a megadott matematikai számszerkezetek az aktuális hivatalos játékforrásokkal összevetettek. Az alkalmazás nem fogad tétet, nem ígér nyerőszámot vagy jobb nyerési esélyt; a kiadáskor ismét szükséges termékoldali struktúraellenőrzés és korhatáros Play-listing.

Ezek nem a webes helyreállítás hiányzó lépései, és nem jelentenek appkiadási engedélyt. Konkrét nyilvános Play-megjelenés és hivatkozás kizárólag későbbi, igazolt owner-lépéssel adható meg.

## Publikáció

A felhasználó előre engedélyezte a teljes munka végén a helyi commitot és push-t. Részleges portfólió nem került publikálásra. A teljes 25/25 × 8 helyi PASS után az ellenőrzött 72 fájl egy helyi commitban került a hivatalos webrepo `main` ágára.

- Tartalomcommit: `2754625384f9238b693d240994ffaac4759a58e8`.
- A helyi HEAD, követő ág és közvetlen távoli main az első push után egyezett.
- [GitHub Pages build és deployment](https://github.com/JN86VI/jn86vi.github.io/actions/runs/38279985591): completed / success, a fenti tartalomcommitból.
- [Élő webhely](https://jn86vi.github.io/): 25 alkalmazás × 8 nyelv × 3 szélesség = 600 aktuális részletállapot PASS; az UC-státusz/főoldal további 24 állapota PASS; billentyűzetes nyitás, nyelvmegőrzés, HTTP/hivatkozások és túlcsordulás ellenőrizve. A 32 publikált tartalomfájl és a 25 változatlan privacy oldal HTTP 200, SHA-256 szerint pontosan egyezik a helyi példánnyal.
- Az élő bizonyítékok külön lezárási commitja csak ennek a feladatnak a jelentéseit és ellenőrzési adatait tartalmazza. A megjelenített webes tartalmat nem változtatja. A commit a jelentést tartalmazó Git-előzményben azonosítható; végleges SHA-ja a feladat záró válaszában szerepel.

Élő bizonyítékok: `live-validation-summary.json`, `live-content-validation.json`, `live-uc-status-validation.json` és a `live/` könyvtár 25 alkalmazásonkénti jelentése. A Git- és buildbizonylat a `publication.json` fájlban található. A push az aktív, már meglévő JN86VI SSH-kulccsal történt; a repository beállításai nem változtak. A fő JN86-forrásrepo ebben a munkában kizárólag olvasási forrás maradt.

EXACT_CONTINUATION_POINT: `COMPLETE_25_APPS_8_LANGUAGES_PUBLISHED`

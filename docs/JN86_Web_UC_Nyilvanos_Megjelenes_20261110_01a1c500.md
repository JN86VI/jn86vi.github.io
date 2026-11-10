# Unit Converter — nyilvános webes megjelenés

Dátum: 2026-11-10. Repository: `JN86VI/jn86vi.github.io`, ág: `main`.

## Eredmény

- A Unit Converter az Ott e! meglévő adatvezérelt `released` / „Elérhető” rendszerét használja: teljes alkalmazáslista, megjelent alkalmazások, saját részletes oldal és Kapcsolat oldal.
- Ellenőrzött [nyilvános Google Play-adatlap](https://play.google.com/store/apps/details?id=hu.jn86.unitconverter): bejelentkezés és sütik nélküli HTTP 200; Unit Converter / JN86VI; Android `SoftwareApplication`, `InStock` ajánlat. A böngészőben a Play-gomb is erre az adatlapra vezetett.
- Nyolc nyelven frissült az elérhetőség; a súgó kiadás előtti bevezetője és elérhetőségi válasza is javítva.
- A főoldal tényleges katalógus szerinti számlálói: **25 összesen = 2 megjelent + 0 hamarosan + 23 készül**. A kért 2/1/22 felosztást a jelenlegi adatok nem támasztják alá: a UC volt az egyetlen `soon` app, az FC és az ADT `creating` maradt. A főoldali kiemelés változatlanul csak `soon` appokat mutat; a megjelentek a meglévő főoldali gombbal érhetők el.
- A 2026-11-10-i tulajdonosi utasítás és a nyilvános Play-bizonyíték felülírja a régebbi Portfolio UC-fejlesztési státuszát. A webes README ezt rögzíti.
- UC-funkcióleírások, adatvédelmi tartalom, Ott e!, FC, ADT és minden más app adatrekordja változatlan. Android-forrás és AAB nem módosult.

## Ellenőrzés

- **PASS:** meglévő `tests/validate-site.cjs`, `STATIC_ONLY=1`: generált oldalak, JavaScript-szintaxis, lokalizáció, Play URL-védelem és 1333 helyi hivatkozás.
- **PASS:** célzott böngészős ellenőrzés: főoldal, teljes katalógus, megjelent katalógus, UC-részletek, Kapcsolat és UC-súgó × 8 nyelv × 1440/320 px = 96 állapot; helyes jelölések, számlálók és Play-linkek, hibás kép és vízszintes túlcsordulás nélkül.
- **PASS:** főoldal → megjelent appok → UC-részletek → appok; mobilmenü → Kapcsolat; UC-részletek → súgó → vissza → Google Play.
- **PASS:** UC-funkciószövegek és adatvédelem, a többi app adatai és védett oldalai az induló Git-állapottal egyeznek; `git diff --check` tiszta.

## Közzététel

A helyi ellenőrzések lezárultak. A `main` push utáni GitHub Pages-futás és az éles visszaellenőrzés eredménye a közzététel után kerül ide.

# UC és FC adatvédelmi tájékoztatók – célzott frissítés

**2026. november 6. – PASS, helyi tartalmi és webes ellenőrzés.**

A frissítés kizárólag a `privacy/unit-converter.html` és
`privacy/fraction-calculator.html` önálló adatvédelmi oldalakat érinti,
EN, HU, DE, ES, FR, PT-BR, PL és IT nyelven. A tulajdonosi pontosítás szerint
a tájékoztatók a közzétételre szánt, aktuális működést ismertetik. Nem tartalmaznak
verziókövetést, belső tesztelési státuszt, fejlesztéstörténetet vagy SDK-verziókat.
A szokásos utolsó-frissítési dátum megmaradt.

## Lényegi módosítások

- **Európa:** UMP/TCF szerinti személyre szabott, nem személyre szabott vagy
  tiltott Google-hirdetéskérés; az NPA szükséges alapfeltételei megmaradnak.
  Teljes elutasításból nincs automatikus NPA/LTD.
- **USA:** az alkalmazandó GPP opt-out után az engedélyezett kérés Google RDP-t
  használhat; kontextuson alapuló hirdetés továbbra is érkezhet. Az opt-out
  önmagában nem ad reklámmentességet vagy Premiumot.
- **Amerikai partnerek:** „Csak Google” az érintett USA-államok forgalmára,
  az RDP-s és RDP nélküli kérésekre is. A két bannerhelyhez nincs külön
  amerikai mediációs forrás. Ez nem globális Google-kizárólagosság.
- **Egyéb országok:** nincs automatikus európai TCF-követelmény. A friss UMP-állapot,
  az SDK alkalmazandó jelzései és a helyi követelmények irányadók. Az európai/amerikai
  űrlap hiánya nem jelent szabályozási mentességet vagy személyre szabási hozzájárulást.
- **Adatvédelmi választások:** külön európai és amerikai üzenet; az UMP határozza meg
  az alkalmazandó űrlapot. A Beállítások menü pontos, apponként és nyelvenként
  ellenőrzött adatvédelmi sorára hivatkozik a szöveg. Nem ígér minden országban űrlapot.
- **Offline és Premium:** nyelvválasztás után az első indítástól offline alapfunkciók;
  nincs kötelező kezdeti online setup. A hiteles Premium elrejti a Google-bannert,
  a helyi promóciót és az üres sávot is; az UMP/Billing külön szolgáltatás marad.
- **Billing:** meglévő, egyszeri vásárlás, előfizetés és rögzített ár nélkül;
  a Play aktuális regionális ára, helyi aláírás-ellenőrzés, online visszaállítás és
  utoljára hitelesített offline jogosultság. A jogosultság elvesztését a Play
  aktuális tulajdonlási válasza igazolja; a pénzügyi visszatérítés önmagában nem
  lett automatikus, azonnali helyi visszavonásként feltüntetve.

A részletes helyi adattárolási, mentési, törlési, biztonsági, kapcsolattartási,
jogérvényesítési és szolgáltatói fejezetek megmaradtak. Az FC jövő időben leírt
Google-integrációját meglévő szolgáltatásként pontosítottuk. Az adatfajták
felsorolását régióhoz, adatvédelmi választáshoz és hirdetési módhoz kötöttük.

## Irányadó bizonyíték

A két Git-repozitóriumot külön azonosítottuk. Kiinduló webes `main`:
`d41da13817b8d5b1efce55155b6f90086fb4a7e1`, `JN86VI/jn86vi.github.io`.
Az Android-forrás helyi és távoli `main` állapota:
`7ad40da44e9374d3709656a638f4e3ca30562268`, `JN86VI/JN86`.
Az Android-repozitórium fájljait ez a feladat nem módosította.

A JN86-repozitórium ellenőrzött forrásai:

- `audit_work/JN86_Regional_Privacy_20261105/REPORT.md` és
  `audit_work/JN86_US_RDP_20261105/REPORT.md`;
- a közös bevezetési útmutató §6.2 és §6.2.1, az UC funkcionális specifikáció
  offline/monetizációs fejezetei, valamint az FC AppSpec §13 és aktuális W3-fejezete;
- `Apps/Shared/monetization/.../RegionalConsent.kt`, `UmpConsentPort.kt`,
  `PlayBillingProvider.kt`, `PlayPurchaseVerifier.kt`;
- a Core `GoogleMobileAdsBackend.kt` és `PremiumSession.kt`, a tényleges UC/FC
  banner- és Beállítások-bekötések, a nyolcnyelvű Android-erőforrások és Gradle-konfiguráció;
- `Apps/Fraction-Calculator/docs/w3-internal-vc11/REPORT.md`, valamint az UC lezárt
  kiadási és a két közös regionális tesztjelentés.

A korábbi regionális jelentés amerikai teljes tiltását a későbbi RDP-jelentés és
az aktuális közös adapter felülírja. A webszöveg ezt a végleges döntést követi.

A célzott ellenőrzéskor elérhető hivatalos Google-források:
[Next-Gen GPP/RDP](https://developers.google.com/admob/android/next-gen/privacy/us-states),
[európai hirdetési módok](https://developers.google.com/admob/android/next-gen/privacy/ad-serving-modes),
[amerikai UMP-választások](https://developers.google.com/admob/android/next-gen/privacy/us-iab-support),
[amerikai partnerbeállítás](https://support.google.com/admob/answer/9561022?hl=en),
[regionális partnerhatókör](https://support.google.com/admob/answer/10833943?hl=en).

## Ellenőrzés

A [gépi nyugta](checks.json) a végleges HTML-fájlok SHA-256 lenyomatát és
a nyelvenkénti ellenőrzések eredményét tartalmazza.

- HTML5 feldolgozás: **0 hiba mindkét oldalon**; beágyazott JavaScript-szintaxis: PASS.
- Fordítások: **16/16 teljes nyelvi változat**; UC 52, FC 49 mező nyelvenként.
  Az angol statikus HTML és metaadatok egyeznek a fordítási adatokkal.
- Böngésző: **48/48 PASS**, 1440, 768 és 360 pixeles beállított szélességen.
  A teljes megjelenített szöveg ujjlenyomata nyelvenként egyezik a forrással;
  nincs hiányzó mező, hibás metaadat, vízszintes túllógás vagy konzolhiba.
- FC tartalomjegyzék: **12/12 működő célpont**; mobilmenü, oldalváltás és újratöltés
  utáni nyelvmegőrzés: PASS. Egy többsoros link automatizált középpont-kattintása
  a sorok közötti üres területre esett; a normál billentyűzetes aktiválás igazolta
  a működő hivatkozást. Ehhez nem módosítottuk az implementációt.
- A német hozzájárulási címet rövidítettük, mert az UC 360 pixeles nézetében
  egy hosszú összetett szó túllógott. A végleges teljes mátrix már hibamentes.
- **14/14 helyi HTTP-cél 200**; minden belső fájl- és fragmentumhivatkozás érvényes.
  Az eredeti hivatkozáscélok, navigáció, CSS és nyelvváltó JavaScript változatlanok.
- Más alkalmazás adatvédelmi oldala nem változott. Android-buildet vagy telefonos
  tesztet nem ismételtünk, APK/AAB és Play-feltöltés nem készült.

## Bizonyítékhatárok

A mentett amerikai „Csak Google” beállítás és a külön mediáció hiányának forrása
a lezárt RDP-jelentésben rögzített tulajdonosi igazolás. Ez a webes feladat nem
lépett be az AdMob Console-ba. A teljes amerikai állami célzási és üzenetnyelvlista
nem volt önállóan kiolvasható; a tájékoztatók ezért nem találnak ki ilyen listát.
Az összevont OTHER tesztrégió nem országonkénti jogi megfelelőségi vizsgálat.
A korábbi hálózati RDP-mérés Google-mintabannerekre vonatkozott; a weboldalak
nem ígérnek garantált fizetett hirdetésmegjelenést.

A közzétételi commit és az élő oldalak egyezésének eredménye a feladat végső
átadási üzenetében szerepel; a fenti nyugta a commit előtti végleges fájlokat ellenőrzi.

// Public app presentations from the current canonical JN86 AppSpecs.
// Public status policy: owner request, 2026-10-06.
const APP_STATUSES = Object.freeze(['creating', 'soon', 'released']);

// URL shape is checked here. Public production availability must be verified
// independently before a maintainer assigns status=released and a Play URL.
function isPlayStoreUrl(value) {
  if (typeof value !== 'string' || !value || value.trim() !== value) return false;
  try {
    const url = new URL(value);
    const packageName = url.searchParams.get('id');
    return url.protocol === 'https:' && url.hostname === 'play.google.com' &&
      !url.port && !url.username && !url.password && !url.hash &&
      url.pathname === '/store/apps/details' &&
      url.searchParams.getAll('id').length === 1 &&
      /^[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)+$/.test(packageName || '') &&
      [...url.searchParams.keys()].every(key => ['id', 'hl', 'gl'].includes(key));
  } catch { return false; }
}
function getPlayUrl(app) {
  return app.status === 'released' && isPlayStoreUrl(app.playUrl) ? app.playUrl : null;
}
function appAvailabilityKey(status) {
  return status === 'released' ? 'availability_released' :
    status === 'soon' ? 'availability_soon' : 'availability_text';
}
const portfolioApps = [
  {
    "id": "unit-converter",
    "name": "Unit Converter",
    "status": "creating",
    "icon": "assets/ic_unit_converter_512.png?v=18199c16b800",
    "copy": {
      "en": {
        "summary": "Convert everyday and technical units, with useful calculators and quick access to your favorites.",
        "overview": "Use Unit Converter when a recipe, measurement or technical task uses unfamiliar units. Enter a value once to see related results. Useful calculators cover density, data-transfer time, dilution, energy costs, lighting and concentration.",
        "features": [
          "Length, temperature, mass, speed and more.",
          "Several conversion results from one value.",
          "Search, favorites and recent calculations.",
          "Offline calculations without an account."
        ]
      },
      "hu": {
        "summary": "Hétköznapi és műszaki mértékegység-átváltások, hasznos kalkulátorokkal és gyorsan elérhető kedvencekkel.",
        "overview": "A Unit Converter akkor segít, ha egy receptben, mérésnél vagy műszaki feladatban más mértékegységgel találkozol. Egy érték megadásából több kapcsolódó eredményt láthatsz. Sűrűséghez, adatátviteli időhöz, hígításhoz, energiaköltséghez, világításhoz és koncentrációhoz is ad kalkulátort.",
        "features": [
          "Hossz, hőmérséklet, tömeg, sebesség és további egységek.",
          "Egy értékből több átváltási eredmény.",
          "Keresés, kedvencek és korábbi számítások.",
          "Offline számítások fiók nélkül."
        ]
      },
      "de": {
        "summary": "Alltägliche und technische Einheiten umrechnen, mit hilfreichen Rechnern und schnellem Zugriff auf Favoriten.",
        "overview": "Unit Converter hilft bei ungewohnten Einheiten in Rezepten, Messungen und technischen Aufgaben. Eine Eingabe liefert mehrere passende Ergebnisse. Rechner unterstützen Dichte, Datenübertragungszeit, Verdünnung, Energiekosten, Beleuchtung und Konzentration.",
        "features": [
          "Länge, Temperatur, Masse, Geschwindigkeit und mehr.",
          "Mehrere Umrechnungsergebnisse aus einem Wert.",
          "Suche, Favoriten und letzte Berechnungen.",
          "Offline rechnen ohne Benutzerkonto."
        ]
      },
      "es": {
        "summary": "Convierte unidades cotidianas y técnicas, con calculadoras útiles y acceso rápido a tus favoritos.",
        "overview": "Unit Converter ayuda cuando una receta, medida o tarea técnica utiliza unidades poco familiares. Introduce un valor para ver varios resultados relacionados. Incluye calculadoras de densidad, tiempo de transferencia de datos, dilución, coste energético, iluminación y concentración.",
        "features": [
          "Longitud, temperatura, masa, velocidad y más.",
          "Varios resultados de conversión a partir de un valor.",
          "Búsqueda, favoritos y cálculos recientes.",
          "Cálculos sin conexión y sin cuenta."
        ]
      },
      "fr": {
        "summary": "Convertissez les unités du quotidien et les unités techniques, avec des calculateurs utiles et vos favoris à portée de main.",
        "overview": "Unit Converter aide lorsqu’une recette, une mesure ou une tâche technique utilise des unités inhabituelles. Une seule valeur donne plusieurs résultats associés. Des calculateurs couvrent densité, durée de transfert, dilution, coût de l’énergie, éclairage et concentration.",
        "features": [
          "Longueur, température, masse, vitesse et plus encore.",
          "Plusieurs conversions à partir d’une seule valeur.",
          "Recherche, favoris et calculs récents.",
          "Calculs hors ligne, sans compte."
        ]
      },
      "pt-BR": {
        "summary": "Converta unidades do dia a dia e técnicas, com calculadoras úteis e acesso rápido aos favoritos.",
        "overview": "Unit Converter ajuda quando uma receita, medida ou tarefa técnica usa unidades pouco familiares. Digite um valor para ver vários resultados relacionados. Há calculadoras de densidade, tempo de transferência de dados, diluição, custo de energia, iluminação e concentração.",
        "features": [
          "Comprimento, temperatura, massa, velocidade e mais.",
          "Vários resultados de conversão a partir de um valor.",
          "Busca, favoritos e cálculos recentes.",
          "Cálculos offline sem conta."
        ]
      },
      "pl": {
        "summary": "Przeliczaj codzienne i techniczne jednostki, korzystając z kalkulatorów i szybkiego dostępu do ulubionych.",
        "overview": "Unit Converter pomaga przy nieznanych jednostkach w przepisach, pomiarach i zadaniach technicznych. Jedna wartość daje kilka powiązanych wyników. Kalkulatory obejmują gęstość, czas przesyłania danych, rozcieńczanie, koszty energii, oświetlenie i stężenie.",
        "features": [
          "Długość, temperatura, masa, prędkość i inne wielkości.",
          "Kilka wyników przeliczenia z jednej wartości.",
          "Wyszukiwanie, ulubione i ostatnie obliczenia.",
          "Obliczenia offline bez konta."
        ]
      },
      "it": {
        "summary": "Converti unità quotidiane e tecniche, con calcolatori utili e accesso rapido ai preferiti.",
        "overview": "Unit Converter aiuta quando una ricetta, una misura o un compito tecnico usa unità poco familiari. Un solo valore mostra più risultati collegati. I calcolatori coprono densità, tempo di trasferimento dati, diluizione, costo energetico, illuminazione e concentrazione.",
        "features": [
          "Lunghezza, temperatura, massa, velocità e altro.",
          "Più risultati di conversione da un solo valore.",
          "Ricerca, preferiti e calcoli recenti.",
          "Calcoli offline senza account."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "ott-e",
    "name": "Ott e!",
    "status": "soon",
    "icon": "assets/ic_otte_master_1024_reference.png",
    "copy": {
      "en": {
        "summary": "A touch game for cats, with moving prey and play settings you can adjust.",
        "overview": "A moving prey appears one at a time for the cat to chase and tap. Each species moves differently and reacts to successful touches. Choose playtime and prey before starting; settings stay hidden while the cat plays.",
        "features": [
          "Fly, mosquito, ladybird, beetle, cockroach, grasshopper and spider.",
          "Choose 1, 3, 5, 10, 15 or 20 minutes, plus prey, sound and vibration.",
          "Full-screen play on tablets and phones.",
          "Offline, ad-free play without an account."
        ]
      },
      "hu": {
        "summary": "Érintős játék macskáknak, mozgó zsákmányokkal és a gazdi által állítható játékbeállításokkal.",
        "overview": "A képernyőn egyszerre egy mozgó zsákmány jelenik meg, amelyet a macska követhet és megérinthet. Minden faj másként mozog, és reagál a sikeres érintésre. Indítás előtt választhatsz játékidőt és zsákmányokat; játék közben a beállítások rejtve maradnak.",
        "features": [
          "Légy, szúnyog, katica, bogár, csótány, szöcske és pók.",
          "1, 3, 5, 10, 15 vagy 20 perc; választható zsákmány, hang és rezgés.",
          "Teljes képernyős játék tableten és telefonon.",
          "Offline, reklámmentes játék fiók nélkül."
        ]
      },
      "de": {
        "summary": "Ein Touch-Spiel für Katzen mit bewegter Beute und einstellbaren Spieloptionen.",
        "overview": "Jeweils eine bewegte Beute lädt die Katze zum Verfolgen und Antippen ein. Jede Art bewegt sich anders und reagiert auf erfolgreiche Berührungen. Spieldauer und Beute werden vor dem Start gewählt; die Einstellungen bleiben während des Spiels verborgen.",
        "features": [
          "Fliege, Mücke, Marienkäfer, Käfer, Schabe, Heuschrecke und Spinne.",
          "1, 3, 5, 10, 15 oder 20 Minuten; Beute, Ton und Vibration wählen.",
          "Vollbildspiel auf Tablets und Smartphones.",
          "Offline und werbefrei, ohne Benutzerkonto."
        ]
      },
      "es": {
        "summary": "Un juego táctil para gatos, con presas en movimiento y opciones de juego ajustables.",
        "overview": "Una presa en movimiento aparece cada vez para que el gato la persiga y toque. Cada especie se mueve de forma distinta y reacciona a los toques acertados. Elige duración y presas antes de empezar; los ajustes quedan ocultos durante el juego.",
        "features": [
          "Mosca, mosquito, mariquita, escarabajo, cucaracha, saltamontes y araña.",
          "Elige 1, 3, 5, 10, 15 o 20 minutos, además de presas, sonido y vibración.",
          "Juego a pantalla completa en tabletas y teléfonos.",
          "Sin conexión, sin anuncios y sin cuenta."
        ]
      },
      "fr": {
        "summary": "Un jeu tactile pour les chats, avec des proies en mouvement et des réglages adaptés à vos envies.",
        "overview": "Une seule proie en mouvement apparaît à la fois pour que le chat la poursuive et la touche. Chaque espèce bouge différemment et réagit aux touches réussies. Choisissez durée et proies avant de commencer ; les réglages restent cachés pendant le jeu.",
        "features": [
          "Mouche, moustique, coccinelle, coléoptère, cafard, sauterelle et araignée.",
          "Choix de 1, 3, 5, 10, 15 ou 20 minutes, des proies, du son et des vibrations.",
          "Jeu en plein écran sur tablette et téléphone.",
          "Hors ligne, sans publicité et sans compte."
        ]
      },
      "pt-BR": {
        "summary": "Um jogo de toque para gatos, com presas em movimento e opções de brincadeira ajustáveis.",
        "overview": "Uma presa em movimento aparece por vez para o gato perseguir e tocar. Cada espécie se move de um jeito e reage aos toques certeiros. Escolha duração e presas antes de começar; as configurações ficam ocultas durante a brincadeira.",
        "features": [
          "Mosca, mosquito, joaninha, besouro, barata, gafanhoto e aranha.",
          "Escolha 1, 3, 5, 10, 15 ou 20 minutos, presas, som e vibração.",
          "Jogo em tela cheia em tablets e celulares.",
          "Offline, sem anúncios e sem conta."
        ]
      },
      "pl": {
        "summary": "Gra dotykowa dla kotów z poruszającymi się zdobyczami i ustawieniami zabawy.",
        "overview": "Na ekranie pojawia się jedna ruchoma zdobycz, którą kot może śledzić i dotykać. Każdy gatunek porusza się inaczej i reaguje na trafne dotknięcia. Wybierz czas i zdobycze przed startem; ustawienia pozostają ukryte podczas gry.",
        "features": [
          "Mucha, komar, biedronka, chrząszcz, karaluch, konik polny i pająk.",
          "Wybór 1, 3, 5, 10, 15 lub 20 minut, zdobyczy, dźwięku i wibracji.",
          "Gra na pełnym ekranie tabletu i telefonu.",
          "Offline, bez reklam i bez konta."
        ]
      },
      "it": {
        "summary": "Un gioco touch per gatti, con prede in movimento e impostazioni di gioco regolabili.",
        "overview": "Una preda in movimento compare alla volta perché il gatto possa seguirla e toccarla. Ogni specie si muove diversamente e reagisce ai tocchi riusciti. Scegli durata e prede prima di iniziare; le impostazioni restano nascoste durante il gioco.",
        "features": [
          "Mosca, zanzara, coccinella, coleottero, scarafaggio, cavalletta e ragno.",
          "Scegli 1, 3, 5, 10, 15 o 20 minuti, prede, suono e vibrazione.",
          "Gioco a schermo intero su tablet e telefoni.",
          "Offline, senza pubblicità e senza account."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "age-date-toolkit",
    "name": "Age & Date Toolkit",
    "status": "creating",
    "icon": "assets/icons/age-date-toolkit.png",
    "copy": {
      "en": {
        "summary": "Find exact ages, compare dates and count down to birthdays and anniversaries.",
        "overview": "Calculate exact age, date differences and time until the next birthday or anniversary; add or subtract calendar periods from dates. Designed for offline use.",
        "features": [
          "Age in years, months and days.",
          "Add or subtract years, months, weeks and days.",
          "Save named dates and copy results.",
          "Calculations work offline."
        ]
      },
      "hu": {
        "summary": "Pontos életkor, dátumkülönbségek és a születésnapokig vagy évfordulókig hátralévő idő kiszámítása.",
        "overview": "Pontos életkor, dátumkülönbség és a következő születésnapig vagy évfordulóig hátralévő idő számítása; naptári időszakok hozzáadása és kivonása. Offline használatra készül.",
        "features": [
          "Életkor években, hónapokban és napokban.",
          "Évek, hónapok, hetek és napok hozzáadása vagy kivonása.",
          "Elnevezett dátumok mentése és eredmények másolása.",
          "A számítások offline működnek."
        ]
      },
      "de": {
        "summary": "Das genaue Alter berechnen, Daten vergleichen und die Zeit bis zu Geburtstagen oder Jahrestagen anzeigen.",
        "overview": "Exaktes Alter, Datumsabstände und Zeit bis zum nächsten Geburtstag oder Jahrestag berechnen; Kalenderzeiträume zu Daten addieren oder abziehen. Für Offline-Nutzung geplant.",
        "features": [
          "Alter in Jahren, Monaten und Tagen.",
          "Jahre, Monate, Wochen und Tage addieren oder abziehen.",
          "Benannte Daten speichern und Ergebnisse kopieren.",
          "Berechnungen funktionieren offline."
        ]
      },
      "es": {
        "summary": "Calcula edades exactas, compara fechas y consulta cuánto falta para cumpleaños y aniversarios.",
        "overview": "Calcula edad exacta, diferencias entre fechas y tiempo hasta el próximo cumpleaños o aniversario; suma o resta periodos de calendario. Previsto para uso sin conexión.",
        "features": [
          "Edad en años, meses y días.",
          "Suma o resta años, meses, semanas y días.",
          "Guarda fechas con nombre y copia los resultados.",
          "Los cálculos funcionan sin conexión."
        ]
      },
      "fr": {
        "summary": "Calculez un âge exact, comparez des dates et voyez le temps restant jusqu’aux anniversaires.",
        "overview": "Calcule l’âge exact, les écarts entre dates et le temps jusqu’au prochain anniversaire ; ajoute ou retire des périodes calendaires. Conçu pour fonctionner hors ligne.",
        "features": [
          "Âge en années, mois et jours.",
          "Ajout ou retrait d’années, de mois, de semaines et de jours.",
          "Dates nommées enregistrées et résultats copiables.",
          "Calculs disponibles hors ligne."
        ]
      },
      "pt-BR": {
        "summary": "Calcule idades exatas, compare datas e veja quanto falta para aniversários e datas comemorativas.",
        "overview": "Calcula idade exata, diferenças entre datas e tempo até o próximo aniversário; soma ou subtrai períodos do calendário. Planejado para uso offline.",
        "features": [
          "Idade em anos, meses e dias.",
          "Some ou subtraia anos, meses, semanas e dias.",
          "Salve datas com nome e copie resultados.",
          "Os cálculos funcionam offline."
        ]
      },
      "pl": {
        "summary": "Oblicz dokładny wiek, porównaj daty i sprawdź czas do urodzin lub rocznicy.",
        "overview": "Oblicza dokładny wiek, różnice między datami i czas do kolejnych urodzin lub rocznicy; dodaje i odejmuje okresy kalendarzowe. Planowane działanie offline.",
        "features": [
          "Wiek w latach, miesiącach i dniach.",
          "Dodawanie i odejmowanie lat, miesięcy, tygodni i dni.",
          "Zapisywanie nazwanych dat i kopiowanie wyników.",
          "Obliczenia działają offline."
        ]
      },
      "it": {
        "summary": "Calcola l’età esatta, confronta date e scopri quanto manca a compleanni e anniversari.",
        "overview": "Calcola età esatta, differenze tra date e tempo al prossimo compleanno o anniversario; aggiunge e sottrae periodi di calendario. Previsto per l’uso offline.",
        "features": [
          "Età in anni, mesi e giorni.",
          "Aggiungi o sottrai anni, mesi, settimane e giorni.",
          "Salva date con un nome e copia i risultati.",
          "I calcoli funzionano offline."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "stopwatch-multi-timer",
    "name": "Stopwatch & Multi Timer",
    "status": "creating",
    "icon": "assets/icons/stopwatch-multi-timer.png",
    "copy": {
      "en": {
        "summary": "Time activities with a stopwatch and several named countdown timers running together.",
        "overview": "Stopwatch with current laps plus multiple named timers, presets and timer history.",
        "features": [
          "Record lap and split times.",
          "Save timer presets and view timer history.",
          "Timers continue with the screen off.",
          "Sound, vibration and notifications when time is up."
        ]
      },
      "hu": {
        "summary": "Stopper és több párhuzamos, elnevezhető visszaszámláló a hétköznapi időméréshez.",
        "overview": "Stopper aktuális köridőkkel, több elnevezhető időzítővel, presetekkel és időzítő-előzményekkel.",
        "features": [
          "Köridők és részidők rögzítése.",
          "Mentett időzítőbeállítások és időzítő-előzmények.",
          "Az időzítők kikapcsolt kijelzőnél is futnak.",
          "Lejáratkor hang, rezgés és értesítés."
        ]
      },
      "de": {
        "summary": "Eine Stoppuhr und mehrere benennbare Countdown-Timer für die Zeitmessung im Alltag.",
        "overview": "Stoppuhr mit aktuellen Runden sowie mehrere benannte Timer, Vorlagen und Timer-Verlauf.",
        "features": [
          "Runden- und Zwischenzeiten erfassen.",
          "Timer-Vorlagen speichern und Timer-Verlauf ansehen.",
          "Timer laufen bei ausgeschaltetem Bildschirm weiter.",
          "Ton, Vibration und Benachrichtigung bei Ablauf."
        ]
      },
      "es": {
        "summary": "Mide el tiempo con un cronómetro y varios temporizadores con nombre funcionando a la vez.",
        "overview": "Cronómetro con vueltas actuales y varios temporizadores con nombre, preajustes e historial de temporizadores.",
        "features": [
          "Registra tiempos de vuelta y parciales.",
          "Guarda ajustes y consulta el historial de temporizadores.",
          "Los temporizadores siguen con la pantalla apagada.",
          "Sonido, vibración y aviso al terminar."
        ]
      },
      "fr": {
        "summary": "Mesurez le temps avec un chronomètre et plusieurs minuteurs nommés fonctionnant ensemble.",
        "overview": "Chronomètre avec tours en cours, plusieurs minuteurs nommés, préréglages et historique des minuteurs.",
        "features": [
          "Enregistrement des tours et temps intermédiaires.",
          "Préréglages et historique des minuteurs.",
          "Les minuteurs continuent quand l’écran est éteint.",
          "Son, vibration et notification à la fin."
        ]
      },
      "pt-BR": {
        "summary": "Meça o tempo com um cronômetro e vários temporizadores com nome funcionando juntos.",
        "overview": "Cronômetro com voltas atuais e vários timers nomeados, predefinições e histórico de timers.",
        "features": [
          "Registre voltas e tempos parciais.",
          "Salve configurações e veja o histórico de temporizadores.",
          "Os temporizadores continuam com a tela apagada.",
          "Som, vibração e aviso quando o tempo acaba."
        ]
      },
      "pl": {
        "summary": "Mierz czas stoperem i kilkoma nazwanymi minutnikami działającymi jednocześnie.",
        "overview": "Stoper z bieżącymi okrążeniami oraz wiele nazwanych minutników, szablony i historia minutników.",
        "features": [
          "Zapisywanie okrążeń i międzyczasów.",
          "Zapisane ustawienia i historia minutników.",
          "Minutniki działają przy wyłączonym ekranie.",
          "Dźwięk, wibracje i powiadomienie po upływie czasu."
        ]
      },
      "it": {
        "summary": "Misura il tempo con un cronometro e più timer con nome attivi insieme.",
        "overview": "Cronometro con giri correnti e più timer nominabili, preset e cronologia dei timer.",
        "features": [
          "Registra tempi sul giro e intermedi.",
          "Salva impostazioni e consulta la cronologia dei timer.",
          "I timer continuano a schermo spento.",
          "Suono, vibrazione e notifica allo scadere."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "fraction-calculator",
    "name": "Fraction Calculator",
    "status": "creating",
    "icon": "assets/icons/fraction-calculator.png",
    "copy": {
      "en": {
        "summary": "Calculate with fractions and mixed numbers, and follow the steps to the answer.",
        "overview": "Add, subtract, multiply, divide and simplify fractions and mixed numbers, with step-by-step working and fraction–decimal conversion.",
        "features": [
          "Add, subtract, multiply, divide and simplify.",
          "Convert between fractions and decimals.",
          "Show percentages and repeating decimals.",
          "Fractional-inch helper for practical measurements."
        ]
      },
      "hu": {
        "summary": "Számolás törtekkel és vegyes számokkal, követhető, lépésenkénti levezetéssel.",
        "overview": "Törtek és vegyes számok összeadása, kivonása, szorzása, osztása és egyszerűsítése lépésenkénti levezetéssel, valamint tört–tizedes átváltással.",
        "features": [
          "Összeadás, kivonás, szorzás, osztás és egyszerűsítés.",
          "Átváltás tört és tizedes szám között.",
          "Százalékok és szakaszos tizedes törtek megjelenítése.",
          "Segéd a tört hüvelykben megadott méretekhez."
        ]
      },
      "de": {
        "summary": "Mit Brüchen und gemischten Zahlen rechnen und den Lösungsweg Schritt für Schritt nachvollziehen.",
        "overview": "Brüche und gemischte Zahlen addieren, subtrahieren, multiplizieren, dividieren und kürzen, mit Rechenschritten und Dezimalumrechnung.",
        "features": [
          "Addieren, subtrahieren, multiplizieren, dividieren und kürzen.",
          "Zwischen Brüchen und Dezimalzahlen umrechnen.",
          "Prozentwerte und periodische Dezimalzahlen anzeigen.",
          "Hilfe für Maße in Zollbrüchen."
        ]
      },
      "es": {
        "summary": "Calcula con fracciones y números mixtos y sigue la solución paso a paso.",
        "overview": "Suma, resta, multiplica, divide y simplifica fracciones y números mixtos, con pasos de cálculo y conversión a decimales.",
        "features": [
          "Suma, resta, multiplica, divide y simplifica.",
          "Convierte entre fracciones y decimales.",
          "Muestra porcentajes y decimales periódicos.",
          "Ayuda para medidas en fracciones de pulgada."
        ]
      },
      "fr": {
        "summary": "Calculez avec des fractions et des nombres mixtes, puis suivez la résolution étape par étape.",
        "overview": "Addition, soustraction, multiplication, division et simplification de fractions et nombres mixtes, avec étapes et conversion décimale.",
        "features": [
          "Addition, soustraction, multiplication, division et simplification.",
          "Conversion entre fractions et nombres décimaux.",
          "Pourcentages et décimales périodiques.",
          "Aide pour les mesures en fractions de pouce."
        ]
      },
      "pt-BR": {
        "summary": "Calcule com frações e números mistos e acompanhe a solução passo a passo.",
        "overview": "Soma, subtrai, multiplica, divide e simplifica frações e números mistos, com etapas e conversão decimal.",
        "features": [
          "Some, subtraia, multiplique, divida e simplifique.",
          "Converta entre frações e decimais.",
          "Veja porcentagens e dízimas periódicas.",
          "Auxílio para medidas em frações de polegada."
        ]
      },
      "pl": {
        "summary": "Obliczaj ułamki i liczby mieszane oraz śledź rozwiązanie krok po kroku.",
        "overview": "Dodawanie, odejmowanie, mnożenie, dzielenie i skracanie ułamków oraz liczb mieszanych, z krokami i zamianą na dziesiętne.",
        "features": [
          "Dodawanie, odejmowanie, mnożenie, dzielenie i skracanie.",
          "Zamiana ułamków na liczby dziesiętne i odwrotnie.",
          "Procenty i rozwinięcia dziesiętne okresowe.",
          "Pomoc przy wymiarach w ułamkach cala."
        ]
      },
      "it": {
        "summary": "Calcola con frazioni e numeri misti e segui la soluzione passo dopo passo.",
        "overview": "Somma, sottrazione, moltiplicazione, divisione e semplificazione di frazioni e numeri misti, con passaggi e conversione decimale.",
        "features": [
          "Somma, sottrai, moltiplica, dividi e semplifica.",
          "Converti tra frazioni e numeri decimali.",
          "Visualizza percentuali e decimali periodici.",
          "Aiuto per misure in frazioni di pollice."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "last-done",
    "name": "Last Done",
    "status": "creating",
    "icon": "assets/icons/last-done.png",
    "copy": {
      "en": {
        "summary": "Remember when you last did a recurring task and when it is due again.",
        "overview": "Record a recurring task with one tap, see when it was last done and its history, and optionally set intervals, reminders and a due-date countdown.",
        "features": [
          "Record completion with one tap.",
          "See past completions and elapsed time.",
          "Choose repeat intervals and optional reminders.",
          "Organize tasks into categories."
        ]
      },
      "hu": {
        "summary": "Jegyezd meg, mikor végeztél el utoljára egy visszatérő teendőt, és mikor esedékes újra.",
        "overview": "Egy érintéssel rögzíti az ismétlődő teendőt, mutatja az utolsó alkalmat és az előzményeket; opcionális időköz, emlékeztető és esedékességi visszaszámlálás állítható.",
        "features": [
          "Elvégzés rögzítése egy érintéssel.",
          "Korábbi alkalmak és az eltelt idő megtekintése.",
          "Állítható ismétlődési időköz és opcionális emlékeztető.",
          "Teendők rendezése kategóriákba."
        ]
      },
      "de": {
        "summary": "Festhalten, wann eine wiederkehrende Aufgabe zuletzt erledigt wurde und wann sie wieder ansteht.",
        "overview": "Wiederkehrende Aufgaben mit einem Tipp erfassen, letzte Erledigung und Verlauf sehen und optional Intervalle, Erinnerungen und einen Fälligkeits-Countdown einstellen.",
        "features": [
          "Erledigung mit einem Tipp speichern.",
          "Frühere Erledigungen und vergangene Zeit ansehen.",
          "Intervalle und optionale Erinnerungen festlegen.",
          "Aufgaben in Kategorien ordnen."
        ]
      },
      "es": {
        "summary": "Recuerda cuándo hiciste por última vez una tarea recurrente y cuándo toca repetirla.",
        "overview": "Registra tareas recurrentes con un toque, consulta la última vez y el historial, y configura opcionalmente intervalos, recordatorios y cuenta atrás hasta el vencimiento.",
        "features": [
          "Registra la tarea realizada con un toque.",
          "Consulta las veces anteriores y el tiempo transcurrido.",
          "Elige intervalos y recordatorios opcionales.",
          "Organiza las tareas por categorías."
        ]
      },
      "fr": {
        "summary": "Retrouvez quand vous avez effectué une tâche récurrente et quand elle sera à refaire.",
        "overview": "Enregistre une tâche récurrente d’un geste, affiche la dernière fois et l’historique, avec intervalles, rappels et compte à rebours facultatifs.",
        "features": [
          "Enregistrement d’une tâche effectuée en un geste.",
          "Historique des réalisations et temps écoulé.",
          "Intervalles et rappels facultatifs.",
          "Classement des tâches par catégorie."
        ]
      },
      "pt-BR": {
        "summary": "Lembre quando fez uma tarefa recorrente pela última vez e quando deve repeti-la.",
        "overview": "Registra uma tarefa recorrente com um toque, mostra a última vez e o histórico, com intervalos, lembretes e contagem regressiva opcionais.",
        "features": [
          "Registre a conclusão com um toque.",
          "Veja as conclusões anteriores e o tempo decorrido.",
          "Escolha intervalos e lembretes opcionais.",
          "Organize tarefas por categorias."
        ]
      },
      "pl": {
        "summary": "Pamiętaj, kiedy ostatnio wykonano powtarzalne zadanie i kiedy trzeba je powtórzyć.",
        "overview": "Zapisuje powtarzalne zadanie jednym dotknięciem, pokazuje ostatnie wykonanie i historię oraz opcjonalne odstępy, przypomnienia i odliczanie do terminu.",
        "features": [
          "Zapisanie wykonania jednym dotknięciem.",
          "Historia wykonań i czas od ostatniego.",
          "Odstępy powtórzeń i opcjonalne przypomnienia.",
          "Porządkowanie zadań w kategorie."
        ]
      },
      "it": {
        "summary": "Ricorda quando hai svolto un’attività ricorrente e quando dovrai ripeterla.",
        "overview": "Registra un’attività ricorrente con un tocco, mostra l’ultima esecuzione e la cronologia, con intervalli, promemoria e conto alla rovescia facoltativi.",
        "features": [
          "Registra il completamento con un tocco.",
          "Consulta i completamenti precedenti e il tempo trascorso.",
          "Scegli intervalli e promemoria facoltativi.",
          "Organizza le attività in categorie."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "material-calculator",
    "name": "Material Calculator",
    "status": "creating",
    "icon": "assets/icons/material-calculator.png",
    "copy": {
      "en": {
        "summary": "Estimate how much paint, flooring, tile or other material you need for home projects.",
        "overview": "Estimate paint, flooring, tile, concrete, wallpaper and other household DIY quantities from measurements, with waste allowance and common units.",
        "features": [
          "Calculate areas and volumes from measurements.",
          "Allow for waste and subtract openings.",
          "Round up to whole packs or boxes.",
          "Metric and imperial units, offline."
        ]
      },
      "hu": {
        "summary": "Számold ki, mennyi festék, padlóburkolat, csempe vagy más anyag kell az otthoni munkákhoz.",
        "overview": "Méretekből becsüli a festék, padló, csempe, beton, tapéta és más otthoni barkácsanyag mennyiségét, ráhagyással és szokásos egységekkel.",
        "features": [
          "Területek és térfogatok számítása méretekből.",
          "Ráhagyás és a nyílások területének levonása.",
          "Felfelé kerekítés egész csomagra vagy dobozra.",
          "Metrikus és angolszász egységek, offline."
        ]
      },
      "de": {
        "summary": "Den Bedarf an Farbe, Bodenbelag, Fliesen und anderen Materialien für Heimwerkerarbeiten abschätzen.",
        "overview": "Schätzt aus Maßen die Mengen für Farbe, Boden, Fliesen, Beton, Tapete und weitere Heimwerkerarbeiten, mit Verschnittzuschlag und gängigen Einheiten.",
        "features": [
          "Flächen und Volumen aus Maßen berechnen.",
          "Verschnitt einplanen und Öffnungen abziehen.",
          "Auf ganze Packungen oder Kartons aufrunden.",
          "Metrische und imperiale Einheiten, offline."
        ]
      },
      "es": {
        "summary": "Estima cuánta pintura, suelo, baldosa u otro material necesitas para trabajos en casa.",
        "overview": "Estima pintura, suelos, azulejos, hormigón, papel pintado y otros materiales domésticos a partir de medidas, con margen y unidades comunes.",
        "features": [
          "Calcula superficies y volúmenes a partir de medidas.",
          "Añade margen de desperdicio y resta huecos.",
          "Redondea a paquetes o cajas completos.",
          "Unidades métricas e imperiales, sin conexión."
        ]
      },
      "fr": {
        "summary": "Estimez les quantités de peinture, revêtement, carrelage ou autres matériaux pour vos travaux à la maison.",
        "overview": "Estime peinture, revêtement de sol, carrelage, béton, papier peint et autres matériaux domestiques à partir des mesures, avec marge et unités courantes.",
        "features": [
          "Calcul des surfaces et volumes à partir des dimensions.",
          "Marge pour les pertes et déduction des ouvertures.",
          "Arrondi au nombre entier de paquets ou cartons.",
          "Unités métriques et impériales, hors ligne."
        ]
      },
      "pt-BR": {
        "summary": "Estime quanto de tinta, piso, revestimento ou outro material precisa para serviços em casa.",
        "overview": "Estima tinta, piso, azulejos, concreto, papel de parede e outros materiais domésticos a partir de medidas, com margem e unidades comuns.",
        "features": [
          "Calcule áreas e volumes a partir das medidas.",
          "Inclua margem para perdas e desconte aberturas.",
          "Arredonde para pacotes ou caixas inteiros.",
          "Unidades métricas e imperiais, offline."
        ]
      },
      "pl": {
        "summary": "Oszacuj ilość farby, podłogi, płytek i innych materiałów do prac domowych.",
        "overview": "Szacuje z wymiarów ilość farby, podłogi, płytek, betonu, tapety i innych materiałów domowych, z zapasem i typowymi jednostkami.",
        "features": [
          "Obliczanie powierzchni i objętości z wymiarów.",
          "Zapas na straty i odliczanie otworów.",
          "Zaokrąglanie do pełnych opakowań lub pudeł.",
          "Jednostki metryczne i imperialne, offline."
        ]
      },
      "it": {
        "summary": "Stima quanta vernice, pavimentazione, piastrelle o altro materiale serve per i lavori di casa.",
        "overview": "Stima vernice, pavimenti, piastrelle, calcestruzzo, carta da parati e altri materiali domestici dalle misure, con margine e unità comuni.",
        "features": [
          "Calcola superfici e volumi dalle misure.",
          "Aggiungi margine per gli scarti e sottrai le aperture.",
          "Arrotonda a confezioni o scatole intere.",
          "Unità metriche e imperiali, offline."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "bubble-level-inclinometer",
    "name": "Bubble Level & Inclinometer",
    "status": "creating",
    "icon": "assets/icons/bubble-level-inclinometer.png",
    "copy": {
      "en": {
        "summary": "Check whether a surface is level and measure its tilt with your phone’s sensors.",
        "overview": "Use available sensors for horizontal, vertical and two-axis leveling, slope and inclination readings, with calibration and relative zero. Accuracy depends on the device.",
        "features": [
          "Horizontal, vertical and two-axis leveling.",
          "Calibration and a relative zero point.",
          "Freeze a reading for easier viewing.",
          "Accuracy depends on your device and calibration."
        ]
      },
      "hu": {
        "summary": "Ellenőrizd, vízszintes-e egy felület, és mérd meg a dőlését a telefon érzékelőivel.",
        "overview": "A rendelkezésre álló szenzorokkal vízszintes, függőleges és kéttengelyes szintezés, lejtés- és dőlésmérés végezhető, kalibrálással és relatív nullázással. A pontosság készülékfüggő.",
        "features": [
          "Vízszintes, függőleges és kéttengelyes szintezés.",
          "Kalibrálás és relatív nullpont beállítása.",
          "A mért érték kimerevítése a leolvasáshoz.",
          "A pontosság a készüléktől és a kalibrálástól függ."
        ]
      },
      "de": {
        "summary": "Mit den Handysensoren prüfen, ob eine Fläche gerade ist, und ihre Neigung messen.",
        "overview": "Verfügbare Sensoren für horizontale, vertikale und zweiachsige Nivellierung sowie Neigung nutzen, mit Kalibrierung und relativem Nullpunkt. Die Genauigkeit hängt vom Gerät ab.",
        "features": [
          "Horizontale, vertikale und zweiachsige Nivellierung.",
          "Kalibrierung und relativer Nullpunkt.",
          "Messwert zum Ablesen einfrieren.",
          "Genauigkeit hängt von Gerät und Kalibrierung ab."
        ]
      },
      "es": {
        "summary": "Comprueba si una superficie está nivelada y mide su inclinación con los sensores del teléfono.",
        "overview": "Usa los sensores disponibles para nivel horizontal, vertical y de dos ejes, pendiente e inclinación, con calibración y cero relativo. La precisión depende del dispositivo.",
        "features": [
          "Nivel horizontal, vertical y de dos ejes.",
          "Calibración y punto cero relativo.",
          "Fija una lectura para verla con facilidad.",
          "La precisión depende del dispositivo y la calibración."
        ]
      },
      "fr": {
        "summary": "Vérifiez le niveau d’une surface et mesurez son inclinaison avec les capteurs du téléphone.",
        "overview": "Utilise les capteurs disponibles pour niveau horizontal, vertical et à deux axes, pente et inclinaison, avec étalonnage et zéro relatif. La précision dépend de l’appareil.",
        "features": [
          "Niveau horizontal, vertical et sur deux axes.",
          "Étalonnage et zéro relatif.",
          "Lecture figée pour faciliter la consultation.",
          "Précision dépendant de l’appareil et de l’étalonnage."
        ]
      },
      "pt-BR": {
        "summary": "Confira se uma superfície está nivelada e meça sua inclinação com os sensores do celular.",
        "overview": "Usa sensores disponíveis para nivelamento horizontal, vertical e em dois eixos, declive e inclinação, com calibração e zero relativo. A precisão depende do aparelho.",
        "features": [
          "Nivelamento horizontal, vertical e em dois eixos.",
          "Calibração e ponto zero relativo.",
          "Congele uma leitura para facilitar a consulta.",
          "A precisão depende do aparelho e da calibração."
        ]
      },
      "pl": {
        "summary": "Sprawdź poziom powierzchni i zmierz jej nachylenie czujnikami telefonu.",
        "overview": "Używa dostępnych czujników do poziomowania poziomego, pionowego i dwuosiowego oraz pomiaru nachylenia, z kalibracją i zerem względnym. Dokładność zależy od urządzenia.",
        "features": [
          "Poziomowanie poziome, pionowe i w dwóch osiach.",
          "Kalibracja i względny punkt zerowy.",
          "Zatrzymanie wskazania do wygodnego odczytu.",
          "Dokładność zależy od urządzenia i kalibracji."
        ]
      },
      "it": {
        "summary": "Verifica se una superficie è in piano e misura l’inclinazione con i sensori del telefono.",
        "overview": "Usa i sensori disponibili per livellamento orizzontale, verticale e su due assi, pendenza e inclinazione, con calibrazione e zero relativo. La precisione dipende dal dispositivo.",
        "features": [
          "Livellamento orizzontale, verticale e su due assi.",
          "Calibrazione e punto zero relativo.",
          "Blocca una lettura per consultarla meglio.",
          "La precisione dipende dal dispositivo e dalla calibrazione."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "ruler-protractor",
    "name": "Ruler & Protractor",
    "status": "creating",
    "icon": "assets/icons/ruler-protractor.png",
    "copy": {
      "en": {
        "summary": "Measure small objects and angles with a calibrated ruler and protractor on your screen.",
        "overview": "A calibrated on-screen ruler with metric and imperial scales, plus 0–180° and 0–360° protractor modes for short objects and angles.",
        "features": [
          "Metric and imperial ruler scales.",
          "Move markers to measure between two points.",
          "Protractor modes from 0–180° and 0–360°.",
          "Calibrate against a known length."
        ]
      },
      "hu": {
        "summary": "Rövid tárgyak és szögek mérése kalibrált képernyős vonalzóval és szögmérővel.",
        "overview": "Kalibrált képernyős vonalzó metrikus és angolszász skálával, valamint 0–180° és 0–360° szögmérő rövid tárgyakhoz és szögekhez.",
        "features": [
          "Metrikus és angolszász vonalzóskála.",
          "Mozgatható jelölők két pont távolságához.",
          "0–180° és 0–360° szögmérő mód.",
          "Kalibrálás ismert hosszúság alapján."
        ]
      },
      "de": {
        "summary": "Kleine Gegenstände und Winkel mit einem kalibrierten Bildschirmlineal und Winkelmesser messen.",
        "overview": "Kalibriertes Bildschirmlineal mit metrischer und imperialer Skala sowie Winkelmesser für 0–180° und 0–360° bei kurzen Gegenständen und Winkeln.",
        "features": [
          "Metrische und imperiale Linealskalen.",
          "Abstand zwischen zwei verschiebbaren Markierungen.",
          "Winkelmesser für 0–180° und 0–360°.",
          "Mit einer bekannten Länge kalibrieren."
        ]
      },
      "es": {
        "summary": "Mide objetos pequeños y ángulos con una regla y un transportador calibrados en pantalla.",
        "overview": "Regla calibrada en pantalla con escalas métrica e imperial, y transportador de 0–180° y 0–360° para objetos cortos y ángulos.",
        "features": [
          "Escalas métricas e imperiales.",
          "Marcadores móviles para medir entre dos puntos.",
          "Transportador de 0–180° y 0–360°.",
          "Calibra con una longitud conocida."
        ]
      },
      "fr": {
        "summary": "Mesurez de petits objets et des angles avec une règle et un rapporteur étalonnés à l’écran.",
        "overview": "Règle étalonnée à l’écran en unités métriques et impériales, avec rapporteur 0–180° et 0–360° pour petits objets et angles.",
        "features": [
          "Graduations métriques et impériales.",
          "Repères mobiles pour la distance entre deux points.",
          "Rapporteurs de 0–180° et de 0–360°.",
          "Étalonnage avec une longueur connue."
        ]
      },
      "pt-BR": {
        "summary": "Meça objetos pequenos e ângulos com régua e transferidor calibrados na tela.",
        "overview": "Régua calibrada na tela com escalas métrica e imperial, além de transferidor de 0–180° e 0–360° para objetos curtos e ângulos.",
        "features": [
          "Escalas métricas e imperiais.",
          "Marcadores móveis para medir entre dois pontos.",
          "Transferidor de 0–180° e 0–360°.",
          "Calibre com um comprimento conhecido."
        ]
      },
      "pl": {
        "summary": "Mierz małe przedmioty i kąty skalibrowaną linijką oraz kątomierzem na ekranie.",
        "overview": "Skalibrowana linijka ekranowa w jednostkach metrycznych i imperialnych oraz kątomierz 0–180° i 0–360° do małych przedmiotów i kątów.",
        "features": [
          "Skale metryczne i imperialne.",
          "Ruchome znaczniki do pomiaru między dwoma punktami.",
          "Kątomierz 0–180° i 0–360°.",
          "Kalibracja według znanej długości."
        ]
      },
      "it": {
        "summary": "Misura piccoli oggetti e angoli con righello e goniometro calibrati sullo schermo.",
        "overview": "Righello calibrato sullo schermo con scale metriche e imperiali, più goniometro 0–180° e 0–360° per oggetti piccoli e angoli.",
        "features": [
          "Scale metriche e imperiali.",
          "Marcatori mobili per misurare tra due punti.",
          "Goniometro da 0–180° e da 0–360°.",
          "Calibra con una lunghezza nota."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "sound-meter",
    "name": "Sound Meter",
    "status": "creating",
    "icon": "assets/icons/sound-meter.png",
    "copy": {
      "en": {
        "summary": "Estimate the sound level around you using your phone’s microphone.",
        "overview": "Estimate ambient sound from the microphone with current, minimum, average and maximum readings, a time graph and calibration offset. Includes a sound-pressure/dB SPL calculator; it is not a certified meter.",
        "features": [
          "Current, minimum, average and maximum readings.",
          "A graph shows changes during the measurement.",
          "Adjust calibration for the chosen microphone.",
          "Results are estimates, not certified measurements."
        ]
      },
      "hu": {
        "summary": "Becsüld meg a környezet hangszintjét a telefon mikrofonjával.",
        "overview": "Mikrofonos környezeti hangszintbecslés aktuális, minimum-, átlag- és maximumértékkel, időgrafikonnal és kalibrációs eltéréssel. Hangnyomás/dB SPL kalkulátor is tartozik hozzá; nem hitelesített műszer.",
        "features": [
          "Aktuális, minimum-, átlag- és maximumérték.",
          "Grafikon a hangszint változásáról mérés közben.",
          "A kiválasztott mikrofon kalibrálásának beállítása.",
          "Becsült értékek, nem hitelesített mérések."
        ]
      },
      "de": {
        "summary": "Den Schallpegel in der Umgebung mit dem Mikrofon des Smartphones abschätzen.",
        "overview": "Schätzung des Umgebungsschalls per Mikrofon mit aktuellem, minimalem, mittlerem und maximalem Wert, Zeitdiagramm und Kalibrierungs-Offset. Mit Schalldruck-/dB-SPL-Rechner; kein geeichtes Messgerät.",
        "features": [
          "Aktueller, kleinster, mittlerer und größter Wert.",
          "Grafik der Änderungen während der Messung.",
          "Kalibrierung für das gewählte Mikrofon anpassen.",
          "Schätzwerte, keine zertifizierten Messungen."
        ]
      },
      "es": {
        "summary": "Estima el nivel de sonido a tu alrededor con el micrófono del teléfono.",
        "overview": "Estima el sonido ambiental con el micrófono: lectura actual, mínima, media y máxima, gráfico temporal y ajuste de calibración. Incluye calculadora de presión sonora/dB SPL; no es un medidor certificado.",
        "features": [
          "Valores actual, mínimo, medio y máximo.",
          "Gráfico de cambios durante la medición.",
          "Ajusta la calibración del micrófono elegido.",
          "Son estimaciones, no mediciones certificadas."
        ]
      },
      "fr": {
        "summary": "Estimez le niveau sonore autour de vous avec le microphone du téléphone.",
        "overview": "Estime le bruit ambiant au microphone : valeurs actuelle, minimale, moyenne et maximale, graphique temporel et décalage d’étalonnage. Avec calculateur pression acoustique/dB SPL ; ce n’est pas un appareil certifié.",
        "features": [
          "Valeurs actuelle, minimale, moyenne et maximale.",
          "Graphique des variations pendant la mesure.",
          "Réglage d’étalonnage du microphone choisi.",
          "Des estimations, pas des mesures certifiées."
        ]
      },
      "pt-BR": {
        "summary": "Estime o nível de som ao redor usando o microfone do celular.",
        "overview": "Estima o som ambiente pelo microfone com leituras atual, mínima, média e máxima, gráfico temporal e ajuste de calibração. Inclui calculadora de pressão sonora/dB SPL; não é um medidor certificado.",
        "features": [
          "Valores atual, mínimo, médio e máximo.",
          "Gráfico das mudanças durante a medição.",
          "Ajuste a calibração do microfone escolhido.",
          "São estimativas, não medições certificadas."
        ]
      },
      "pl": {
        "summary": "Oszacuj poziom dźwięku wokół siebie za pomocą mikrofonu telefonu.",
        "overview": "Szacuje dźwięk otoczenia z mikrofonu: wartość bieżącą, minimum, średnią i maksimum, wykres czasu i korektę kalibracji. Z kalkulatorem ciśnienia akustycznego/dB SPL; nie jest miernikiem certyfikowanym.",
        "features": [
          "Wartość bieżąca, minimalna, średnia i maksymalna.",
          "Wykres zmian podczas pomiaru.",
          "Ustawienie kalibracji wybranego mikrofonu.",
          "Wyniki szacunkowe, bez certyfikowanej dokładności."
        ]
      },
      "it": {
        "summary": "Stima il livello sonoro intorno a te con il microfono del telefono.",
        "overview": "Stima il suono ambientale dal microfono con valore attuale, minimo, medio e massimo, grafico temporale e offset di calibrazione. Include un calcolatore pressione sonora/dB SPL; non è uno strumento certificato.",
        "features": [
          "Valori attuale, minimo, medio e massimo.",
          "Grafico dei cambiamenti durante la misura.",
          "Regola la calibrazione del microfono scelto.",
          "Stime, non misurazioni certificate."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "compass-altimeter",
    "name": "Compass & Altimeter",
    "status": "creating",
    "icon": "assets/icons/compass-altimeter.png",
    "copy": {
      "en": {
        "summary": "Check direction, coordinates and altitude using the sensors available on your phone.",
        "overview": "A practical aid for checking direction and height outdoors. Magnetic direction comes from the phone’s sensors; true north is shown only when reliable location and magnetic correction data are available. GPS and barometric altitude stay clearly distinguished, with quality information.",
        "features": [
          "Magnetic north and, with reliable data, true north.",
          "Choose from five coordinate formats and copy them.",
          "Separate GPS and barometric altitude readings.",
          "See the data source, quality and available accuracy."
        ]
      },
      "hu": {
        "summary": "Irány, koordináták és magasság megtekintése a telefon elérhető érzékelőivel.",
        "overview": "Gyakorlati segítség az irány és a magasság ellenőrzéséhez a szabadban. A mágneses irányt a telefon érzékelői adják; valódi észak csak megbízható helyadat és mágneses korrekció mellett jelenik meg. A GPS- és barométeres magasság elkülönül, minőségjelzéssel.",
        "features": [
          "Mágneses észak, megbízható adatokkal valódi észak is.",
          "Öt választható és másolható koordinátaformátum.",
          "Külön GPS- és barométeres magasságérték.",
          "Az adatforrás, minőség és elérhető pontosság jelzése."
        ]
      },
      "de": {
        "summary": "Richtung, Koordinaten und Höhe mit den verfügbaren Handysensoren anzeigen.",
        "overview": "Eine praktische Hilfe für Richtung und Höhe im Freien. Die Sensoren liefern die magnetische Richtung; wahrer Norden erscheint nur bei zuverlässigen Standort- und Korrekturdaten. GPS- und barometrische Höhe werden mit Qualitätsangaben getrennt angezeigt.",
        "features": [
          "Magnetischer Norden und bei zuverlässigen Daten wahrer Norden.",
          "Fünf Koordinatenformate auswählen und kopieren.",
          "Getrennte GPS- und barometrische Höhenwerte.",
          "Datenquelle, Qualität und verfügbare Genauigkeit sehen."
        ]
      },
      "es": {
        "summary": "Consulta dirección, coordenadas y altitud con los sensores disponibles en el teléfono.",
        "overview": "Una ayuda práctica para consultar dirección y altitud al aire libre. Los sensores indican la dirección magnética; el norte verdadero solo aparece con datos fiables de ubicación y corrección magnética. La altitud GPS y barométrica se distinguen con información de calidad.",
        "features": [
          "Norte magnético y, con datos fiables, norte verdadero.",
          "Cinco formatos de coordenadas para elegir y copiar.",
          "Altitud GPS y barométrica por separado.",
          "Consulta origen, calidad y precisión disponible de los datos."
        ]
      },
      "fr": {
        "summary": "Consultez la direction, les coordonnées et l’altitude avec les capteurs disponibles du téléphone.",
        "overview": "Une aide pratique pour consulter direction et altitude en extérieur. Les capteurs donnent la direction magnétique ; le nord géographique nécessite une position et une correction magnétique fiables. Les altitudes GPS et barométrique restent distinctes, avec leur qualité.",
        "features": [
          "Nord magnétique et nord géographique avec des données fiables.",
          "Cinq formats de coordonnées à choisir et copier.",
          "Altitudes GPS et barométrique affichées séparément.",
          "Source, qualité et précision disponible des données."
        ]
      },
      "pt-BR": {
        "summary": "Veja direção, coordenadas e altitude com os sensores disponíveis no celular.",
        "overview": "Uma ajuda prática para consultar direção e altitude ao ar livre. Os sensores mostram a direção magnética; o norte verdadeiro aparece apenas com localização e correção magnética confiáveis. As altitudes GPS e barométrica ficam separadas, com informação de qualidade.",
        "features": [
          "Norte magnético e, com dados confiáveis, norte verdadeiro.",
          "Cinco formatos de coordenadas para escolher e copiar.",
          "Altitude GPS e barométrica mostradas separadamente.",
          "Veja origem, qualidade e precisão disponível dos dados."
        ]
      },
      "pl": {
        "summary": "Sprawdź kierunek, współrzędne i wysokość dzięki dostępnym czujnikom telefonu.",
        "overview": "Praktyczna pomoc w sprawdzaniu kierunku i wysokości w terenie. Czujniki wskazują kierunek magnetyczny; północ prawdziwa wymaga wiarygodnej lokalizacji i korekty magnetycznej. Wysokości GPS i barometryczna są rozróżnione i mają informacje o jakości.",
        "features": [
          "Północ magnetyczna i prawdziwa przy wiarygodnych danych.",
          "Pięć formatów współrzędnych do wyboru i kopiowania.",
          "Osobne wysokości GPS i barometryczna.",
          "Źródło, jakość i dostępna dokładność danych."
        ]
      },
      "it": {
        "summary": "Consulta direzione, coordinate e altitudine con i sensori disponibili sul telefono.",
        "overview": "Un aiuto pratico per direzione e altitudine all’aperto. I sensori danno la direzione magnetica; il nord vero compare solo con posizione e correzione magnetica affidabili. Altitudine GPS e barometrica restano distinte, con informazioni sulla qualità.",
        "features": [
          "Nord magnetico e, con dati affidabili, nord vero.",
          "Cinque formati di coordinate da scegliere e copiare.",
          "Altitudine GPS e barometrica separate.",
          "Fonte, qualità e precisione disponibile dei dati."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "gps-speedometer",
    "name": "GPS Speedometer",
    "status": "creating",
    "icon": "assets/icons/gps-speedometer.png",
    "copy": {
      "en": {
        "summary": "See your GPS speed, distance and journey time on a large, clear display.",
        "overview": "Large GPS speed display with current, maximum and average speed, distance, elapsed time, signal-quality feedback and an optional mirrored display.",
        "features": [
          "Current, maximum and average speed.",
          "Kilometres per hour, miles per hour or knots.",
          "Distance, elapsed time and moving time.",
          "GPS quality indicator and optional mirrored display."
        ]
      },
      "hu": {
        "summary": "GPS-alapú sebesség, megtett távolság és menetidő nagy, jól olvasható kijelzőn.",
        "overview": "Nagy GPS-sebességkijelzés aktuális, maximum- és átlagsebességgel, távolsággal, menetidővel, jelminőség-visszajelzéssel és opcionális tükrözött kijelzéssel.",
        "features": [
          "Aktuális, maximum- és átlagsebesség.",
          "Kilométer/óra, mérföld/óra vagy csomó.",
          "Távolság, eltelt idő és mozgásban töltött idő.",
          "GPS-minőségjelzés és opcionális tükrözött kijelzés."
        ]
      },
      "de": {
        "summary": "GPS-Geschwindigkeit, Strecke und Fahrtzeit auf einer großen, gut lesbaren Anzeige sehen.",
        "overview": "Große GPS-Anzeige für aktuelle, maximale und mittlere Geschwindigkeit, Strecke, Zeit und Signalqualität, optional mit gespiegelter Anzeige.",
        "features": [
          "Aktuelle, höchste und durchschnittliche Geschwindigkeit.",
          "Kilometer pro Stunde, Meilen pro Stunde oder Knoten.",
          "Strecke, verstrichene Zeit und Bewegungszeit.",
          "GPS-Qualität und optional gespiegelte Anzeige."
        ]
      },
      "es": {
        "summary": "Ve la velocidad GPS, la distancia y el tiempo de viaje en una pantalla grande y clara.",
        "overview": "Pantalla GPS grande con velocidad actual, máxima y media, distancia, tiempo, calidad de señal y pantalla reflejada opcional.",
        "features": [
          "Velocidad actual, máxima y media.",
          "Kilómetros por hora, millas por hora o nudos.",
          "Distancia, tiempo transcurrido y tiempo en movimiento.",
          "Indicador de calidad GPS y pantalla reflejada opcional."
        ]
      },
      "fr": {
        "summary": "Affichez la vitesse GPS, la distance et la durée du trajet en grand, pour une lecture facile.",
        "overview": "Grand affichage GPS de vitesse actuelle, maximale et moyenne, distance, durée et qualité du signal, avec affichage miroir facultatif.",
        "features": [
          "Vitesse actuelle, maximale et moyenne.",
          "Kilomètres par heure, miles par heure ou nœuds.",
          "Distance, temps écoulé et temps en mouvement.",
          "Qualité GPS et affichage miroir facultatif."
        ]
      },
      "pt-BR": {
        "summary": "Veja velocidade GPS, distância e tempo de percurso em uma tela grande e clara.",
        "overview": "Tela GPS grande com velocidade atual, máxima e média, distância, tempo, qualidade do sinal e display espelhado opcional.",
        "features": [
          "Velocidade atual, máxima e média.",
          "Quilômetros por hora, milhas por hora ou nós.",
          "Distância, tempo decorrido e tempo em movimento.",
          "Indicador de qualidade GPS e tela espelhada opcional."
        ]
      },
      "pl": {
        "summary": "Zobacz prędkość GPS, dystans i czas podróży na dużym, czytelnym ekranie.",
        "overview": "Duży ekran GPS z prędkością bieżącą, maksymalną i średnią, dystansem, czasem, jakością sygnału i opcjonalnym lustrzanym ekranem.",
        "features": [
          "Prędkość bieżąca, maksymalna i średnia.",
          "Kilometry na godzinę, mile na godzinę lub węzły.",
          "Dystans, czas całkowity i czas w ruchu.",
          "Wskaźnik jakości GPS i opcjonalne odbicie lustrzane."
        ]
      },
      "it": {
        "summary": "Vedi velocità GPS, distanza e tempo di viaggio su un display grande e leggibile.",
        "overview": "Grande display GPS con velocità attuale, massima e media, distanza, tempo, qualità del segnale e display specchiato opzionale.",
        "features": [
          "Velocità attuale, massima e media.",
          "Chilometri orari, miglia orarie o nodi.",
          "Distanza, tempo trascorso e tempo in movimento.",
          "Indicatore di qualità GPS e display specchiato facoltativo."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "device-info-diagnostics",
    "name": "Device Info & Diagnostics",
    "status": "creating",
    "icon": "assets/icons/device-info-diagnostics.png",
    "copy": {
      "en": {
        "summary": "Explore your phone’s hardware and system information, and run simple checks.",
        "overview": "Browse hardware, system, battery, display, camera and sensor information, run selected live checks and share a privacy-filtered TXT or JSON report.",
        "features": [
          "Battery, storage, screen, camera and sensor details.",
          "Touch, display, audio and live sensor checks.",
          "Copy information or share a text or JSON report.",
          "Reports omit sensitive device identifiers."
        ]
      },
      "hu": {
        "summary": "Ismerd meg a telefon hardverét és rendszeradatait, és végezz egyszerű ellenőrzéseket.",
        "overview": "Hardver-, rendszer-, akkumulátor-, kijelző-, kamera- és szenzoradatok, kijelölt élő ellenőrzések és adatvédelmi szűrésű TXT/JSON riport megosztása.",
        "features": [
          "Akkumulátor-, tárhely-, kijelző-, kamera- és szenzoradatok.",
          "Érintés-, kijelző-, hang- és élő szenzorteszt.",
          "Adatok másolása, szöveges vagy JSON-riport megosztása.",
          "Az érzékeny eszközazonosítók kimaradnak a riportból."
        ]
      },
      "de": {
        "summary": "Hardware und Systemdaten des Smartphones erkunden und einfache Prüfungen durchführen.",
        "overview": "Hardware-, System-, Akku-, Display-, Kamera- und Sensordaten ansehen, ausgewählte Live-Tests ausführen und einen datenschutzgefilterten TXT-/JSON-Bericht teilen.",
        "features": [
          "Akku, Speicher, Bildschirm, Kamera und Sensoren.",
          "Touch-, Display-, Audio- und Live-Sensortests.",
          "Informationen kopieren oder Text-/JSON-Bericht teilen.",
          "Berichte lassen sensible Gerätekennungen weg."
        ]
      },
      "es": {
        "summary": "Explora el hardware y la información del sistema del teléfono y realiza comprobaciones sencillas.",
        "overview": "Consulta hardware, sistema, batería, pantalla, cámara y sensores, realiza pruebas en vivo seleccionadas y comparte un informe TXT/JSON filtrado por privacidad.",
        "features": [
          "Datos de batería, almacenamiento, pantalla, cámara y sensores.",
          "Pruebas táctiles, de pantalla, audio y sensores en vivo.",
          "Copia datos o comparte un informe de texto o JSON.",
          "Los informes omiten identificadores sensibles del dispositivo."
        ]
      },
      "fr": {
        "summary": "Découvrez le matériel et les informations système du téléphone et effectuez des vérifications simples.",
        "overview": "Consulte matériel, système, batterie, écran, caméra et capteurs, effectue certains tests en direct et partage un rapport TXT/JSON filtré pour la confidentialité.",
        "features": [
          "Batterie, stockage, écran, caméra et capteurs.",
          "Tests tactiles, d’affichage, audio et de capteurs en direct.",
          "Copie des données ou partage d’un rapport texte ou JSON.",
          "Les rapports excluent les identifiants sensibles de l’appareil."
        ]
      },
      "pt-BR": {
        "summary": "Conheça o hardware e os dados do sistema do celular e faça verificações simples.",
        "overview": "Consulta hardware, sistema, bateria, tela, câmera e sensores, executa testes ao vivo selecionados e compartilha relatório TXT/JSON com filtro de privacidade.",
        "features": [
          "Dados de bateria, armazenamento, tela, câmera e sensores.",
          "Testes de toque, tela, áudio e sensores ao vivo.",
          "Copie informações ou compartilhe um relatório de texto ou JSON.",
          "Os relatórios omitem identificadores sensíveis do aparelho."
        ]
      },
      "pl": {
        "summary": "Poznaj sprzęt i dane systemowe telefonu oraz wykonaj proste sprawdzenia.",
        "overview": "Pokazuje sprzęt, system, baterię, ekran, aparat i czujniki, wykonuje wybrane testy na żywo i udostępnia raport TXT/JSON z filtrem prywatności.",
        "features": [
          "Bateria, pamięć, ekran, kamera i czujniki.",
          "Testy dotyku, ekranu, dźwięku i czujników na żywo.",
          "Kopiowanie danych i udostępnianie raportu tekstowego lub JSON.",
          "Raporty pomijają wrażliwe identyfikatory urządzenia."
        ]
      },
      "it": {
        "summary": "Esplora hardware e informazioni di sistema del telefono ed esegui semplici controlli.",
        "overview": "Mostra hardware, sistema, batteria, schermo, fotocamera e sensori, esegue alcuni test dal vivo e condivide un rapporto TXT/JSON filtrato per la privacy.",
        "features": [
          "Batteria, memoria, schermo, fotocamera e sensori.",
          "Test di tocco, schermo, audio e sensori in tempo reale.",
          "Copia dati o condividi un rapporto di testo o JSON.",
          "I rapporti omettono identificativi sensibili del dispositivo."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "image-resizer-compressor",
    "name": "Image Resizer & Compressor",
    "status": "creating",
    "icon": "assets/icons/image-resizer-compressor.png",
    "copy": {
      "en": {
        "summary": "Resize and compress photos on your device, with previews and batch processing.",
        "overview": "Make photos smaller for sharing or adjust their dimensions for printing. Process several images together, preview the changes and choose whether to keep their metadata. All image processing happens on your device.",
        "features": [
          "Choose dimensions, quality or target file size.",
          "Keep proportions or crop to fit.",
          "Preview changes and control image metadata.",
          "Calculate print size from pixels and print resolution."
        ]
      },
      "hu": {
        "summary": "Képek átméretezése és tömörítése a készüléken, előnézettel és több kép együttes feldolgozásával.",
        "overview": "Csökkentsd a képek méretét megosztáshoz, vagy állítsd be a méreteiket nyomtatáshoz. Több képet együtt is feldolgozhatsz, előnézetben ellenőrizheted a változásokat, és eldöntheted, megtartod-e a képek kísérőadatait. A képfeldolgozás a készüléken történik.",
        "features": [
          "Méret, minőség vagy célfájlméret megadása.",
          "Képarány megtartása vagy méretre vágás.",
          "Előnézet és a képadatok megtartásának beállítása.",
          "Nyomtatási méret számítása pixelméretből és felbontásból."
        ]
      },
      "de": {
        "summary": "Bilder auf dem Gerät verkleinern und komprimieren, mit Vorschau und Stapelverarbeitung.",
        "overview": "Bilder zum Teilen verkleinern oder ihre Abmessungen für den Druck anpassen. Mehrere Bilder gemeinsam bearbeiten, Änderungen in der Vorschau prüfen und entscheiden, ob Metadaten erhalten bleiben. Die Bildverarbeitung erfolgt auf deinem Gerät.",
        "features": [
          "Abmessungen, Qualität oder gewünschte Dateigröße festlegen.",
          "Seitenverhältnis bewahren oder passend zuschneiden.",
          "Änderungen ansehen und Bildmetadaten auswählen.",
          "Druckgröße aus Pixeln und Druckauflösung berechnen."
        ]
      },
      "es": {
        "summary": "Redimensiona y comprime imágenes en el dispositivo, con vista previa y procesamiento por lotes.",
        "overview": "Reduce el tamaño de las fotos para compartirlas o ajusta sus dimensiones para imprimirlas. Procesa varias imágenes juntas, previsualiza los cambios y decide si conservar sus metadatos. Todo el procesamiento se realiza en tu dispositivo.",
        "features": [
          "Elige dimensiones, calidad o tamaño de archivo deseado.",
          "Mantén las proporciones o recorta para ajustar.",
          "Previsualiza cambios y controla los metadatos.",
          "Calcula tamaño de impresión con píxeles y resolución."
        ]
      },
      "fr": {
        "summary": "Redimensionnez et compressez vos images sur l’appareil, avec aperçu et traitement par lots.",
        "overview": "Réduisez les photos pour les partager ou adaptez leurs dimensions à l’impression. Traitez plusieurs images ensemble, vérifiez l’aperçu et choisissez de conserver ou retirer leurs métadonnées. Le traitement reste sur votre appareil.",
        "features": [
          "Dimensions, qualité ou taille de fichier souhaitée.",
          "Proportions conservées ou recadrage adapté.",
          "Aperçu des changements et choix des métadonnées.",
          "Taille d’impression calculée avec les pixels et la résolution."
        ]
      },
      "pt-BR": {
        "summary": "Redimensione e comprima imagens no aparelho, com prévia e processamento em lote.",
        "overview": "Diminua fotos para compartilhar ou ajuste as dimensões para impressão. Processe várias imagens juntas, confira a prévia e escolha se quer manter os metadados. Todo o processamento acontece no aparelho.",
        "features": [
          "Escolha dimensões, qualidade ou tamanho de arquivo desejado.",
          "Mantenha proporções ou recorte para ajustar.",
          "Veja a prévia e controle os metadados da imagem.",
          "Calcule tamanho de impressão com pixels e resolução."
        ]
      },
      "pl": {
        "summary": "Zmieniaj rozmiar i kompresuj zdjęcia na urządzeniu, z podglądem i przetwarzaniem wielu plików.",
        "overview": "Zmniejszaj zdjęcia do udostępniania lub dopasuj wymiary do wydruku. Przetwarzaj kilka obrazów razem, sprawdzaj podgląd i wybieraj, czy zachować metadane. Całe przetwarzanie odbywa się na urządzeniu.",
        "features": [
          "Wymiary, jakość lub docelowy rozmiar pliku.",
          "Zachowanie proporcji lub dopasowane kadrowanie.",
          "Podgląd zmian i wybór metadanych obrazu.",
          "Rozmiar wydruku z pikseli i rozdzielczości druku."
        ]
      },
      "it": {
        "summary": "Ridimensiona e comprimi immagini sul dispositivo, con anteprima e più file insieme.",
        "overview": "Riduci le foto per condividerle o adatta le dimensioni alla stampa. Elabora più immagini insieme, controlla l’anteprima e scegli se conservare i metadati. Tutta l’elaborazione avviene sul dispositivo.",
        "features": [
          "Scegli dimensioni, qualità o dimensione del file desiderata.",
          "Mantieni le proporzioni o ritaglia per adattare.",
          "Vedi l’anteprima e controlla i metadati.",
          "Calcola le dimensioni di stampa da pixel e risoluzione."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "voice-recorder",
    "name": "Voice Recorder",
    "status": "creating",
    "icon": "assets/icons/voice-recorder.png",
    "copy": {
      "en": {
        "summary": "Record speech, notes and interviews, then organize and share your recordings.",
        "overview": "Local audio recording in M4A/AAC, MP3 or WAV, with quality profiles, waveform and markers, plus pause/resume and background recording.",
        "features": [
          "Pause and continue the same recording.",
          "Name recordings, add tags and search them.",
          "Add markers to find important moments.",
          "Background recording and selectable quality."
        ]
      },
      "hu": {
        "summary": "Rögzíts beszédet, hangjegyzetet és interjút, majd rendszerezd és oszd meg a felvételeket.",
        "overview": "Helyi hangfelvétel M4A/AAC, MP3 vagy WAV formátumban minőségi profilokkal, hullámformával és jelölőkkel, szünet/folytatással és háttérrögzítéssel.",
        "features": [
          "Egy felvétel szüneteltetése és folytatása.",
          "Elnevezés, címkék és keresés.",
          "Jelölők a fontos részek gyors megtalálásához.",
          "Háttérben is működő felvétel, választható minőséggel."
        ]
      },
      "de": {
        "summary": "Sprache, Notizen und Interviews aufnehmen, ordnen und teilen.",
        "overview": "Lokale Aufnahmen in M4A/AAC, MP3 oder WAV mit Qualitätsprofilen, Wellenform, Markern, Pause/Fortsetzen und Hintergrundaufnahme.",
        "features": [
          "Dieselbe Aufnahme pausieren und fortsetzen.",
          "Aufnahmen benennen, markieren und durchsuchen.",
          "Wichtige Stellen mit Zeitmarken wiederfinden.",
          "Hintergrundaufnahme mit wählbarer Qualität."
        ]
      },
      "es": {
        "summary": "Graba voz, notas y entrevistas, y organiza y comparte tus grabaciones.",
        "overview": "Grabación local en M4A/AAC, MP3 o WAV con perfiles de calidad, forma de onda, marcadores, pausa/reanudación y grabación en segundo plano.",
        "features": [
          "Pausa y continúa la misma grabación.",
          "Pon nombres y etiquetas y busca grabaciones.",
          "Añade marcadores para encontrar momentos importantes.",
          "Grabación en segundo plano con calidad seleccionable."
        ]
      },
      "fr": {
        "summary": "Enregistrez voix, notes et entretiens, puis classez et partagez vos enregistrements.",
        "overview": "Enregistrement local en M4A/AAC, MP3 ou WAV avec profils de qualité, forme d’onde, repères, pause/reprise et capture en arrière-plan.",
        "features": [
          "Pause et reprise d’un même enregistrement.",
          "Noms, étiquettes et recherche.",
          "Repères pour retrouver les moments importants.",
          "Enregistrement en arrière-plan et qualité au choix."
        ]
      },
      "pt-BR": {
        "summary": "Grave voz, notas e entrevistas, depois organize e compartilhe as gravações.",
        "overview": "Gravação local em M4A/AAC, MP3 ou WAV com perfis de qualidade, forma de onda, marcadores, pausa/retomada e gravação em segundo plano.",
        "features": [
          "Pause e continue a mesma gravação.",
          "Dê nomes, adicione etiquetas e busque gravações.",
          "Use marcadores para encontrar momentos importantes.",
          "Gravação em segundo plano com qualidade selecionável."
        ]
      },
      "pl": {
        "summary": "Nagrywaj głos, notatki i wywiady, a potem porządkuj i udostępniaj nagrania.",
        "overview": "Lokalne nagrania M4A/AAC, MP3 lub WAV z profilami jakości, przebiegiem fali, znacznikami, pauzą/wznowieniem i nagrywaniem w tle.",
        "features": [
          "Wstrzymywanie i kontynuacja tego samego nagrania.",
          "Nazwy, tagi i wyszukiwanie nagrań.",
          "Znaczniki ułatwiające znalezienie ważnych chwil.",
          "Nagrywanie w tle i wybór jakości."
        ]
      },
      "it": {
        "summary": "Registra voce, appunti e interviste, poi organizza e condividi le registrazioni.",
        "overview": "Registrazione locale in M4A/AAC, MP3 o WAV con profili di qualità, forma d’onda, marcatori, pausa/ripresa e registrazione in background.",
        "features": [
          "Metti in pausa e riprendi la stessa registrazione.",
          "Assegna nomi e tag e cerca le registrazioni.",
          "Usa marcatori per trovare i momenti importanti.",
          "Registrazione in background con qualità selezionabile."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "tuner-metronome",
    "name": "Tuner & Metronome",
    "status": "creating",
    "icon": "assets/icons/tuner-metronome.png",
    "copy": {
      "en": {
        "summary": "Tune an instrument and keep time while practising with a tuner and metronome.",
        "overview": "Chromatic tuner with note, frequency and cents plus reference tone; metronome with 20–400 BPM, saved tempos, subdivisions and background playback.",
        "features": [
          "See the note, frequency and tuning difference.",
          "Adjust the reference pitch or play a reference tone.",
          "Set tempo, beats and subdivisions.",
          "Save tempos and run the metronome in the background."
        ]
      },
      "hu": {
        "summary": "Hangold be a hangszered, és tartsd a ritmust gyakorlás közben a hangolóval és metronómmal.",
        "overview": "Kromatikus hangoló hangjegy-, frekvencia- és centértékkel, referenciahanggal; metronóm 20–400 BPM-mel, mentett tempókkal, felosztásokkal és háttérlejátszással.",
        "features": [
          "Hangjegy, frekvencia és hangolási eltérés jelzése.",
          "Állítható referenciahang és referenciahang-lejátszás.",
          "Tempó, ütem és felosztások beállítása.",
          "Menthető tempók és háttérben futó metronóm."
        ]
      },
      "de": {
        "summary": "Instrumente stimmen und beim Üben den Takt halten, mit Stimmgerät und Metronom.",
        "overview": "Chromatisches Stimmgerät mit Ton, Frequenz, Cent und Referenzton; Metronom mit 20–400 BPM, gespeicherten Tempi, Unterteilungen und Hintergrundwiedergabe.",
        "features": [
          "Ton, Frequenz und Stimmabweichung sehen.",
          "Referenzton einstellen oder abspielen.",
          "Tempo, Takt und Unterteilungen wählen.",
          "Tempi speichern und Metronom im Hintergrund nutzen."
        ]
      },
      "es": {
        "summary": "Afina un instrumento y mantén el ritmo al practicar con un afinador y un metrónomo.",
        "overview": "Afinador cromático con nota, frecuencia, centésimas y tono de referencia; metrónomo de 20–400 BPM con tempos guardados, subdivisiones y reproducción en segundo plano.",
        "features": [
          "Consulta nota, frecuencia y desviación de afinación.",
          "Ajusta o reproduce un tono de referencia.",
          "Configura tempo, compás y subdivisiones.",
          "Guarda tempos y usa el metrónomo en segundo plano."
        ]
      },
      "fr": {
        "summary": "Accordez votre instrument et gardez le rythme avec un accordeur et un métronome.",
        "overview": "Accordeur chromatique avec note, fréquence, cents et son de référence ; métronome de 20–400 BPM avec tempos enregistrés, subdivisions et lecture en arrière-plan.",
        "features": [
          "Note, fréquence et écart d’accordage.",
          "Réglage ou lecture d’un son de référence.",
          "Tempo, mesure et subdivisions au choix.",
          "Tempos enregistrés et métronome en arrière-plan."
        ]
      },
      "pt-BR": {
        "summary": "Afine o instrumento e mantenha o ritmo ao praticar com afinador e metrônomo.",
        "overview": "Afinador cromático com nota, frequência, cents e tom de referência; metrônomo de 20–400 BPM com tempos salvos, subdivisões e reprodução em segundo plano.",
        "features": [
          "Veja nota, frequência e diferença de afinação.",
          "Ajuste ou reproduza um tom de referência.",
          "Defina tempo, compasso e subdivisões.",
          "Salve tempos e use o metrônomo em segundo plano."
        ]
      },
      "pl": {
        "summary": "Strój instrument i utrzymuj rytm podczas ćwiczeń ze stroikiem i metronomem.",
        "overview": "Stroik chromatyczny z nutą, częstotliwością, centami i tonem wzorcowym; metronom 20–400 BPM z zapisanymi tempami, podziałami i działaniem w tle.",
        "features": [
          "Nuta, częstotliwość i odchylenie stroju.",
          "Ustawianie lub odtwarzanie dźwięku wzorcowego.",
          "Tempo, metrum i podział rytmu.",
          "Zapisane tempa i metronom działający w tle."
        ]
      },
      "it": {
        "summary": "Accorda lo strumento e mantieni il tempo durante la pratica con accordatore e metronomo.",
        "overview": "Accordatore cromatico con nota, frequenza, cent e tono di riferimento; metronomo 20–400 BPM con tempi salvati, suddivisioni e riproduzione in background.",
        "features": [
          "Nota, frequenza e scostamento dall’accordatura.",
          "Regola o riproduci un tono di riferimento.",
          "Imposta tempo, battute e suddivisioni.",
          "Salva tempi e usa il metronomo in background."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "electrical-toolkit",
    "name": "Electrical Toolkit",
    "status": "creating",
    "icon": "assets/icons/electrical-toolkit.png",
    "copy": {
      "en": {
        "summary": "Work out common electrical and electronic values from the measurements you enter.",
        "overview": "An offline helper for electronics projects and practical calculations. Enter voltage, current, resistance and component values to work out power, choose LED resistors, combine components or estimate voltage drop in a wire. You can also read resistor colour bands and printed codes.",
        "features": [
          "Ohm’s law, power and component calculations.",
          "Read resistor colour bands and printed codes.",
          "Calculate resistor networks and LED resistors.",
          "Wire resistance and voltage drop from entered data."
        ]
      },
      "hu": {
        "summary": "Gyakori villamos és elektronikai értékek kiszámítása a megadott adatokból.",
        "overview": "Offline segéd elektronikai munkákhoz és gyakorlati számításokhoz. Megadott feszültségből, áramból, ellenállásból és alkatrészértékekből teljesítményt számolhatsz, LED-előtétet választhatsz, alkatrészeket kombinálhatsz vagy vezeték-feszültségesést becsülhetsz. Az ellenállások színsávjait és feliratait is értelmezheted.",
        "features": [
          "Ohm-törvény, teljesítmény- és alkatrészszámítások.",
          "Ellenállások színsávjainak és feliratainak értelmezése.",
          "Ellenálláshálózatok és LED-előtétek számítása.",
          "Vezetékellenállás és feszültségesés a bevitt adatokból."
        ]
      },
      "de": {
        "summary": "Häufige elektrische und elektronische Werte aus eingegebenen Daten berechnen.",
        "overview": "Eine Offline-Hilfe für Elektronikprojekte und praktische Berechnungen. Aus Spannung, Strom, Widerstand und Bauteilwerten Leistung berechnen, LED-Vorwiderstände auswählen, Bauteile kombinieren oder den Spannungsabfall einer Leitung schätzen. Auch Farbringe und Widerstandsaufdrucke lassen sich lesen.",
        "features": [
          "Ohmsches Gesetz, Leistung und Bauteilberechnungen.",
          "Widerstandsfarbringe und Aufdrucke lesen.",
          "Widerstandsnetze und LED-Vorwiderstände berechnen.",
          "Leitungswiderstand und Spannungsabfall aus Eingaben."
        ]
      },
      "es": {
        "summary": "Calcula valores eléctricos y electrónicos habituales con los datos que introduces.",
        "overview": "Una ayuda offline para proyectos electrónicos y cálculos prácticos. Introduce tensión, corriente, resistencia y valores de componentes para calcular potencia, elegir resistencias LED, combinar componentes o estimar la caída de tensión de un cable. También interpreta colores y códigos de resistencias.",
        "features": [
          "Ley de Ohm, potencia y cálculos de componentes.",
          "Interpreta bandas de colores y códigos de resistencias.",
          "Calcula redes de resistencias y resistencias para LED.",
          "Resistencia del cable y caída de tensión con tus datos."
        ]
      },
      "fr": {
        "summary": "Calculez des valeurs électriques et électroniques courantes à partir des données saisies.",
        "overview": "Une aide hors ligne pour les projets électroniques et les calculs pratiques. Saisissez tension, courant, résistance et valeurs de composants pour calculer puissance, résistances LED, associations de composants ou chute de tension d’un fil. Elle aide aussi à lire les couleurs et codes de résistances.",
        "features": [
          "Loi d’Ohm, puissance et calculs de composants.",
          "Lecture des bandes de couleur et codes de résistances.",
          "Réseaux de résistances et résistances pour LED.",
          "Résistance des fils et chute de tension avec vos données."
        ]
      },
      "pt-BR": {
        "summary": "Calcule valores elétricos e eletrônicos comuns com os dados que você informa.",
        "overview": "Uma ajuda offline para projetos eletrônicos e cálculos práticos. Informe tensão, corrente, resistência e valores de componentes para calcular potência, escolher resistores LED, combinar componentes ou estimar a queda de tensão de um fio. Também ajuda a ler cores e códigos de resistores.",
        "features": [
          "Lei de Ohm, potência e cálculos de componentes.",
          "Leia faixas de cores e códigos de resistores.",
          "Calcule redes de resistores e resistores para LED.",
          "Resistência do fio e queda de tensão com seus dados."
        ]
      },
      "pl": {
        "summary": "Obliczaj typowe wartości elektryczne i elektroniczne z wprowadzonych danych.",
        "overview": "Pomoc offline w projektach elektronicznych i obliczeniach praktycznych. Wprowadź napięcie, prąd, rezystancję i wartości elementów, by obliczyć moc, wybrać rezystor LED, łączyć elementy lub oszacować spadek napięcia przewodu. Odczytuj też paski i kody rezystorów.",
        "features": [
          "Prawo Ohma, moc i obliczenia elementów.",
          "Odczyt pasków barwnych i kodów rezystorów.",
          "Sieci rezystorów i rezystory do LED.",
          "Rezystancja przewodu i spadek napięcia z podanych danych."
        ]
      },
      "it": {
        "summary": "Calcola valori elettrici ed elettronici comuni a partire dai dati inseriti.",
        "overview": "Un aiuto offline per progetti elettronici e calcoli pratici. Inserisci tensione, corrente, resistenza e valori dei componenti per calcolare potenza, scegliere resistori LED, combinare componenti o stimare la caduta di tensione di un filo. Leggi anche bande e codici dei resistori.",
        "features": [
          "Legge di Ohm, potenza e calcoli dei componenti.",
          "Leggi bande di colore e codici dei resistori.",
          "Calcola reti di resistori e resistori per LED.",
          "Resistenza dei fili e caduta di tensione dai tuoi dati."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "ham-tools",
    "name": "Ham Tools / Radio RF Toolkit",
    "status": "creating",
    "icon": "assets/icons/ham-tools.png",
    "copy": {
      "en": {
        "summary": "Radio tools for wavelength, power, signal calculations, locators and Morse practice.",
        "overview": "A practical offline toolkit for radio enthusiasts. Work with wavelength, power, antenna matching and signal paths using your own parameters. Convert coordinates to Maidenhead locators, calculate distance and bearing between stations, and practise Morse.",
        "features": [
          "Frequency, wavelength and cable velocity factor.",
          "Power, antenna mismatch and entered cable losses.",
          "Maidenhead locators, distance and bearing.",
          "Morse conversion, playback and practice."
        ]
      },
      "hu": {
        "summary": "Rádiós segédeszközök hullámhosszhoz, teljesítményhez, jelszámításokhoz, helymeghatározáshoz és Morse-gyakorláshoz.",
        "overview": "Gyakorlati offline eszköztár rádióamatőröknek. Saját adataidból számolhatsz hullámhosszt, teljesítményt, antennaillesztést és jelterjedési összefüggéseket. A koordinátákat Maidenhead lokátorrá alakíthatod, állomások távolságát és irányát számolhatod, valamint Morse-ot gyakorolhatsz.",
        "features": [
          "Frekvencia, hullámhossz és kábelrövidülési tényező.",
          "Teljesítmény, antennaillesztés és megadott kábelveszteség.",
          "Maidenhead lokátorok, távolság és irányszög.",
          "Morse-átalakítás, lejátszás és gyakorlás."
        ]
      },
      "de": {
        "summary": "Funkwerkzeuge für Wellenlänge, Leistung, Signalberechnungen, Locator und Morseübungen.",
        "overview": "Ein praktisches Offline-Werkzeug für Funkbegeisterte. Wellenlänge, Leistung, Antennenanpassung und Funkstrecken werden aus eigenen Parametern berechnet. Koordinaten in Maidenhead-Locator umwandeln, Entfernung und Peilung zwischen Stationen berechnen und Morse üben.",
        "features": [
          "Frequenz, Wellenlänge und Kabel-Verkürzungsfaktor.",
          "Leistung, Antennenanpassung und eingegebene Kabelverluste.",
          "Maidenhead-Locator, Entfernung und Peilung.",
          "Morse umwandeln, abspielen und üben."
        ]
      },
      "es": {
        "summary": "Herramientas de radio para longitud de onda, potencia, señales, localizadores y práctica Morse.",
        "overview": "Un conjunto de herramientas offline para aficionados a la radio. Calcula longitud de onda, potencia, adaptación de antena y enlaces con tus parámetros. Convierte coordenadas a localizadores Maidenhead, calcula distancia y rumbo entre estaciones y practica Morse.",
        "features": [
          "Frecuencia, longitud de onda y factor de velocidad del cable.",
          "Potencia, adaptación de antena y pérdidas de cable indicadas.",
          "Localizadores Maidenhead, distancia y rumbo.",
          "Conversión, reproducción y práctica Morse."
        ]
      },
      "fr": {
        "summary": "Des outils radio pour longueur d’onde, puissance, signaux, localisateurs et entraînement Morse.",
        "overview": "Une boîte à outils hors ligne pour les passionnés de radio. Calculez longueur d’onde, puissance, adaptation d’antenne et liaisons à partir de vos paramètres. Convertissez les coordonnées en localisateurs Maidenhead, calculez distance et azimut entre stations et pratiquez le Morse.",
        "features": [
          "Fréquence, longueur d’onde et facteur de vélocité du câble.",
          "Puissance, adaptation d’antenne et pertes de câble saisies.",
          "Localisateurs Maidenhead, distance et azimut.",
          "Conversion, lecture et entraînement Morse."
        ]
      },
      "pt-BR": {
        "summary": "Ferramentas de rádio para comprimento de onda, potência, sinais, localizadores e prática Morse.",
        "overview": "Ferramentas offline para entusiastas de rádio. Calcule comprimento de onda, potência, casamento de antena e enlaces com seus parâmetros. Converta coordenadas em localizadores Maidenhead, calcule distância e direção entre estações e pratique Morse.",
        "features": [
          "Frequência, comprimento de onda e fator de velocidade do cabo.",
          "Potência, casamento de antena e perdas de cabo informadas.",
          "Localizadores Maidenhead, distância e direção.",
          "Conversão, reprodução e prática Morse."
        ]
      },
      "pl": {
        "summary": "Narzędzia radiowe do długości fali, mocy, sygnałów, lokatorów i nauki Morse’a.",
        "overview": "Praktyczny zestaw offline dla miłośników radia. Obliczaj długość fali, moc, dopasowanie anteny i łącza z własnych parametrów. Zamieniaj współrzędne na lokatory Maidenhead, obliczaj odległość i azymut między stacjami oraz ćwicz Morse’a.",
        "features": [
          "Częstotliwość, długość fali i współczynnik skrócenia kabla.",
          "Moc, dopasowanie anteny i podane straty kabla.",
          "Lokatory Maidenhead, odległość i azymut.",
          "Konwersja, odtwarzanie i ćwiczenie Morse’a."
        ]
      },
      "it": {
        "summary": "Strumenti radio per lunghezza d’onda, potenza, segnali, locatori e pratica Morse.",
        "overview": "Strumenti offline per appassionati di radio. Calcola lunghezza d’onda, potenza, adattamento d’antenna e collegamenti con i tuoi parametri. Converti coordinate in locatori Maidenhead, calcola distanza e direzione tra stazioni e pratica il Morse.",
        "features": [
          "Frequenza, lunghezza d’onda e fattore di velocità del cavo.",
          "Potenza, adattamento d’antenna e perdite del cavo inserite.",
          "Locatori Maidenhead, distanza e direzione.",
          "Conversione, riproduzione e pratica Morse."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "mini-games",
    "name": "Mini Games",
    "status": "creating",
    "icon": "assets/icons/mini-games.png",
    "copy": {
      "en": {
        "summary": "Play eleven classic puzzles and small games offline in one app.",
        "overview": "An offline collection of 11 games, including 2048, Sudoku, Minesweeper, Snake, Reversi, Solitaire and a JN86 block puzzle.",
        "features": [
          "2048, Sudoku, Minesweeper, Snake and Reversi.",
          "15 Puzzle, Gomoku, Nine Men’s Morris and Solitaire.",
          "Tic-tac-toe and JN86 Block Puzzle.",
          "Resume saved games and view local results."
        ]
      },
      "hu": {
        "summary": "Tizenegy klasszikus fejtörő és rövid játék egyetlen offline alkalmazásban.",
        "overview": "Offline gyűjtemény 11 játékkal, köztük 2048, Sudoku, Aknakereső, Snake, Reversi, Solitaire és saját JN86 block puzzle.",
        "features": [
          "2048, Sudoku, Aknakereső, Snake és Reversi.",
          "15 Puzzle, Gomoku, Malom és Solitaire.",
          "Három egy sorban és JN86 Block Puzzle.",
          "Mentett játékok folytatása és helyi eredmények."
        ]
      },
      "de": {
        "summary": "Elf klassische Denkspiele und kleine Spiele offline in einer App.",
        "overview": "Offline-Sammlung mit 11 Spielen, darunter 2048, Sudoku, Minesweeper, Snake, Reversi, Solitaire und ein JN86-Blockpuzzle.",
        "features": [
          "2048, Sudoku, Minesweeper, Snake und Reversi.",
          "15 Puzzle, Gomoku, Mühle und Solitaire.",
          "Tic-Tac-Toe und JN86 Block Puzzle.",
          "Gespeicherte Spiele fortsetzen und lokale Ergebnisse sehen."
        ]
      },
      "es": {
        "summary": "Once rompecabezas y juegos clásicos para jugar sin conexión en una sola app.",
        "overview": "Colección offline de 11 juegos, entre ellos 2048, Sudoku, Buscaminas, Snake, Reversi, Solitario y un rompecabezas de bloques JN86.",
        "features": [
          "2048, Sudoku, Buscaminas, Snake y Reversi.",
          "15 Puzzle, Gomoku, Molino y Solitario.",
          "Tres en raya y JN86 Block Puzzle.",
          "Continúa partidas guardadas y consulta resultados locales."
        ]
      },
      "fr": {
        "summary": "Onze casse-têtes et petits jeux classiques hors ligne dans une seule application.",
        "overview": "Collection hors ligne de 11 jeux, dont 2048, Sudoku, Démineur, Snake, Reversi, Solitaire et un puzzle de blocs JN86.",
        "features": [
          "2048, Sudoku, Démineur, Snake et Reversi.",
          "15 Puzzle, Gomoku, Jeu du moulin et Solitaire.",
          "Morpion et JN86 Block Puzzle.",
          "Reprise des parties sauvegardées et résultats locaux."
        ]
      },
      "pt-BR": {
        "summary": "Onze quebra-cabeças e jogos clássicos offline em um só aplicativo.",
        "overview": "Coleção offline de 11 jogos, incluindo 2048, Sudoku, Campo Minado, Snake, Reversi, Paciência e quebra-cabeça de blocos JN86.",
        "features": [
          "2048, Sudoku, Campo Minado, Snake e Reversi.",
          "15 Puzzle, Gomoku, Trilha e Paciência.",
          "Jogo da velha e JN86 Block Puzzle.",
          "Continue partidas salvas e veja resultados locais."
        ]
      },
      "pl": {
        "summary": "Jedenaście klasycznych łamigłówek i małych gier offline w jednej aplikacji.",
        "overview": "Zbiór 11 gier offline, w tym 2048, Sudoku, Saper, Snake, Reversi, pasjans i układanka blokowa JN86.",
        "features": [
          "2048, Sudoku, Saper, Snake i Reversi.",
          "15 Puzzle, Gomoku, Młynek i pasjans.",
          "Kółko i krzyżyk oraz JN86 Block Puzzle.",
          "Kontynuacja zapisanych gier i lokalne wyniki."
        ]
      },
      "it": {
        "summary": "Undici rompicapi e giochi classici offline in una sola app.",
        "overview": "Raccolta offline di 11 giochi, tra cui 2048, Sudoku, Campo minato, Snake, Reversi, Solitario e un puzzle a blocchi JN86.",
        "features": [
          "2048, Sudoku, Campo minato, Snake e Reversi.",
          "15 Puzzle, Gomoku, Mulino e Solitario.",
          "Tris e JN86 Block Puzzle.",
          "Riprendi partite salvate e consulta risultati locali."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "readystock",
    "name": "Inventory / ReadyStock",
    "status": "creating",
    "icon": "assets/icons/readystock.png",
    "copy": {
      "en": {
        "summary": "Keep track of supplies at home, in a workshop or in a small business, offline.",
        "overview": "Keep track of food, household supplies and workshop parts, including their quantities, storage places and expiry dates. Use low-stock views and restock lists, and estimate reserve duration from your own consumption rates. Barcode and text recognition on the device help with entry; you confirm suggested details.",
        "features": [
          "Quantities, storage locations and expiry dates.",
          "Low-stock alerts and automatic restock lists.",
          "Barcode and on-device text recognition help with entry.",
          "Estimate how long reserves will last from your rates."
        ]
      },
      "hu": {
        "summary": "Tartsd számon a háztartás, műhely vagy kisvállalkozás készleteit internet nélkül.",
        "overview": "Kövesd az élelmiszerek, háztartási készletek és műhelyalkatrészek mennyiségét, tárolási helyét és lejáratát. Áttekintheted a fogyó készleteket és az utánpótlási listát, saját fogyási adatokból pedig tartalékidőt becsülhetsz. A helyi vonalkód- és szövegfelismerés segít a bevitelben; a javasolt adatokat te erősíted meg.",
        "features": [
          "Mennyiségek, tárolási helyek és lejáratok.",
          "Alacsonykészlet-jelzés és automatikus utánpótlási lista.",
          "Helyi vonalkód- és szövegfelismerés a bevitelhez.",
          "Tartalékidő becslése a megadott fogyási adatokból."
        ]
      },
      "de": {
        "summary": "Vorräte zu Hause, in der Werkstatt oder im Kleinbetrieb offline verwalten.",
        "overview": "Lebensmittel, Haushaltsvorräte und Werkstattteile mit Mengen, Lagerorten und Ablaufdaten verwalten. Wenig Bestand und Nachkauflisten überblicken sowie die Vorratsdauer aus eigenen Verbrauchswerten schätzen. Lokale Barcode- und Texterkennung helfen bei der Eingabe; Vorschläge bestätigst du selbst.",
        "features": [
          "Mengen, Lagerorte und Ablaufdaten.",
          "Warnungen bei wenig Bestand und automatische Nachkauflisten.",
          "Lokale Barcode- und Texterkennung als Eingabehilfe.",
          "Vorratsdauer anhand eigener Verbrauchswerte schätzen."
        ]
      },
      "es": {
        "summary": "Controla existencias en casa, el taller o un pequeño negocio sin conexión.",
        "overview": "Controla alimentos, suministros domésticos y piezas de taller con cantidades, ubicación y caducidades. Consulta existencias bajas y listas de reposición, y estima cuánto durarán con tu consumo. La lectura local de códigos y texto ayuda a introducir datos; tú confirmas las propuestas.",
        "features": [
          "Cantidades, lugares de almacenamiento y caducidades.",
          "Avisos de pocas existencias y listas automáticas de reposición.",
          "Códigos de barras y lectura de texto local para la entrada.",
          "Estima cuánto durarán las reservas según tu consumo."
        ]
      },
      "fr": {
        "summary": "Gérez hors ligne les stocks de la maison, de l’atelier ou d’une petite entreprise.",
        "overview": "Suivez aliments, réserves domestiques et pièces d’atelier avec quantités, emplacements et dates de péremption. Consultez les stocks faibles et listes de réapprovisionnement, puis estimez la durée avec votre consommation. La lecture locale de codes-barres et de texte facilite la saisie ; vous confirmez les suggestions.",
        "features": [
          "Quantités, emplacements et dates de péremption.",
          "Alertes de stock faible et listes de réapprovisionnement automatiques.",
          "Codes-barres et lecture locale de texte pour faciliter la saisie.",
          "Durée des réserves estimée avec votre consommation."
        ]
      },
      "pt-BR": {
        "summary": "Controle estoques em casa, na oficina ou em um pequeno negócio, sem internet.",
        "overview": "Controle alimentos, suprimentos domésticos e peças de oficina com quantidades, locais e validades. Veja estoques baixos e listas de reposição e estime a duração com seu consumo. A leitura local de códigos e texto ajuda no cadastro; você confirma os dados sugeridos.",
        "features": [
          "Quantidades, locais de armazenamento e validades.",
          "Alertas de estoque baixo e listas automáticas de reposição.",
          "Códigos de barras e leitura local de texto ajudam no cadastro.",
          "Estime a duração das reservas com seu consumo informado."
        ]
      },
      "pl": {
        "summary": "Zarządzaj zapasami domu, warsztatu lub małej firmy bez internetu.",
        "overview": "Śledź żywność, zapasy domowe i części warsztatowe wraz z ilościami, miejscem i terminami ważności. Sprawdzaj niskie stany i listy uzupełnień oraz szacuj czas zapasów z własnego zużycia. Lokalne odczytywanie kodów i tekstu pomaga we wprowadzaniu; samodzielnie potwierdzasz propozycje.",
        "features": [
          "Ilości, miejsca przechowywania i terminy ważności.",
          "Alerty niskiego stanu i automatyczne listy uzupełnień.",
          "Lokalne odczytywanie kodów i tekstu pomaga we wprowadzaniu.",
          "Szacowanie czasu zapasów według podanego zużycia."
        ]
      },
      "it": {
        "summary": "Gestisci le scorte di casa, officina o piccola attività senza internet.",
        "overview": "Tieni traccia di alimenti, scorte domestiche e parti di officina con quantità, luoghi e scadenze. Consulta scorte basse e liste di riordino e stima la durata con i tuoi consumi. La lettura locale di codici e testo aiuta l’inserimento; confermi tu i dati suggeriti.",
        "features": [
          "Quantità, luoghi di conservazione e scadenze.",
          "Avvisi di scorte basse e liste di riordino automatiche.",
          "Codici a barre e lettura locale del testo aiutano l’inserimento.",
          "Stima la durata delle riserve con i tuoi consumi."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "workout-training",
    "name": "Workout / Training",
    "status": "creating",
    "icon": "assets/icons/workout-training.png",
    "copy": {
      "en": {
        "summary": "Follow expert-designed exercise programs and keep a record of your training.",
        "overview": "Training guidance for beginners, people returning to exercise and gym users, supported by a training diary and personal records. Programs and exercise demonstrations will need specialist review; the starting selection is still being prepared.",
        "features": [
          "Exercise demonstrations and equipment guidance.",
          "Record sets, repetitions, weight and duration.",
          "Rest timer, training history and personal records.",
          "Use downloaded training modules offline."
        ]
      },
      "hu": {
        "summary": "Kövesd a szakértők által összeállított edzésprogramokat, és naplózd az edzéseidet.",
        "overview": "Edzésútmutatás kezdőknek, újrakezdőknek és konditermi felhasználóknak, edzésnaplóval és személyes rekordokkal. A programok és gyakorlatbemutatók szakértői felülvizsgálatot igényelnek; az induló választék még összeállítás alatt áll.",
        "features": [
          "Gyakorlatbemutatók és géphasználati útmutatók.",
          "Sorozatok, ismétlések, súlyok és időtartam rögzítése.",
          "Pihenőidő, edzéstörténet és személyes rekordok.",
          "A letöltött edzésmodulok offline is használhatók."
        ]
      },
      "de": {
        "summary": "Von Fachleuten erstellten Trainingsprogrammen folgen und das Training dokumentieren.",
        "overview": "Trainingsanleitungen für Anfänger, Wiedereinsteiger und Studiobesucher mit Trainingstagebuch und persönlichen Bestleistungen. Programme und Übungsvorführungen müssen fachlich geprüft werden; die erste Auswahl wird noch zusammengestellt.",
        "features": [
          "Übungsvorführungen und Anleitungen für Trainingsgeräte.",
          "Sätze, Wiederholungen, Gewicht und Dauer erfassen.",
          "Pausentimer, Trainingsverlauf und persönliche Bestleistungen.",
          "Heruntergeladene Trainingsmodule offline nutzen."
        ]
      },
      "es": {
        "summary": "Sigue programas de ejercicio diseñados por expertos y registra tus entrenamientos.",
        "overview": "Guía de entrenamiento para principiantes, quienes retoman el ejercicio y usuarios de gimnasio, con diario y marcas personales. Los programas y demostraciones requieren revisión profesional; la selección inicial sigue en elaboración.",
        "features": [
          "Demostraciones de ejercicios y guías de máquinas.",
          "Registra series, repeticiones, peso y duración.",
          "Temporizador de descanso, historial y marcas personales.",
          "Usa sin conexión los módulos descargados."
        ]
      },
      "fr": {
        "summary": "Suivez des programmes d’exercice conçus par des experts et notez vos entraînements.",
        "overview": "Des guides pour débuter, reprendre l’exercice ou s’entraîner en salle, avec journal et records personnels. Programmes et démonstrations nécessitent une validation spécialisée ; la sélection initiale est encore en préparation.",
        "features": [
          "Démonstrations d’exercices et guides d’utilisation des machines.",
          "Séries, répétitions, poids et durée enregistrés.",
          "Minuteur de repos, historique et records personnels.",
          "Modules téléchargés utilisables hors ligne."
        ]
      },
      "pt-BR": {
        "summary": "Siga programas de exercícios criados por especialistas e registre seus treinos.",
        "overview": "Orientação para iniciantes, quem retoma os exercícios e usuários de academia, com diário e recordes pessoais. Programas e demonstrações precisam de revisão especializada; a seleção inicial ainda está em elaboração.",
        "features": [
          "Demonstrações de exercícios e guias de aparelhos.",
          "Registre séries, repetições, peso e duração.",
          "Tempo de descanso, histórico e recordes pessoais.",
          "Use offline os módulos de treino baixados."
        ]
      },
      "pl": {
        "summary": "Realizuj programy ćwiczeń opracowane przez ekspertów i zapisuj treningi.",
        "overview": "Wskazówki dla początkujących, wracających do ćwiczeń i użytkowników siłowni, z dziennikiem i rekordami. Programy i pokazy ćwiczeń wymagają oceny specjalistów; początkowy zestaw nadal powstaje.",
        "features": [
          "Pokazy ćwiczeń i instrukcje obsługi sprzętu.",
          "Zapis serii, powtórzeń, ciężaru i czasu.",
          "Minutnik odpoczynku, historia i rekordy osobiste.",
          "Pobrane moduły treningowe działają offline."
        ]
      },
      "it": {
        "summary": "Segui programmi di esercizio creati da esperti e registra gli allenamenti.",
        "overview": "Guide per principianti, chi riprende l’attività e utenti della palestra, con diario e record personali. Programmi e dimostrazioni richiedono una revisione specialistica; la selezione iniziale è ancora in preparazione.",
        "features": [
          "Dimostrazioni degli esercizi e guide alle attrezzature.",
          "Registra serie, ripetizioni, peso e durata.",
          "Timer di riposo, cronologia e record personali.",
          "Usa offline i moduli di allenamento scaricati."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "meal-planner",
    "name": "Meal Planner — „Mit főzzek?”",
    "status": "creating",
    "icon": "assets/icons/meal-planner.png",
    "copy": {
      "en": {
        "summary": "Find ideas for what to cook, use ingredients and leftovers, and plan your week.",
        "overview": "Reduce the daily effort of deciding what to cook. Get up to three recipe suggestions based on your choices or ingredients at home, or use a separate option for prepared leftovers. Plan one recipe per day for seven days, keep the days you like and change others. The recipe selection and ingredient recognition are still being checked.",
        "features": [
          "Up to three suitable recipe suggestions.",
          "Separate options for ingredients and prepared leftovers.",
          "Seven-day plan with one chosen recipe per day.",
          "Own recipes, preferences and a combined shopping list."
        ]
      },
      "hu": {
        "summary": "Ötletek a napi főzéshez, az otthoni alapanyagok és maradékok felhasználásához, valamint a heti tervezéshez.",
        "overview": "Kevesebb töprengés azon, hogy mit főzz. Választásaid vagy az otthoni alapanyagok alapján legfeljebb három receptjavaslatot kaphatsz, az elkészített maradékokat pedig külön lehetőséggel használhatod fel. Hét napra napi egy receptet tervezhetsz, a bevált napokat rögzítheted, a többit cserélheted. A receptválaszték és az alapanyag-felismerés ellenőrzése még folyamatban van.",
        "features": [
          "Legfeljebb három megfelelő receptjavaslat.",
          "Külön lehetőség alapanyagokhoz és elkészített maradékokhoz.",
          "Hétnapos terv, naponta egy választott recepttel.",
          "Saját receptek, preferenciák és összevont bevásárlólista."
        ]
      },
      "de": {
        "summary": "Kochideen finden, Zutaten und Reste verwenden und die Woche planen.",
        "overview": "Weniger Grübeln darüber, was gekocht werden soll. Bis zu drei Rezeptvorschläge richten sich nach deinen Wünschen oder vorhandenen Zutaten; für zubereitete Reste gibt es eine eigene Option. Plane sieben Tage mit einem Rezept täglich, behalte passende Tage und ändere andere. Rezeptauswahl und Zutatenerkennung werden noch geprüft.",
        "features": [
          "Bis zu drei passende Rezeptvorschläge.",
          "Eigene Optionen für Zutaten und zubereitete Reste.",
          "Sieben Tage mit einem gewählten Rezept pro Tag.",
          "Eigene Rezepte, Vorlieben und gemeinsame Einkaufsliste."
        ]
      },
      "es": {
        "summary": "Encuentra ideas para cocinar, aprovecha ingredientes y sobras y planifica la semana.",
        "overview": "Dedica menos esfuerzo a decidir qué cocinar. Recibe hasta tres recetas según tus preferencias o ingredientes, con una opción separada para sobras ya preparadas. Planifica siete días con una receta diaria, fija los días que te gustan y cambia los demás. El recetario y el reconocimiento de ingredientes aún se están comprobando.",
        "features": [
          "Hasta tres sugerencias de recetas adecuadas.",
          "Opciones separadas para ingredientes y sobras preparadas.",
          "Plan de siete días con una receta elegida por día.",
          "Recetas propias, preferencias y lista de compra conjunta."
        ]
      },
      "fr": {
        "summary": "Trouvez des idées de cuisine, utilisez vos ingrédients et restes et planifiez la semaine.",
        "overview": "Simplifiez le choix de ce que vous allez cuisiner. Jusqu’à trois recettes sont proposées selon vos choix ou ingrédients, avec une option distincte pour les restes déjà préparés. Planifiez une recette par jour sur sept jours, gardez certains jours et changez les autres. Le choix de recettes et la reconnaissance des ingrédients sont encore en vérification.",
        "features": [
          "Jusqu’à trois suggestions de recettes adaptées.",
          "Options distinctes pour ingrédients et restes déjà préparés.",
          "Sept jours avec une recette choisie par jour.",
          "Recettes personnelles, préférences et liste de courses groupée."
        ]
      },
      "pt-BR": {
        "summary": "Encontre ideias para cozinhar, aproveite ingredientes e sobras e planeje a semana.",
        "overview": "Simplifique a decisão do que cozinhar. Receba até três receitas conforme suas escolhas ou ingredientes, com uma opção separada para sobras já preparadas. Planeje sete dias com uma receita por dia, fixe os dias que gostou e troque os outros. As receitas e o reconhecimento de ingredientes ainda estão sendo verificados.",
        "features": [
          "Até três sugestões de receitas adequadas.",
          "Opções separadas para ingredientes e sobras preparadas.",
          "Plano de sete dias com uma receita escolhida por dia.",
          "Receitas próprias, preferências e lista de compras conjunta."
        ]
      },
      "pl": {
        "summary": "Znajdź pomysły na gotowanie, wykorzystuj składniki i resztki oraz planuj tydzień.",
        "overview": "Mniej zastanawiania się, co ugotować. Do trzech przepisów dopasowanych do wyborów lub składników w domu, z osobną opcją dla już przygotowanych resztek. Planuj siedem dni z jednym przepisem dziennie, zachowuj wybrane dni i zmieniaj pozostałe. Zestaw przepisów i rozpoznawanie składników są nadal sprawdzane.",
        "features": [
          "Do trzech pasujących propozycji przepisów.",
          "Osobne opcje dla składników i gotowych resztek.",
          "Siedem dni z jednym wybranym przepisem dziennie.",
          "Własne przepisy, preferencje i wspólna lista zakupów."
        ]
      },
      "it": {
        "summary": "Trova idee per cucinare, usa ingredienti e avanzi e pianifica la settimana.",
        "overview": "Semplifica la decisione di cosa cucinare. Fino a tre ricette in base alle scelte o agli ingredienti, con un’opzione separata per avanzi già preparati. Pianifica sette giorni con una ricetta al giorno, fissa i giorni che ti piacciono e cambia gli altri. Ricette e riconoscimento degli ingredienti sono ancora in verifica.",
        "features": [
          "Fino a tre suggerimenti di ricette adatte.",
          "Opzioni separate per ingredienti e avanzi già preparati.",
          "Sette giorni con una ricetta scelta al giorno.",
          "Ricette personali, preferenze e lista della spesa comune."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "work-manager",
    "name": "Work Manager",
    "status": "creating",
    "icon": "assets/icons/work-manager.png",
    "copy": {
      "en": {
        "summary": "Organize clients, jobs, deadlines and costs, with a clear view of the next task.",
        "overview": "Keep client jobs and their next steps together on your device. Track tasks, deadlines, materials, recorded costs and working time, then prepare a PDF work sheet. Voice entry helps capture a new job while you work and asks you to confirm the details.",
        "features": [
          "Job status, tasks and reminders.",
          "Materials, recorded costs and working time.",
          "Capture a new job by voice, then confirm it.",
          "Create readable PDF work sheets."
        ]
      },
      "hu": {
        "summary": "Ügyfelek, munkák, határidők és költségek rendezése, hogy lásd a következő teendőt.",
        "overview": "Az ügyfélmunkák és a következő teendők együtt, a készülékeden maradnak. Követheted a feladatokat, határidőket, anyagokat, rögzített költségeket és munkaidőt, majd PDF-munkalapot készíthetsz. A hangos bevitel munka közben segít az új megbízás felvételében, az adatokat pedig megerősítheted.",
        "features": [
          "Munkastátuszok, feladatok és emlékeztetők.",
          "Anyagok, rögzített költségek és munkaidő.",
          "Új munka hangos felvétele, majd megerősítése.",
          "Jól olvasható PDF-munkalapok készítése."
        ]
      },
      "de": {
        "summary": "Kunden, Aufträge, Termine und Kosten ordnen und die nächste Aufgabe im Blick behalten.",
        "overview": "Kundenaufträge und nächste Schritte bleiben zusammen auf deinem Gerät. Aufgaben, Fristen, Materialien, erfasste Kosten und Arbeitszeit verfolgen und daraus ein PDF-Arbeitsblatt erstellen. Spracheingabe hilft, neue Aufträge während der Arbeit zu erfassen; die Angaben werden bestätigt.",
        "features": [
          "Auftragsstatus, Aufgaben und Erinnerungen.",
          "Materialien, erfasste Kosten und Arbeitszeit.",
          "Neuen Auftrag per Sprache erfassen und bestätigen.",
          "Gut lesbare PDF-Arbeitsblätter erstellen."
        ]
      },
      "es": {
        "summary": "Organiza clientes, trabajos, plazos y costes para saber qué tarea viene después.",
        "overview": "Reúne en tu dispositivo los trabajos de clientes y sus próximos pasos. Sigue tareas, plazos, materiales, costes registrados y tiempo de trabajo, y prepara una ficha PDF. La entrada por voz ayuda a registrar nuevos encargos mientras trabajas y pide confirmar los detalles.",
        "features": [
          "Estado de trabajos, tareas y recordatorios.",
          "Materiales, costes registrados y tiempo de trabajo.",
          "Captura un nuevo trabajo por voz y confírmalo.",
          "Crea fichas de trabajo PDF fáciles de leer."
        ]
      },
      "fr": {
        "summary": "Organisez clients, travaux, échéances et coûts pour savoir quelle tâche vient ensuite.",
        "overview": "Regroupez sur votre appareil les travaux des clients et les prochaines étapes. Suivez tâches, échéances, matériaux, coûts saisis et temps de travail, puis créez une fiche PDF. La saisie vocale facilite l’enregistrement d’un nouveau travail et vous demande de confirmer les détails.",
        "features": [
          "État des travaux, tâches et rappels.",
          "Matériaux, coûts enregistrés et temps de travail.",
          "Saisie vocale d’un nouveau travail, suivie d’une confirmation.",
          "Fiches de travail PDF faciles à lire."
        ]
      },
      "pt-BR": {
        "summary": "Organize clientes, trabalhos, prazos e custos para saber qual é a próxima tarefa.",
        "overview": "Reúna no aparelho os trabalhos dos clientes e seus próximos passos. Acompanhe tarefas, prazos, materiais, custos registrados e horas, depois prepare uma ficha PDF. A entrada por voz ajuda a registrar um novo serviço durante o trabalho e pede confirmação dos detalhes.",
        "features": [
          "Status dos trabalhos, tarefas e lembretes.",
          "Materiais, custos registrados e tempo de trabalho.",
          "Registre um novo trabalho por voz e confirme.",
          "Crie fichas de trabalho PDF fáceis de ler."
        ]
      },
      "pl": {
        "summary": "Porządkuj klientów, zlecenia, terminy i koszty, aby wiedzieć, co zrobić dalej.",
        "overview": "Zlecenia klientów i kolejne kroki pozostają razem na urządzeniu. Śledź zadania, terminy, materiały, zapisane koszty i czas pracy, a następnie twórz karty PDF. Wprowadzanie głosowe pomaga zapisać nowe zlecenie podczas pracy i wymaga potwierdzenia szczegółów.",
        "features": [
          "Status zleceń, zadania i przypomnienia.",
          "Materiały, zapisane koszty i czas pracy.",
          "Głosowe zapisanie nowego zlecenia z potwierdzeniem.",
          "Tworzenie czytelnych kart pracy PDF."
        ]
      },
      "it": {
        "summary": "Organizza clienti, lavori, scadenze e costi per sapere qual è la prossima attività.",
        "overview": "Riunisci sul dispositivo i lavori dei clienti e i passi successivi. Segui attività, scadenze, materiali, costi registrati e ore, poi prepara una scheda PDF. L’inserimento vocale aiuta a registrare un nuovo lavoro mentre sei impegnato e chiede di confermare i dettagli.",
        "features": [
          "Stato dei lavori, attività e promemoria.",
          "Materiali, costi registrati e tempo di lavoro.",
          "Registra un nuovo lavoro a voce e confermalo.",
          "Crea schede di lavoro PDF leggibili."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "lottery-filter",
    "name": "Lottery Filter",
    "status": "creating",
    "icon": "assets/icons/lottery-filter.png",
    "copy": {
      "en": {
        "summary": "Create and filter lottery combinations using rules you choose, for adults aged 18 and over.",
        "overview": "An offline tool for adults aged 18 and over to organize number combinations and apply mathematical filters. Set required or excluded numbers, use number patterns and compare against past draws you import. It does not predict winning numbers or promise improved odds.",
        "features": [
          "Required or excluded numbers and number patterns.",
          "Save game settings and filter profiles.",
          "Compare with past draws you import.",
          "No winning-number predictions or promised better odds."
        ]
      },
      "hu": {
        "summary": "Lottókombinációk készítése és szűrése saját szabályokkal, 18 éven felülieknek.",
        "overview": "Offline eszköz 18 éven felülieknek a számsorok rendezéséhez és matematikai szűréséhez. Megadhatsz kötelező vagy kizárt számokat, használhatsz számmintákat, és összevetheted a kombinációkat saját importált korábbi húzásokkal. Nem jósol nyerőszámot és nem ígér jobb nyerési esélyt.",
        "features": [
          "Kötelező vagy kizárt számok és számminták.",
          "Menthető játékbeállítások és szűrőprofilok.",
          "Összevetés a saját importált korábbi húzásokkal.",
          "Nincs nyerőszám-jóslás vagy jobb nyerési esély ígérete."
        ]
      },
      "de": {
        "summary": "Lottokombinationen mit eigenen Regeln erstellen und filtern, für Erwachsene ab 18 Jahren.",
        "overview": "Ein Offline-Werkzeug ab 18 Jahren, um Zahlenkombinationen zu ordnen und mathematisch zu filtern. Pflichtzahlen, Ausschlüsse und Zahlenmuster festlegen sowie mit eigenen importierten Ziehungen vergleichen. Es sagt keine Gewinnzahlen voraus und verspricht keine besseren Gewinnchancen.",
        "features": [
          "Pflichtzahlen, ausgeschlossene Zahlen und Zahlenmuster.",
          "Spieleinstellungen und Filterprofile speichern.",
          "Mit selbst importierten früheren Ziehungen vergleichen.",
          "Keine Vorhersage von Gewinnzahlen oder besseren Gewinnchancen."
        ]
      },
      "es": {
        "summary": "Crea y filtra combinaciones de lotería con tus propias reglas, para mayores de 18 años.",
        "overview": "Una herramienta offline para mayores de 18 años que organiza combinaciones y aplica filtros matemáticos. Elige números obligatorios o excluidos, usa patrones y compara con sorteos que importes. No predice números ganadores ni promete mejorar las probabilidades.",
        "features": [
          "Números obligatorios o excluidos y patrones numéricos.",
          "Guarda ajustes de juego y perfiles de filtro.",
          "Compara con sorteos anteriores que tú importes.",
          "Sin predicciones ni promesas de mejores probabilidades."
        ]
      },
      "fr": {
        "summary": "Créez et filtrez des combinaisons de loterie selon vos règles, pour les adultes de 18 ans et plus.",
        "overview": "Un outil hors ligne pour les adultes de 18 ans et plus, afin d’organiser des combinaisons et d’appliquer des filtres mathématiques. Définissez des numéros requis ou exclus, utilisez des motifs et comparez avec les tirages importés. Il ne prédit aucun numéro gagnant et ne promet pas de meilleures chances.",
        "features": [
          "Numéros requis ou exclus et motifs numériques.",
          "Réglages de jeu et profils de filtre enregistrés.",
          "Comparaison avec les anciens tirages que vous importez.",
          "Aucune prédiction ni promesse de meilleures chances de gain."
        ]
      },
      "pt-BR": {
        "summary": "Crie e filtre combinações de loteria com suas regras, para adultos a partir de 18 anos.",
        "overview": "Uma ferramenta offline para adultos a partir de 18 anos, para organizar combinações e aplicar filtros matemáticos. Defina números obrigatórios ou excluídos, use padrões e compare com sorteios importados. Não prevê números vencedores nem promete melhores chances.",
        "features": [
          "Números obrigatórios ou excluídos e padrões numéricos.",
          "Salve configurações do jogo e perfis de filtro.",
          "Compare com sorteios anteriores que você importar.",
          "Sem previsões ou promessas de melhores chances de ganhar."
        ]
      },
      "pl": {
        "summary": "Twórz i filtruj kombinacje lotto według własnych reguł, dla osób od 18 lat.",
        "overview": "Narzędzie offline dla osób od 18 lat do porządkowania kombinacji i stosowania filtrów matematycznych. Ustaw wymagane lub wykluczone liczby, wzorce i porównuj z importowanymi losowaniami. Nie przewiduje zwycięskich liczb ani nie obiecuje większej szansy wygranej.",
        "features": [
          "Wymagane lub wykluczone liczby oraz wzorce.",
          "Zapisywanie ustawień gry i profili filtrów.",
          "Porównanie z samodzielnie importowanymi dawnymi losowaniami.",
          "Bez prognoz i obietnic większej szansy wygranej."
        ]
      },
      "it": {
        "summary": "Crea e filtra combinazioni della lotteria con le tue regole, per adulti dai 18 anni.",
        "overview": "Uno strumento offline per adulti dai 18 anni per organizzare combinazioni e applicare filtri matematici. Imposta numeri obbligatori o esclusi, usa schemi e confronta con estrazioni importate. Non prevede numeri vincenti e non promette maggiori probabilità di vincita.",
        "features": [
          "Numeri obbligatori o esclusi e schemi numerici.",
          "Salva impostazioni di gioco e profili di filtro.",
          "Confronta con estrazioni passate che importi tu.",
          "Nessuna previsione o promessa di maggiori probabilità di vincita."
        ]
      }
    },
    "playUrl": null
  },
  {
    "id": "dialer",
    "name": "Dialer",
    "status": "creating",
    "icon": "assets/icons/dialer.png",
    "copy": {
      "en": {
        "summary": "An Android phone app for calls, contacts and call history, with configurable automatic redial.",
        "overview": "A complete default phone app for Android, covering everyday incoming, outgoing and ongoing calls. Find people through the dialpad or system contacts, use favorites and call history, choose a SIM and keep call notes. Automatic redial has separate settings for intervals and attempt limits.",
        "features": [
          "Dialpad, T9 contact search and favorites.",
          "Incoming and ongoing call controls.",
          "Choose a SIM, block numbers and add call notes.",
          "Set redial intervals and attempt limits."
        ]
      },
      "hu": {
        "summary": "Android telefonalkalmazás hívásokhoz, névjegyekhez és híváselőzményekhez, állítható automatikus újratárcsázással.",
        "overview": "Teljes értékű alapértelmezett telefonalkalmazás Androidra a hétköznapi bejövő, kimenő és folyamatban lévő hívásokhoz. Tárcsázóval vagy a rendszer névjegyeiben kereshetsz, elérheted a kedvenceket és híváselőzményeket, SIM-et választhatsz és jegyzetelhetsz. Az automatikus újratárcsázás időköze és próbálkozásszáma külön állítható.",
        "features": [
          "Tárcsázó, T9 névjegykeresés és kedvencek.",
          "Bejövő és folyamatban lévő hívások kezelése.",
          "SIM-választás, számtiltás és hívásjegyzetek.",
          "Újratárcsázási időközök és próbálkozásszám beállítása."
        ]
      },
      "de": {
        "summary": "Eine Android-Telefon-App für Anrufe, Kontakte und Anrufverlauf mit einstellbarer automatischer Wahlwiederholung.",
        "overview": "Eine vollständige Standard-Telefon-App für Android für eingehende, ausgehende und laufende Anrufe. Suche über Wähltastatur oder Systemkontakte, nutze Favoriten und Anrufverlauf, wähle eine SIM und erfasse Notizen. Die automatische Wahlwiederholung hat eigene Intervalle und Versuchslimits.",
        "features": [
          "Wähltastatur, T9-Kontaktsuche und Favoriten.",
          "Eingehende und laufende Anrufe steuern.",
          "SIM auswählen, Nummern sperren und Anrufnotizen ergänzen.",
          "Wahlwiederholungsintervall und Versuchslimit einstellen."
        ]
      },
      "es": {
        "summary": "Una app de teléfono Android para llamadas, contactos e historial, con rellamada automática configurable.",
        "overview": "Una app telefónica predeterminada completa para Android, con llamadas entrantes, salientes y en curso. Busca desde el teclado o los contactos del sistema, usa favoritos e historial, elige SIM y guarda notas. La rellamada automática permite configurar intervalos y límites de intentos por separado.",
        "features": [
          "Teclado, búsqueda T9 de contactos y favoritos.",
          "Controles para llamadas entrantes y en curso.",
          "Elige SIM, bloquea números y añade notas de llamada.",
          "Configura intervalos y límites de intentos de rellamada."
        ]
      },
      "fr": {
        "summary": "Une application Téléphone Android pour appels, contacts et historique, avec rappel automatique réglable.",
        "overview": "Une application Téléphone Android complète pour les appels entrants, sortants et en cours. Recherchez avec le clavier ou les contacts système, utilisez favoris et historique, choisissez une SIM et gardez des notes. Le rappel automatique dispose de ses propres intervalles et limites de tentatives.",
        "features": [
          "Clavier, recherche T9 des contacts et favoris.",
          "Commandes pour les appels entrants et en cours.",
          "Choix de SIM, blocage de numéros et notes d’appel.",
          "Intervalles et limites de tentatives de rappel réglables."
        ]
      },
      "pt-BR": {
        "summary": "Um app de telefone Android para chamadas, contatos e histórico, com rediscagem automática configurável.",
        "overview": "Um app de telefone padrão completo para Android, com chamadas recebidas, feitas e em andamento. Busque pelo teclado ou contatos do sistema, use favoritos e histórico, escolha o SIM e faça anotações. A rediscagem automática tem configurações próprias de intervalo e limite de tentativas.",
        "features": [
          "Teclado, busca T9 de contatos e favoritos.",
          "Controles para chamadas recebidas e em andamento.",
          "Escolha o SIM, bloqueie números e adicione notas.",
          "Defina intervalos e limites de tentativas de rediscagem."
        ]
      },
      "pl": {
        "summary": "Aplikacja telefoniczna Android do połączeń, kontaktów i historii z ustawianym automatycznym ponawianiem połączeń.",
        "overview": "Pełna domyślna aplikacja telefoniczna Android do połączeń przychodzących, wychodzących i trwających. Szukaj klawiaturą lub w kontaktach systemowych, korzystaj z ulubionych i historii, wybieraj SIM i zapisuj notatki. Automatyczne ponawianie ma osobne ustawienia odstępów i limitów prób.",
        "features": [
          "Klawiatura, wyszukiwanie kontaktów T9 i ulubione.",
          "Obsługa połączeń przychodzących i trwających.",
          "Wybór SIM, blokowanie numerów i notatki z rozmów.",
          "Ustawienie odstępów ponawiania i limitu prób."
        ]
      },
      "it": {
        "summary": "Un’app Telefono Android per chiamate, contatti e cronologia, con richiamata automatica configurabile.",
        "overview": "Un’app Telefono predefinita completa per Android, per chiamate in arrivo, in uscita e in corso. Cerca dal tastierino o nei contatti di sistema, usa preferiti e cronologia, scegli SIM e salva note. La richiamata automatica ha impostazioni separate per intervalli e limiti dei tentativi.",
        "features": [
          "Tastierino, ricerca T9 dei contatti e preferiti.",
          "Controlli per chiamate in arrivo e in corso.",
          "Scegli SIM, blocca numeri e aggiungi note.",
          "Imposta intervalli e limiti dei tentativi di richiamata."
        ]
      }
    },
    "playUrl": null
  }
];

for (const app of portfolioApps) {
  if (!APP_STATUSES.includes(app.status)) throw new Error(`Invalid app status: ${app.id}`);
  if (app.playUrl !== null && !isPlayStoreUrl(app.playUrl)) throw new Error(`Invalid Play URL: ${app.id}`);
  for (const lang of L) {
    const copy = app.copy[lang];
    if (!copy?.summary || !copy.overview || copy.features.length !== 4 || copy.features.some(v => !v)) {
      throw new Error(`Missing app translation: ${app.id}/${lang}`);
    }
  }
  apps.push(app);
}
setLanguage(document.getElementById('languageSelect').value);

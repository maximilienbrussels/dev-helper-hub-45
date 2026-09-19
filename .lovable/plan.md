# Academy perfectioneren + foutensweep

De import van de GitHub-versie is volledig binnen en draait op de bestaande databank. Dit plan maakt de site foutvrij, zet alles echt drietalig en bouwt de Academy om tot een volwaardige, leeftijdsgerichte test met feestelijke afwerking.

## 1. Foutensweep over alle pagina's

- Elke publieke pagina en elke beheerpagina automatisch doorlopen in een testbrowser (NL, FR, EN) en elke fout, lege tekst of kapotte afbeelding noteren en herstellen.
- Ontbrekende vertalingen opsporen: alle teksten die nu in één taal blijven staan krijgen hun Franse en Engelse versie. Ook de beheerschermen die nu enkel Nederlands tonen waar dat verkeerd is.
- Taalwissel testen op elke route, inclusief de gelokaliseerde adressen.

## 2. Aanmelden en accounts koppelen gelijktrekken

- Nu werkt aanmelden met Google en de andere diensten wel, maar het koppelen van een extra account in de accountinstellingen gebruikt andere instellingen en faalt.
- Eén gedeelde werkwijze voor beide: dezelfde lijst diensten, dezelfde terugkeeradressen, dezelfde foutmeldingen. Wat op de inlogpagina staat, staat ook bij "account koppelen", en omgekeerd.
- Duidelijke melding per dienst wanneer die niet is ingesteld, in plaats van een stille fout.

## 3. Afbeeldingen overal via dezelfde opslag

- In het beheerportaal gaan sommige afbeeldingen via de mediabibliotheek en andere niet, waardoor beelden soms niet verschijnen.
- Alle plekken waar een afbeelding gekozen of geüpload wordt, gebruiken dezelfde kiezer en dezelfde adresvertaling, zodat elk beeld ook publiek correct laadt.
- Een klein hersteltraject voor beelden die nu met een verkeerd adres opgeslagen staan.

## 4. De Academy zelf

**Twee sporen, echt verschillend**
- Kinderen (6–15): eenvoudige taal, herkennen en verzorgen, kortere test, veel aanmoediging.
- 16+: drie rondes na elkaar met oplopende diepgang (herkennen en gedrag → verzorging en welzijn → wetgeving, kosten en verantwoordelijkheid). Je ziet altijd in welke ronde je zit en hoeveel er nog rest.

**Eerlijke, wisselende vragen**
- Per academie een grotere voorraad dan de test lang is (bv. 30 in voorraad, 15 gesteld), zodat twee mensen niet dezelfde test krijgen.
- Antwoordvolgorde wordt bij elke test door elkaar gehusseld — het eerste antwoord is niet langer meestal het juiste.
- Vragen die hetzelfde toetsen in andere bewoording worden gegroepeerd: je krijgt er nooit twee uit dezelfde groep in één ronde.
- Vragen die echt essentieel zijn voor dierenwelzijn worden altijd gesteld.

**Betere vraagkwaliteit**
- Bij 16+ verdwijnen de vragen waarbij het foute antwoord overduidelijk dom is; de keuzes worden aannemelijk maar aantoonbaar verkeerd.
- Nieuw vraagtype: getal invullen (bv. hoe vaak per dag voeren), met een toegestane marge. Ook instelbaar in het beheer.
- Elke vraag krijgt een "wist je dat"-uitleg in drie talen.

**Duidelijke, leuke reacties**
- Een gekozen antwoord wordt niet meer eerst oranje: het wordt meteen groen of rood, met een draaiend vinkje of kruisje.
- Kinderen: confetti, duimpjes en een vrolijk geluidje bij goed; een zachte aanmoediging bij fout.
- 16+: sobere groene bevestiging, korte duiding, rustige overgang.
- Ronde-afsluiting met een kleine vierings- of herkansingsanimatie.

**Diploma en certificaat**
- Kinderen: speelse opbouw-animatie met stempel en confettiregen.
- 16+: elegante, rustige onthulling van het certificaat.

## 5. Beheer van de vragen

- Vraagvenster krijgt: getalvraag met marge, leeftijdsspoor, ronde, variantgroep, "essentiële vraag"-vinkje en een vertaalstatus per taal.
- Overzicht per academie toont meteen hoeveel vragen per spoor, per ronde en per taal klaar zijn, zodat gaten zichtbaar zijn.
- Waarschuwing bij opslaan wanneer Frans of Engels ontbreekt.

## 6. Inhoud: alles drietalig en uitgebreid

Er staan nu 126 vragen; 90 daarvan hebben geen Frans of Engels en geen enkele vraag is aan een leeftijdsspoor gekoppeld. Aanpak:

- Alle bestaande vragen krijgen een correcte Franse en Engelse versie (ook de antwoorden en de uitleg).
- Per academie wordt de voorraad uitgebreid tot een volwaardige set: kindervragen plus 16+-vragen verdeeld over drie rondes, met de juiste balans tussen kennis en verantwoordelijkheid.
- Dit gebeurt in schijven per academie, zodat je tussentijds kan meelezen en bijsturen. Ik start met drie academies volledig afgewerkt als ijkpunt en werk daarna de rest af in dezelfde stijl.

## Technische aanpak

- Databank: migratie voegt toe aan `academy_vragen`: `vraag_type` uitgebreid met `getal`, plus `correct_getal`, `getal_marge`, `getal_eenheid`, `variant_groep`, `verplicht` (essentiële vraag) en `moeilijkheid`. `doelgroep` wordt effectief gevuld. Academies krijgen `vragen_per_test` per spoor (`vragen_per_test_kids`, `vragen_per_test_16plus`).
- Selectie in `startExamen`: per ronde willekeurig trekken uit de voorraad van het gekozen spoor, verplichte vragen altijd meenemen, maximaal één vraag per variantgroep per ronde, en per vraag een geschudde antwoordvolgorde teruggeven met een serverkant-permutatie. `checkAntwoord` en `submitExamen` rekenen de permutatie terug, zodat het juiste antwoord nooit in de browser zichtbaar is.
- Geschudde volgorde wordt per sessie deterministisch gemaakt met een seed, zodat herladen dezelfde test toont.
- Frontend: `src/pages/academy-quiz.tsx` krijgt onmiddellijke groen/rood-status (optimistische vergrendeling zonder oranje tussenstap), rondeoverzicht, getalinvoer en een effectenlaag (`canvas-confetti`, met `prefers-reduced-motion`-respect) die per spoor anders reageert.
- Beheer: `src/components/portal/pages/AcademyPage.tsx` en `src/lib/academy-admin-schema.ts` uitgebreid met de nieuwe velden en vertaalstatus.
- Auth: gedeelde providerlijst en callback-opbouw tussen `src/routes/api/auth/*` en het koppelscherm in de accountinstellingen (`useAuthIdentities`), één bron voor terugkeeradressen.
- Media: alle uploadpunten via de bestaande `ImageUploader` en `normalizePublicImageUrl`, ook op de plekken die nu een rechtstreeks adres opslaan.
- Controle: browsertests per taal over alle routes, plus een uitbreiding van `tests/academy-*.test.ts` voor selectie, variantgroepen, schudlogica en scoreberekening.

## Volgorde

1. Foutensweep en drietaligheid van de bestaande pagina's
2. Aanmelden/koppelen gelijktrekken + afbeeldingenopslag
3. Academy-motor (databank, selectie, schudden, getalvragen)
4. Quizbeleving en effecten, certificaat-animaties
5. Beheerschermen
6. Inhoud: vertalen en uitbreiden per academie

# Academie afwerken: vragen, invulproces, effecten en domeinen

## 1. Vragen inhoudelijk op niveau brengen

Vandaag staan er 126 vragen in de databank. Daarvan missen er 90 een Franse en Engelse vertaling, en de juiste antwoorden staan bijna nooit op de derde plaats (64x eerste, 53x tweede, 9x derde). De meeste academies hebben maar zes vragen, wat betekent dat iedereen dezelfde test krijgt.

Aanpak per academie:
- Elke vraag herschrijven en beoordelen op: is ze duidelijk, is er precies één verdedigbaar juist antwoord, en is het foute antwoord geloofwaardig (niet "dom")?
- Pool vergroten tot minstens het dubbele van de testlengte, zodat twee mensen zelden dezelfde set krijgen.
- Varianten van dezelfde vraag krijgen dezelfde variantgroep, zodat niemand twee keer hetzelfde thema in één test ziet.
- Echt essentiële vragen (dierenwelzijn, veiligheid, wettelijke plicht) markeren als verplicht — die komen bij iedereen.
- Kindertrack: korte, concrete vragen. 16+: drie rondes die oplopen in diepgang, met verzorgingsplicht, kosten, gedrag en wetgeving.
- Volledige NL/FR/EN vertaling van vraag, antwoorden en "Wist je dat?", met een zichtbare vertaalstatus in de admin.
- Cijfervragen inzetten waar een getal het juiste antwoord is (aantal maaltijden, temperatuur, levensduur), met een redelijke tolerantie.

## 2. Invulproces kritisch nalopen

Punten die we nalopen en oplossen:
- Herhaling: controle dat binnen één test nooit twee vragen uit dezelfde variantgroep of met dezelfde kern voorkomen.
- Terugval: als een leeftijdstrack te weinig vragen heeft, valt de selectie nu terug op álle vragen. Dat maken we netjes: liever een kortere test dan vragen die niet bij de leeftijd passen.
- Voortgang: duidelijke ronde- en vraagteller, en bij 16+ zichtbaar welke ronde van drie loopt.
- Antwoordvolgorde blijft per sessie door elkaar geschud en wordt op de server gecontroleerd.
- Navigatie: terug/vooruit, per ongeluk verversen, en dubbelklikken op een antwoord mogen de test niet breken.
- Toetsenbord- en schermlezertoegankelijkheid van de antwoordknoppen.

## 3. Voorlezen (gesproken versie)

Nu wordt er voorgelezen met een vaste snelheid en zonder keuze van stem. Verbeteringen:
- Snelheidskeuze (traag / normaal / snel) die onthouden wordt.
- Per taal de best passende stem kiezen uit wat het toestel aanbiedt, met een nette melding als er geen Nederlandse, Franse of Engelse stem is (komt voor op sommige toestellen).
- Ook de antwoordopties en de "Wist je dat?"-tekst kunnen laten voorlezen, niet enkel de vraag.
- Stoppen bij het wisselen van vraag en bij het verlaten van de pagina.

## 4. Effecten en certificaat

- Kinderen: confetti, duimpje en vrolijk geluid blijven, met een feestelijke onthulling van het diploma.
- 16+: sobere, professionele bevestiging; diploma verschijnt met een rustige animatie.
- Effecten respecteren "beperk beweging" en geluid staat standaard uit tot de gebruiker het aanzet.
- Het moment waarop het certificaat gemaakt wordt krijgt een duidelijke opbouw (bezig → klaar) in plaats van een sprong.

## 5. Delen op LinkedIn

De huidige LinkedIn-knop gebruikt de "voeg toe aan profiel"-link. We controleren of naam, organisatie, datum, certificaat-URL en certificaat-ID correct doorkomen, of de verificatiepagina publiek bereikbaar is zonder inloggen, en of die pagina de juiste deelvoorbeeldgegevens (titel, omschrijving, afbeelding) meegeeft. Ook de gewone deelknop en het Open Badge-bestand lopen we na.

## 6. Domeinen: vast of meebewegend

Situatie nu:
- Inloggen gebruikt wél het adres van het verzoek (achter de proxy), dus dat beweegt mee met het domein.
- De QR-code en verificatielink op het certificaat staan vast op maximilien.brussels.
- E-mails gebruiken een vast basisadres, tenzij er een omgevingsinstelling is; bovendien worden afwijkende domeinen actief teruggezet naar maximilien.brussels.

Voorstel:
- Certificaten en de QR-code blijven bewust op één vast, canoniek adres. Een diploma op papier moet jaren later nog werken; als de QR naar een tijdelijk preview-adres wijst, is het certificaat onverifieerbaar. Dat adres maken we wel instelbaar via één instelling in plaats van hard in de code.
- E-mails idem: één canoniek adres uit dezelfde instelling, want mailboxen bewaren berichten lang en previewadressen verdwijnen.
- Inloggen en alles wat binnen één sessie gebeurt, blijft meebewegen met het domein waarop de bezoeker zit.

Zo hoef je bij een domeinwissel maar één instelling aan te passen, zonder dat oude certificaten of verstuurde mails breken.

## Technische aanpak

- Eén `SITE_URL`-instelling als bron voor `CERT_VERIFY_BASE`, `PUBLIC_SITE_URL` en `mailOrigin`; de hostwhitelist in `email-shell.ts` verruimen naar het ingestelde domein.
- `academy-selectie.ts`: terugval op alle vragen vervangen door track-strikte selectie met variantgroep-uitsluiting; dekkingscontrole per academie.
- `academy-quiz.tsx`: voorleessnelheid + stemkeuze in een kleine instellingsbalk, voorlezen van opties en "Wist je dat?".
- Contentmigratie in `neon/migrations/`: herschreven vragen, vertalingen, variantgroepen, verplicht-vlaggen, cijfervragen en gespreide juiste-antwoordindexen.
- Admin: vertaalstatus per vraag en poolgrootte per academie/track zichtbaar maken.
- Tests op selectie (geen dubbels, verplichte vragen aanwezig, correcte lengte) en een doorloop van de test in de drie talen.
